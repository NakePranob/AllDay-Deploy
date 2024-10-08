import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
    try {
        const url = new URL(req.url);
        const state = url.searchParams.get('state');

        console.log('State:', state);

        const result = await prisma.dormitory.findMany({
            where: state ? { state: state === 'true' } : {},
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
        const {id, where, value}: {id: number, where: string, value: string | number | boolean} = await req.json();
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