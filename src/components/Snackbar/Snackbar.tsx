import { Button, Snackbar } from "@mui/material";
import { SnackBarComponentProps } from "./snackbar.type";

export const SnackbarComponent = ({
  open,
  setOpen,
  message,
}: SnackBarComponentProps) => {
  return (
    <Snackbar
      message={message}
      open={open}
      className="!bottom-16 sm:!bottom-7"
      autoHideDuration={1000}
      action={
        <Button color="inherit" onClick={() => setOpen(false)}>
          Close
        </Button>
      }
    />
  );
};
