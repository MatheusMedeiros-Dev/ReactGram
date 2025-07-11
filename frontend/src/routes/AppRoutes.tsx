import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../hooks/useAuth";
import EditProfile from "../pages/EditProfile";
import Profile from "../pages/Profile";
const AppRoutes = () => {
  const { auth } = useAuth();
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route
            path="/"
            element={auth ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={auth ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={auth ? <Navigate to="/" /> : <Register />}
          />
          <Route path="/profile" element={<EditProfile />} />
          <Route
            path="/users/:id"
            element={auth ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default AppRoutes;
