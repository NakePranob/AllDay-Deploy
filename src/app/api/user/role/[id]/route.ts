import { PrismaClient } from "@prisma/client"
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
                role: {
                    select: {
                        role: true,
                    }
                },
            }
        })
        return Response.json(result?.role?.role);


    } catch (error) {
        return new Response(`error: ${error}`, {
            status: 400,
        })
    } finally {
        await prisma.$disconnect();
    }
}