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
      const reqBody = await request.json();
      // console.log(reqBody.emailType);
      const mailResponse = await sendMail({email: reqBody.profile.email, emailType: reqBody.emailType, userId: reqBody.profile._id});
      return NextResponse.json({reqBody, mailResponse});
   } catch (error: any) {
      return NextResponse.json({error: error.message})
   }
}