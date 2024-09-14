import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
    try {
        const result = await prisma.dormitory.findMany({
            include: {
                user: true
            }
        });
        return Response.json(result);
    } catch (error) {
        return new Response('Internal server error', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function PUT(req: Request, res: Response) {
    try {
        const {id, where, value}: {id: number, where: string, value: string | number} = await req.json();
        const result = await prisma.dormitory.update({
            where: {
                id
            },
            data: {
                [where]: value
            }
        });
        return Response.json(result);
    } catch (error) {
        return new Response('Internal server error', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}