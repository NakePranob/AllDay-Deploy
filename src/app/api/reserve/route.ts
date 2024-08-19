import {prisma} from "@/function/prisma";
import { v4 as uuidv4 } from 'uuid';

const generateUniqueId = (): string => {
    return uuidv4();
};



export async function POST(req: Request, res: Response) {
    try {
        const {day, month, year, dmt_typeId, userId} = await req.json();
        const uniqueId = generateUniqueId();

        const date = `${year}-${month.length === 1 ? `0${month}` : month}-${day.length === 1 ? `0${day}` : day}`
        const result = await prisma.reserve.create({
            data: {
                code: uniqueId,
                dmt_typeId,
                userId,
                date
            }
        })

        return Response.json(result)
    } catch (error) {
        return new Response(`error: ${error}`, {
            status: 400,
        })
    } finally {
        await prisma.$disconnect();
    }
}