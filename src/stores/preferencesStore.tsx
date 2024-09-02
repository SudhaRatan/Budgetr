import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";

type toggleType = "Categories" | "Transactions";
type themeType = "light-content" | "dark-content" | "default";

interface preferenceStoreType {
  toggleType: toggleType;
  setToggleType: (val: toggleType) => void;
  theme: string;
  setTheme: (theme: string) => void;
  dateRangeMode: "week" | "month";
  setDateRangeMode: (mode: "week" | "month") => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  getDateRange: () => { start: Date; end: Date };
}

export const usePreferenceStore = create<preferenceStoreType>()(
  persist(
    (set, get) => ({
      toggleType: "Categories",
      setToggleType: (val) => set(() => ({ toggleType: val })),
      theme: "system",
      setTheme: (theme) => set({ theme }),
      dateRangeMode: "week",
      setDateRangeMode: (mode) => set({ dateRangeMode: mode }),
      currentDate: new Date(),
      setCurrentDate: (date) => set({ currentDate: date }),
      getDateRange: () => {
        const { dateRangeMode, currentDate } = get();
        if (dateRangeMode === "week") {
          return {
            start: startOfWeek(currentDate),
            end: endOfWeek(currentDate),
          };
        } else {
          return {
            start: startOfMonth(currentDate),
            end: endOfMonth(currentDate),
          };
        }
      },
    }),
    { name: "preferenceStore", storage: createJSONStorage(() => AsyncStorage) }
  )
);
