import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export async function GET(
    req: Request, 
    { params }: { params: { id: string } },
    res: Response
) {
    try {
        // Step 1: Fetch chats
        const chats = await prisma.chat.findMany({
            where: {
                userId: Number(params.id),
            },
            select: {
                id: true,
                dormitory: {
                    select: {
                        name: true,
                        dormitory_img: true,
                    }
                },
            }
        });

        // Step 2: Fetch the latest messages for each chat
        const chatIds = chats.map(chat => chat.id);
        const latestMessages = await prisma.chat_msg.findMany({
            where: {
                chatId: {
                    in: chatIds
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            distinct: ['chatId'],
            select: {
                chatId: true,
                content: true
            }
        });

        // Map latest messages to chats
        const formattedResult = chats.map(chat => {
            // Get the first dormitory_img if available
            const dormitoryImg = chat.dormitory?.dormitory_img[0] || null;
            return {
                ...chat,
                dormitory: {
                    ...chat.dormitory,
                    dormitory_img: dormitoryImg,
                },
                latestMessage: latestMessages.find(msg => msg.chatId === chat.id)?.content || null
            };
        });

        return Response.json(formattedResult);
    } catch (error) {
        return new Response(`error: ${error}`, {
            status: 400,
        });
    } finally {
        await prisma.$disconnect();
    }
}
