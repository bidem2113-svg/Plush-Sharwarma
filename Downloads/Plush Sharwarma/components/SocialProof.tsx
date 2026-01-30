"use client";

import { motion } from "framer-motion";

const REVIEWS = [
    "Use a fork? Never. - The Guardian",
    "VOTED #1 IN LAGOS",
    "A spiritual experience relative to street food. - EatDrinkLagos",
    "VOTED #1 IN LAGOS",
    "The Wagyu of Shawarmas. - Culinary Weekly",
    "VOTED #1 IN LAGOS",
];

export default function SocialProof() {
    return (
        <div className="relative w-full py-12 overflow-hidden bg-[#050505] border-y border-white/5">
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] pointer-events-none" />

            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 20
                }}
            >
                {/* Triple duplication for seamless loop */}
                {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((text, i) => (
                    <span key={i} className="inline-block mx-8 text-2xl md:text-4xl text-white/80 font-light tracking-tight uppercase">
                        {text}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
