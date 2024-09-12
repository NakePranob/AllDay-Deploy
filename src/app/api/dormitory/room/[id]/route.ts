import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export async function GET(
    request: Request,
    { params }: { params: { id: string } },
    res: Response
) {
    try {
        const result = await prisma.dormitory_type.findUnique({
            where: { id: Number(params.id) },
            include: {
                dormitory_typeimg: true,
                dormitory_facilitate: true,
            }
        });
        if (!result) {
            return new Response('Not found', { status: 404 });
        }
        return Response.json(result);
    } catch (error) {
        return new Response('Internal server error', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}