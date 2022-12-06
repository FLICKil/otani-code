import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import api from "../../api";
import { BookContext } from "../../context/BookContext";
import { RentContext } from "../../context/RentContext";
import NotiStack from "../common/NotiStack";

const BookDetails = () => {
  const { listBook, reload:bookReload, setReload:setBookReload } = useContext(BookContext);
  const {reload:rentReload, setReload:setRentReload} = useContext(RentContext);
  const { bookId } = useParams();
  const book = listBook.find((book) => book.id == bookId);
  const isLogged = JSON.parse(localStorage.getItem("isLogged") as string);
  const user = JSON.parse(localStorage.getItem("userInfo") as string);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [openNoti, setOpenNoti] = useState<boolean>(false);
  // const bookOption: IOption[] = [
  //   { id: book?.id, label: book?.title as string },
  // ];
  // const userOption: IOption[] = [{ id: user?.id, label: user?.name as string }];

  const handleAdd = () => {
    api
      .post(`rent`, {
        book: { id: book?.id, title: book?.title },
        user: { id: user.id, name: user.name },
        createdBy: JSON.parse(localStorage.getItem("userInfo") as string)?.id,
      })
      .then((res) => {
        handleClose("Success: Book has been issued successfully");
      })
      .catch((err) => {
        handleClose("Error: " + err.response.data.msg);
      });
  };

  const handleClose = (newValue?: string) => {
    if (newValue) {
      setValue(newValue);
      setOpenNoti(true);
      setBookReload(!bookReload);
      setRentReload(!rentReload);
    }
  };

  const handleCloseNoti = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenNoti(false);
  };

  return (
    <div className="max-w-[80%] m-auto">
      <TableContainer sx={{ marginTop: "1.5rem" }}>
        <h2 className="text-3xl mb-2 font-medium">Book Details</h2>
        <Table>
          <TableBody sx={{ border: "solid 1px rgba(224, 224, 224, 1)" }}>
            <TableRow>
              <TableCell
                sx={{
                  borderRight: "solid 1px rgba(224, 224, 224, 1)",
                  fontWeight: "600",
                }}
              >
                Book Title
              </TableCell>
              <TableCell>{book?.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  borderRight: "solid 1px rgba(224, 224, 224, 1)",
                  fontWeight: "600",
                }}
              >
                Author
              </TableCell>
              <TableCell>{book?.author.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  borderRight: "solid 1px rgba(224, 224, 224, 1)",
                  fontWeight: "600",
                }}
              >
                Category
              </TableCell>
              <TableCell>{book?.category.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  borderRight: "solid 1px rgba(224, 224, 224, 1)",
                  fontWeight: "600",
                }}
              >
                Publisher
              </TableCell>
              <TableCell>{book?.publisher.name}</TableCell>
            </TableRow>
            {book?.coverImg ? (
              <TableRow>
                <TableCell
                  sx={{
                    borderRight: "solid 1px rgba(224, 224, 224, 1)",
                    fontWeight: "600",
                  }}
                >
                  Book Cover
                </TableCell>
                <TableCell>
                  <div>
                    <img
                      className="w-200"
                      src={`data:image/png;base64,` + book?.coverImg}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="mt-6">
        {!isLogged ? (
          <p>
            {"Do you want to issue this book? Please "}
            <Link
              to={"/Login"}
              className="text-[#007bff] font-medium hover:underline"
            >
              {"log in"}
            </Link>
          </p>
        ) : (
          <div>
            {" "}
            <Button variant="contained" onClick={handleAdd}>
              Issue book
            </Button>
          </div>
        )}
      </div>
      <NotiStack
        open={openNoti}
        value={value}
        onClose={handleCloseNoti}
      ></NotiStack>
    </div>
  );
};

export default BookDetails;
