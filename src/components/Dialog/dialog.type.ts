export interface DialogComponentProps {
  open: boolean;
  onClose: () => void;
  date?: Date;
  updateStats?: () => void;
}
