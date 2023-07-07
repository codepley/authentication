import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const params = await request.json();
    console.log(params);

    const user = await User.findOne({
      verifyToken: params.token,
    });

    if (!user) {
      console.log("in verify token not user");
      return NextResponse.json(
        { message: "Invalid Request, User not found", success: false },
        { status: 400 }
      );
    }

    if (user.verifyTokenExpiry < Date.now()) {
      return NextResponse.json(
        { message: "Token Expired, Try Again", success: false },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.verifyTokenExpiry = undefined;
    user.verifyToken = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Email Verification Successful", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message });
  }
}
