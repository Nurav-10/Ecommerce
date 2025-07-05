import { NextResponse } from "next/server";
import { db } from "@/index";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  try {
    const { id } = await params;
    const response = await db
      .select()
      .from(products)
      .where(eq(products.category, id));
    if (response.length)
      return NextResponse.json({
        success: true,
        data: response,
      });
    else
      return NextResponse.json({
        message: "No Products Found",
        success: false,
        data:[]
      });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message,
      data:[]
    });
  }
}
