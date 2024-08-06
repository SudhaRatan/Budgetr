import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
    user: null,
    setUser: (userInfo: any) => set((state: any) => ({ user: userInfo })),
}))