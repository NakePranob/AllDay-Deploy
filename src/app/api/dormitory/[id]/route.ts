import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
import { uploadFileToSupabase, removeFileToSupabase } from "@/function/supabaseUpload";

export async function GET(
    request: Request,
    { params }: { params: { id: string } },
    res: Response
) {
    try {
        const result = await prisma.dormitory.findMany({
            where: {
                userId: Number(params.id)
            }
        })
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
            await prisma.live_At.deleteMany({ where: { dmtId: Number(params.id) } });
            await prisma.favorite.deleteMany({ where: { dmtId: Number(params.id) } });
            await prisma.review.deleteMany({ where: { dmtId: Number(params.id) } });
            await prisma.location_distance.deleteMany({ where: { dmtId: Number(params.id) } });
            await prisma.dormitory_state.delete({ where: { dmtId: Number(params.id) } });

            const room = await prisma.dormitory_type.findMany({ where: { dmtId: Number(params.id) } });
            await Promise.all(
                room.map(async (item) => {
                    // ลบภาพที่เกี่ยวข้องกับ room (dormitory_typeimg)
                    const images = await prisma.dormitory_typeimg.findMany({
                        where: { dmt_typeId: item.id },
                    });
                    await Promise.all(images.map(async (image) => {
                        await removeFileToSupabase(image.url, 'dormitoryTypeImages');
                    }));

                    await prisma.dormitory_typeimg.deleteMany({
                        where: { dmt_typeId: item.id },
                    });
                    
                    await prisma.dormitory_facilitate.delete({ where: { dmt_typeId: item.id } });
                    await prisma.reserve.deleteMany({ where: { dmt_typeId: item.id } });

                    // ลบ room หลังจากที่ได้ลบความสัมพันธ์กับ dormitory_typeimg เสร็จสิ้นแล้ว
                    await prisma.dormitory_type.delete({ where: { id: item.id } });
                })
            );

            // ลบ chat
            const chat = await prisma.chat.findMany({ where: { dmtId: Number(params.id) } });
            await Promise.all(
                chat.map(async (item) => {
                    await prisma.chat_msg.deleteMany({ where: { chatId: item.id } });
                    await prisma.chat.delete({ where: { id: item.id } });
                })
            );

            // ลบภาพที่เกี่ยวข้องกับ dormitory
            const dorImages = await prisma.dormitory_img.findMany({
                where: { dmtId: Number(params.id) },
            });
            await Promise.all(
                dorImages.map(async (item) => {
                    await removeFileToSupabase(item.url, 'dormitoryImages');
                })
            );
            await prisma.dormitory_img.deleteMany({
                where: { dmtId: Number(params.id) },
            });

            // ลบ dormitory
            await prisma.dormitory.delete({
                where: { id: Number(params.id) },
            });
        });

        return new Response("Deleted successfully", { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('Internal server error', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
