import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import Loading from "../pages/Loading";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const authContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState(null); // Default state should be `null`

  console.log(user);

  const createUser = (email, password) => {
    setLoader(true); // Show loader while creating user
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoader(false); // Hide loader once auth state is determined
    });

    return unsubscribe; // Properly clean up the listener
  }, []);

  const updateUserProfile = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  const logOutUser = () => {
    return signOut(auth);
  }

  const authInfo = {
    user,
    setUser,
    loader,
    setLoader,
    createUser,
    signInUser,
    signInWithGoogle,
    updateUserProfile,
    logOutUser,
  };

  return (
    <>
      {loader ? (
        <Loading />
      ) : (
        <authContext.Provider value={authInfo}>{children}</authContext.Provider>
      )}
    </>
  );
};

export default AuthProvider;
