import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs, { hash } from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
   try {
      const reqBody = await request.json();
      const {name, email, password} = reqBody;
      console.log(reqBody);

      // check if all fields are valid
      if(!name || !email || !password){
         return NextResponse.json({message: "All fields are required.", success: false}, {status: 400});
      }

      // check if user already exists
      const user = await User.findOne({email});
      if(user){
         return NextResponse.json({message: "User already exists", success: false}, {status: 400})
      }

      // if user not exists then create a new one
      
      // hash password
      const salt = await bcryptjs.genSalt(10)
      const hashedPassword = await bcryptjs.hash(password, salt);

      // create user in database
      const newUser = new User({
         email,
         name,
         password: hashedPassword
      })
      const savedUser = await newUser.save();
      console.log(savedUser);

      return NextResponse.json({success: true, message: "User created successfully", savedUser}, {status: 200});
   } catch (error: any) {
      console.error(error);
      return NextResponse.json({error: error.message, success: false}, {status: 500})
   }
}