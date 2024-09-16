import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
    try {
        const {userId, dmtId, dmt_typeId} = await req.json();

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
            const room = await prisma.dormitory_type.findUnique({
                where: {
                    id: dmt_typeId,
                }
            });
            if (room && room?.occupied < room?.quantity) {
                await prisma.dormitory_type.update({
                    where: {
                        id: dmt_typeId,
                    },
                    data: {
                        occupied: {
                            increment: 1,
                        }
                    }
                })
            }

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