import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import api from "../../../api";
import { IAuthor } from "../../../interfaces/IAuthor.interface";
import { AuthorContext } from "../../../context/AuthorContext";

interface IModalDeleteAuthor {
  open: boolean;
  onClose: Function;
  keepMounted: boolean;
  author: IAuthor;
}

const ModalDeleteAuthor = (props: IModalDeleteAuthor) => {
  const { open, onClose, author, ...other } = props;
  const {reload, setReload} = useContext(AuthorContext)

  const handleOk = () => {
    api
      .delete(`author/${author.id}`)
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
        <p>Are you sure you want to delete this Author?</p>
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

export default ModalDeleteAuthor;
