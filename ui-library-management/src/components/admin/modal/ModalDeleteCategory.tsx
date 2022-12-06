import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
  } from "@mui/material";
  import React, { useContext, useEffect, useState } from "react";
  import api from "../../../api";
  import { ICategory } from "../../../interfaces/ICategory.interface";
  import { CategoryContext } from "../../../context/CategoryContext";
  
  interface IModalDeleteCategory {
    open: boolean;
    onClose: Function;
    keepMounted: boolean;
    category: ICategory;
  }
  
  const ModalDeleteCategory = (props: IModalDeleteCategory) => {
    const { open, onClose, category, ...other } = props;
    const {reload, setReload} = useContext(CategoryContext)
  
    const handleOk = () => {
      api
        .delete(`category/${category.id}`)
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
          <p>Are you sure you want to delete this Category?</p>
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
  
  export default ModalDeleteCategory;
  