'use client';
import { useState, useEffect, createRef } from "react";
import { observer } from "mobx-react";
import dormitoryOnly from "@/stores/dormitoryOnly";
import { useSession } from 'next-auth/react';

// Material-UI components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';

// Icons
import { BiSolidComment } from "react-icons/bi";    
import { FaStar } from "react-icons/fa";

// Components
import Starscore from "@/components/Starscore";
import TextStateReview from "@/components/TextStateReview";
import Alert from "@/components/Alert";

// Functions
import { CountPercent, StringDatetimeToDate } from "@/function/maths";
import { Star } from "@mui/icons-material";

const Review = observer(({ dormitoryId }: { dormitoryId: string }) => {
    const { data: session, status } = useSession();
    const [liveAt, setLiveAt] = useState<number | null>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchUserDormitory = async () => {
            if (session?.user?.id) {
                const dormitoryIdResponse = await dormitoryOnly.getUserState(session.user.id);
                setLiveAt(dormitoryIdResponse);
            }
        };
        console.log("session", session);

        fetchUserDormitory();
    }, [session]);


    const reviewData = dormitoryOnly.data?.review ?? [];
    const totalReviews = reviewData.length;

    const style = {
        position: 'absolute' as 'absolute',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        dormitoryOnly.targetReview = dormitoryOnly.targetReview || createRef<HTMLElement>();
    }, []);

    return (
        <>
            <Modal
                open={dormitoryOnly.open}
                onClose={() => dormitoryOnly.setOpen(false)}
                aria-labelledby="review-modal-title"
                aria-describedby="review-modal-description"
            >
                <Box className="card rounded-b-none sm:rounded-b-2xl alert w-full sm:w-[26rem] sm:top-1/2 sm:left-1/2 
                sm:translate-x-[-50%] sm:translate-y-[-50%] bottom-0 sm:bottom-auto left-0 p-4" sx={style}>
                    <div className="w-full flex-center">
                        <span onClick={() => dormitoryOnly.setOpen(false)} className="w-12 h-1 mb-4 rounded-full bg-blue-300/30"></span>
                    </div>
                    <Typography id="review-modal-title" variant="h6" component="h2">
                        คุณคิดยังไงกับหอพักนี้
                    </Typography>
                    <form onSubmit={(e) => dormitoryOnly.review(e, session?.user?.id)} noValidate autoComplete="off" className="mt-4">
                        <Typography className="flex gap-2">
                            <Typography component="legend" className="mt-1">คะแนน:</Typography>
                            <Rating
                                name="rating"
                                size="large"
                                className="text-yellow-400"
                            />
                        </Typography>
                        <TextField label="ความคิดเห็น" name="comment" variant="outlined" className="w-full mt-4"/>
                        <Button type="submit" variant="contained" className="w-full h-10 mt-6 mb-2 text-white rounded-full">
                            ยืนยัน
                        </Button>
                    </form>
                </Box>
            </Modal>
            <Alert open={dormitoryOnly.alert.open} state={dormitoryOnly.alert.state} 
            text={dormitoryOnly.alert.text} link={dormitoryOnly.alert.link} close={()=>dormitoryOnly.resetAlert()}/>
            <section ref={dormitoryOnly.targetReview} className="card rounded-none sm:rounded-2xl p-4 mt-2 relative overflow-hidden">
                <span className="absolute w-80 h-80 bg-blue-400/20 -top-24 -left-44 rotate-[50deg] rounded-[2rem]"></span>
                <span className="absolute w-52 h-52 bg-blue-400/20 -top-10 -left-32 rotate-[50deg] rounded-[1rem]"></span>
                <h1 className="font-semibold text-lg mb-4 relative">
                    การให้คะแนนและบทรีวิวโดยรวม
                    <p className="text-sm opacity-70">
                        จากบทรีวิวจำนวน {totalReviews} รายการของผู้เข้าพักที่ได้รับการยืนยัน
                    </p>
                    {liveAt === Number(dormitoryId) && (
                        <IconButton
                            aria-label="editReview"
                            onClick={() => dormitoryOnly.setOpen(true)}
                            color="primary"
                            size="small"
                            className="absolute right-0 top-0 text-sm"
                        >
                            <EditIcon />
                        </IconButton>
                    )}
                </h1>
                <div className="flex sm:items-center flex-col sm:flex-row relative">
                    <div className="flex-y-center gap-8 me-12 mt-4 sm:mt-0">
                        <div className="flex-center aspect-square rounded-full h-24 sm:h-28 bg-blue-400 outline outline-8 outline-offset-4 outline-blue-300 dark:outline-blue-600/40 ms-3 sm:ms-10 font-bold text-[2.5rem] sm:text-5xl text-white">
                            {dormitoryOnly.data?.reviewScore}
                        </div>
                        <div className="text-2xl font-medium">
                            <TextStateReview score={dormitoryOnly.data?.reviewScore} countReview={totalReviews}/>
                            <h1 className="text-yellow-400 text-xl">
                                <Starscore score={dormitoryOnly.data?.reviewScore}/>
                            </h1>
                        </div>
                    </div>
                    <div className="sm:flex-1 flex flex-col gap-2 mt-6 sm:mt-0 sm:me-8">
                        {[5, 4, 3, 2, 1].map(score => {
                            const count = reviewData.filter(item => item.score === score).length;
                            const percentage = totalReviews > 0 ? CountPercent(count, totalReviews) : 0;

                            return (
                                <div className="flex-y-center gap-2" key={score}>
                                    <p className="text-base font-medium">{score}</p>
                                    <div className="flex-1 h-3 rounded-full bg-slate-100 dark:bg-gray-800">
                                        <div 
                                            style={{ width: `${percentage}%` }}
                                            className="h-full rounded-full bg-blue-400">
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium opacity-50 hidden sm:block w-8 ms-2">
                                        {count}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <ul className="mt-8 flex flex-col gap-2">
                    {reviewData.map((item, i) => (
                        item.score && item.content && (
                            <li className="p-4 border-items rounded-xl" key={i}>
                                <div className="flex relative gap-2">
                                    <div className="flex gap-2">
                                        <p className="text-base font-medium">{item.user.firstname ? item.user.firstname : "Not Name"} {item.user?.lastname}</p>
                                        <p className="text-xs mt-[.35rem] opacity-70">{StringDatetimeToDate(item.createdAt)}</p>
                                    </div>
                                    <div className="absolute right-0 flex-center flex-col
                                    text-sm text-blue-400 h-full">
                                        <Starscore score={item.score}/>
                                    </div>
                                </div>
                                {item.content &&
                                    <p className="text-sm opacity-80 flex-y-center mt-2">
                                        <BiSolidComment className="me-2 text-blue-400"/>
                                        {item.content}
                                    </p>
                                }
                            </li>
                        )
                    ))}
                </ul>
            </section>
        </>
    );
});

export default Review;
