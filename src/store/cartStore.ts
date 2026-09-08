import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
};

interface CartState {
  items: CartItem[];
  directItem: CartItem | null; // สำหรับสินค้าที่กด "ซื้อเลย" (ไม่เข้าตะกร้า)
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  setDirectItem: (item: CartItem | null) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  directItem: null,
  setDirectItem: (item) => set({ directItem: item }),
  addItem: (newItem) => {
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
      );
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          ),
        };
      }
      return { items: [...state.items, newItem] };
    });
  },
  removeItem: (id, size, color) => {
    set((state) => ({
      items: state.items.filter((item) => !(item.id === id && item.size === size && item.color === color)),
    }));
  },
  updateQuantity: (id, size, color, quantity) => {
    if (quantity < 1) return;
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id && item.size === size && item.color === color ? { ...item, quantity } : item
      ),
    }));
  },
  clearCart: () => set({ items: [] }),
  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));
