import { PaycheckStats } from "@/app/api/paychecks/stats/route";

export interface StatisticProps {
  selectedDate: Date | null;
  selectedAmount: number | null;
  paycheckStats: PaycheckStats | null;
  id: string | null;
  deletePay?: () => void;
  updateStats?: (date: Date) => void;
  view: "SALARY" | "TIP";
}
