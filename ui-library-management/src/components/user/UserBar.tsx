import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const UserBar = () => {
  const { setUserInfo, setIsLogged } = useContext(UserContext);
  return (
    <div className="flex justify-end">
      <div className="mx-3 mb-2">
        <Link to="/ShowBook">Search Book</Link>
      </div>
      <div className="mx-3 mb-2">
        <Link to="/Dashboard">Issue Book</Link>
      </div>
      <div className="mx-3 mb-2 dropdown">
        <button className="dropbtn">
          User
        </button>
        <div className="dropdown-content">
          <Link to={`/profile/${JSON.parse(localStorage.getItem("userInfo") as string)?.id}`}>Profile</Link>
          <a
            href="/Login"
            onClick={() => {
              localStorage.clear(), setIsLogged(false), setUserInfo(null);
            }}
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserBar;
