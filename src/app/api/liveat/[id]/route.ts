import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
    request: Request,
    { params }: { params: { id: string } },
    res: Response
) {
    try {
        const result = await prisma.user.findUnique({
            where: {
                id: Number(params.id),
            },
            select: {
                liveAt: {
                    select: {
                        dmtId: true,
                    }
                },
            }
        })
        return Response.json(result?.liveAt?.dmtId)

    } catch (error) {
        return new Response(`error: ${error}`, {
            status: 400,
        })
    }
}