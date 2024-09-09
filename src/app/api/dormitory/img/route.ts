import { PrismaClient } from "@prisma/client";
import { uploadFileToSupabase, removeFileToSupabase } from "@/function/supabaseUpload";
const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
    try {
        const formData = await req.formData();
        const id = formData.get('id') as string;
        const file = formData.get('file') as File;
        
        const result = await prisma.$transaction(async (prisma) => {
            
            const fileNameUpload = await uploadFileToSupabase(file, 'dormitoryImages');
            return await prisma.dormitory_img.create({
                data: {
                    dmtId: Number(id),
                    url: fileNameUpload
                }
            });

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
        const formData = await req.formData();
        const id = formData.get('id') as string;
        const file = formData.get('file') as File;
        
        const result = await prisma.$transaction(async (prisma) => {
            const fileName = await prisma.dormitory_img.findUnique({
                where: {
                    id: Number(id)
                },
                select: {
                    url: true
                }
            })

            if ( fileName && await removeFileToSupabase(fileName.url, 'dormitoryImages')) {
                const fileNameUpload = await uploadFileToSupabase(file, 'dormitoryImages');
                return await prisma.dormitory_img.update({
                    where: {
                        id: Number(id)
                    },
                    data: {
                        url: fileNameUpload
                    }
                });
            } else {
                throw new Error('File not found');
            }
        })


        return Response.json(result);
    } catch (error) {
        return new Response('Internal server error', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}