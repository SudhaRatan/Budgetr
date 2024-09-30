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
): Promise<category[]> => {
  return new Promise((resolve, reject) => {
    _firestore
      .collection("categories")
      .where(
        Filter.and(Filter("uid", "==", uid), Filter("type", "==", "Debit"))
      )
      .orderBy("createdOn", "desc")
      .onSnapshot(
        (querySnapShot) => {
          setDebitCategories(
            querySnapShot.docs.map((i) => ({ id: i.id, ...i.data() }))
          );
          resolve(
            querySnapShot.docs.map((i) => ({
              id: i.id,
              ...i.data(),
            })) as category[]
          );
        },
        (error) => {
          console.error(error);
          reject(false);
        }
      );
  });
};

interface transactionParamTypes {
  uid: string;
  setTransactions: (transactions: any) => void;
  startDate: Date;
  endDate: Date;
  debitCategories: category[];
}

export const getTransactions = ({
  uid,
  setTransactions,
  startDate,
  endDate,
  debitCategories,
}: transactionParamTypes) => {
  _firestore
    .collection("transactions")
    .where(
      Filter.and(
        Filter("uid", "==", uid),
        Filter("createdOn", ">=", Timestamp.fromDate(startDate ?? new Date())),
        Filter("createdOn", "<=", Timestamp.fromDate(endDate ?? new Date()))
      )
    )
    .orderBy("createdOn", "desc")
    .onSnapshot(
      (querySnapshot) => {
        const transactions = querySnapshot.docs.map((i) => ({
          id: i.id,
          ...i.data(),
          categoryDetails: debitCategories?.find(
            (j) => j.id === i.data().categoryToId
          )!,
        })) as transaction[];
        setTransactions(transactions);
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

export const deleteTransaction = (transaction: transaction) => {
  try {
    if (transaction.id) {
      _firestore.collection("transactions").doc(transaction.id).delete();
      _firestore
        .collection("categories")
        .doc(transaction.categoryFromId)
        .update({
          totalAmount: firebase.firestore.FieldValue.increment(
            transaction.amount
          ),
        });
      _firestore
        .collection("categories")
        .doc(transaction.categoryToId)
        .update({
          totalAmount: firebase.firestore.FieldValue.increment(
            -transaction.amount
          ),
        });
    }
  } catch (error) {
    console.error(error);
  }
};

export const resetData = async (uid: string) => {
  try {
    const res = await _firestore
      .collection("categories")
      .where("uid", "==", uid)
      .get();

    const res2 = await _firestore
      .collection("transactions")
      .where("uid", "==", uid)
      .get();

    const batch = _firestore.batch();

    res.forEach((element) => {
      batch.delete(element.ref);
    });
    res2.forEach((element) => {
      batch.delete(element.ref);
    });

    return batch.commit();
  } catch (error) {}
};
