"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect } from "react";

interface ProductPreviewProps {
    isVisible: boolean;
    imageSrc: string; // In a real app, this would be the product image
}

export default function ProductPreview({ isVisible, imageSrc }: ProductPreviewProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        if (isVisible) {
            window.addEventListener("mousemove", handleMouseMove);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [isVisible, mouseX, mouseY]);

    return (
        <motion.div
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.8
            }}
            transition={{ type: "spring", duration: 0.4 }}
            className="fixed top-0 left-0 w-64 h-64 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-normal"
        >
            <div className="relative w-full h-full p-4 rounded-full bg-black/80 backdrop-blur-md border border-white/10 shadow-2xl flex items-center justify-center">
                {/* Placeholder for high-res cut-out */}
                {/* Using a frame from sequence as fallback if static image not provided */}
                <img
                    src={imageSrc || "/sequence/ezgif-frame-175.jpg"}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                />
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" />
            </div>
        </motion.div>
    );
}
