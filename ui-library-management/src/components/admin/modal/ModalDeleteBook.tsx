import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
  } from "@mui/material";
  import React, { useContext, useEffect, useState } from "react";
  import api from "../../../api";
  import { IBook } from "../../../interfaces/IBook.interface";
  import { BookContext } from "../../../context/BookContext";
  
  interface IModalDeleteBook {
    open: boolean;
    onClose: Function;
    keepMounted: boolean;
    book: IBook;
  }
  
  const ModalDeleteBook = (props: IModalDeleteBook) => {
    const { open, onClose, book, ...other } = props;
    const {reload, setReload} = useContext(BookContext)
  
    const handleOk = () => {
      api
        .delete(`book/${book.id}`)
        .then((res) => {
          onClose("Success: " + res.data.msg);
          setReload(!reload);
        })
        .catch((err) => {
          onClose("Error: " + err.response.data.msg);
        });
    };
  
    const handleCancel = () => {
      onClose();
    };
  
    return (
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        open={open}
      >
        <DialogContent dividers>
          <p>Are you sure you want to delete this Book?</p>
        </DialogContent>
        <DialogActions>
        <Button variant="contained" color="error" autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleOk}>Ok</Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default ModalDeleteBook;
  