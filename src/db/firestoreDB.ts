import firestore, {
  Filter,
  firebase,
  Timestamp,
} from "@react-native-firebase/firestore";
import { category, transaction } from "../types/dbTypes";
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

interface transactionParamTypes {
  uid: string;
  setTransactions: (transactions: any) => void;
}

export const getTransactions = ({
  uid,
  setTransactions,
}: transactionParamTypes) => {
  _firestore
    .collection("transactions")
    .where("uid", "==", uid)
    .orderBy("createdOn", "desc")
    .onSnapshot(
      (querySnapshot) => {
        setTransactions(
          querySnapshot.docs.map((i) => ({ id: i.id, ...i.data() }))
        );
      },
      (error) => {
        console.error(error);
      }
    );
};

export const createCategory = async (category: category, uid: string) => {
  try {
    if (category.totalAmount === undefined) category.totalAmount = 0;
    if (category.id) {
      _firestore.collection("categories").doc(category.id).update(category);
    } else {
      _firestore.collection("categories").add({
        ...category,
        uid,
        createdOn: Timestamp.fromDate(new Date()),
      });
    }
  } catch (error) {
    console.log("Create category ->", error);
  }
};

export const deleteCategoryDB = (categoryId: string) => {
  try {
    _firestore.collection("categories").doc(categoryId).delete();
  } catch (error) {
    console.log(error);
  }
};

export const createTransaction = (uid: string, transaction: transaction) => {
  try {
    if (transaction.amount === undefined) return;
    if (transaction.id) {
      _firestore
        .collection("transactions")
        .doc(transaction.id)
        .update(transaction);
    } else {
      if (transaction.createdOn === undefined)
        transaction.createdOn = Timestamp.fromDate(new Date());
      _firestore.collection("transactions").add({
        ...transaction,
        uid,
      });
    }
    _firestore
      .collection("categories")
      .doc(transaction.categoryFromId)
      .update({
        totalAmount: firebase.firestore.FieldValue.increment(
          -transaction.amount
        ),
      });
    _firestore
      .collection("categories")
      .doc(transaction.categoryToId)
      .update({
        totalAmount: firebase.firestore.FieldValue.increment(
          transaction.amount
        ),
      });
  } catch (error) {}
};
