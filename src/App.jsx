import React, { useContext, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Password from "./pages/Password";

const App = () => {
  const { currentUser } = useContext(AuthContext);


  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/">
          <Route
            index
            element={currentUser ? <Home></Home> : <Login></Login>}
          ></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register></Register>}></Route>
          <Route path="password" element={<Password></Password>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
