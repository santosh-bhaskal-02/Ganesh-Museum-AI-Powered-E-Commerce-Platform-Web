import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [signIn, setSignIn] = useState(null);

  useEffect(() => {
    const adminIdCookie = Cookies.get("adminId");
    const adminAuthTokenCookie = Cookies.get("adminAuthToken");

    if (!adminIdCookie || !adminAuthTokenCookie) {
      setSignIn(false);
      return;
    }

    setSignIn(true);
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, setSignIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };

// Prefixed aliases for use in the merged root App.jsx
const AdminAuthContext = AuthContext;
const AdminAuthProvider = AuthProvider;
export { AdminAuthContext, AdminAuthProvider };
