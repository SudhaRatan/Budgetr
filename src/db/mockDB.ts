import { Timestamp } from "@react-native-firebase/firestore";
import { useAuthStore } from "../stores/authStore";
import { category } from "../types/dbTypes";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

const user = useAuthStore.getState().user

export const getCategoriesDB = (uid: string): Promise<Array<category>> => {
    return new Promise((res, rej) => {
        res([
            { id: '1', name: "Card", totalAmount: 10000, type: "credit", uid: user?.uid ?? 'ratan', createdOn: Timestamp.fromDate(new Date()) },
            { id: '2', name: "Cash", totalAmount: 3000, type: "credit", uid: user?.uid ?? 'ratan', createdOn: Timestamp.fromDate(new Date()) },
            { id: '3', name: "Savings", totalAmount: 8500, type: "credit", uid: user?.uid ?? 'ratan', createdOn: Timestamp.fromDate(new Date()) },
        ])
    })


}