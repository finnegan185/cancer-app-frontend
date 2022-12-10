import React, { useState, forwardRef, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ZUniSnackbar(props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, [props.message]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.message.severity}>
          {props.message.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ZUniSnackbar;
