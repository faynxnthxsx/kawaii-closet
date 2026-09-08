import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "./cartStore";

export type Order = {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: "รับคำสั่งซื้อ" | "เตรียมจัดส่ง" | "ระหว่างขนส่ง" | "จัดส่งสำเร็จ";
};

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  clearOrders: () => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      clearOrders: () => set({ orders: [] }),
      updateOrderStatus: (id, status) => set((state) => ({
        orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o))
      })),
    }),
    {
      name: "kawaii-orders-storage", // เก็บประวัติลงเครื่องลูกค้า
    }
  )
);
