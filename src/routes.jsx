import { useSelector } from "react-redux";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Loading from "./components/Loading";

const ProtectedRoute = () => {
  const { token, isInitializing } = useSelector((state) => state.auth);
  if (isInitializing) {
    return <Loading />;
  }
  if (token) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};

function AppRoutes() {
  const { token, isInitializing } = useSelector((state) => state.auth);
  if (isInitializing) {
    return <Loading />;
  }
  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/login"
        element={token ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route
        path="*"
        element={
          token ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default AppRoutes;
