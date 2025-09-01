import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../features/userSlice";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, name, status, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (error && error.includes("401")) {
      dispatch(logout());
      dispatch(clearUser());
      navigate("/login", { replace: true });
    }
  }, [error, dispatch, navigate]);
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUser());
    navigate("/login", { replace: true });
  };
  if (status === "loading") {
    return (
      <div className="mainContainer">
        <div className="loginBackground">
          <span className="colorA" />
          <span className="colorB" />
          <span className="colorC" />
          <span className="colorD" />
        </div>
        <div className="dashboardContainer">
          <p>Loading user info…</p>
        </div>
      </div>
    );
  }
  if (status === "failed" && !error.includes("401")) {
    return (
      <div className="mainContainer">
        <div className="loginBackground">
          <span className="colorA" />
          <span className="colorB" />
          <span className="colorC" />
          <span className="colorD" />
        </div>
        <div className="dashboardContainer">
          <p>Error: {error}</p>
          <button onClick={handleLogout}>Back to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="mainContainer">
      <div className="loginBackground">
        <span className="colorA" />
        <span className="colorB" />
        <span className="colorC" />
        <span className="colorD" />
      </div>
      <div className="dashboardContainer">
        <div className="loginHeader">
          <h1>Welcome, {name}!</h1>
          <p>Your user ID is: {id}</p>
          <div className="loginButton">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
