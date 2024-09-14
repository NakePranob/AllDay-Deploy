import { PrismaClient } from "@prisma/client"
import { uploadFileToSupabase, removeFileToSupabase } from "@/function/supabaseUpload";
const prisma = new PrismaClient();

export async function PUT(req: Request, res: Response) {
    try {
        const {id, where, value}: {id: number, where: string, value: string | number} = await req.json();
        const result = await prisma.dormitory_type.update({
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

export async function POST(req: Request, res: Response) {
    const formData = await req.formData();
    const name = formData.get('name')?.toString() || '';
    const quantity = formData.get('quantity')?.toString() || '';
    const price = formData.get('price')?.toString() || '';
    const width = formData.get('width')?.toString() || '';
    const length = formData.get('length')?.toString() || '';
    const dmtId = formData.get('dmtId')?.toString() || '';
    const facilitiesData = formData.get('facilities')?.toString() || '';
    const facilities = JSON.parse(facilitiesData);

    try {
        const result = await prisma.$transaction(async (prisma) => {
            const dormitoryType = await prisma.dormitory_type.create({
                data: {
                    name,
                    quantity: Number(quantity),
                    price: Number(price),
                    width: width ? Number(width) : null,
                    length: length ? Number(length) : null,
                    dmtId: Number(dmtId)
                }
            });

            await prisma.dormitory_facilitate.create({
                data: {
                    dmt_typeId: dormitoryType.id,
                    ...facilities
                }
            });

            const fileKeys = Array.from(formData.keys()).filter(key => key.startsWith('image'));
            await Promise.all(fileKeys.map(async (fileKey) => {
                const file = formData.get(fileKey);
                if (!(file instanceof File)) throw new Error('Invalid file');

                const fileName = await uploadFileToSupabase(file, 'dormitoryTypeImages');
                await prisma.dormitory_typeimg.create({
                    data: { dmt_typeId: dormitoryType.id, url: fileName },
                });
            }));
        })

        return new Response('success');
    } catch (error) {
        return new Response('Internal server error', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}