'use client'
import { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import dormitoryOnly from '@/stores/dormitoryOnly';
import Loader from '@/components/Loader'
import Link from "next/link";
import axios from "axios";
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import resize from '@/function/resize';
// Components
import Carousel from "@/components/dormitory/Carousel";

// Icons
import { IoIosFitness } from "react-icons/io";
import { BiCctv } from "react-icons/bi";
import { FaWifi, FaSmoking, FaCarSide, FaMotorcycle, FaRegEdit } from "react-icons/fa";
import { PiDogFill } from "react-icons/pi";
import { GiLift, GiSecurityGate, GiKeyCard, GiWashingMachine } from "react-icons/gi";
import { RiFingerprintFill, RiRestaurantLine, RiImageEditFill, RiImageEditLine } from "react-icons/ri";
import { GrUserPolice } from "react-icons/gr";
import { MdStorefront, MdDelete, MdDeleteOutline } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

// Mui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const page = observer(({ params }: { params: { id: string } }) => {
    const width = resize()
    const { data: session, status } = useSession();
    const [imgModal, setImgModal] = useState(false);
    const [allImg, setAllImg] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const [totalOccupied, setTotalOccupied] = useState<number>(0);
    const [percentage, setPercentage] = useState<number>(0);
    const [isHoveredEdit, setIsHoveredEdit] = useState<boolean>(false);
    const [isHoveredDelete, setIsHoveredDelete] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getDormitory/${params.id}`);
                dormitoryOnly.setData(result.data)
                dormitoryOnly.setPreviewImg(result.data?.dormitory_img.length > 0 ? result.data?.dormitory_img[0] : null)
                dormitoryOnly.setPreviewImgList(result.data?.dormitory_img.slice(0, 8));
                dormitoryOnly.setLastImg(result.data?.dormitory_img.length - 1);

                const quantitySum = result.data?.dormitory_type.reduce((sum: number, dormitory: any) => sum + dormitory.quantity, 0);
                const occupiedSum = result.data?.dormitory_type.reduce((sum: number, dormitory: any) => sum + dormitory.occupied, 0);
                setTotalQuantity(quantitySum);
                setTotalOccupied(occupiedSum);
                setPercentage((occupiedSum / quantitySum) * 100);

                setLoading(false);
            } catch (err) {
                setError('Failed to fetch dormitory data. Please try again later.');
            }
        };

        if (params.id) {
            fetchData();
        }
    }, [params.id]);

    if (loading) {
        return <p className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Loading...</p>;  // Show loader while fetching data
    }

    if (error) {
        return <p>{error}</p>;  // Display error message if any
    }

    return (
        <div className='pt-16 md:pt-20 sm:pb-10'>
            <div className='sm:container'>
                <div className='flex-y-center flex-col lg:flex-row gap-4 pt-8'>
                    <div className='flex-1 flex flex-col items-center lg:items-start'>
                        <h1 className='text-2xl md:text-4xl font-bold'>
                            {status === 'authenticated' && session?.user ?
                                <>
                                    ยินดีต้อนรับคุณ, {session.user.name?.startsWith('null') ? 'บัญชีนี้ยังไม่มีชื่อ' : session.user.name}!
                                </>
                                :
                                'มีบางอย่างผิดพลาด'
                            }
                        </h1>
                        <p className='opacity-80 text-sm md:text-base'>คุณสามารถจัดการหอพักของคุณได้ที่นี่ ได้ตามต้องการ</p>
                    </div>
                    <div className='flex-y-center gap-4 md:gap-8'>
                        <div className='flex flex-col items-end'>
                            <span>จำนวนผู้เช่าที่ได้รับการยืนยัน</span>
                            <h1 className='text-5xl italic font-bold relative'>
                                {totalOccupied}/{totalQuantity}
                            </h1>
                        </div>
                        <div className='scale-75 md:scale-100'>
                            <Loader percentage={percentage} />
                        </div>
                    </div>
                </div>
                <div className='card rounded-3xl rounded-b-none sm:rounded-b-3xl mt-8 px-4 md:px-16 pt-8 pb-8 overflow-hidden'>
                    <div className='flex-y-center flex-col'>
                        <h1 className='text-xl font-semibold text-center max-w-[90%]'>{dormitoryOnly?.data?.name}</h1>
                        <p className='text-center opacity-70 max-w-[90%]'>{dormitoryOnly?.data?.engname ? dormitoryOnly?.data?.engname : ''}</p>
                    </div>
                    <div className='relative overflow-hidden mt-4 rounded-xl'>
                        <div onClick={() => setImgModal(true)} className='cursor-pointer h-96'>
                            <Carousel data={dormitoryOnly?.data?.dormitory_img} path='dormitoryImages'/>
                        </div>
                        <h1 className='absolute top-0 right-0 py-2 px-4 font-bold bg-blue-400 text-white z-50 rounded-bl-3xl'>
                            THE {dormitoryOnly?.data?.price}
                        </h1>
                    </div>
                    {imgModal &&
                            <>
                                <div onClick={()=>setImgModal(false)} className='fixed top-0 left-0 z-999 bg-black/70 h-screen w-screen'></div>
                                <div className="w-[90%] lg:w-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-999">
                                    <div className='flex-center mb-10'>
                                        <div className="relative">
                                            {dormitoryOnly.previewImg &&
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dormitoryImages/${dormitoryOnly.previewImg.url}`}
                                                    alt={dormitoryOnly.previewImg.url}
                                                    className='object-center object-contain max-h-[65vh] rounded-lg'
                                                    loading='lazy'
                                                />
                                            }
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
                                                    className='text-2xl text-white hover:bg-red-200/20 p-2 rounded-full hover:text-red-600 transition-300'    
                                                    onMouseEnter={() => setIsHoveredDelete(true)}
                                                    onMouseLeave={() => setIsHoveredDelete(false)}
                                                >
                                                    {isHoveredDelete ? <MdDelete /> : <MdDeleteOutline />}
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex md:justify-center gap-2 h-16 overflow-x-auto rounded-md">
                                        {dormitoryOnly?.previewImgList?.map((item, index) => (
                                            <button onClick={()=>dormitoryOnly.setPreviewImg(item)} key={index} className='h-full aspect-square rounded-md bg-base overflow-hidden min-w-16'>
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dormitoryImages/${item.url}`}
                                                    alt={item.url}
                                                    width={100}
                                                    height={100}
                                                    className='object-center object-cover w-full h-full'
                                                    loading='lazy'
                                                />
                                            </button>
                                        ))}
                                        {dormitoryOnly?.lastImg >= 0 && dormitoryOnly?.data?.dormitory_img && (
                                            <div className='h-full aspect-square bg-base overflow-hidden relative min-w-16 rounded-md'>
                                                <button
                                                    onClick={()=>setAllImg(true)}
                                                    className="absolute w-full h-full flex-center text-white text-xs bg-black/50"
                                                >
                                                    ดูเพิ่มเติม
                                                </button>
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dormitoryImages/${dormitoryOnly?.data?.dormitory_img[dormitoryOnly?.lastImg]?.url}`}
                                                    alt={dormitoryOnly?.data?.dormitory_img?.[dormitoryOnly?.lastImg]?.url || '/404.png'}
                                                    width={100}
                                                    height={100}
                                                    className='object-center object-cover w-full h-full'
                                                    loading='lazy'
                                                />
                                            </div>
                                        )}
                                        <Drawer 
                                            open={allImg} 
                                            anchor={'bottom'} 
                                            onClose={() => setAllImg(false)}
                                            PaperProps={{
                                                sx: {
                                                borderTopLeftRadius: '1.5rem',
                                                borderTopRightRadius: '1.5rem',
                                                },
                                            }}
                                            BackdropProps={{
                                                sx: {
                                                backgroundColor: 'rgba(0, 0, 0, 0.0)', // ลดความมืดของพื้นหลัง
                                                },
                                            }}
                                        >
                                            <Box 
                                                className="bg-base max-h-[80vh] overflow-y-auto lg:h-auto py-4"
                                                onClick={()=>setAllImg(false)}
                                            >
                                                <div className='flex-x-center'>
                                                    <button className="w-12 h-1 mb-4 rounded-full bg-blue-300/40"></button>
                                                </div>
                                                <div className='container flex-x-center flex-wrap gap-2 md:gap-4'>
                                                    {dormitoryOnly?.data?.dormitory_img?.map((item, index) => (
                                                        <button onClick={()=>dormitoryOnly.setPreviewImg(item)} key={index} className='rounded-md h-16 aspect-square bg-base overflow-hidden min-w-16'>
                                                            <Image
                                                                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dormitoryImages/${item.url}`}
                                                                alt={item.url}
                                                                width={100}
                                                                height={100}
                                                                className='object-center object-cover w-full h-full'
                                                                loading='lazy'
                                                            />
                                                        </button>
                                                    ))}
                                                    <button className='h-16 aspect-square border-dashed border-2 border-slate-500/40 min-w-16 rounded-md
                                                    flex-center text-4xl bg-slate-500/30 text-slate-500/40 opacity-60 hover:opacity-100 transition-300'>
                                                        <AiOutlinePlusCircle/>
                                                    </button>
                                                </div>
                                            </Box>
                                        </Drawer>
                                    </div>
                                </div>
                            </>
                        }
                    <div className='border-items rounded-xl flex justify-between px-4 py-2 text-sm mt-4'>
                        <div className=''>
                            
                        </div>
                        <div>
                            0904445814
                        </div>
                    </div>
                    <h4 className='text-lg lg:text-xl font-semibold mt-6'>สิ่งอำนวยความสะดวก</h4>
                    <section className='p-4 lg:ps-8 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-4'>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${dormitoryOnly?.data?.dormitory_state?.wifi ? '' : 'opacity-50 grayscale'}`}>
                            <FaWifi className="text-xl text-blue-500"/> วายฟาย
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${dormitoryOnly?.data?.dormitory_state?.park_car ? '' : 'opacity-50 grayscale'}`}>
                            <FaCarSide className="text-xl text-blue-500"/> ลาจอดรถยนต์
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${dormitoryOnly?.data?.dormitory_state?.park_motorcycle ? '' : 'opacity-50 grayscale'}`}>
                            <FaMotorcycle className="text-xl text-blue-500"/> ลานจอดรถมอไซค์
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${dormitoryOnly?.data?.dormitory_state?.washing ? '' : 'opacity-50 grayscale'}`}>
                            <GiWashingMachine className="text-xl text-blue-500"/> เครื่องซักผ้า
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${dormitoryOnly?.data?.dormitory_state?.restaurant ? '' : 'opacity-50 grayscale'}`}>
                            <RiRestaurantLine className="text-xl text-blue-500"/> ร้านอาหาร
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${dormitoryOnly?.data?.dormitory_state?.store ? '' : 'opacity-50 grayscale'}`}>
                            <MdStorefront className="text-xl text-blue-500"/> ร้านสะดวกซื้อ
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${dormitoryOnly?.data?.dormitory_state?.lift ? '' : 'opacity-50 grayscale'}`}>
                            <GiLift className="text-xl text-blue-500"/> ลิฟต์
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${dormitoryOnly?.data?.dormitory_state?.security_door ? '' : 'opacity-50 grayscale'}`}>
                            <GiSecurityGate className="text-xl text-blue-500"/> ประตูรักษาปลอดภัย
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${dormitoryOnly?.data?.dormitory_state?.keycard ? '' : 'opacity-50 grayscale'}`}>
                            <GiKeyCard className="text-xl text-blue-500"/> บัตรผ่านประตู
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${dormitoryOnly?.data?.dormitory_state?.animal ? '' : 'opacity-50 grayscale'}`}>
                            <PiDogFill className="text-xl text-blue-500"/> เลี้ยงสัตว์ได้
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${dormitoryOnly?.data?.dormitory_state?.fitness ? '' : 'opacity-50 grayscale'}`}>
                            <IoIosFitness className="text-xl text-blue-500"/> ฟิตเนส
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${dormitoryOnly?.data?.dormitory_state?.fingerprint ? '' : 'opacity-50 grayscale'}`}>
                            <RiFingerprintFill className="text-xl text-blue-500"/> ตรวจสอบลายนิ้วมือ
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${dormitoryOnly?.data?.dormitory_state?.cctv ? '' : 'opacity-50 grayscale'}`}>
                            <BiCctv className="text-xl text-blue-500"/> ก้องวงจรปิด
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${dormitoryOnly?.data?.dormitory_state?.security_guard ? '' : 'opacity-50 grayscale'}`}>
                            <GrUserPolice className="text-xl text-blue-500"/> รปภ.
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${dormitoryOnly?.data?.dormitory_state?.smoke ? '' : 'opacity-50 grayscale'}`}>
                            <FaSmoking className="text-xl text-blue-500"/> พื้นที่สูบบุหรี่
                        </span>
                    </section>
                    <h4 className='text-lg lg:text-xl font-semibold mt-6 mb-4'>ห้องพัก</h4>
                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {dormitoryOnly?.data?.dormitory_type.map((v:any, k:number)=>(
                        <Link href={`/menage/room/${v.id}`} key={k} className="flex gap-2 h-28 col-span-1">
                            <div className="h-full aspect-square bg-slate-200 rounded-xl overflow-hidden">
                                <Carousel data={v.dormitory_typeimg} path='dormitoryTypeImages'/>
                            </div>
                            <div className="py-2 text-left">
                                <h1 className="font-medium">{v.name}</h1>
                                <p className="font-semibold text-sm">THB{v.price}</p>
                                <p className='text-xs opacity-70'>ขนาดห้อง {((v.width/100)*(v.length/100)).toFixed(1)} ตร.ม.</p>
                                <p className='text-xs opacity-70'>จำนวณผู้เข้าพัก {v.occupied}/{v.quantity} คน</p>
                            </div>
                        </Link>
                    ))}
                        <div className='col-span-1'>
                            <Link href={'#'} className='border-dashed border-2 border-slate-500/40 flex-center text-6xl
                            bg-slate-500/30 rounded-xl aspect-square w-28 opacity-30 hover:opacity-60 transition-300'>
                                <AiOutlinePlusCircle className='opacity-50'/>
                            </Link>
                        </div>
                    </div>
                    <h4 className='text-lg lg:text-xl font-semibold mt-6 mb-4'>สถานที่ใกล้กับหอพัก</h4>
                    <Table sx={{ width: '100%' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>สถานที่</TableCell>
                                <TableCell align="right">ห่างจากหอพัก</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dormitoryOnly?.data?.location_distance.map((v:any, k:number) => (
                                <TableRow
                                    key={k}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {v.location}
                                    </TableCell>
                                    <TableCell align="right">{v.distance} กม.</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
})

export default page