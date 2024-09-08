import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export async function PUT(req: Request, res: Response) {
    try {
        const {id, where, value}: {id: number, where: string, value: string} = await req.json();
        const result = await prisma.dormitory.update({
            where: {
                id
            },
            data: {
                [where]: value.slice(0, 70)
            }
        });
        return Response.json(result);
    } catch (error) {
        return new Response('Internal server error', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}