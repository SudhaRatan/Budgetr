import {
  createCategory,
  deleteCategoryDB,
  getCategories as GC,
} from "../db/firestoreDB";
import { useDataStore } from "../stores/dataStore";
import { category } from "../types/dbTypes";
import { returnDataType } from "../types/returnData";

const setCategories = useDataStore.getState().setCategories;

export const getCategories = async (uid: string) => {
  GC(uid, setCategories);
};

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
