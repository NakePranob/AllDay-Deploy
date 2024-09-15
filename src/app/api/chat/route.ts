import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
    try {
        const url = new URL(req.url);
        const userId = url.searchParams.get('userId');
        const dmtId = url.searchParams.get('dmtId');

        const chat = await prisma.chat.findFirst({
            where: {
                userId: Number(userId),
                dmtId: Number(dmtId)
            }
        })
        if (!chat && userId && dmtId) {
            const result = await prisma.chat.create({
                data: {
                    userId: Number(userId),
                    dmtId: Number(dmtId)
                }
            })
            return Response.json(result);
        } else if (userId && dmtId) {
            console.log(chat);
            return Response.json(chat);
        }

        throw new Error('Chat not found');
        
    } catch (error) {
        return new Response(`error: ${error}`, {
            status: 500,
        })
    } finally {
        await prisma.$disconnect();
    }
}