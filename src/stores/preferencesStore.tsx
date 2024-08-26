import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


type toggleType = "Categories" | "Transactions"

interface preferenceStoreType {
    toggleType: toggleType,
    setToggleType: (val: toggleType) => void
}

export const usePrefereneStore = create<preferenceStoreType>()(persist((set, get) => ({
    toggleType: "Categories",
    setToggleType: (val) => set(() => ({toggleType: val}))
}), {name:"preferenceStore", storage: createJSONStorage(() => AsyncStorage)}))