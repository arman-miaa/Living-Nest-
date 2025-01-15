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
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const authContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState(null); 

  console.log(user);
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoader(true); 
    return createUserWithEmailAndPassword(auth, email, password)
      
    
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

      if (currentUser) {
        const userInfo = { email: currentUser?.email };
        axiosPublic.post('/jwt', userInfo)
          .then(res => {
            console.log(res);
            if (res.data.token) {
              localStorage.setItem('access-token', res.data.token);
              setLoader(false)
            }
          })
          .catch(error => {
          console.log('ERROR on token', error);
        })
      }
      else {
        localStorage.removeItem('access-token')
        setLoader(false); 
      }

    });

    return unsubscribe; 
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
