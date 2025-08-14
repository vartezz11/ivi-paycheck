"use client";

import {
  colors,
  Dialog,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import { DialogComponentProps } from "./dialog.type";
import EuroIcon from "@mui/icons-material/Euro";
import { useState } from "react";
import { Pay, PayType } from "@/types/pay.type";
import StyledButton from "../Button/Button";
import { SnackbarComponent } from "../Snackbar/Snackbar";

const StyledDialog = styled(Dialog)({
  ".MuiInputLabel-root.Mui-focused": {
    color: colors.green[800],
  },
  ".MuiInput-underline:after": {
    borderBottomColor: colors.green[800],
  },
});

export const DialogComponent = ({
  open,
  onClose,
  date,
  updateStats,
}: DialogComponentProps) => {
  const [pay, setPay] = useState<PayType>({
    amount: undefined,
    date: date,
    type: Pay.NONE,
  });
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);

  async function handleOnClick() {
    setOpenSnackBar(false);
    if (pay.amount === undefined || pay.type === Pay.NONE) {
      setOpenSnackBar(true);
      return;
    }

    try {
      await fetch("/api/paychecks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...pay, date: date }),
      });
    } catch (error) {
      console.error("Failed to save paycheck:", error);
    } finally {
      updateStats?.();
      onClose();
    }
  }

  function handleOnClose() {
    onClose();
    setPay({
      amount: undefined,
      date: date || new Date(),
      type: Pay.NONE,
    });
  }

  return (
    <>
      <StyledDialog
        open={open}
        onClose={() => {
          handleOnClose();
        }}
      >
        <div className="flex flex-col gap-4 p-10">
          <FormControl variant="standard">
            <InputLabel
              htmlFor="input-with-icon-adornment"
              className="font-oswald"
            >
              Amount
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              type="number"
              value={pay.amount === undefined ? "" : pay.amount}
              onChange={(event) => {
                const val = event.target.value;
                setPay({
                  ...pay,
                  amount: val === "" ? undefined : Number(val),
                });
              }}
              startAdornment={
                <InputAdornment position="start">
                  <EuroIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel
              id="demo-simple-select-standard-label"
              className="font-oswald"
            >
              Type of pay
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={Pay.TIP}
              onChange={(event) => {
                setPay({ ...pay, type: event.target.value as Pay });
              }}
              label="Type of pay"
            >
              <MenuItem value={""}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={Pay.TIP}>Tip</MenuItem>
              <MenuItem value={Pay.SALARY}>Salary</MenuItem>
              <MenuItem value={Pay.BONUS}>Bonus</MenuItem>
            </Select>
          </FormControl>
          <StyledButton
            variant="outlined"
            onClick={() => {
              handleOnClick();
            }}
          >
            Submit
          </StyledButton>
          {date && (
            <p className=" text-center font-oswald">
              Selected Date:{" "}
              <span className=" text-green-800">
                {date.toLocaleDateString()}
              </span>
            </p>
          )}
        </div>
      </StyledDialog>
      <SnackbarComponent
        open={openSnackBar}
        setOpen={(open: boolean) => setOpenSnackBar(open)}
        message={"Please fill in all fields before submitting bebi."}
      />
    </>
  );
};
