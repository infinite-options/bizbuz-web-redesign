import React from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";

export default function UserDoesNotExistModal(props) {
  const { isOpen, onCancel, path, eventObj } = props;
  const navigate = useNavigate();
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">User Does Not Exists</DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          variant="body1"
          sx={{ color: "white" }}
        >
          The user does not exist! Please Signup!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type="submit" onClick={onCancel}>
          Cancel
        </Button>

        <Button
          type="submit"
          onClick={() =>
            navigate("/signup", { state: { path: path, eventObj: eventObj } })
          }
        >
          Signup
        </Button>
      </DialogActions>
    </Dialog>
  );
}
