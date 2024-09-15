import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

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
        const user = await prisma.user.findUnique({
            where: {
                id: result.userId
            }
        });

        if (user?.roleId === 1) {
            await prisma.user.update({
                where: {
                    id: result.userId
                },
                data: {
                    roleId: 2
                }
            });
        }
        return Response.json(result);
    } catch (error) {
        return new Response('Internal server error', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}