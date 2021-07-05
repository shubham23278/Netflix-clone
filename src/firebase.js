import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBvIh-SFdNW58oeAs83M0If9dok57lWB2w",
    authDomain: "netflix-clone-24298.firebaseapp.com",
    projectId: "netflix-clone-24298",
    storageBucket: "netflix-clone-24298.appspot.com",
    messagingSenderId: "909015798046",
    appId: "1:909015798046:web:dcea8632b531397a0e790f"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { auth };
  export default db;