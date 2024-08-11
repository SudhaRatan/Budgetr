import { Timestamp } from "@react-native-firebase/firestore";

export type category = {
  id?: string;
  uid?: string;
  name: string; // user
  type: "credit" | "debit"; // user
  totalAmount: number;
  emoji?: string; // user
  color?: string; // user
  createdOn?: Timestamp;
};
export type transaction = {
  id?: string;
  uid: string;
  categoryId: string; // user
  subcategory: string; // user
  amount: number; // user
  createdOn: Timestamp;
};
