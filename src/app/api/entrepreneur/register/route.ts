import { PrismaClient } from "@prisma/client";
import { supabase } from "@/lib/supabaseClient";
import type { Dormitory_state, Facilitate, Location_distance } from "@/Types/registerEntrepreneur";

const prisma = new PrismaClient();

type TypeRoom = {
    name: string;
    price: string;
    quantity: string;
    width: string;
    length: string;
    imageSelect: File | null;
    facilitate: Facilitate;
    room_img: {
        imgFile: File | null;
    }[];
};

async function uploadFileToSupabase(file: File, folder: string) {
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from(folder).upload(fileName, file);
    if (error) throw new Error(`File upload error: ${error.message}`);
    return fileName;
}

async function createDormitoryWithDetails(formData: FormData) {
    const userId = formData.get('userId')?.toString() || '';
    const name = formData.get('name')?.toString() || '';
    const engname = formData.get('engname')?.toString() || '';
    const price = formData.get('price')?.toString() || '';
    const address = formData.get('address')?.toString() || '';
    const location = formData.get('location')?.toString() || '';
    const facebook = formData.get('facebook')?.toString() || '';
    const line = formData.get('line')?.toString() || '';
    const doc = formData.get('doc')?.toString() || '';
    const phone = formData.get('phone')?.toString() || '';
    const stateJson = formData.get('state')?.toString() || '';
    const location_distance = formData.get('locationDistanceList')?.toString() || '';
    const typeRoomListJson = formData.get('typeRoomList')?.toString() || '';

    if (!stateJson || !typeRoomListJson) {
        throw new Error('Missing required form data');
    }

    const typeRoomList: TypeRoom[] = JSON.parse(typeRoomListJson);
    const state: Dormitory_state = JSON.parse(stateJson);
    const location_distanceList: Location_distance[] = JSON.parse(location_distance);


    return await prisma.$transaction(async (prisma) => {
        // Create Dormitory
        const dormitory = await prisma.dormitory.create({
            data: {
                name,
                engname,
                userId: Number(userId),
                address,
                location,
                price: Number(price),
                doc,
                facebook,
                line,
                phone: phone ? Number(phone) : null,
            }
        });

        // Create Dormitory_state
        await prisma.dormitory_state.create({
            data: {
                dmtId: dormitory.id,
                ...state
            }
        });

        await Promise.all(location_distanceList.map(async (item, index) => {
            await prisma.location_distance.create({
                data: {
                    dmtId: dormitory.id,
                    location: item.location,
                    distance: item.distance,
                }
            });
        }));

        // Handle file uploads for Dormitory images
        const fileKeys = Array.from(formData.keys()).filter(key => key.startsWith('image'));
        await Promise.all(fileKeys.map(async (fileKey) => {
            const file = formData.get(fileKey);
            if (!(file instanceof File)) throw new Error('Invalid file');
            const fileName = await uploadFileToSupabase(file, 'dormitoryImages');
            await prisma.dormitory_img.create({
                data: { dmtId: dormitory.id, url: fileName },
            });
        }));

        // Handle Dormitory types and their images
        await Promise.all(typeRoomList.map(async (typeRoom, index) => {
            const dormitoryType = await prisma.dormitory_type.create({
                data: {
                    dmtId: dormitory.id,
                    name: typeRoom.name,
                    price: Number(typeRoom.price),
                    quantity: Number(typeRoom.quantity),
                    width: typeRoom.width ? Number(typeRoom.width) : null,
                    length: typeRoom.length ? Number(typeRoom.length) : null,
                }
            });

            await prisma.dormitory_facilitate.create({
                data: {
                    dmt_typeId: dormitoryType.id,
                    ...typeRoom.facilitate
                }
            });

            await Promise.all(typeRoom.room_img.map(async (room_img, index2) => {
                const fileKey = `room_img[${index}].imgFile[${index2}]`;
                const file = formData.get(fileKey);
                if (!(file instanceof Blob)) throw new Error('Invalid file');

                const fileName = await uploadFileToSupabase(file as File, 'dormitoryTypeImages');
                await prisma.dormitory_typeimg.create({
                    data: {
                        dmt_typeId: dormitoryType.id,
                        url: fileName,
                    }
                });
            }));
        }));

        return dormitory;
    });
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const dormitory = await createDormitoryWithDetails(formData);

        return new Response(JSON.stringify({ message: 'success' }), { status: 200 });
    } catch (error) {
        console.error('Error during registration:', error);
        return new Response(JSON.stringify({ message: 'Registration failed', error: error }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
