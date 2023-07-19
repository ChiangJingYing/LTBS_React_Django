import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { ThemeProvider } from "@material-tailwind/react";
import Header from "./Component/Header";
import ManagerLogin from "./Page/ManagerLogin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import PrivateRoute from "./Utils/PrivateRoute";
import ManageDriver from "./Page/Manage_driver";
import ManageUser from "./Page/ManageUser";
// import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // This will render comppnent twice to detect any problem of code
  // <React.StrictMode>
  <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={"/"} exact element={<ManagerLogin />} />
          <Route
            path={"/manage_user"}
            element={<PrivateRoute element={<ManageUser />} />}
          />
          <Route
            path={"/manage_driver"}
            element={<PrivateRoute element={<ManageDriver />} />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>,
  // </React.StrictMode>,
);
