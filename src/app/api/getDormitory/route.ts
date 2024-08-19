import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
    const getType = req.headers.get('getType')
    const lastFields = req.headers.get('lastFields')
    try {
        if (getType === 'get') {
            const data = await prisma.dormitory.findMany({
                where: {
                    occupied: false,
                },
                take: 7,
                select: {
                    id: true,
                    name: true,
                    engname: true,
                    price: true,
                    occupied: true,
                    reviewScore: true,
                    dormitory_state: true,
                    dormitory_img: true,
                    dormitory_type: {
                        select: {
                            dormitory_facilitate: true
                        },
                    },
                    review: {
                        select: {
                            score: true,
                        },
                    },  
                }
            })
            return Response.json({
                data,
            })
        } else {
            const data = await prisma.dormitory.findMany({
                take: 4,
                skip: 1,
                cursor: {
                    id: Number(lastFields),
                },
                select: {
                    id: true,
                    name: true,
                    engname: true,
                    price: true,
                    occupied: true,
                    reviewScore: true,
                    dormitory_state: true,
                    dormitory_img: true,
                    dormitory_type: {
                        select: {
                            dormitory_facilitate: true
                        },
                    },
                    review: {
                        select: {
                            score: true,
                        },
                    },  
                }
            })
            return Response.json({
                data,
            })
        }
    } catch (error) {
        return new Response(`error: ${error}`, {
            status: 400,
        })
    }
}

export async function POST(req: Request, res: Response) {
    const reqData = await req.json();

    const useState = Object.fromEntries(
        Object.entries(reqData.state).filter(([key, value]) => value === true)
    );

    const useFacilitate = Object.fromEntries(
        Object.entries(reqData.facilitate).filter(([key, value]) => value === true)
    );



    try {
        const data = await prisma.dormitory.findMany({
            where: {
                price: { gte: reqData.price[0], lte: reqData.price[1] },
                reviewScore: { gte: reqData.reviewScore },
                dormitory_type: {
                    some: {
                        dormitory_facilitate: useFacilitate,
                    },
                },
                dormitory_state: useState,
            },
            select: {
                id: true,
                name: true,
                engname: true,
                price: true,
                occupied: true,
                reviewScore: true,
                dormitory_state: true,
                dormitory_img: true,
                dormitory_type: {
                    select: {
                        dormitory_facilitate: true
                    },
                },
                review: {
                    select: {
                        score: true,
                    },
                },  
            },
        });
        return Response.json({
            message:"Success",
            data,
        })
    } catch (error) {
        return new Response(`error: ${error}`, {
            status: 400,
        })
    }
}