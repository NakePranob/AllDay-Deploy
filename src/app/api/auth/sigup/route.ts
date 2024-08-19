import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import sendEmail from "../nodemailer/nodemailer";
const prisma = new PrismaClient();

import {User} from "@/Types/user";

export async function POST(req: Request, res: Response) {

    try{
        const {email, password}:User = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            }
        })
        sendEmail(email, 'ยินดีต้อนรับ', 'คุณได้สมัครสมาชิกเรียบร้อยแล้ว');
        return Response.json({
            message:"Success",
            data: newUser
        })
    }
    catch (error) {
        return new Response(`error: ${error}`, {
            status: 400,
        })
    }
}