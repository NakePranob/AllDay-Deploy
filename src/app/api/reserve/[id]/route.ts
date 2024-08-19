import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export async function GET(
    req: Request, 
    { params }: { params: { id: string } },
    res: Response
) {
    try {
        const result = await prisma.reserve.findUnique({
            where: {
                userId: Number(params.id),
            },
            include: {
                dormitory_type: {
                    include: {
                        dormitory_typeimg: true,
                        dormitory_facilitate: true,
                        dormitory: {
                            include: {
                                dormitory_state: true
                            }
                        },
                    }
                }
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

export async function DELETE(
    req: Request, 
    { params }: { params: { id: string } },
    res: Response
) {
    try {
        const result = await prisma.reserve.delete({
            where: {
                id: Number(params.id),
            },
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