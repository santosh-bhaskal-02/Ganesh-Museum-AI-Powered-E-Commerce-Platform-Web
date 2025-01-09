import React, { createContext, useState ,useEffect} from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [signIn, setSignIn] = useState(null);

  useEffect(() => {
      const setSignInContext = () => {
        const userIdCookie = Cookies.get("userId");
        const authTokenCookie = Cookies.get("authToken");
  
        //console.log(userId);
  
        if (!userIdCookie || !authTokenCookie) {
          console.error("User is not authenticated. Missing token or userId.");
         // alert("Something went wrong. Please try again.");
          return setSignIn(false);
        }
        //console.log(bool);
        return setSignIn(true);
      };
  
      setSignInContext();
    });

  return (
    <AuthContext.Provider value={{ signIn, setSignIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };

// Prefixed aliases for use in the merged root App.jsx
const UserAuthContext = AuthContext;
const UserAuthProvider = AuthProvider;
export { UserAuthContext, UserAuthProvider };
