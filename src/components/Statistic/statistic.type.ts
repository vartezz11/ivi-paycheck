import { PaycheckStats } from "@/app/api/paychecks/stats/route";

export interface StatisticProps {
  selectedDate: Date | null;
  selectedAmount: number | null;
  paycheckStats: PaycheckStats | null;
  id: string | null;
  updateStats?: () => void;
}
