import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest){
   try {
      const reqBody = await request.json();
      const {email, password} = reqBody;
      // console.log(reqBody);

      // check if all field are valid
      if(!email || !password){
         return NextResponse.json({message: "All fields are required.", success: false}, {status: 400});
      }

      // check if user exists
      const user = await User.findOne({email});
      if(!user){
         // console.log("email is wrong");
         return NextResponse.json({message: "Email or Password is Incorrect", success: false}, {status: 400});
      }
      // console.log(user);

      // check if password match
      const isValidPassword = await bcryptjs.compare(password, user.password);
      if(!isValidPassword){
         // console.log(password);
         // console.log(user.password);
         return NextResponse.json({message: "Email or Password is Incorrect", success: false}, {status: 400});
      }

      // create tokenData
      const tokenData = {
         id: user._id,
         name: user.name,
         email: user.email,
         created_at: user.created
      }

      // generate token
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'});
      // console.log(token);

      const response = NextResponse.json({message: "Login successful", success: true}, {status: 200});
      response.cookies.set("token", token, {httpOnly: true, maxAge: 24*60*60});

      return response;
   } catch (error:any) {
      // console.log(error.message);
      return NextResponse.json({error: error.message}, {status: 500});
   }
}