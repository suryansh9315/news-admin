import { verify_jwt } from "@/utils/jwt_helpers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const req_body = await request.json();
  if (!req_body.token) {
    return NextResponse.json(
      { success: "failure", message: "Missing Fields" },
      { status: 400 }
    );
  }
  const token = req_body.token;
  try {
    const decoded = verify_jwt(token);
    const userId = decoded.id;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { status: "failure", msg: "Something went wrong" },
      { status: 400 }
    );
  }
}
