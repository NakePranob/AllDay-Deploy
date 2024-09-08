import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
    const {id, location, distance}: {id:number ,location:string, distance:number} = await req.json();
    try {
        const result = await prisma.location_distance.create({
            data: {
                dmtId: id,
                location,
                distance
            }
        })
        return Response.json(result);
    } catch (error) {
        return new Response('Internal server error', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function PUT(req: Request, res: Response) {
    try {
        const {key, where, value} = await req.json();
        const result = await prisma.location_distance.update({
            where: {
                id: key
            },
            data: {
                [where]: value
            }
        })
        return Response.json(result);
    } catch (error) {
        return new Response('Internal server error', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}