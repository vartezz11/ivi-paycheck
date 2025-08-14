import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PayType } from "@/types/pay.type";

export async function POST(req: NextRequest) {
  try {
    const body: PayType = await req.json();
    if (
      body.amount === undefined ||
      body.date === undefined ||
      body.type === "NONE"
    ) {
      return NextResponse.json({ success: false });
    }

    const paycheck = await prisma.paycheck.create({
      data: {
        amount: body.amount,
        payType: body.type,
        date: body.date ? new Date(body.date) : new Date(),
      },
    });

    return NextResponse.json({ success: true, result: paycheck });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : error,
    });
  }
}
