"use client";
import { colors, styled, Switch } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { DialogComponent } from "../Dialog/Dialog";
import { PickerValue } from "@mui/x-date-pickers/internals";
import { CalendarProps } from "./calendar.type";

const StyledDateCalendar = styled(DateCalendar)({
  backgroundColor: "#fff",
  borderRadius: "8px",
  border: `1px solid ${colors.green[300]}`,
  fontFamily: "var(--font-oswald), sans-serif",

  ".MuiPickersDay-root.Mui-selected": {
    backgroundColor: "var(--color-meadow-green) !important",
    color: "#fff",
  },
  ".MuiPickersDay-root:focus": {
    backgroundColor: "var(--color-meadow-green) !important",
    color: "#fff",
  },
});

const CustomSwitch = styled(Switch)({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "var(--color-lemon-sage)",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "var(--color-lemon-sage)",
  },
  "& .MuiSwitch-track": {
    backgroundColor: "#ccc",
  },
});

export const Calendar = ({
  onDateChange,
  updateStats,
  view,
}: CalendarProps) => {
  const [checked, setChecked] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  async function handleOnDateChange(value: PickerValue): Promise<void> {
    if (checked) {
      setDate(value?.toDate());
      setShowDialog(true);
      return;
    }
  }

  return (
    <>
      <div className=" flex flex-col justify-center flex-1">
        <div className="flex justify-center items-center mr-32">
          <CustomSwitch
            className=""
            checked={checked}
            onChange={() => {
              setChecked(!checked);
            }}
          />
          <span className=" text-xl text-ivory-mist font-oswald">
            Toggle Add Mode
          </span>
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StyledDateCalendar
            slotProps={{}}
            onChange={(value) => {
              handleOnDateChange(value);
              onDateChange(value?.toDate());
            }}
          />
        </LocalizationProvider>
      </div>
      <DialogComponent
        open={showDialog}
        view={view}
        updateStats={updateStats}
        onClose={() => {
          setShowDialog(false);
        }}
        date={date}
      />
    </>
  );
};
