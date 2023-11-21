import React from "react";

function Logout() {
  const handleLogout = () => {
    localStorage.removeItem("uni");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("name");
    window.location.href = "/";
  };
  handleLogout();
  return <></>;
}
export default Logout;
