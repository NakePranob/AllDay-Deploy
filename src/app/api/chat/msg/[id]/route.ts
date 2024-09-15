import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const dmt = await prisma.chat.findUnique({
        where: {
            id: Number(params.id),
        },
        select: {
            id: true,
            dormitory: {
                select: {
                    id: true,
                    name: true,
                },
            },
            user: {
                select: {
                    id: true,
                },
            },
        },
    });

    if (!dmt) {
      return new Response("Dormitory not found", { status: 404 });
    }

    const msg = await prisma.chat_msg.findMany({
        where: {
            chatId: Number(params.id),
        },
    });

    // Combine dmt and msg into a new object
    const result = {
        ...dmt,
        msg,
    };

    return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
    } catch (error) {
        return new Response(`error: ${error}`, {
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}
