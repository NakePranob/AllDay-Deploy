'use client'
import { useEffect } from "react"
import { observer } from "mobx-react"
import type { Favorites } from "@/Types/dormitory";
import favorite from "@/stores/favorite"
import Image from "next/image"
import Link from "next/link"

// Material UI
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import Starscore from "@/components/Starscore"
import Alert from "@/components/Alert"

const Card = observer(({ data }: { data: Favorites[] }) => {

    useEffect(() => {
        favorite.setData(data);
    }, [data]); // เพิ่ม dependency array เพื่อให้แน่ใจว่า useEffect ทำงานเฉพาะเมื่อ data เปลี่ยนแปลง

    const imageUrl = (fileName: string) => {
        return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dormitoryImages/${fileName}`
    }

    return (
        <>
            {favorite.data.length > 0 ? favorite.data.map((item, i) => (
                <Link href={`/dormitory/${item.dormitory.id}`} key={i} className="card col-span-6 md:col-span-4 lg:col-span-3 relative transition-300
                hover:shadow-2xl dark:hover:shadow-xl hover:shadow-blue-300/60 dark:hover:shadow-blue-950/60">
                    <div className="w-full aspect-square rounded-t-2xl overflow-hidden">
                        <Image
                            src={item.dormitory.dormitory_img?.[0]?.url ? imageUrl(item.dormitory.dormitory_img?.[0]?.url) : '/404.png'}
                            alt={item.dormitory.dormitory_img?.[0]?.url || '404 Image'}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover object-center"
                            loading="lazy"
                        />
                    </div>
                    <div className="px-4 py-2 flex">
                        <div className="w-4/5">
                            <h1 className="text-lg font-medium text-ellipsis overflow-hidden whitespace-nowrap">
                                {item.dormitory.name}
                            </h1>
                            <p className="text-sm -mt-1 opacity-70">
                                {item.dormitory.engname ? item.dormitory.engname : 'หอพักดีๆ รอท่านอยู่'}
                            </p>
                        </div>
                        <div className="flex justify-end w-1/5">
                            <IconButton
                                onClick={() => favorite.delete(item.id)}
                                aria-label="delete"
                                className="aspect-square -me-2"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </div>
                    <div className="px-4 text-sm text-yellow-400">
                        <Starscore score={item.dormitory.reviewScore} />
                    </div>
                    <div className="px-4 py-2 flex justify-between border-t-2 border-dashed 
                    border-slate-200 dark:border-slate-800 items-end mt-2">
                        <p className="text-xl font-medium">
                            <span className="font-bold text-sm">฿</span>
                            {item.dormitory.price}
                        </p>
                        <Link href={`/dormitory/${item.dormitory.id}`} passHref>
                            <Button 
                                variant="contained" 
                                sx={{ 
                                    borderRadius: '3rem', 
                                    color: 'white',
                                    marginRight: '-0.25rem'
                                }}>
                                ดูหอพัก
                            </Button>
                        </Link>
                    </div>
                </Link>
            )) : (
                <h1 className="fixed-center">ไม่พบรายการโปรดของท่าน</h1>
            )}
            <Alert 
                open={favorite.alert.open} 
                state={favorite.alert.state} 
                text={favorite.alert.text} 
                link={favorite.alert.link} 
                close={() => favorite.resetAlert()} 
            />
        </>
    );
});

export default Card;
