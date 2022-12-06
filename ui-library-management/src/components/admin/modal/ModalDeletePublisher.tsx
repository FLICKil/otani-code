import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
  } from "@mui/material";
  import React, { useContext, useEffect, useState } from "react";
  import api from "../../../api";
  import { IPublisher } from "../../../interfaces/IPublisher.interface";
  import { PublisherContext } from "../../../context/PublisherContext";
  
  interface IModalDeletePublisher {
    open: boolean;
    onClose: Function;
    keepMounted: boolean;
    publisher: IPublisher;
  }
  
  const ModalDeletePublisher = (props: IModalDeletePublisher) => {
    const { open, onClose, publisher, ...other } = props;
    const {reload, setReload} = useContext(PublisherContext)
  
    const handleOk = () => {
      api
        .delete(`publisher/${publisher.id}`)
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
          <p>Are you sure you want to delete this Publisher?</p>
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
  
  export default ModalDeletePublisher;
  