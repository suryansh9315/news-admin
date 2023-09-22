import { sign_jwt } from "@/utils/jwt_helpers";
import { connectDB } from "@/utils/mongo";
import { NextResponse } from "next/server";

export async function POST(request) {
  const req_body = await request.json();
  if (!req_body.email || !req_body.password) {
    return NextResponse.json(
      { success: "failure", message: "Missing Fields For Login" },
      { status: 400 }
    );
  }
  const email = req_body.email;
  const password = req_body.password;
  try {
    const mongoClient = await connectDB();
    if (mongoClient) {
      const db = mongoClient.db("news");
      const admins = db.collection("news-admin");
      const query = { email };
      const admin = await admins.findOne(query);
      if (admin) {
        if (admin.password === password) {
          const token = sign_jwt({ id: admin._id });
          return NextResponse.json(
            { success: "success", message: "Successfully logged in", token },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            { success: "failure", message: "Wrong Password" },
            { status: 400 }
          );
        }
      } else {
        return NextResponse.json(
          { success: "failure", message: "Admin D.N.E" },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { status: "failure", msg: "Something went wrong" },
      { status: 400 }
    );
  }
}
