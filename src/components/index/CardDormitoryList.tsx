'use client'
import { observer } from 'mobx-react'
import dormitory from '@/stores/dormitory';
import Link from 'next/link';
import Image from 'next/image';

// Material UI
import { Button } from "@mui/material"

// Components
import Starscore from '../Starscore';
import TextStateReview from '../TextStateReview';

// Icons
import { FaDoorOpen } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";

type Props = {}

const CardDormitoryList = observer((props: Props) => {

    const imageUrl = (fileName: string, index: number) => {
        return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dormitoryImages/${fileName}`
    }

    return (
        <>
            { dormitory.dormitoryList && dormitory.dormitoryList.map(data => (
                <section key={data.id} className={`card rounded-3xl lg:rounded-2xl w-full flex ${dormitory.layoutList ? 'flex-col' : 'h-56'}
                transition-all duration-300 ease-in-out`}>
                    <div className={`bg-slate-100 dark:bg-gray-800 overflow-hidden
                    ${dormitory.layoutList ? 'w-full aspect-[16/10]  rounded-t-2xl' : 'h-full w-64 lg:w-[17rem] rounded-s-2xl'}`}>
                        <div className={`w-full ${dormitory.layoutList ? 'h-full' : 'h-[10.5rem]'}`}>
                            <Image
                                src={data.dormitory_img?.[0]?.url ? imageUrl(data.dormitory_img?.[0]?.url, 0) : '/404.png'}
                                alt={`${data.dormitory_img?.[0]?.url || '/404.png'}`}
                                width={220}
                                height={120}
                                className='h-full w-full
                                object-cover object-center'
                                priority
                            />
                        </div>
                        <div className={`flex h-[3.5rem] gap-1 pt-1 ${dormitory.layoutList && 'hidden'}`}>
                            <div className='flex-1 h-full'>
                                <Image
                                    src={data.dormitory_img?.[1]?.url ? imageUrl(data.dormitory_img?.[1]?.url, 1) : '/404.png'}
                                    alt={`${data.dormitory_img?.[1]?.url || '/404.png'}`}
                                    width={100}
                                    height={70}
                                    className='h-full w-full
                                    object-cover object-center'
                                    priority
                                />
                            </div>
                            <div className='flex-1 h-full'>
                                <Image
                                    src={data.dormitory_img?.[2]?.url ? imageUrl(data.dormitory_img?.[2]?.url, 2) : '/404.png'}
                                    alt={`${data.dormitory_img?.[2]?.url || '/404.png'}`}
                                    width={100}
                                    height={70}
                                    className='h-full w-full
                                    object-cover object-center'
                                    priority
                                />
                            </div>
                            <div className='flex-1 h-full relative'>
                                <Link href={`/dormitory/${data.id}`} className='bg-black/50 absolute left-0 top-0 h-full w-full
                                flex-center text-white text-xs'>
                                    ดูภาพถ่าย
                                </Link>
                                <Image
                                    src={data.dormitory_img?.[3]?.url ? imageUrl(data.dormitory_img?.[3]?.url, 3) : '/404.png'}
                                    alt={`${data.dormitory_img?.[3]?.url || '/404.png'}`}
                                    width={100}
                                    height={70}
                                    className='h-full w-full
                                    object-cover object-center'
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`relative ${!dormitory.layoutList ? 'flex-1 p-4' : 'p-2 pb-4'}`}>
                        <h1 className='text-base font-bold max-w-[80%]
                        text-ellipsis overflow-hidden whitespace-nowrap'>
                            {data.name}
                        </h1>
                        <p className='text-xs max-w-[80%] opacity-70 h-4
                        text-ellipsis overflow-hidden whitespace-nowrap'>
                            {data.engname ? data.engname : 'หอพักดีๆ รอท่านอยู่'}
                        </p>
                        <div className='flex-y-center gap-2 mt-2 text-yellow-300'>
                            <span className='flex-center w-20 rounded-full gap-2 py-1
                            bg-blue-200/50 dark:bg-blue-900/30 text-xs text-blue-500'>
                                {data.dormitory_state?.home ? 
                                    <>
                                        <FaDoorOpen/> บ้านพัก
                                    </>
                                    :
                                    <>
                                        <FaDoorOpen/> ห้องพัก
                                    </>
                                }
                            </span>
                            <Starscore score={data.reviewScore}/>
                        </div>
                        <div className={`absolute flex flex-col items-end opacity-70
                        ${dormitory.layoutList ? 'right-2 bottom-2' : 'right-4 top-4'}`}>
                            <h1 className={`-mb-1 ${dormitory.layoutList ? 'text-sm' : 'text-base'}`}>{data.review.length} รีวิว</h1>
                            <p className={`-mb-1 ${dormitory.layoutList ? 'text-xs' : 'text-sm'}`}>
                                <TextStateReview score={data.reviewScore} countReview={data.review.length}/>
                            </p>
                        </div>
                        <Link href={data.location ? data.location : '#'} className='mt-2 flex-y-center gap-2 text-sm
                        opacity-70 hover:opacity-100 transition-300'>
                            <GrMapLocation className='mb-1'/> ตำแหน่งที่พัก
                        </Link>
                        <div className={`absolute left-0 bottom-0 py-1 px-6 bg-blue-500 rounded-tr-full
                        ${dormitory.layoutList && 'hidden'} text-white text-xs`}>
                            หอพักที่คุณอาจสนใจ
                        </div>
                    </div>
                    <div className={`border-dashed border-slate-100 dark:border-gray-800
                    flex items-end ${!dormitory.layoutList ? 'h-full w-40 lg:w-52 border-s-2 flex-col justify-end p-4' : 
                    'border-t-2 justify-between ps-3 pe-2 py-3'}`}>
                        <h1 className={`text-2xl font-bold text-rose-500 ${dormitory.layoutList && '-mb-2'}`}>
                            <span className="text-sm">THB</span>{data.price}
                        </h1>
                        <Link href={`/dormitory/${data.id}`}>
                            <Button variant="contained" sx={{ color: "#fff", borderRadius: "3rem" }}>เลือกหอพัก</Button>
                        </Link>
                    </div>
                </section>
            ))}
        </>
        
    )
})

export default CardDormitoryList