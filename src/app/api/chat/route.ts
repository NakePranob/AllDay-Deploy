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

export async function POST(req: Request, res: Response) {
    try {
        const {chatId, msg, sender, read} = await req.json();
        const result = await prisma.chat_msg.create({
            data: {
                chatId: chatId,
                content: msg,
                state_chat: sender,
                [read]: true
            },
        })
        return Response.json(result);
    } catch (error) {
        return new Response(`error: ${error}`, {
            status: 500,
        })
    } finally {
        await prisma.$disconnect();
    }
}