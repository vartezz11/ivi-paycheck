export default interface SnackBarComponentProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  message: string;
}
