import firebase from "firebase";

const firebaseConfig = {
    apiKey: "#######################",
    authDomain: "netflix-clone-#######.firebaseapp.com",
    projectId: "netflix-clone-######",
    storageBucket: "netflix-clone-#######.appspot.com",
    messagingSenderId: "909015798046",
    appId: "1:#########:web:dcea8632b531397a0e790f"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { auth };
  export default db;
