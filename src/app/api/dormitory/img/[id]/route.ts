import { PrismaClient } from "@prisma/client"
import { uploadFileToSupabase, removeFileToSupabase } from "@/function/supabaseUpload";
const prisma = new PrismaClient();

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } },
    res: Response
) {
    try {
        const result = await prisma.dormitory_img.delete({
            where: {
                id: Number(params.id)
            }
        });
        await removeFileToSupabase(result.url, 'dormitoryImages');

        return Response.json(result);
    } catch (error) {
        return new Response('Internal server error', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}