
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, getAuth, signOut} from "firebase/auth/cordova";
import {addDoc,collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBsq6puhnQYrpbG_NMRv7rY1tLysy36JcM",
  authDomain: "netflix-colne2-9d551.firebaseapp.com",
  projectId: "netflix-colne2-9d551",
  storageBucket: "netflix-colne2-9d551.appspot.com",
  messagingSenderId: "870411189998",
  appId: "1:870411189998:web:78d98d4c626c5ccc10bdff"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db  =  getFirestore(app);



const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {

        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};

