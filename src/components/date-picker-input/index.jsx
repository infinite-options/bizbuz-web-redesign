import { InputAdornment, IconButton } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { ReactComponent as CalenderIcon } from "../../assets/calendar-date.svg";

const DatePickerInput = ({ onDateChange = () => {} }) => {
  return (
    <DatePicker
      onChange={(newValue) => onDateChange(newValue)}
      slots={{
        openPickerIcon: CalenderIcon,
      }}
      slotProps={{
        textField: {
          style: {
            background: "white",
            borderRadius: "0.7rem",
          },
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <CalenderIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        },
      }}
    />
  );
};

export default DatePickerInput;
