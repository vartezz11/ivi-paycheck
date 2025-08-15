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
        date: new Date(body.date),
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

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams;
    const paramName = query.get("date");
    const idParam = query.get("id");
    if (!paramName && !idParam) {
      return NextResponse.json({
        success: false,
        error: "Either date or id parameter is required",
      });
    }
    const paycheck = await prisma.paycheck.findFirst({
      where: {
        OR: [
          paramName ? { date: new Date(paramName) } : undefined,
          idParam ? { id: idParam } : undefined,
        ].filter(Boolean),
      },
    });

    return NextResponse.json({ success: true, result: paycheck });
  } catch (e) {
    return NextResponse.json({
      success: false,
      error: e instanceof Error ? e.message : e,
    });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams;
    const id = query.get("id");
    if (!id) {
      return NextResponse.json({
        success: false,
        error: "ID parameter is missing",
      });
    }

    await prisma.paycheck.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({
      success: false,
      error: e instanceof Error ? e.message : e,
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body: PayType = await req.json();
    if (
      body.amount === undefined ||
      body.date === undefined ||
      body.type === "NONE" ||
      body.id === undefined
    ) {
      return NextResponse.json({
        success: false,
        error: "Missing required fields",
      });
    }

    console.log(body);

    const paycheck = await prisma.paycheck.update({
      where: {
        id: body.id,
      },
      data: {
        amount: body.amount,
        payType: body.type,
        date: new Date(body.date),
      },
    });
    console.log(paycheck);

    return NextResponse.json({ success: true, result: paycheck });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : error,
    });
  }
}
