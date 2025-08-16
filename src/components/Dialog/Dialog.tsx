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
import { useEffect, useState } from "react";
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
  paytype,
  updateStats,
}: DialogComponentProps) => {
  const [pay, setPay] = useState<PayType>({
    amount: paytype?.amount ?? undefined,
    date: paytype?.date || new Date(),
    type: paytype?.type ?? Pay.TIP,
  });

  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      setPay({
        amount: paytype?.amount ?? undefined,
        date: date ?? (paytype?.date || new Date()),
        type: paytype?.type ?? Pay.TIP,
      });
    }
  }, [open, paytype, date]);

  async function handleOnClick() {
    setOpenSnackBar(false);
    if (pay.amount === undefined || pay.type === Pay.NONE) {
      setOpenSnackBar(true);
      return;
    }
    if (paytype) {
      try {
        const response = await fetch("/api/paychecks", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...pay, id: paytype.id }),
        });
        const data = await response.json();
        console.log("Paycheck updated:", data, pay.date);
      } catch (error) {
        console.error("Failed to save paycheck:", error);
      } finally {
        onClose();
        setPay({
          amount: undefined,
          date: date,
          type: Pay.TIP,
        });
      }
    } else {
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
        onClose();
        setPay({
          amount: undefined,
          date: date,
          type: Pay.TIP,
        });
      }
    }

    updateStats?.(pay.date!);
  }

  function handleOnClose() {
    onClose();
    setPay({
      amount: undefined,
      date: date,
      type: Pay.TIP,
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
              value={pay.type}
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
            {paytype ? "Update" : "Submit"}
          </StyledButton>
          {(date || pay.date) && (
            <p className=" text-center font-oswald">
              Selected Date:{" "}
              <span className=" text-green-800">
                {date
                  ? date.toLocaleDateString()
                  : new Date(pay.date!).toLocaleDateString()}
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
