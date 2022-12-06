import React from "react";
import { Link } from "react-router-dom";

const HomeBar = () => {
  return (
    <div className="flex justify-end flex-wrap">
      <div className="mx-3 mb-2">
        <a href="../">Home</a>
      </div>
      <div className="mx-3 mb-2">
        <Link to="/Login">Login</Link>
      </div>
      <div className="mx-3 mb-2">
        <Link to="/Register">Register</Link>
      </div>
      <div className="mx-3 mb-2">
        <Link to="../AdminLogin">Admin Login</Link>
      </div>
    </div>
  );
};

export default HomeBar;
