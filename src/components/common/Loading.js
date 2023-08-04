import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ThreeDots from "../../assets/loading-dots.gif";

const Loading = ({ isLoading, text = "Loading" }) => {
  return (
    <Dialog
      open={isLoading}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title"></DialogTitle>
      <DialogContent>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            padding: "1rem",
          }}
        >
          <h3 style={{ color: "#FFFFFF" }}>{text}</h3>
          <img src={ThreeDots} style={{ width: "20%" }} alt="loading..." />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Loading;
