"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, ChevronRight, Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useCallback, useState } from "react";

export default function OrderDrawer() {
    const { items, isOpen, toggleDrawer, removeFromCart, updateQuantity, getCartTotal } = useCartStore();
    const total = getCartTotal();
    const [isVisible, setIsVisible] = useState(false);

    // Fix pointer-event reset: Ensure body is interactive when drawer closes
    useEffect(() => {
        if (isOpen) {
            document.body.style.pointerEvents = 'auto';
            document.body.style.overflow = 'auto';
            setIsVisible(true);
        } else {
            document.body.style.pointerEvents = 'auto';
            document.body.style.overflow = 'auto';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.pointerEvents = 'auto';
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    // Loop prevention: Wrap close handler in useCallback
    const handleClose = useCallback((e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation(); // Prevent bubbling to open trigger
        }
        toggleDrawer(false);
        // Ensure cleanup happens immediately
        document.body.style.pointerEvents = 'auto';
        document.body.style.overflow = 'auto';
    }, [toggleDrawer]);

    // Animation complete handler for visibility management
    const handleExitComplete = useCallback(() => {
        setIsVisible(false);
    }, []);

    return (
        <>
            {/* Floating Action Button (FAB) */}
            <motion.button
                onClick={() => toggleDrawer(true)}
                className="fixed bottom-8 right-8 z-40 bg-white text-black w-16 h-16 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                whileHover={{ boxShadow: "0 0 20px rgba(255,255,255,0.3)" }}
                animate={items.length > 0 ? {
                    boxShadow: ["0 0 0px #FFD700", "0 0 20px #FFD700", "0 0 0px #FFD700"],
                    scale: [1, 1.05, 1],
                } : {}}
                transition={items.length > 0 ? {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                } : {}}
                style={{
                    pointerEvents: 'auto' // Ensure FAB is always clickable
                }}
            >
                <span className="sr-only">Open Order</span>
                {items.length > 0 ? (
                    <span className="font-bold text-lg">{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                ) : (
                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                )}
            </motion.button>

            {/* Drawer Overlay - Use unique key for clean mount/unmount */}
            <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
                {isOpen && (
                    <motion.div
                        key="order-drawer-overlay" // Unique key for AnimatePresence
                        className="fixed inset-0 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            pointerEvents: isVisible ? 'auto' : 'none' // Pointer guard
                        }}
                    >
                        {/* Backdrop */}
                        <div
                            onClick={handleClose}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Drawer Panel */}
                        <motion.div
                            className="absolute bottom-0 right-0 md:bg-[#111] bg-[#0A0A0A] w-full md:w-[480px] h-[85vh] md:h-screen rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none shadow-2xl border-t md:border-l border-white/10 flex flex-col"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        >
                            {/* Header */}
                            <div className="p-8 flex items-center justify-between border-b border-white/5">
                                <h2 className="text-2xl font-bold text-white tracking-tight">YOUR TRAY</h2>
                                <button
                                    onClick={handleClose}
                                    className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                                >
                                    <X className="text-white" size={20} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-8">
                                {items.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full opacity-50">
                                        <div className="w-16 h-16 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center mb-4">
                                            <span className="text-2xl">🌯</span>
                                        </div>
                                        <p className="text-white/60 font-light">Your tray is empty.</p>
                                        <p className="text-white/30 text-sm mt-2">Select a craft from the menu to begin.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <AnimatePresence mode="popLayout">
                                            {items.map((item) => (
                                                <motion.div
                                                    key={item.id}
                                                    layout
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                                                    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5"
                                                >
                                                    {/* Thumbnail */}
                                                    <div className="w-16 h-16 rounded-lg bg-black overflow-hidden relative">
                                                        <img src={item.image} alt={item.name} className="object-cover w-full h-full opacity-80" />
                                                    </div>

                                                    <div className="flex-1">
                                                        <h4 className="text-white font-bold text-sm tracking-wide">{item.name}</h4>
                                                        <span className="text-xs text-white/50 uppercase">Plush Variant</span>
                                                        <div className="mt-2 flex items-center gap-2">
                                                            {/* Quantity Controls */}
                                                            <div className="flex items-center gap-2 bg-black/40 rounded-full px-2 py-1 border border-[#FFD700]/20">
                                                                <motion.button
                                                                    whileTap={{ scale: 0.9 }}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        updateQuantity(item.id, -1);
                                                                    }}
                                                                    className="text-[#FFD700] hover:text-[#FFD700]/70 transition-colors"
                                                                >
                                                                    <Minus size={14} />
                                                                </motion.button>
                                                                <span className="text-white font-mono text-sm min-w-[20px] text-center">
                                                                    {item.quantity}
                                                                </span>
                                                                <motion.button
                                                                    whileTap={{ scale: 0.9 }}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        updateQuantity(item.id, 1);
                                                                    }}
                                                                    className="text-[#FFD700] hover:text-[#FFD700]/70 transition-colors"
                                                                >
                                                                    <Plus size={14} />
                                                                </motion.button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col items-end gap-2">
                                                        <span className="text-white font-mono text-sm">
                                                            ₦{(item.price * item.quantity).toLocaleString()}
                                                        </span>
                                                        <span className="text-white/30 font-mono text-xs">
                                                            ₦{item.price.toLocaleString()} × {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                removeFromCart(item.id);
                                                            }}
                                                            className="text-white/30 hover:text-red-400 transition-colors"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </div>

                            {/* Checkout Footer */}
                            <div className="p-8 border-t border-white/5 bg-[#111]">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-gray-400">Total</span>
                                    <span className="text-2xl font-bold text-white">₦{total.toLocaleString()}</span>
                                </div>

                                <button
                                    disabled={items.length === 0}
                                    className={`w-full py-4 font-bold tracking-widest uppercase rounded-lg flex items-center justify-center gap-2 transition-all ${items.length > 0 ? "bg-white text-black hover:bg-gray-200" : "bg-white/10 text-white/30 cursor-not-allowed"}`}
                                >
                                    <span>Checkout {items.length > 0 && `(₦${total.toLocaleString()})`}</span>
                                    <ChevronRight size={18} />
                                </button>

                                <div className="mt-4 flex justify-center gap-4 opacity-30 invert">
                                    <CreditCard size={20} />
                                    <div className="w-8 h-5 bg-gray-500 rounded" />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
