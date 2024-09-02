import {
  createCategory,
  createTransaction,
  deleteCategoryDB,
  getCreditCategories as GCC,
  getDebitCategories as GDC,
  getTransactions as GT,
} from "../db/firestoreDB";
import { useDataStore } from "../stores/dataStore";
import { category, transaction } from "../types/dbTypes";
import { returnDataType } from "../types/returnData";

const setCategories = useDataStore.getState().setCategories;
const setDebitCategories = useDataStore.getState().setDebitCategories;
const setTransactions = useDataStore.getState().setTransactions;

export const getCreditCategories = (uid: string) => {
  GCC(uid, setCategories);
};

export const getDebitCategories = async (uid: string) => {
  return await GDC(uid, setDebitCategories);
};

export const getTransactions = (
  uid: string,
  startDate: Date,
  endDate: Date,
  debitCategories: category[]
) => {
  GT({
    uid,
    setTransactions,
    startDate,
    endDate,
    debitCategories,
  });
};

export const addCategory = (category: category, uid: string) => {
  createCategory(category, uid);
};

export const addTransaction = (transaction: transaction, uid: string) => {
  createTransaction(uid, transaction);
};

export const deleteCategory = (categoryId: string) => {
  try {
    deleteCategoryDB(categoryId);
  } catch (error) {
    console.log(error);
  }
};
