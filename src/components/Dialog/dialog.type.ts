import { PayType } from "@/types/pay.type";

export interface DialogComponentProps {
  open: boolean;
  onClose: () => void;
  date?: Date;
  paytype?: PayType | null;
  updateStats?: (date: Date) => void;
  view: "TIP" | "SALARY";
}
