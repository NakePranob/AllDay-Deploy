import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } },
    res: Response
) {
    try {
        const result = await prisma.location_distance.delete({
            where: {
                id: Number(params.id)
            }
        })
        return Response.json(result);
    } catch (error) {
        return new Response('Internal server error', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}