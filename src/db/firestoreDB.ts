import firestore from "@react-native-firebase/firestore";

const _firestore = firestore();
export const getCategories = (
  uid: string,
  setCategories: (categories: any) => void
) => {
  _firestore
    .collection("categories")
    .where("uid", "==", uid)
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
