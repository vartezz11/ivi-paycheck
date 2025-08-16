import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
export type PaycheckStats = {
  total: number;
  min: number;
  max: number;
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const view = searchParams.get("view") || "tip";

    const paychecks: {
      amount: number;
    }[] = await prisma.paycheck.findMany({
      where: {
        payType: view.toUpperCase(),
      },
    });
    const arrAmount = paychecks.map((val) => val.amount);

    const min = arrAmount.length > 0 ? Math.min(...arrAmount) : 0;
    const max = arrAmount.length > 0 ? Math.max(...arrAmount) : 0;
    const sum = arrAmount.reduce((acc, val) => acc + val, 0);

    const stats: PaycheckStats = {
      total: sum,
      min,
      max,
    };

    return new Response(JSON.stringify(stats), { status: 200 });
  } catch (error) {
    console.error("Error fetching paycheck stats:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
