import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
    request: Request,
    { params }: { params: { id: string } },
    res: Response
) {
    try {
        const data = await prisma.dormitory.findUnique({
            where: {
                id: Number(params.id),
            },
            include: {
                dormitory_img: true,
                dormitory_state: true,
                location_distance: true,
                dormitory_type: {
                    include: {
                        dormitory_typeimg: true,
                        dormitory_facilitate: true,
                    },
                },
                review: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        if (!data) {
            return new Response('Dormitory not found', { status: 404 });
        }

        return Response.json(data);
    } catch (error) {
        console.error('Error fetching dormitory:', error);
        return new Response('Internal server error', { status: 500 });
    }
}