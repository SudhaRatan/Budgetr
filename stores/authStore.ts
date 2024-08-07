import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { create } from "zustand";

interface authType {
    user: FirebaseAuthTypes.User | null;
    setUser: (user : FirebaseAuthTypes.User | null) => void
}

export const useAuthStore = create<authType>()((set, get) => ({
    user: null,
    setUser: (userInfo) => set((state: any) => ({ user: userInfo })),
}))