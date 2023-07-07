import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { sendMail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
   try {
      // const userId = getDataFromToken(request);
      // const user = await User.findById({_id: userId});
      // console.log("recievied data");
      const reqBody = await request.json();
      // console.log(reqBody.email);
      const user = await User.findOne({email: reqBody.email});
      // console.log(user);
      if(!user){
         return NextResponse.json({message: "User not found", success: false}, {status: 400});
      }
      if(reqBody.emailType === 'RESET'){
         reqBody.userId = user._id;
         const mailResponse = await sendMail({email: reqBody.email, emailType: reqBody.emailType, userId: reqBody.userId});
         return NextResponse.json({message: "Email sent successfully", success: true}, {status: 200});
      }

      const mailResponse = await sendMail({email: reqBody.email, emailType: reqBody.emailType, userId: user._id});

      return NextResponse.json({message: "Email sent successfully", success: true}, {status: 200});
   } catch (error: any) {
      return NextResponse.json({error: error.message})
   }
}