"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useState, useEffect } from "react";
import ProductPreview from "@/components/ProductPreview";
import QuantityFeedback from "@/components/QuantityFeedback";

interface MenuItem {
    id: string;
    name: string;
    price: number;
    desc: string;
    accent: string;
    image: string; // Placeholder for now
}

const MENU_ITEMS: MenuItem[] = [
    {
        id: "classic",
        name: "THE CLASSIC",
        price: 5500,
        desc: "A timeless balance of garlic, crisp vegetables, and tender chicken.",
        accent: "bg-white",
        image: "/sequence/ezgif-frame-080.jpg"
    },
    {
        id: "spicy",
        name: "THE SPICY",
        price: 6000,
        desc: "Infused with scotch bonnet oil and a vibrant pepper relish.",
        accent: "bg-red-500",
        image: "/sequence/ezgif-frame-120.jpg"
    },
    {
        id: "double",
        name: "THE DOUBLE",
        price: 7500,
        desc: "Twice the protein for the serious carnivore.",
        accent: "bg-amber-400",
        image: "/sequence/ezgif-frame-160.jpg"
    }
];

export default function MenuSection() {
    const { addToCart, items, updateQuantity, isOpen } = useCartStore();
    const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
    const [feedbackTriggers, setFeedbackTriggers] = useState<Record<string, number>>({});

    // State isolation: Reset hover state when drawer opens
    useEffect(() => {
        if (isOpen) {
            setHoveredProduct(null);
        }
    }, [isOpen]);

    const [isHoverable, setIsHoverable] = useState(false);

    // Interaction Refinement: Only enable hover effects on devices that support it
    useEffect(() => {
        setIsHoverable(window.matchMedia('(hover: hover)').matches);
    }, []);

    const getHoverImage = () => {
        return MENU_ITEMS.find(i => i.id === hoveredProduct)?.image || "";
    };

    const handleAddToCart = (item: MenuItem, e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart({
            name: item.name,
            price: item.price,
            variant: item.id,
            image: item.image
        });

        // Trigger floating animation
        setFeedbackTriggers(prev => ({
            ...prev,
            [item.id]: (prev[item.id] || 0) + 1
        }));
    };

    const handleQuantityChange = (itemId: string, delta: number, e: React.MouseEvent) => {
        e.stopPropagation();
        const cartItem = items.find(i => i.variant === itemId);
        if (cartItem) {
            updateQuantity(cartItem.id, delta);

            // Trigger floating animation for increments
            if (delta > 0) {
                setFeedbackTriggers(prev => ({
                    ...prev,
                    [itemId]: (prev[itemId] || 0) + 1
                }));
            }
        }
    };

    const getItemQuantity = (variantId: string) => {
        const cartItem = items.find(i => i.variant === variantId);
        return cartItem?.quantity || 0;
    };

    return (
        <section className="py-24 px-6 md:px-12 bg-[#050505] relative z-20">
            <ProductPreview isVisible={!!hoveredProduct} imageSrc={getHoverImage()} />

            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold text-white mb-16 tracking-tighter"
                >
                    SELECT YOUR CRAFT
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {MENU_ITEMS.map((item, idx) => {
                        const quantity = getItemQuantity(item.id);

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={isHoverable ? { scale: 1.02 } : {}}
                                onMouseEnter={() => setHoveredProduct(item.id)}
                                onMouseLeave={() => setHoveredProduct(null)}
                                className="group relative p-8 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer overflow-hidden flex flex-col h-full"
                            >
                                <div className={`absolute top-0 left-0 w-full h-1 ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />

                                {/* Quantity Feedback Animation */}
                                <QuantityFeedback trigger={feedbackTriggers[item.id] || 0} />

                                <div className="flex justify-between items-start mb-8">
                                    <span className="text-xl font-mono text-gray-400">{String(idx + 1).padStart(2, '0')}</span>
                                    <Plus className="text-white/50 group-hover:text-white transition-colors" />
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-2">{item.name}</h3>
                                <p className="text-gray-400 font-light mb-8 h-12 leading-relaxed">
                                    {item.desc}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-8">
                                    <span className="text-2xl text-white font-mono">₦{item.price.toLocaleString()}</span>

                                    {quantity > 0 ? (
                                        // Show quantity controls if item is in cart
                                        // Button persistence: Not tied to cart.length or drawer state
                                        <div className="relative z-20 flex items-center gap-2 bg-black/60 rounded-full px-3 py-2 border border-[#FFD700]/30">
                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                onClick={(e) => handleQuantityChange(item.id, -1, e)}
                                                className="text-[#FFD700] hover:text-[#FFD700]/70 transition-colors"
                                            >
                                                <Minus size={16} />
                                            </motion.button>
                                            <span className="text-white font-mono text-sm min-w-[24px] text-center font-bold">
                                                {quantity}
                                            </span>
                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                onClick={(e) => handleQuantityChange(item.id, 1, e)}
                                                className="text-[#FFD700] hover:text-[#FFD700]/70 transition-colors"
                                            >
                                                <Plus size={16} />
                                            </motion.button>
                                        </div>
                                    ) : (
                                        // Show "Add to Order" button if not in cart
                                        // Button persistence: ALWAYS rendered, not tied to cart.length or drawer state
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => handleAddToCart(item, e)}
                                            className="relative z-20 px-4 py-2 text-xs uppercase tracking-widest text-black bg-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 rounded-full font-bold hover:bg-gray-200"
                                        >
                                            Add to Order
                                        </motion.button>
                                    )}
                                </div>
                            </motion.div>

                        );
                    })}
                </div>
            </div>
        </section>
    );
}
