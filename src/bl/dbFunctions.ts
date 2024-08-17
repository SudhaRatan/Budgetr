import {
  createCategory,
  deleteCategoryDB,
  getCreditCategories as GCC,
  getDebitCategories as GDC,
} from "../db/firestoreDB";
import { useDataStore } from "../stores/dataStore";
import { category } from "../types/dbTypes";
import { returnDataType } from "../types/returnData";

const setCategories = useDataStore.getState().setCategories;
const setDebitCategories = useDataStore.getState().setDebitCategories;

export const getCreditCategories = async (uid: string) => {
  GCC(uid, setCategories);
};

export const getDebitCategories = async(uid: string) => {
  GDC(uid, setDebitCategories)
}

export const addCategory = async (
  category: category,
  uid: string
): Promise<returnDataType> => {
  const result = await createCategory(category, uid);
  return result;
};

export const deleteCategory = async (categoryId: string) => {
  try {
    await deleteCategoryDB(categoryId);
  } catch (error) {
    console.log(error);
  }
};
