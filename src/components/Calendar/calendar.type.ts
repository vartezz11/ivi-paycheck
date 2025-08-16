export interface CalendarProps {
  onDateChange: (date: Date | undefined) => void;
  updateStats: (date: Date) => void;
  view: "TIP" | "SALARY";
  canAdd: boolean;
}
