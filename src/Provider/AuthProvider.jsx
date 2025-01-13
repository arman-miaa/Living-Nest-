import { createContext, useState } from "react";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
      const [loader, setLoader] = useState(true);
      const [user, setUser] = useState([]);
  const authInfo = {
    name: "Arman Mia",
    age: 23,
  };
  return (
    <div>
          <authContext.Provider value={authInfo}>
              {children}
      </authContext.Provider>
    </div>
  );
};

export default AuthProvider;
