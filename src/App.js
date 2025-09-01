import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./features/userSlice";
import { logout, setInitializing } from "./features/authSlice";
import AppRoutes from "./routes";
import "./App.css";

export default function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          await dispatch(fetchUser()).unwrap();
        } catch (error) {
          dispatch(logout());
        }
      }
      dispatch(setInitializing(false));
    };
    validateToken();
  }, [dispatch, token]);

  return <AppRoutes />;
}
