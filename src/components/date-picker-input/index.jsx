import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { IconButton, InputAdornment } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const DatePickerInputIconButton = () => {
  return (
    <IconButton edge="end">
      <CalendarMonthIcon />
    </IconButton>
  );
};

const DatePickerInput = ({ defaultValue = dayjs(), handleDateChange }) => {
  return (
    <DatePicker
      onChange={(newDate) => handleDateChange(newDate)}
      defaultValue={defaultValue}
      slots={{
        openPickerIcon: CalendarMonthIcon,
      }}
      // MUI date picker does not show icons on mobile view so we manually override the underlying textfield
      // This causes visible differences in UX. See: https://github.com/mui/mui-x/issues/4836
      slotProps={{
        textField: {
          style: {
            background: "white",
            borderRadius: "0.3rem",
          },
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                <DatePickerInputIconButton />
              </InputAdornment>
            ),
          },
        },
      }}
    />
  );
};

export default DatePickerInput;
