import {
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  FormGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import api from "../../api";
import { BookContext } from "../../context/BookContext";
import { RentContext } from "../../context/RentContext";
import { UserContext } from "../../context/UserContext";
import NotiStack from "../common/NotiStack";

const IssueDetails = () => {
  const navigate = useNavigate();
  const {reload, setReload ,rentInfo } = useContext(RentContext);
  const { listBook } = useContext(BookContext);
  const { listUser } = useContext(UserContext);
  const [checked, setChecked] = React.useState<boolean>(false);
  const [openNoti, setOpenNoti] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const handleCloseNoti = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenNoti(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const handleSubmit = () => {
    if (!checked) {
      setValue("Error: You need to confirm you have received the book.");
      setOpenNoti(true);
      return;
    }

    api.patch(`/rent/${rentInfo.id}`, { ...rentInfo }).then((response) => {
      setValue(`Success: You have return the book.`);
      setOpenNoti(true);
      setTimeout(() => {
        setReload(!reload);
        navigate("/AdminIssue");
      }, 3000);
    }).catch((error) => {
        setValue(`Error: ` + error.response.data.msg);
        return;
    });
  };

  if (!rentInfo) {
    navigate("/AdminIssue");
    return <></>;
  } else
    return (
      <div className="max-w-[80%] m-auto">
        <h1 className="text-[2.5rem] font-medium">Issued Book Details</h1>
        <Divider></Divider>
        <TableContainer sx={{ marginTop: "1.5rem" }}>
          <h2 className="text-3xl mb-2 font-medium">Book Details</h2>
          <Table>
            <TableBody sx={{ border: "solid 1px rgba(224, 224, 224, 1)" }}>
              <TableRow>
                <TableCell
                  width="30%"
                  sx={{
                    borderRight: "solid 1px rgba(224, 224, 224, 1)",
                    fontWeight: "600",
                  }}
                >
                  Book ID
                </TableCell>
                <TableCell>
                  {listBook.find((book) => book.id == rentInfo.book.id)?.id}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    borderRight: "solid 1px rgba(224, 224, 224, 1)",
                    fontWeight: "600",
                  }}
                >
                  Book Title
                </TableCell>
                <TableCell>
                  {listBook.find((book) => book.id == rentInfo.book.id)?.title}
                </TableCell>
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
                <TableCell>
                  {
                    listBook.find((book) => book.id == rentInfo.book.id)?.author
                      .name
                  }
                </TableCell>
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
                <TableCell>
                  {
                    listBook.find((book) => book.id == rentInfo.book.id)
                      ?.category.name
                  }
                </TableCell>
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
                <TableCell>
                  {
                    listBook.find((book) => book.id == rentInfo.book.id)
                      ?.publisher.name
                  }
                </TableCell>
              </TableRow>
              {listBook.find((book) => book.id == rentInfo.book.id)
                ?.coverImg ? (
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
                        src={
                          `data:image/png;base64,` +
                          listBook.find((book) => book.id == rentInfo.book.id)
                            ?.coverImg
                        }
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

        <TableContainer sx={{ marginTop: "1.5rem" }}>
          <h2 className="text-3xl mb-2 font-medium">User Details</h2>
          <Table>
            <TableBody sx={{ border: "solid 1px rgba(224, 224, 224, 1)" }}>
              <TableRow>
                <TableCell
                  width="30%"
                  sx={{
                    borderRight: "solid 1px rgba(224, 224, 224, 1)",
                    fontWeight: "600",
                  }}
                >
                  User ID
                </TableCell>
                <TableCell>
                  {listUser.find((user) => user.id == rentInfo.user.id)?.id}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    borderRight: "solid 1px rgba(224, 224, 224, 1)",
                    fontWeight: "600",
                  }}
                >
                  User Name
                </TableCell>
                <TableCell>
                  {listUser.find((user) => user.id == rentInfo.user.id)?.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    borderRight: "solid 1px rgba(224, 224, 224, 1)",
                    fontWeight: "600",
                  }}
                >
                  User Email
                </TableCell>
                <TableCell>
                  {listUser.find((user) => user.id == rentInfo.user.id)?.email}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer sx={{ marginTop: "1.5rem" }}>
          <h2 className="text-3xl mb-2 font-medium">Issue Book Details</h2>
          <Table>
            <TableBody sx={{ border: "solid 1px rgba(224, 224, 224, 1)" }}>
              <TableRow>
                <TableCell
                  width="30%"
                  sx={{
                    borderRight: "solid 1px rgba(224, 224, 224, 1)",
                    fontWeight: "600",
                  }}
                >
                  Book Issue Date
                </TableCell>
                <TableCell>
                  <>{rentInfo.startDate}</>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    borderRight: "solid 1px rgba(224, 224, 224, 1)",
                    fontWeight: "600",
                  }}
                >
                  Book Return Date
                </TableCell>
                <TableCell>
                  <>{rentInfo.endDate}</>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    borderRight: "solid 1px rgba(224, 224, 224, 1)",
                    fontWeight: "600",
                  }}
                >
                  Book Issue Status
                </TableCell>
                <TableCell>
                  {rentInfo.endDate ? (
                    <Chip label="Return" color="primary" />
                  ) : (
                    <Chip label="Issue" color="warning" />
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    borderRight: "solid 1px rgba(224, 224, 224, 1)",
                    fontWeight: "600",
                  }}
                >
                  Total Fines
                </TableCell>
                <TableCell>{rentInfo.fines}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {!rentInfo.endDate && (
          <div className="mt-8">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="I aknowledge that I have received Issued Book"
              />
              <div>
                <Button
                  variant="contained"
                  sx={{ marginTop: "1rem" }}
                  onClick={handleSubmit}
                >
                  Book Return
                </Button>
              </div>
            </FormGroup>
          </div>
        )}

        <NotiStack
          open={openNoti}
          value={value}
          onClose={handleCloseNoti}
        ></NotiStack>
      </div>
    );
};

export default IssueDetails;
