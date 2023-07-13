import { makeStyles } from "@mui/styles";

// import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textfield: {
    width: "350px",
    height: "56px",
    marginLeft: "20px",
    fontSize: 12,
    backgroundColor: "white",
    borderRadius: "8px",
    marginTop: "16px",
    color: `${theme.palette.primary.contrastText} !important`,
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
      underline: "none",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
      underline: "none",
    },
  },
  
  error: {
    fontSize: "small",
    color: "red",
  },
  hidden: {
    visibility: "hidden",
  },
  eventContainer: {
    display: "flex",
    width: "100%",
    padding: "10px",
    overflow: "hidden",
  },
  ellipse: {
    background: "#D9D9D9",
    zIndex: 10,
    float: "right",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginLeft: "-50px",
    marginTop: "8px",
  },

  ellipseImg: {
    background: "#D9D9D9",
    zIndex: 10,
    float: "right",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginLeft: "-50px",
    marginTop: "0px",
    objectFit: "cover",
  },
  circularImage: {
    clipPath: "circle()",
  },
  ellipseSmall: {
    background: "#D9D9D9",
    zIndex: 10,
    float: "right",
    width: "75px",
    height: "75px",
    borderRadius: "50%",
    marginLeft: "-80px",
  },
}));

export default useStyles;
