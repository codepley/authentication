import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
   try {
      const reqBody = await request.json();
      const {password, emailType, token} = reqBody;
      const user = await User.findOne({forgotPasswordToken: token});
      if(!user){
         return NextResponse.json({message: "Token Expired, Try again", success: false}, {status: 400});
      }
      if(user.forgotPasswordTokenExpiry < Date.now()){
         return NextResponse.json({message: "Token expired, Try again", success: false}, {status: 400});
      }

      const salt = await bcryptjs.genSalt(10)
      const hashedPassword = await bcryptjs.hash(password, salt);

      user.forgotPasswordTokenExpiry = undefined;
      user.forgotPasswordToken = undefined;
      user.password = hashedPassword;
      await user.save();

      console.log(reqBody);
      console.log(user);
      return NextResponse.json({ message: "Password Reset Successful", success: true }, {status: 200});
   } catch (error: any) {
      return NextResponse.json({message: error.message}, {status: 500});
   }
}