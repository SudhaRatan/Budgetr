import { Timestamp } from "@react-native-firebase/firestore";

export type category = {
  id?: string;
  uid?: string;
  name: string; // user
  type: "Credit" | "Debit"; // user
  totalAmount: number;
  emoji?: string; // user
  color?: string; // user
  createdOn?: Timestamp;
};
export type transaction = {
  id?: string;
  uid: string;
  categoryFromId: string; // user
  categoryToId: string; // user
  subcategory?: string; // user
  amount: number; // user
  type: "Credit" | "Debit"; // user
  createdOn?: Timestamp;
};
