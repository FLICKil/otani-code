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
  import { CategoryContext } from "../../../context/CategoryContext";
  import { ICategory } from "../../../interfaces/ICategory.interface";
  
  interface IModalEditCategory {
    keepMounted: boolean;
    open: boolean;
    onClose: Function;
    category: ICategory;
  }
  
  const ModalEditCategory = (props: IModalEditCategory) => {
    const { open, onClose, category, ...other } = props;
  
    const { listCategory, setListCategory, reload, setReload } =
      useContext(CategoryContext);
  
    const inputRef = useRef<HTMLInputElement>(null);
  
    const [error, setError] = useState<string>("");
  
    const handleOk = () => {
      if (inputRef.current?.value.trim() == "") {
        setError("Category name is required and cannot be empty");
        return;
      }
      if (category.name == inputRef.current?.value.trim()) {
        onClose();
        return;
      }
      api
        .patch(`category/${category.id}`, {
          ...category,
          name: inputRef.current?.value,
          updatedBy: JSON.parse(localStorage.getItem('adminInfo') as string)?.id,
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
        <DialogTitle>Edit Category Detail</DialogTitle>
        <DialogContent dividers>
          <p>Category Name</p>
          <Input
            defaultValue={category ? category.name : ""}
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
  
  export default ModalEditCategory;
  