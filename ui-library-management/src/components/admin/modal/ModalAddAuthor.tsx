import { Dialog, DialogTitle, DialogContent, Input, Alert, AlertTitle, DialogActions, Button } from '@mui/material';
import React, { useContext, useRef, useState } from 'react'
import api from '../../../api';
import { AuthorContext } from '../../../context/AuthorContext';

interface IModalAddAuthor {
    keepMounted: boolean;
    open: boolean;
    onClose: Function;
  }

const ModalAddAuthor = (props:IModalAddAuthor) => {
    const { open, onClose, ...other } = props;

    const { listAuthor, setListAuthor, reload, setReload } =
      useContext(AuthorContext);
  
    const inputRef = useRef<HTMLInputElement>(null);
  
    const [error, setError] = useState<string>("");
  
    const handleOk = () => {
      if (inputRef.current?.value.trim() == "") {
        setError("Author name is required and cannot be empty");
        return;
      }
      api
        .post(`author`, {name : inputRef.current?.value, createdBy : JSON.parse(localStorage.getItem("adminInfo") as string)?.id})
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
        <DialogTitle>Add Author Detail</DialogTitle>
        <DialogContent dividers>
          <p>Author Name</p>
          <Input
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
}

export default ModalAddAuthor