"use client";

import { useScroll, useTransform, motion } from "framer-motion";

function Beat({ start, end, title, subtitle, visualNote }: { start: number; end: number; title: string; subtitle: string; visualNote?: string }) {
    const { scrollYProgress } = useScroll();

    const opacity = useTransform(scrollYProgress,
        [start, start + 0.05, end - 0.05, end],
        [0, 1, 1, 0]
    );

    const y = useTransform(scrollYProgress,
        [start, end],
        [50, -50]
    );

    return (
        <motion.div
            style={{ opacity, y }}
            className="fixed inset-0 flex flex-col items-center justify-center z-10 text-center pointer-events-none mix-blend-difference"
        >
            <h2 className="text-5xl md:text-9xl font-bold tracking-tighter mb-4 text-white uppercase">
                {title}
            </h2>
            <p className="text-xl md:text-2xl font-light tracking-wide text-gray-300 max-w-lg">
                {subtitle}
            </p>
            {/* Visual Note - Debugging/Context */}
            {/* <div className="mt-8 text-xs text-red-500 font-mono border border-red-500 px-2 py-1 opacity-50">
        {visualNote}
      </div> */}
        </motion.div>
    );
}

export default function OverlayText() {
    return (
        <>
            <div className="h-[500vh]"> {/* Total scroll height spacer */}
                {/* Scroll Progress Indicators if needed */}
            </div>

            <Beat
                start={0}
                end={0.2}
                title="PLUSH SHAWARMA"
                subtitle="Craftsmanship you can taste."
            />

            <Beat
                start={0.25}
                end={0.45}
                title="THE SEAR"
                subtitle="Hand-carved, spice-rubbed chicken thighs."
            />

            <Beat
                start={0.50}
                end={0.70}
                title="VIBRANT LAYERS"
                subtitle="Crisp romaine and vine-ripened acidity."
            />

            <Beat
                start={0.75}
                end={0.95}
                title="ORDER NOW"
                subtitle="Experience the deconstructed masterpiece."
            />

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="fixed bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest uppercase animate-bounce"
            >
                Scroll to Explore
            </motion.div>
        </>
    );
}
