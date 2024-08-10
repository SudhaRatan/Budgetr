import { Timestamp } from "@react-native-firebase/firestore";

export type category = {
    id?: string;
    uid: string;
    name: string;
    type: "credit" | "debit";
    totalAmount: number;
    createdOn: Timestamp
}
export type transaction = {
    id?: string;
    uid: string;
    categoryId: string;
    subcategory: string;
    amount: number;
    createdOn: Timestamp;
}