"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface QuantityFeedbackProps {
    trigger: number; // Increment this to trigger animation
}

export default function QuantityFeedback({ trigger }: QuantityFeedbackProps) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (trigger > 0) {
            setShow(true);
            const timer = setTimeout(() => setShow(false), 600);
            return () => clearTimeout(timer);
        }
    }, [trigger]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 1, y: 0, scale: 1 }}
                    animate={{ opacity: 0, y: -40, scale: 1.2 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 300,
                        duration: 0.6
                    }}
                    className="absolute top-0 right-0 pointer-events-none z-30"
                >
                    <span className="text-2xl font-bold text-[#FFD700] drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                        +1
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
