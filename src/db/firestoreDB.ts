import firestore, { Filter, Timestamp } from "@react-native-firebase/firestore";
import { category } from "../types/dbTypes";
import { returnDataType } from "../types/returnData";

const _firestore = firestore();

export const getCreditCategories = (
  uid: string,
  setCategories: (categories: any) => void
) => {
  _firestore
    .collection("categories")
    .where(Filter.and(Filter("uid", "==", uid), Filter("type", "==", "Credit")))
    .orderBy("createdOn", "desc")
    .onSnapshot(
      (querySnapShot) => {
        setCategories(
          querySnapShot.docs.map((i) => ({ id: i.id, ...i.data() }))
        );
      },
      (error) => {
        console.error(error);
      }
    );
};

export const getDebitCategories = (
  uid: string,
  setDebitCategories: (categories: any) => void
) => {
  _firestore
    .collection("categories")
    .where(Filter.and(Filter("uid", "==", uid), Filter("type", "==", "Debit")))
    .orderBy("createdOn", "desc")
    .onSnapshot(
      (querySnapShot) => {
        setDebitCategories(
          querySnapShot.docs.map((i) => ({ id: i.id, ...i.data() }))
        );
      },
      (error) => {
        console.error(error);
      }
    );
};

export const createCategory = async (
  category: category,
  uid: string
): Promise<returnDataType> => {
  try {
    if (category.totalAmount === undefined) category.totalAmount = 0;
    if (category.id) {
      await _firestore
        .collection("categories")
        .doc(category.id)
        .update(category);
    } else {
      await _firestore.collection("categories").add({
        ...category,
        uid,
        createdOn: Timestamp.fromDate(new Date()),
      });
    }

    const success: returnDataType = {
      status: true,
      message: "added category successfully",
    };
    return success;
  } catch (error) {
    const err: returnDataType = { status: false, message: error };
    return err;
  }
};

export const deleteCategoryDB = async (categoryId: string) => {
  try {
    await _firestore.collection("categories").doc(categoryId).delete();
  } catch (error) {
    console.log(error);
  }
};
