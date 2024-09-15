import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
    try {
        const {userId, dmtId} = await req.json();

        const result = await prisma.$transaction(async (prisma) => {
            const createdLiveAt = await prisma.live_At.create({
                data: {
                    userId: userId,
                    dmtId: dmtId,
                }
            });
            await prisma.reserve.delete({
                where: {
                    userId: userId,
                }
            });
            return createdLiveAt ;
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