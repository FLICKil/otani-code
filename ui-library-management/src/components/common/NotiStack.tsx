import { IconButton, Snackbar, Alert } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface INotification {
    open: boolean;
    value: string;
    onClose: (event: React.SyntheticEvent | Event, reason?:string) => void;
}

const NotiStack = (props:INotification) => {
  const {open,value, onClose} = props;

//   const [openNoti, setOpenNoti] = useState<boolean>(false);

//   const handleClose = (
//     event: React.SyntheticEvent | Event,
//     reason?: string
//   ) => {
//     if (reason === "clickaway") {
//       return;
//     }

//     setOpenNoti(false);
//   };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      action={action}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        severity={value?.includes("Error") ? "error" : "success"}
        onClose={onClose}
      >
        {value}
      </Alert>
    </Snackbar>
  );
};

export default NotiStack;
