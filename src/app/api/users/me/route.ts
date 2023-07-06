import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
   try {
      const userId = getDataFromToken(request);
      const user = await User.findById({_id: userId}).select("-password");
      return NextResponse.json({success: true, user}, {status: 200});
   } catch (error: any) {
      return NextResponse.json({error: error.message}, {status: 500});
   }
}