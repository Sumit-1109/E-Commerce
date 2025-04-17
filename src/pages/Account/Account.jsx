import React from "react";
import "./Account.scss";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Account() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="account-wrapper">
      <h2 className="account-title">My Account</h2>

      <div className="info-box">
        <p className="info-label">Name</p>
        <p className="info-value">{user?.name || "N/A"}</p>
      </div>

      <div className="info-box">
        <p className="info-label">Email</p>
        <p className="info-value">{user?.email}</p>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Account;