import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Input,
  Alert,
  AlertTitle,
} from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import api from "../../../api";
import { AuthorContext } from "../../../context/AuthorContext";
import { IAuthor } from "../../../interfaces/IAuthor.interface";

interface IModalEditAuthor {
  keepMounted: boolean;
  open: boolean;
  onClose: Function;
  author: IAuthor;
}

const ModalEditAuthor = (props: IModalEditAuthor) => {
  const { open, onClose, author, ...other } = props;

  const { listAuthor, setListAuthor, reload, setReload } =
    useContext(AuthorContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string>("");

  const handleOk = () => {
    if (inputRef.current?.value.trim() == "") {
      setError("Author name is required and cannot be empty");
      return;
    }
    if (author.name == inputRef.current?.value.trim()) {
      onClose();
      return;
    }
    api
      .patch(`author/${author.id}`, {
        ...author,
        name: inputRef.current?.value,
        updatedBy: JSON.parse(localStorage.getItem("adminInfo") as string)?.id,
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
      <DialogTitle>Edit Author Detail</DialogTitle>
      <DialogContent dividers>
        <p>Author Name</p>
        <Input
          defaultValue={author ? author.name : ""}
          autoFocus
          inputRef={inputRef}
          required
        ></Input>
        {error && <Alert severity="error" sx={{marginTop:"1rem"}}>
          <AlertTitle>Error</AlertTitle>
          <strong>{error}</strong>
        </Alert>}
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

export default ModalEditAuthor;
