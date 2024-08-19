import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export async function GET(
    request: Request,
    { params }: { params: { id: string } },
    res: Response
) {
    try {
        const data = await prisma.favorite.findMany({
            where: {
                userId: Number(params.id),
            },
            select: {
                id: true,
                dmtId: true,
                dormitory: {
                    select: {
                        id: true,
                        name: true,
                        engname: true,
                        price: true,
                        reviewScore: true,
                        dormitory_img: {
                            select: {
                                url: true,
                            },
                            take: 1
                        },
                    }
                }
            }
        })

        if (!data) {
            return new Response('Dormitory not found', { status: 404 });
        }

        return Response.json(data);
    } catch (error) {
        // console.error('Error fetching dormitory:', error);
        return new Response('Internal server error', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
    res: Response
) {
    try {
        const result = await prisma.favorite.delete({
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