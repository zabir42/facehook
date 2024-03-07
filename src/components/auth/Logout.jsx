import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutLogo from "../../assets/icons/logout.svg";
import { useAuth } from "../../hooks";

const Logout = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth()

  const handleLogout = () => {
    navigate("/login");
    setAuth({});
  };
  return (
    <button className="icon-btn">
      <img src={LogoutLogo} alt="Logout" onClick={handleLogout} />
    </button>
  );
};

export default Logout;
