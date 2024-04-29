import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const EmailModal = ({ open, onClose, onSend }) => {
  const [emailIds, setEmailIds] = useState("");
  const [list, setList] = useState(new Set());
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleShareEmail = () => {
    if (emailIds.trim() !== "") {
      if (validateEmail(emailIds.trim())) {
        const newEmailList = new Set([...list, emailIds.trim()]);
        setList(newEmailList);
        setEmailIds(""); // Clear the emailIds state after adding it to the list
        setError(""); // Clear any previous error message
      } else {
        setError("Invalid email address");
      }
    }
  };

  const handleRemoveEmail = (email) => {
    const updatedList = new Set(list);
    updatedList.delete(email);
    setList(updatedList);
  };

  const handleSendEmail = () => {
    onSend(list);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          maxHeight: '80vh', // Set max height to allow scrolling
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "10px",
          overflowY: 'auto', // Enable vertical scrolling
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Enter Email IDs
        </Typography>
        <TextField
          fullWidth
          label="Email IDs"
          value={emailIds}
          onChange={(e) => setEmailIds(e.target.value)}
          variant="outlined"
          margin="normal"
          error={error !== ""}
          helperText={error}
        />
        <Button variant="contained" color="primary" onClick={handleShareEmail}>
          Add
        </Button>

        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from(list).map((email) => (
                <TableRow key={email}>
                  <TableCell>{email}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleRemoveEmail(email)}>Remove</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button onClick={handleSendEmail} sx={{ marginTop: 2 }}>Send</Button>
      </Box>
    </Modal>
  );
};

export default EmailModal;
