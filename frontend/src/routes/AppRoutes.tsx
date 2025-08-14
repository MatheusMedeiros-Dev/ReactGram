import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../hooks/useAuth";
import EditProfile from "../pages/EditProfile";
import PhotoDashboard from "../pages/PhotoDashboard";
import PhotoViewer from "../pages/PhotoViewer";
import EditPhoto from "../pages/EditPhoto";
import Search from "../pages/Search";
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
          <Route
            path="/profile"
            element={auth ? <EditProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/users/:id"
            element={auth ? <PhotoDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/photos/:photoId"
            element={auth ? <PhotoViewer /> : <Navigate to="/login" />}
          />
          <Route
            path="/search"
            element={auth ? <Search /> : <Navigate to="/login" />}
          />
          <Route
            path="/photo/edit/:photoId"
            element={auth ? <EditPhoto /> : <Navigate to="/login" />}
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default AppRoutes;
