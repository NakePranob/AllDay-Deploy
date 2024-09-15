import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
  res: Response
) {
  try {
    // Step 1: Fetch dormitories owned by the user
    const dormitories = await prisma.dormitory.findMany({
      where: {
        userId: Number(params.id),  // Find dormitories where user is the owner
      },
      select: {
        id: true, // Only fetch the dormitory IDs
      },
    });

    // Step 2: Extract dormitory IDs
    const dormitoryIds = dormitories.map((d) => d.id);

    // Step 3: Fetch chats related to these dormitories
    const chats = await prisma.chat.findMany({
      where: {
        dmtId: {
          in: dormitoryIds,  // Find chats related to these dormitories
        },
      },
      select: {
        id: true,
        dormitory: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            firstname: true,
            lastname: true,
            profile: true,
          },
        },
      },
    });

    // Step 4: Fetch the latest messages for each chat
    const chatIds = chats.map((chat) => chat.id);
    const latestMessages = await prisma.chat_msg.findMany({
      where: {
        chatId: {
          in: chatIds,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      distinct: ["chatId"],
      select: {
        chatId: true,
        content: true,
      },
    });

    // Step 5: Map latest messages to chats
    const formattedResult = chats.map((chat) => ({
      ...chat,
      latestMessage: latestMessages.find((msg) => msg.chatId === chat.id)?.content || null,
    }));

    return Response.json(formattedResult);
  } catch (error) {
    return new Response(`error: ${error}`, {
      status: 400,
    });
  } finally {
    await prisma.$disconnect();
  }
}
