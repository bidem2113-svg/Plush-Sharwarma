import { create } from 'zustand';

export interface CartItem {
    id: string; // unique ID (e.g. timestamp + product id)
    name: string;
    price: number;
    variant: string;
    quantity: number;
    image?: string;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    clearCart: () => void;
    toggleDrawer: (force?: boolean) => void;
    getCartTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    isOpen: false,
    addToCart: (item) => set((state) => {
        // Check if item with same variant already exists
        const existingItem = state.items.find((i) => i.variant === item.variant);

        if (existingItem) {
            // Increment quantity of existing item
            return {
                items: state.items.map((i) =>
                    i.variant === item.variant
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                ),
                isOpen: true
            };
        } else {
            // Add new item with quantity 1
            return {
                items: [...state.items, { ...item, id: Math.random().toString(36).substr(2, 9), quantity: 1 }],
                isOpen: true
            };
        }
    }),
    removeFromCart: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id)
    })),
    updateQuantity: (id, delta) => set((state) => ({
        items: state.items.map((item) =>
            item.id === id
                ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                : item
        )
    })),
    clearCart: () => set({ items: [] }),
    toggleDrawer: (force) => set((state) => ({
        isOpen: force !== undefined ? force : !state.isOpen
    })),
    getCartTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
}));
