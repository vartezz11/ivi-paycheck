export enum Pay {
  TIP = "tip",
  SALARY = "salary",
  BONUS = "bonus",
  NONE = "none",
}
export type PayType = {
  amount: number | undefined;
  date: Date | undefined;
  type: Pay | undefined;
};
