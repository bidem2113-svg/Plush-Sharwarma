"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function Navbar() {
    const { scrollYProgress } = useScroll();
    const toggleDrawer = useCartStore((state) => state.toggleDrawer);

    // Fade in after 90% scroll (once the scrollytelling is mostly done)
    const opacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
    const y = useTransform(scrollYProgress, [0.85, 0.95], [-20, 0]);
    const pointerEvents = useTransform(scrollYProgress, (v) => v > 0.85 ? "auto" : "none");

    return (
        <motion.nav
            style={{ opacity, y, pointerEvents }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center lg:justify-between px-8 py-6 bg-gradient-to-b from-[#050505]/90 to-transparent backdrop-blur-sm"
        >
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-full lg:hidden" /> {/* Mobile Logo Placeholder */}
                <span className="text-xl font-bold tracking-tight text-white hidden lg:block">PLUSH SHAWARMA</span>
            </div>

            <button
                onClick={() => toggleDrawer(true)}
                className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full font-medium tracking-wide hover:scale-105 transition-transform"
            >
                <ShoppingBag size={18} />
                <span>ORDER NOW</span>
            </button>
        </motion.nav>
    );
}
