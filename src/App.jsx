import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminApp from "./admin/AdminApp.jsx";
import UserApp from "./user/UserApp.jsx";
import { AdminAuthProvider } from "./admin/components/Context/AuthContext.jsx";
import { AdminIdolProvider } from "./admin/components/Context/IdolContext.jsx";
import { UserAuthProvider } from "./user/components/ContextApi/AuthContext.jsx";
import { UserIdolProvider } from "./user/components/ContextApi/IdolContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin section — all routes under /admin/* */}
        <Route
          path="/admin/*"
          element={
            <AdminAuthProvider>
              <AdminIdolProvider>
                <AdminApp />
              </AdminIdolProvider>
            </AdminAuthProvider>
          }
        />

        {/* User section — all other routes */}
        <Route
          path="/*"
          element={
            <UserAuthProvider>
              <UserIdolProvider>
                <UserApp />
              </UserIdolProvider>
            </UserAuthProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
