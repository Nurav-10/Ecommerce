import { users } from "@/db/schema";
import { db } from "@/index";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const user = await db.select().from(users).where(eq(users.id,id));

    if (user)
      return NextResponse.json({
        message: "user fetched successfully",
        success: true,
        details:{
          username:user[0].username,
          email:user[0].email,
          address:user[0].address,
          role:user[0].role
        }
      });

    return NextResponse.json({
      message: "user not fetched",
      success: false,
      
    });
  } catch (err: any) {
    return NextResponse.json({
      message: err.message,
      success: true,
    });
  }
}
