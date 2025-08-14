import { Paycheck } from "../generated/prisma/index";

import db from "./prisma";
import { PayType } from "../types/pay.type";

export const savePayCheck = async (
  paytype: PayType
): Promise<{ success: boolean; result?: Paycheck }> => {
  if (
    paytype.amount === undefined ||
    paytype.type === undefined ||
    paytype.type === "NONE"
  ) {
    return {
      success: false,
    };
  }
  const paycheck = await db.paycheck.create({
    data: {
      amount: paytype.amount,
      payType: paytype.type,
      date: new Date(),
    },
  });

  return {
    success: true,
    result: paycheck,
  };
};
