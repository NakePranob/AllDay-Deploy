import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
import { v4 as uuidv4 } from 'uuid';

const generateUniqueId = (): string => {
    return uuidv4();
};

export async function GET(req: Request, res: Response) {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    try {
        if (userId) {
            const result = await prisma.reserve.findMany({
                where: {
                    dormitory_type: {
                        dormitory: {
                            userId: Number(userId)
                        }
                    }
                },
                select: {
                    id: true,
                    date: true,
                    dormitory_type: {
                        select: {
                            name: true,
                            dormitory: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    },
                    user: {
                        select: {
                            id: true,
                            firstname: true,
                            lastname: true,
                            email: true,
                            phone: true,
                            profile: true
                        }
                    }
                }
            })
            return Response.json(result)
        } else {
            const result = await prisma.reserve.findMany()
            return Response.json(result)
        }
    } catch (error) {
        return new Response(`error: ${error}`, {
            status: 400,
        })
    } finally {
        await prisma.$disconnect();
    }
}

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