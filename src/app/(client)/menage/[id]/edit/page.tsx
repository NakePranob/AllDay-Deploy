'use client';

import { useEffect, useState } from 'react';
import MenageMenu from '@/components/dormitory/MenageMenu';
import axios from 'axios';
import Image from 'next/image';
import type { Dormitory, Dormitory_img } from '@/Types/dormitory';

// Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

// Icons
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiImageEditFill, RiImageEditLine } from "react-icons/ri";
import { MdDelete, MdDeleteOutline } from "react-icons/md";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

// Components
import Carousel from '@/components/dormitory/Carousel';

const Page = ({ params }: { params: { id: string }}) => {
    const [data, setData] = useState<Dormitory | null>(null);
    const [previewImg, setPreviewImg] = useState<Dormitory_img[] | null>(null);
    const [lastImg, setLastImg] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [imgModal, setImgModal] = useState(false);
    const [isHoveredEdit, setIsHoveredEdit] = useState<boolean>(false);
    const [isHoveredDelete, setIsHoveredDelete] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getDormitory/${params.id}`);
                setData(result.data);
                setPreviewImg(result.data.dormitory_img.slice(0, 8));
                setLastImg(result.data.dormitory_img.length - 1);
            } catch (err) {
                setError('Failed to fetch data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
    
        if (params.id) {
            fetchData();
        }
    }, [params.id]);

    return (
        <div className="pt-16 lg:pt-20">
            <MenageMenu param={params.id} />
            {loading ? (
                <p className='fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>Loading...</p>
            ) : error ? (
                <p className='fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>มีบางอย่างผิดพลาด</p>
            ) : (
                <div className="container rounded-none sm:rounded-3xl mt-0 sm:mt-6 card px-0 overflow-hidden">
                    <button onClick={() => setImgModal(true)} className='w-full h-64 md:h-96'>
                        {data?.dormitory_img && data?.dormitory_img.length > 0 
                            ? <Carousel data={data?.dormitory_img} path='dormitoryImages'/>
                            : <Image
                                src={'/404.png'}
                                alt='404.png'
                                width={1920}
                                height={600}
                                className='object-center object-cover w-full h-full'
                                priority={true}
                              />
                        }
                    </button>
                        {imgModal &&
                            <>
                                <span onClick={()=>setImgModal(false)} className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-999 bg-black/70 h-screen w-screen'></span>
                                <div className="w-[90%] lg:w-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-999">
                                    <div className='flex-center mb-10'>
                                        <div className="relative">
                                            <img
                                                // src={'/images/profile/1718193891747-getstudentimageftp.jpg'}
                                                src={'/404.png'}
                                                alt='404.png'
                                                className='object-center object-contain max-h-[50vh]'
                                                loading='lazy'
                                            />
                                            <span className='w-full h-full bg-black/50 opacity-0 hover:opacity-100 transition-300 
                                            flex-center absolute top-0 left-0 gap-4'>
                                                <button 
                                                    className='text-2xl text-white hover:bg-slate-100/20 p-2 rounded-full transition-300'
                                                    onMouseEnter={() => setIsHoveredEdit(true)}
                                                    onMouseLeave={() => setIsHoveredEdit(false)}
                                                >
                                                    {isHoveredEdit ? <RiImageEditFill /> : <RiImageEditLine />}
                                                </button>
                                                <button 
                                                    className='text-2xl text-red-500 hover:bg-red-200/20 p-2 rounded-full hover:text-red-600 transition-300'    
                                                    onMouseEnter={() => setIsHoveredDelete(true)}
                                                    onMouseLeave={() => setIsHoveredDelete(false)}
                                                >
                                                    {isHoveredDelete ? <MdDelete /> : <MdDeleteOutline />}
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex md:justify-center gap-2 h-16 overflow-x-auto">
                                        {previewImg?.map((item, index) => (
                                            <div key={index} className='h-full aspect-square bg-base overflow-hidden min-w-16'>
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dormitoryImages/${item.url}`}
                                                    alt={item.url}
                                                    width={100}
                                                    height={100}
                                                    className='object-center object-cover w-full h-full'
                                                    loading='lazy'
                                                />
                                            </div>
                                        ))}
                                        {lastImg >= 0 && data?.dormitory_img && (
                                            <div className='h-full aspect-square bg-base overflow-hidden relative min-w-16'>
                                                <button className="absolute w-full h-full flex-center text-white text-xs bg-black/50">
                                                    ดูเพิ่มเติม
                                                </button>
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dormitoryImages/${data?.dormitory_img[lastImg]?.url}`}
                                                    alt={data?.dormitory_img?.[lastImg]?.url || '/404.png'}
                                                    width={100}
                                                    height={100}
                                                    className='object-center object-cover w-full h-full'
                                                    loading='lazy'
                                                />
                                            </div>
                                        )}
                                        <button className='h-full aspect-square border-dashed border-2 border-slate-200/40 min-w-16
                                        flex-center text-4xl bg-slate-200/30 text-white opacity-60 hover:opacity-100 transition-300'>
                                            <AiOutlinePlusCircle className='opacity-50'/>
                                        </button>
                                    </div>
                                </div>
                            </>
                        }
                    <div className="card-body pb-8 pt-8">
                        <form action="" className='grid grid-cols-12 gap-4'>
                            <TextField
                                label="ชื่อภาษาไทย" variant="outlined" 
                                className='col-span-6'
                                defaultValue="Hello World"
                                size="small"
                            />
                            <TextField
                                label="ชื่อภาษาอังกฤษ" variant="outlined" 
                                className='col-span-6'
                                defaultValue="Hello World"
                                size="small"
                            />
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
