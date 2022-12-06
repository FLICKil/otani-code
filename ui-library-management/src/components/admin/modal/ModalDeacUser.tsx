import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  requirePropFactory,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import api from "../../../api";
import { IUser } from "../../../interfaces/IUser.interface";
import { UserContext } from "../../../context/UserContext";

interface IModalDeacUser {
  open: boolean;
  onClose: Function;
  keepMounted: boolean;
  user: IUser;
}
const ModalDeacUser = (props: IModalDeacUser) => {
  const { open, onClose, user, ...other } = props;
  const { reload, setReload } = useContext(UserContext);

  const handleOk = () => {

    api
      .patch(`users/${user.id}`, {
        active: !user.active,
        name: user.name,
        updatedBy: JSON.parse(localStorage.getItem("adminInfo") as string)?.id,
      })
      .then((res) => {
        onClose("Success: Change status of user completed.");
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
        <p>Are you sure you want to change this user active status?</p>
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

export default ModalDeacUser;
