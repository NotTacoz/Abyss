import React from "react";
import firebase from "firebase";

export const UserGetData = () => {
  const [documents, setDocuments] = React.useState([]);
  const db = firebase.firestore();
  React.useEffect(() => {
    db.collection("users")
      .orderBy("time")
      .onSnapshot((querySnapshot) => {
        let arr = [];
        querySnapshot.docs.map((doc) =>
          arr.push({ id: doc.id, value: doc.data() })
        );
        setDocuments(arr);
      });
  }, [db]);
  return [documents];
};
