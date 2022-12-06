import React, { useContext } from "react";
import { set } from "react-hook-form";
import { Link } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

const HomeBar = () => {
  const { isAdmin, isLogged, setIsAdmin, setIsLogged, setAdminInfo } =
    useContext(AdminContext);
  return (
    <div className="flex justify-end flex-wrap">
      <div className="mx-3 mb-2">
        <Link to="/Author">Author</Link>
      </div>
      <div className="mx-3 mb-2">
        <Link to="/Category">Category</Link>
      </div>
      <div className="mx-3 mb-2">
        <Link to="/Publisher">Publisher</Link>
      </div>
      <div className="mx-3 mb-2">
        <Link to="/AdminBook">Book</Link>
      </div>
      <div className="mx-3 mb-2">
        <Link to="/AdminUser">User</Link>
      </div>
      <div className="mx-3 mb-2">
        <Link to="/AdminIssue">Issue Book</Link>
      </div>
      <div className="mx-3 mb-2 dropdown">
        <button className="dropbtn">Admin </button>
        <div className="dropdown-content">
          {/* <Link to="/AdminProfile">Profile</Link> */}
          <Link to="/Setting">Setting</Link>
          <a
            href="/AdminLogin"
            onClick={() => {
              localStorage.clear(), setIsAdmin(false);
              setIsLogged(false), setAdminInfo(null);
            }}
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomeBar;
