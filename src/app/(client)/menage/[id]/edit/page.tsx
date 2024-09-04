'use client';

import { useEffect, useState } from 'react';
import MenageMenu from '@/components/dormitory/MenageMenu';
import axios from 'axios';
import Image from 'next/image';
import type { Dormitory } from '@/Types/dormitory';

// Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
            } catch (err) {
                setError('Failed to fetch data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

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
                    <button onClick={()=>setImgModal(true)} className='w-full h-64 md:h-96'>
                        <Carousel data={data?.dormitory_img} path='dormitoryImages'/>
                    </button>
                    <Modal
                        open={imgModal}
                        onClose={()=>setImgModal(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} className="w-[90%] lg:w-auto">
                            <Typography className='flex-center mb-10'>
                                <div className="relative">
                                    <img
                                        src={'/images/profile/1718193891747-getstudentimageftp.jpg'}
                                        // src={'/404.png'}
                                        alt='404.png'
                                        className='object-center object-contain max-h-[50vh]'
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
                            </Typography>
                            <Typography className="flex md:justify-center gap-2 h-16 overflow-x-auto">
                                <div className='h-full aspect-square bg-base'></div>
                                <div className='h-full aspect-square bg-base'></div>
                                <div className='h-full aspect-square bg-base'></div>
                                <div className='h-full aspect-square bg-base'></div>
                                <div className='h-full aspect-square bg-base'></div>
                                <div className='h-full aspect-square bg-base'></div>
                                <div className='h-full aspect-square bg-base'></div>
                                <div className='h-full aspect-square bg-base'></div>
                                <div className='h-full aspect-square bg-base'></div>
                                <button className='h-full aspect-square border-dashed border-2 border-slate-200/40 
                                flex-center text-4xl bg-slate-200/30 text-white opacity-30 hover:opacity-60 transition-300'>
                                    <AiOutlinePlusCircle className='opacity-50'/>
                                </button>
                            </Typography>
                        </Box>
                    </Modal>
                    <div className="card-body">

                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
