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
import { PublisherContext } from "../../../context/PublisherContext";
import { IPublisher } from "../../../interfaces/IPublisher.interface";

interface IModalEditPublisher {
  keepMounted: boolean;
  open: boolean;
  onClose: Function;
  publisher: IPublisher;
}

const ModalEditPublisher = (props: IModalEditPublisher) => {
  const { open, onClose, publisher, ...other } = props;

  const { listPublisher, setListPublisher, reload, setReload } =
    useContext(PublisherContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string>("");

  const handleOk = () => {
    if (inputRef.current?.value.trim() == "") {
      setError("Publisher name is required and cannot be empty");
      return;
    }
    if (publisher.name == inputRef.current?.value.trim()) {
      onClose();
      return;
    }
    api
      .patch(`publisher/${publisher.id}`, {
        ...publisher,
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
      <DialogTitle>Edit Publisher Detail</DialogTitle>
      <DialogContent dividers>
        <p>Publisher Name</p>
        <Input
          defaultValue={publisher ? publisher.name : ""}
          autoFocus
          inputRef={inputRef}
          required
        ></Input>
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

export default ModalEditPublisher;
