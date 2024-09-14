import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
import { uploadFileToSupabase, removeFileToSupabase } from "@/function/supabaseUpload";

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

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
    res: Response
) {
    try {
        await prisma.$transaction(async (prisma) => {
            await prisma.dormitory_facilitate.delete({
                where: { dmt_typeId: Number(params.id) },
            });
            const images = await prisma.dormitory_typeimg.findMany({
                where: { dmt_typeId: Number(params.id) },
            });
            await Promise.all(images.map(async (image) => {
                await removeFileToSupabase(image.url, 'dormitoryTypeImages');
            }));
            await prisma.dormitory_typeimg.deleteMany({
                where: { dmt_typeId: Number(params.id) },
            });
            await prisma.dormitory_type.delete({
                where: { id: Number(params.id) },
            });
        })
        return Response.json('success');
    } catch (error) {
        return new Response('Internal server error', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}