export enum Pay {
  TIP = "TIP",
  SALARY = "SALARY",
  BONUS = "BONUS",
  NONE = "NONE",
}
export type PayType = {
  amount: number | undefined;
  date: Date | undefined;
  type: Pay | undefined;
};
