import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";

export default function UserAlreadyExistsModal(props) {
  const { isOpen, onCancel, email, path, eventObj } = props;
  const navigate = useNavigate();
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">User Already Exists</DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          variant="body1"
          sx={{ color: "white" }}
        >
          The user {email} already exists! Please Log In!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type="submit" onClick={onCancel}>
          Cancel
        </Button>

        <Button
          type="submit"
          onClick={() =>
            navigate("/login", { state: { path: path, eventObj: eventObj } })
          }
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}
