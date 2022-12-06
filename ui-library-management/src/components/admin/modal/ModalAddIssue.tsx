import {
  Dialog,
  DialogTitle,
  DialogContent,
  Input,
  Alert,
  AlertTitle,
  DialogActions,
  Button,
  Autocomplete,
  TextField,
  createFilterOptions,
} from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import api from "../../../api";
import { RentContext } from "../../../context/RentContext";
import { IOption } from "../AdminBook";

interface IModalAddRent {
  keepMounted: boolean;
  open: boolean;
  onClose: Function;
  options: Array<IOption[]>;
}

const ModalAddRent = (props: IModalAddRent) => {
  const { open, onClose, options, ...other } = props;

  const { listRent, setListRent, reload, setReload } = useContext(RentContext);
  const [error, setError] = useState<string>("");
  const [bookRef, setBookRef] = useState<IOption | null>(null);
  const [userRef, setUserRef] = useState<IOption | null>(null);

  const OPTIONS_LIMIT = 5;
  const filterOptions = createFilterOptions({
    limit: OPTIONS_LIMIT,
  });

  const handleOk = () => {
    setError("");
    console.log(bookRef, userRef);
    if (bookRef == null || userRef == null) {
      setError("Please choose a book and user to complete");
      return;
    }
    api
      .post(`rent`, {
        book: { id: bookRef.id, title: bookRef.label },
        user: { id: userRef.id, name: userRef.label },
        createdBy: JSON.parse(localStorage.getItem("adminInfo") as string)?.id,
      })
      .then((res) => {
        onClose("Success: Book has been issued successfully");
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
      <DialogTitle>Add Issue Book</DialogTitle>
      <DialogContent dividers>
        <Autocomplete
          aria-required
          disablePortal
          id="book"
          filterOptions={filterOptions}
          options={options[0]}
          onChange={(event, value) => {
            setBookRef(value as IOption);
          }}
          sx={{
            marginBottom: "1rem",
            width: "100%",
            paddingX: "1rem",
          }}
          renderInput={(params) => (
            <TextField {...params} label="Book Title *" />
          )}
        />
        <Autocomplete
          aria-required
          disablePortal
          id="user"
          filterOptions={filterOptions}
          options={options[1]}
          onChange={(event, value) => {
            setUserRef(value as IOption);
          }}
          sx={{
            marginBottom: "1rem",
            width: "100%",
            paddingX: "1rem",
          }}
          renderInput={(params) => (
            <TextField {...params} label="User name *" />
          )}
        />
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

export default ModalAddRent;
