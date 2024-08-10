import AsyncStorage from "@react-native-async-storage/async-storage";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"

export interface authType {
    user: FirebaseAuthTypes.User | null;
    setUser: (user: FirebaseAuthTypes.User | null) => void
}

export const useAuthStore = create<authType>()(persist((set, get) => ({
    user: null,
    setUser: (userInfo) => set(() => ({ user: userInfo })),
}), { name: "AuthStorage", storage: createJSONStorage(() => AsyncStorage) }))