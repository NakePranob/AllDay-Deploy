import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
    try {
        const { rating, comment, dmtId, userId } = await req.json();

        // Ensure inputs are valid
        if (isNaN(Number(rating)) || isNaN(Number(dmtId)) || isNaN(Number(userId))) {
            return new Response("Invalid input", { status: 400 });
        }

        const [review, totalScore] = await prisma.$transaction(async (prisma) => {
            const review = await prisma.review.create({
                data: {
                    score: Number(rating),
                    content: comment,
                    dmtId: Number(dmtId),
                    userId: Number(userId),
                },
                include: {
                    user: true,
                }
            });

            const reviewData = await prisma.review.findMany({
                where: {
                    dmtId: Number(dmtId),
                },
                select: {
                    score: true
                }
            });

            const sum = reviewData.reduce((acc, item) => acc + item.score, 0);
            const average = reviewData.length ? sum / reviewData.length : 0;

            const updatedDormitory = await prisma.dormitory.update({
                where: {
                    id: Number(dmtId),
                },
                data: {
                    reviewScore: parseFloat(average.toFixed(1)),
                }
            });

            return [review, updatedDormitory.reviewScore];
        });

        return new Response(JSON.stringify({
            totalScore,
            review
        }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });

    } catch (error) {
        console.error(error);
        return new Response(`Error: ${error}`, {
            status: 500,
        });
    }
}