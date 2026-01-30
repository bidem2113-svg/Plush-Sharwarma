"use client";

import { useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 175;

export default function ScrollSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll();

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Map 0-1 scoll to 0-(FRAME_COUNT-1)
    const frameIndex = useTransform(smoothProgress, [0, 1], [1, FRAME_COUNT]);

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];

            for (let i = 1; i <= FRAME_COUNT; i++) {
                const img = new Image();
                const src = `/sequence/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`;
                img.src = src;
                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = resolve; // Continue even if one fails
                });
                loadedImages.push(img);
            }

            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    useEffect(() => {
        if (!canvasRef.current || images.length === 0) return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        const render = () => {
            let currentFrame = Math.floor(frameIndex.get());
            if (currentFrame < 1) currentFrame = 1;
            if (currentFrame > FRAME_COUNT) currentFrame = FRAME_COUNT;

            const img = images[currentFrame - 1]; // 0-indexed array

            if (img) {
                // Auto-scale to cover
                const canvas = canvasRef.current!;
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                const x = (canvas.width / 2) - (img.width / 2) * scale;
                const y = (canvas.height / 2) - (img.height / 2) * scale;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            }
        };

        const unsubscribe = frameIndex.on("change", render);
        // Initial render
        render();

        // Also handle resize
        window.addEventListener('resize', render);

        return () => {
            unsubscribe();
            window.removeEventListener('resize', render);
        };
    }, [frameIndex, images, isLoaded]);

    // Non-blocking loading: removed the full-screen loader
    // Canvas will appear transparent until images are ready


    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 bottom-0 left-0 right-0 mx-auto w-full max-w-screen-xl h-full object-cover z-0 pointer-events-none"
        />
    );
}
