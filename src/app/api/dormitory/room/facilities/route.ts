import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export async function PUT(req: Request, res: Response) {
    try {
        const {key, where, state} = await req.json();
        const result = await prisma.dormitory_facilitate.update({
            where: {
                id: key
            },
            data: {
                [where]: state
            }
        })
        return Response.json(result);
    } catch (error) {
        return new Response('Internal server error', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}