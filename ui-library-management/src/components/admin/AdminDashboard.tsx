import { Divider } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AdminContext } from "../../context/AdminContext";
import { AuthorContext } from "../../context/AuthorContext";
import { BookContext } from "../../context/BookContext";
import { CategoryContext } from "../../context/CategoryContext";
import { PublisherContext } from "../../context/PublisherContext";
import { RentContext } from "../../context/RentContext";

const AdminDashboard = () => {
  const { isAdmin, isLogged, adminInfo, reload, setReload } =
    useContext(AdminContext);
  const { listRent, setListRent } = useContext(RentContext);
  const { listAuthor, setListAuthor } = useContext(AuthorContext);
  const { listCategory, setListCategory } = useContext(CategoryContext);
  const { listPublisher, setListPublisher } = useContext(PublisherContext);
  const { listBook, setListBook } = useContext(BookContext);
  const navigate = useNavigate();

  const [fines, setFines] = useState<number>(0);

  // if (!isAdmin || !isLogged) {
  //   navigate("/AdminLogin");
  //   return <></>;
  // } else {
  return (
    <div className="max-w-[80%] m-auto">
      <h1 className="text-4xl font-semibold">Admin Dashboard</h1>
      <div className="flex mt-12 flex-wrap">
        <div className="card-container">
          <div className="card bg-primary">
            <h2>{listRent.length}</h2>
            <h5>Total Book Issued</h5>
          </div>
        </div>
        <div className="card-container">
          <div className="card bg-warning">
            <h2>{listRent.filter((rent) => rent.endDate != null).length}</h2>
            <h5>Total Book Returned</h5>
          </div>
        </div>
        <div className="card-container">
          <div className="card bg-error">
            <h2>{listRent.filter((rent) => rent.endDate == null).length}</h2>
            <h5>Total Book Not Return</h5>
          </div>
        </div>
        <div className="card-container">
          <div className="card bg-success">
            <h2>{listRent.reduce((total, rent) => total + rent.fines, 0)}</h2>
            <h5>Total Fines Received</h5>
          </div>
        </div>
        <div className="card-container">
          <div className="card bg-success">
            <h2>{listBook.length}</h2>
            <h5>Total Book</h5>
          </div>
        </div>

      </div>
      <Divider></Divider>
      <div className="flex mt-12 flex-wrap">
      <div className="card-container">
          <div className="card bg-error">
            <h2>{listAuthor.length}</h2>
            <h5>Total Author</h5>
          </div>
        </div>
        <div className="card-container">
          <div className="card bg-warning">
            <h2>{listCategory.length}</h2>
            <h5>Total Category</h5>
          </div>
        </div>
        <div className="card-container">
          <div className="card bg-primary">
            <h2>{listPublisher.length}</h2>
            <h5>Total Publisher</h5>
          </div>
        </div>
      </div>
    </div>
  );
  // }
};

export default AdminDashboard;
