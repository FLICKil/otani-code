import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { UserContext } from "../../context/UserContext";
import AdminBar from "../admin/AdminBar";
import UserBar from "../user/UserBar";
import HomeBar from "./HomeBar";

const Header = () => {
  const { isLogged, isAdmin } = useContext(AdminContext);
  const { isLogged: isULogged } = useContext(UserContext);
  const [log, setLog] = useState<boolean>(false);
  const [admin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.length == 0) {
      setLog(false);
      setAdmin(false);
    } else {
      if (localStorage.getItem("isAdmin")) {
        setAdmin(JSON.parse(localStorage.getItem("isAdmin") as string));
      }
      if (localStorage.getItem("isLogged")) {
        setLog(JSON.parse(localStorage.getItem("isLogged") as string));
      }
    }
  });

  return (
    <header className="flex p-6 border-b border-[#DEE2E6]">
      <div className="w-[80%] m-auto flex flex-col">
        {/* {top} */}
        <div className="flex justify-start text-3xl mb-4">
          {!log && !admin ? (
            <a href="../">Library System Manager</a>
          ) : log && admin ? (
            <Link to="/AdminDashboard">Library System Manager</Link>
          ) : log && !admin ? (
            <Link to="/Dashboard">Library System Manager</Link>
          ) : (
            <></>
          )}
        </div>
        {/* {down} */}
        <div className="flex justify-end flex-wrap">
          {!log && !admin ? (
            <HomeBar />
          ) : log && admin ? (
            <AdminBar />
          ) : log && !admin ? (
            <UserBar />
          ) : (
            <></>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
