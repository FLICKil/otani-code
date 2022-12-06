import { redirect, Route, Routes } from "react-router-dom";
import AdminBook from "./components/admin/AdminBook";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLogin from "./components/admin/AdminLogin";
import Author from "./components/admin/Author";
import Category from "./components/admin/Category";
import Publisher from "./components/admin/Publisher";
import Error404 from "./components/common/Error404";
import Dashboard from "./components/user/Dashboard";
import Home from "./components/user/Home";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import AdminIssued from "./components/admin/AdminIssued";
import AdminUser from "./components/admin/AdminUser";
import AdminProfile from "./components/admin/AdminProfile";
import Setting from "./components/admin/Setting";
import IssueDetails from "./components/admin/IssueDetails";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "./context/AdminContext";
import { UserContext } from "./context/UserContext";
import ShowBook from "./components/user/ShowBook";
import BookDetails from "./components/user/BookDetails";
import Profile from "./components/user/Profile";

export default function Root() {
  const { isLogged, isAdmin } = useContext(AdminContext);
  const { isLogged: isULogged } = useContext(UserContext);
  const [log, setLog] = useState<boolean>(false);
  const [admin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (isAdmin || isLogged || isULogged) {
      setLog(true);
      setAdmin(true);
      return;
    } else if (localStorage.length == 0) {
      setLog(false);
      setAdmin(false);
      return;
    } else {
      if (localStorage.getItem("isAdmin")) {
        setAdmin(JSON.parse(localStorage.getItem("isAdmin") as string));
      }
      if (localStorage.getItem("isLogged")) {
        setLog(JSON.parse(localStorage.getItem("isLogged") as string));
      }
      return;
    }
  });

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/AdminLogin" element={<AdminLogin />}></Route>
      <Route
        path="/AdminDashboard"
        element={log && admin ? <AdminDashboard /> : <AdminLogin />}
      ></Route>
      <Route path="/404" element={<Error404 />}></Route>
      <Route path="/Login" element={<Login />}></Route>
      <Route path="/Dashboard" element={<Dashboard />}></Route>
      <Route path="/Register" element={<Register />}></Route>
      <Route
        path="/Category"
        element={log && admin ? <Category /> : <AdminLogin />}
      ></Route>
      <Route
        path="/Author"
        element={log && admin ? <Author /> : <AdminLogin />}
      ></Route>
      <Route
        path="/Publisher"
        element={log && admin ? <Publisher /> : <AdminLogin />}
      ></Route>
      <Route
        path="/AdminBook"
        element={log && admin ? <AdminBook /> : <AdminLogin />}
      ></Route>
      <Route
        path="/AdminIssue"
        element={log && admin ? <AdminIssued /> : <AdminLogin />}
      ></Route>
      <Route
        path="/AdminUser"
        element={log && admin ? <AdminUser /> : <AdminLogin />}
      ></Route>
      <Route
        path="/AdminProfile"
        element={log && admin ? <AdminProfile /> : <AdminLogin />}
      ></Route>
      <Route
        path="/Setting"
        element={log && admin ? <Setting /> : <AdminLogin />}
      ></Route>
      <Route
        path="/IssueDetails"
        element={log && admin ? <IssueDetails /> : <AdminLogin />}
      ></Route>
      <Route path="/ShowBook" element={log ? <ShowBook /> : <Login />} />
      <Route path="/BookDetails/:bookId" element={<BookDetails />}></Route>
      <Route
        path="/profile/:id"
        element={log ? <Profile /> : <Login />}
      ></Route>
    </Routes>
  );
}
