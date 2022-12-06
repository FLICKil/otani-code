import {
  Dialog,
  DialogTitle,
  DialogContent,
  Input,
  Alert,
  AlertTitle,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import api from "../../../api";
import { CategoryContext } from "../../../context/CategoryContext";

interface IModalAddCategory {
  keepMounted: boolean;
  open: boolean;
  onClose: Function;
}

const ModalAddCategory = (props: IModalAddCategory) => {
  const { open, onClose, ...other } = props;

  const { listCategory, setListCategory, reload, setReload } =
    useContext(CategoryContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string>("");

  const handleOk = () => {
    if (inputRef.current?.value.trim() == "") {
      setError("Category name is required and cannot be empty");
      return;
    }
    api
      .post(`category`, {
        name: inputRef.current?.value,
        createdBy: JSON.parse(localStorage.getItem("adminInfo") as string)?.id,
      })
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
      <DialogTitle>Add Category Detail</DialogTitle>
      <DialogContent dividers>
        <p>Category Name</p>
        <Input autoFocus inputRef={inputRef} required></Input>
        {error && (
          <Alert severity="error" sx={{ marginTop: "1rem" }}>
            <AlertTitle>Error</AlertTitle>
            <strong>{error}</strong>
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          autoFocus
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={handleOk}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAddCategory;
