import React, { useState, useRef } from "react";
import { Box, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";

function UploadPhotos(props) {
  const [imageState, setImageState] = props.state;
  const fileInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const handleFileInputChange = (e) => {
    const file = {
      index: 0,
      file: e.target.files[0],
      image: null,
      coverPhoto: true,
    };
    let isLarge = file.file.size > 5000000;
    let file_size = (file.file.size / 1000000).toFixed(1);
    if (isLarge) {
      // console.log("set error message");
      setErrorMessage(`Your file size is too large (${file_size} MB)`);
      return;
    } else {
      setErrorMessage("");
    }

    readImage(file);
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };
  const readImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      file.image = e.target.result;
      const newImageState = [...imageState];
      newImageState[0] = file;
      setImageState(newImageState);
    };
    reader.readAsDataURL(file.file);
  };
  return (
    <Box sx={{ ml: "18px", mt: "32px", display: "flex", alignItems: "center" }}>
      <Avatar
        sx={{
          width: "67px",
          height: "67px",
          bgcolor: "white",
          alignSelf: "center",
        }}
      >
        {imageState.map((file, i) => (
          <div
            className="mx-2"
            style={{
              position: "relative",
              minHeight: "100px",
              minWidth: "100px",
              height: "100px",
              width: "100px",
            }}
            key={i}
          >
            {file.file === null ? (
              <img
                key={Date.now()}
                src={`${file.image}?${Date.now()}`}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "5px",
                  backgroundColor: "#F5F5F5",
                  border: "1px solid #C4C4C4",
                  objectFit: "cover",
                }}
                alt="user"
              />
            ) : (
              <img
                key={Date.now()}
                src={file.image}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "5px",
                  backgroundColor: "#F5F5F5",
                  border: "1px solid #C4C4C4",
                  objectFit: "cover",
                }}
                alt="user"
              />
            )}
          </div>
        ))}
      </Avatar>
      <Button
        variant="contained"
        sx={{
          ml: "100px",
          width: "235px",
          height: "56px",
          borderRadius: "10px",
          backgroundColor: "rgba(59, 140, 117, 1)",
        }}
        onClick={handleUploadButtonClick}
      >
        Upload Image
      </Button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        style={{ display: "none" }}
      />
      <div
        className="text-center"
        style={errorMessage === "" ? { visibility: "hidden" } : {}}
      >
        <p style={{ fontSize: "small" }}>{errorMessage || "error"}</p>
      </div>
    </Box>
  );
}

export default UploadPhotos;
