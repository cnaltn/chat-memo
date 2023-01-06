import React, { useContext } from "react";
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

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login"></Navigate>;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
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
