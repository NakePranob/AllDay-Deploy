'use client'
import { useState, useEffect } from 'react';
import { cloneElement } from 'react';
import { observer } from 'mobx-react';
import dormitoryOnly from '@/stores/dormitoryOnly';
import Loader from '@/components/Loader'
import Link from "next/link";
import axios from "axios";
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import type { Dormitory_state } from '@/Types/dormitory';

// Components
import Carousel from "@/components/dormitory/Carousel";

// Icons
import { IoIosFitness, IoMdClose } from "react-icons/io";
import { BiCctv } from "react-icons/bi";
import { FaWifi, FaSmoking, FaCarSide, FaMotorcycle, FaRegEdit, FaFacebookSquare, FaLine } from "react-icons/fa";
import { PiDogFill } from "react-icons/pi";
import { GiLift, GiSecurityGate, GiKeyCard, GiWashingMachine } from "react-icons/gi";
import { RiFingerprintFill, RiRestaurantLine, RiImageEditFill, RiImageEditLine } from "react-icons/ri";
import { GrUserPolice } from "react-icons/gr";
import { MdStorefront, MdDelete, MdDeleteOutline, MdLocalPhone } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiPlusSquare, FiUploadCloud } from "react-icons/fi";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

// Mui
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';

// Type
type FacilityKey = keyof Dormitory_state;

const page = observer(({ params }: { params: { id: string } }) => {
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

    const [isEditLocation, setIsEditLocation] = useState<number | null>(null);
    const [isEditDistance, setIsEditDistance] = useState<number | null>(null);
    const [isEditName, setIsEditName] = useState(false);
    const [isEditEngName, setIsEditEngName] = useState(false);
    const [isEditFacebook, setIsEditFacebook] = useState(false);
    const [isEditLine, setIsEditLine] = useState(false);
    const [isEditPhone, setIsEditPhone] = useState(false);
    const [isEditPrice, setIsEditPrice] = useState(false);

    const handleLocationBlur = (id: number, key: number) => {
        setIsEditLocation(null); // หยุดการแก้ไขเมื่อกดออกจาก input
        dormitoryOnly.updateLocation(id, key);
    };

    const handleNameBlur = () => {
        setIsEditName(false); // หยุดการแก้ไขเมื่อกดออกจาก input
        dormitoryOnly.updateDormitory(dormitoryOnly.data.id, 'name', dormitoryOnly.data.name);
    };

    const handleEngNameBlur = () => {
        setIsEditEngName(false); // หยุดการแก้ไขเมื่อกดออกจาก input
        dormitoryOnly.updateDormitory(dormitoryOnly.data.id, 'engname', dormitoryOnly.data.engname);
    };

    const handleFacebookBlur = () => {
        setIsEditFacebook(false); // หยุดการแก้ไขเมื่อกดออกจาก input
        dormitoryOnly.updateDormitory(dormitoryOnly.data.id, 'facebook', dormitoryOnly.data.facebook);
    };

    const handleLineBlur = () => {
        setIsEditLine(false); // หยุดการแก้ไขเมื่อกดออกจาก input

        dormitoryOnly.updateDormitory(dormitoryOnly.data.id, 'line', dormitoryOnly.data.line);
    };

    const handlePhoneBlur = () => {
        setIsEditPhone(false); // หยุดการแก้ไขเมื่อกดออกจาก input

        dormitoryOnly.updateDormitory(dormitoryOnly.data.id, 'phone', dormitoryOnly.data.phone);
    };

    const handlePriceBlur = () => {
        setIsEditPrice(false); // หยุดการแก้ไขเมื่อกดออกจาก input
        dormitoryOnly.updateDormitory(dormitoryOnly.data.id, 'price', dormitoryOnly.data.price);
    };

    const handleDistanceBlur = (id: number, key: number) => {
        setIsEditDistance(null); // หยุดการแก้ไขเมื่อกดออกจาก input
        dormitoryOnly.updateDistance(id, key);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getDormitory/${params.id}`);
                dormitoryOnly.setData(result.data)
                dormitoryOnly.setPreviewImg(result.data?.dormitory_img.length > 0 ? 0 : null)

                const quantitySum = result.data?.dormitory_type?.reduce((sum: number, { quantity }: any) => sum + quantity, 0) || 0;
                const occupiedSum = result.data?.dormitory_type?.reduce((sum: number, { occupied }: any) => sum + occupied, 0) || 0;
                setTotalQuantity(quantitySum);
                setTotalOccupied(occupiedSum);
                setPercentage((occupiedSum / quantitySum) * 100);
                setPercentage(quantitySum > 0 ? (occupiedSum / quantitySum) * 100 : 0);

                setLoading(false);
            } catch (err) {
                setError('Failed to fetch dormitory data. Please try again later.');
                setLoading(false);
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
        return <p className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>{error}</p>;  // Display error message if any
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
                    <div className='flex-y-center flex-col w-full'>
                        {isEditName ? 
                            <input 
                                type="text"
                                value={dormitoryOnly.data?.name}
                                onBlur={()=>handleNameBlur()}
                                onChange={(e)=>dormitoryOnly.setEditName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleNameBlur();
                                    }
                                }}
                                autoFocus
                                className="border-none outline-none bg-transparent text-xl font-semibold text-center"
                            />
                            :
                            <h1 onClick={()=>setIsEditName(true)} className='text-xl font-semibold text-center max-w-[90%] flex gap-2 cursor-pointer relative'>
                                {dormitoryOnly?.data?.name} <FaRegEdit className='text-xs opacity-50 absolute top-0 -right-4'/>
                            </h1>
                        }
                        {isEditEngName ? 
                            <input 
                                type="text"
                                value={dormitoryOnly.data?.engname ? dormitoryOnly.data?.engname : ''}
                                onBlur={()=>handleEngNameBlur()}
                                onChange={(e)=>dormitoryOnly.setEditEngName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleEngNameBlur();
                                    }
                                }}
                                autoFocus
                                className="border-none outline-none bg-transparent text-center max-w-[90%]"
                            />
                            :
                            <p onClick={()=>setIsEditEngName(true)} className='text-center opacity-70 max-w-[90%] cursor-pointer'>
                                {dormitoryOnly?.data?.engname ? dormitoryOnly?.data?.engname : 'ยังไม่มีการกำหนดชื่อภาษาอังกฤษ'}
                            </p>
                        }
                    </div>
                    <div className='relative overflow-hidden mt-4 rounded-xl'>
                        <div className='h-96'>
                            {dormitoryOnly?.data?.dormitory_img?.length > 0 ?
                                <div onClick={() => setImgModal(true)} className='w-full h-full cursor-pointer'>
                                    <Carousel data={dormitoryOnly?.data?.dormitory_img} path='dormitoryImages'/>
                                </div>
                                :
                                <>
                                <label htmlFor="dropzone-file" className="relative overflow-hidden flex h-full flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50/40 dark:bg-gray-700/40 hover:bg-sky-100/40 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700/80 transition-300">
                                    {dormitoryOnly.imageSelectEdit && (
                                        <div className="overflow-hidden h-full w-full absolute">
                                            <img 
                                                src={URL.createObjectURL(dormitoryOnly.imageSelectEdit)} 
                                                alt='Preview' 
                                                className='h-full w-full
                                                object-cover object-center'
                                            />
                                        </div>
                                    )}
                                    {dormitoryOnly.loadingUpload &&
                                        <span className='h-full w-full flex-center bg-black/50 absolute top-0 left-0'>
                                            <CircularProgress size={40}/>
                                        </span>
                                    }
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 relative">
                                        <FiUploadCloud className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"'/>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">คลิกเพื่ออัพโหลดรูปภาพ</span></p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or webp (MAX. 1MB)</p>
                                    </div>
                                    <input id="dropzone-file" accept="image/*" type="file" className="hidden" onChange={(e) => dormitoryOnly.handleEditImage(e, 'add')}/>
                                </label>
                                {!dormitoryOnly.loadingUpload && dormitoryOnly.imageSelectEdit &&
                                    <Button onClick={dormitoryOnly.addImage} 
                                    variant='contained' className='rounded-full text-whit text-nowrap text-white absolute -translate-x-1/2 left-1/2 bottom-4 flex gap-4'>
                                        ยืนยันการเพิ่มรูปภาพ
                                    </Button>
                                }
                                </>
                            }
                        </div>

                        {isEditPrice ? 
                            <div className='absolute top-0 right-0 py-2 px-4 font-bold bg-blue-400 text-white z-50 rounded-bl-3xl'>
                                THB
                                <input 
                                    type="text"
                                    value={dormitoryOnly.data?.price}
                                    onBlur={()=>handlePriceBlur()}
                                    onChange={(e)=>dormitoryOnly.setEditPrice(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handlePriceBlur();
                                        }
                                    }}
                                    autoFocus
                                    className="border-none outline-none bg-transparent ms-1 w-12 text-right"
                                />
                            </div>
                            :
                            <div onClick={()=>setIsEditPrice(true)} className='absolute top-0 right-0 py-2 px-4 z-50 bg-blue-400 rounded-bl-3xl'>
                                <h1 className='cursor-pointer font-bold text-white relative me-2'>
                                    THB {dormitoryOnly?.data?.price} <FaRegEdit className='text-xs absolute top-0 -right-4'/>
                                </h1>
                            </div>
                        }
                    </div>
                    {imgModal && dormitoryOnly.data?.dormitory_img?.length > 0 &&
                        <>
                            <div onClick={()=>setImgModal(false)} className='fixed top-0 left-0 z-999 bg-black/70 h-screen w-screen'></div>
                            <div className="w-[90%] lg:w-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-999">
                                <div className='flex-center mb-10'>
                                    <div className="relative rounded-2xl overflow-hidden">
                                        {dormitoryOnly.previewImg !== null ?
                                            <>
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dormitoryImages/${dormitoryOnly.data?.dormitory_img[dormitoryOnly.previewImg]?.url}`}
                                                    alt={dormitoryOnly.data?.dormitory_img[dormitoryOnly.previewImg]?.url || '/404.png'}
                                                    className='object-center object-contain max-h-[65vh]'
                                                    loading='lazy'
                                                />
                                                <span className='w-full h-full bg-gradient-to-t from-black/90 from-5% opacity-0 hover:opacity-100 transition-300 
                                                flex-center absolute top-0 left-0'>
                                                    <div className="h-full w-full flex items-end justify-center pb-4 gap-8">
                                                        <label 
                                                            className='text-2xl text-black/50 bg-white p-2 rounded-full 
                                                            transition-300 hover:scale-110 hover:text-black cursor-pointer'
                                                            onMouseEnter={() => setIsHoveredEdit(true)}
                                                            onMouseLeave={() => setIsHoveredEdit(false)}
                                                        >
                                                            {isHoveredEdit ? <RiImageEditFill /> : <RiImageEditLine />}
                                                            <input 
                                                                type="file" 
                                                                accept="image/*" 
                                                                className="hidden"
                                                                onChange={(e) => dormitoryOnly.handleEditImage(e, 'edit')} // ฟังก์ชันอัปโหลดรูปภาพ
                                                            />
                                                        </label>
                                                        <button 
                                                            onClick={()=>dormitoryOnly.removeImage()}
                                                            className='text-2xl text-black/50 bg-white p-2 rounded-full 
                                                            transition-300 hover:scale-110 hover:text-red-500'    
                                                            onMouseEnter={() => setIsHoveredDelete(true)}
                                                            onMouseLeave={() => setIsHoveredDelete(false)}
                                                        >
                                                            {isHoveredDelete ? <MdDelete /> : <MdDeleteOutline />}
                                                        </button>
                                                    </div>
                                                </span>
                                                {dormitoryOnly.loadingUpload &&
                                                    <span className='h-full w-full flex-center bg-black/50 absolute top-0 left-0'>
                                                        <CircularProgress size={40}/>
                                                    </span>
                                                }
                                            </>
                                            : dormitoryOnly.imageSelectEdit &&
                                            <>
                                                {dormitoryOnly.loadingUpload &&
                                                    <span className='h-full w-full flex-center bg-black/50 absolute top-0 left-0'>
                                                        <CircularProgress size={40}/>
                                                    </span>
                                                }
                                                <img
                                                    src={URL.createObjectURL(dormitoryOnly.imageSelectEdit)}
                                                    alt={dormitoryOnly.imageSelectEdit?.name || '/404.png'}
                                                    className='object-center object-contain max-h-[65vh] rounded-2xl'
                                                    loading='lazy'
                                                />
                                                {!dormitoryOnly.loadingUpload &&
                                                    <div className='absolute -translate-x-1/2 left-1/2 bottom-4 flex gap-4'>
                                                        <Button onClick={dormitoryOnly.imageSubmitState === 'add' ? dormitoryOnly.addImage : dormitoryOnly.updateImage} 
                                                        variant='contained' className='rounded-full text-whit text-nowrap text-white'>
                                                            ยืนยัน{dormitoryOnly.imageSubmitState === 'add' ? 'การเพิ่มรูปภาพ' : 'การแก้ไขรูปภาพ'}
                                                        </Button>
                                                        {dormitoryOnly.imageSubmitState === 'edit' &&
                                                            <label 
                                                                className='text-2xl text-black/50 bg-white p-2 rounded-full 
                                                                transition-300 hover:scale-110 hover:text-black cursor-pointer'
                                                                onMouseEnter={() => setIsHoveredEdit(true)}
                                                                onMouseLeave={() => setIsHoveredEdit(false)}
                                                            >
                                                                {isHoveredEdit ? <RiImageEditFill /> : <RiImageEditLine />}
                                                                <input 
                                                                    type="file" 
                                                                    accept="image/*" 
                                                                    className="hidden"
                                                                    onChange={(e) => dormitoryOnly.handleEditImage(e, 'edit')} // ฟังก์ชันอัปโหลดรูปภาพ
                                                                />
                                                            </label>
                                                        }
                                                    </div>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                                <div className="flex md:justify-center gap-2 h-16 overflow-x-auto rounded-md">
                                    {dormitoryOnly?.data?.dormitory_img.slice(0, dormitoryOnly?.data?.dormitory_img.length > 8 ? 7 : dormitoryOnly?.data?.dormitory_img.length - 1).map((item, index) => (
                                        <button onClick={()=>dormitoryOnly.setPreviewImg(index)} key={index} 
                                        className={`h-full aspect-square rounded-md bg-base overflow-hidden min-w-16
                                        ${dormitoryOnly.previewImg === index && 'border-[3px] border-blue-400'}`}>
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
                                    {dormitoryOnly?.data?.dormitory_img.length > 0 && (
                                        <div className='h-full aspect-square bg-base overflow-hidden relative min-w-16 rounded-md'>
                                            <button
                                                onClick={()=>setAllImg(true)}
                                                className="absolute w-full h-full flex-center text-white text-xs bg-black/50"
                                            >
                                                ดูเพิ่มเติม
                                            </button>
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dormitoryImages/${dormitoryOnly?.data?.dormitory_img[dormitoryOnly?.data?.dormitory_img.length > 8 ? 7 : dormitoryOnly?.data?.dormitory_img.length - 1]?.url}`}
                                                alt={dormitoryOnly?.data?.dormitory_img?.[dormitoryOnly?.data?.dormitory_img.length > 8 ? 7 : dormitoryOnly?.data?.dormitory_img.length - 1]?.url || '/404.png'}
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
                                        <Box className="bg-base max-h-[80vh] overflow-y-auto lg:h-auto py-4">
                                            <div className='flex-x-center'>
                                                <button onClick={()=>setAllImg(false)} className="w-12 h-1 mb-4 rounded-full bg-blue-300/40"></button>
                                            </div>
                                            <div className='container flex-x-center flex-wrap gap-2 md:gap-4'>
                                                {dormitoryOnly?.data?.dormitory_img?.map((item, index) => (
                                                    <button onClick={()=>dormitoryOnly.setPreviewImg(index)} key={index} className='rounded-md h-16 aspect-square bg-base overflow-hidden min-w-16'>
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
                                                <label className='h-16 aspect-square border-dashed border-2 border-slate-500/40 min-w-16 rounded-md
                                                flex-center text-4xl bg-slate-500/30 text-slate-500/40 opacity-60 hover:opacity-100 transition-300 cursor-pointer'>
                                                    <input
                                                        type='file'
                                                        accept="image/*" 
                                                        className="hidden"
                                                        onChange={(e) => dormitoryOnly.handleEditImage(e, 'add')}
                                                    />
                                                    <AiOutlinePlusCircle />
                                                </label>
                                            </div>
                                        </Box>
                                    </Drawer>
                                </div>
                            </div>
                        </>
                    }
                    <div className='border-items rounded-xl flex justify-between px-4 py-2 text-sm mt-4'>
                        <div className='flex-y-center h-full gap-4'>
                            {isEditFacebook ?
                                <div className='flex-y-center gap-2'>
                                    <FaFacebookSquare className='text-xl text-blue-400'/>
                                    <input 
                                        type="text"
                                        value={dormitoryOnly.data?.facebook ? dormitoryOnly.data?.facebook : ''}
                                        onBlur={()=>handleFacebookBlur()}
                                        onChange={(e)=>dormitoryOnly.setEditFacebook(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleFacebookBlur();
                                            }
                                        }}
                                        autoFocus
                                        className="border-none outline-none bg-transparent"
                                    />
                                </div>
                                :
                                <button onClick={()=>setIsEditFacebook(true)} className={`flex-y-center gap-2 ${!dormitoryOnly?.data?.line && 'opacity-50 grayscale'}`}>
                                    <FaFacebookSquare className='text-xl text-blue-500'/>
                                    <span className="mt-[2px]">{dormitoryOnly?.data?.facebook ? dormitoryOnly?.data?.facebook : 'ยังไม่กำหนดลงค์เฟสบุ๊ค'}</span>
                                </button>
                            }
                            {isEditLine ?
                                <div className='flex-y-center gap-2'>
                                    <FaLine className='text-xl text-green-500'/>
                                    <input 
                                        type="text"
                                        value={dormitoryOnly.data?.line ? dormitoryOnly.data?.line : ''}
                                        onBlur={()=>handleLineBlur()}
                                        onChange={(e)=>dormitoryOnly.setEditLine(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleLineBlur();
                                            }
                                        }}
                                        autoFocus
                                        className="border-none outline-none bg-transparent"
                                    />
                                </div>
                                :
                                <button onClick={()=>setIsEditLine(true)} className={`flex-y-center gap-2 ${!dormitoryOnly?.data?.line && 'opacity-50 grayscale'}`}>
                                    <FaLine className='text-xl text-green-400'/>
                                    <span className="mt-[2px]">{dormitoryOnly?.data?.line ? dormitoryOnly?.data?.line : 'ยังไม่กำหนดลงค์ไลน์'}</span>
                                </button>
                            }
                        </div>
                        {isEditPhone ?
                            <input 
                                type="text"
                                value={dormitoryOnly.data?.phone ? '0'+dormitoryOnly.data?.phone : ''}
                                onBlur={()=>handlePhoneBlur()}
                                onChange={(e)=>dormitoryOnly.setEditPhone(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handlePhoneBlur();
                                    }
                                }}
                                autoFocus
                                className="border-none outline-none bg-transparent text-right"
                            />
                            :
                            <button onClick={()=>setIsEditPhone(true)} className={`flex-y-center gap-2 ${!dormitoryOnly?.data?.phone && 'opacity-50 grayscale'}`}>
                                <MdLocalPhone className='text-xl'/>
                                <span className="mt-[2px]">{dormitoryOnly?.data?.phone ? '0'+dormitoryOnly?.data?.phone : 'ยังไม่กำหนดเบอร์โทร'}</span>
                            </button>
                        }
                    </div>
                    <h4 className='text-lg lg:text-xl font-semibold mt-6'>
                        สิ่งอำนวยความสะดวก 
                        <span className='text-xs opacity-50 ms-2 font-normal'>(กดที่ไอคอนเพื่อเปลี่ยนสถานะ)</span>
                    </h4>
                    <section className='p-4 lg:ps-8 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-4'>
                        {[
                            { key: 'wifi', label: 'วายฟาย', icon: <FaWifi /> },
                            { key: 'park_car', label: 'ลาจอดรถยนต์', icon: <FaCarSide /> },
                            { key: 'park_motorcycle', label: 'ลานจอดรถมอไซค์', icon: <FaMotorcycle /> },
                            { key: 'washing', label: 'เครื่องซักผ้า', icon: <GiWashingMachine /> },
                            { key: 'restaurant', label: 'ร้านอาหาร', icon: <RiRestaurantLine /> },
                            { key: 'store', label: 'ร้านสะดวกซื้อ', icon: <MdStorefront /> },
                            { key: 'lift', label: 'ลิฟต์', icon: <GiLift /> },
                            { key: 'security_door', label: 'ประตูรักษาปลอดภัย', icon: <GiSecurityGate /> },
                            { key: 'keycard', label: 'บัตรผ่านประตู', icon: <GiKeyCard /> },
                            { key: 'animal', label: 'เลี้ยงสัตว์ได้', icon: <PiDogFill /> },
                            { key: 'fitness', label: 'ฟิตเนส', icon: <IoIosFitness /> },
                            { key: 'fingerprint', label: 'ตรวจสอบลายนิ้วมือ', icon: <RiFingerprintFill /> },
                            { key: 'cctv', label: 'ก้องวงจรปิด', icon: <BiCctv /> },
                            { key: 'security_guard', label: 'รปภ.', icon: <GrUserPolice /> },
                            { key: 'smoke', label: 'พื้นที่สูบบุหรี่', icon: <FaSmoking /> }
                        ].map((facility) => (
                            <button
                                key={facility.key}
                                onClick={() => dormitoryOnly.setFacilities(facility.key)}
                                className={`col-span-2 gap-4 flex-y-center text-sm ${
                                    dormitoryOnly?.data?.dormitory_state?.[facility.key as FacilityKey] ? '' : 'opacity-50 grayscale'
                                }`}
                            >
                                {facility.key === dormitoryOnly.loadingState 
                                    ? <CircularProgress size={20}/>
                                    : cloneElement(facility.icon, { className: 'text-xl text-blue-500' })
                                } <p className='text-left'>{facility.label}</p>
                            </button>
                        ))}
                    </section>

                    <h4 className='text-lg lg:text-xl font-semibold mt-6 mb-4'>ห้องพัก</h4>
                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                        {dormitoryOnly?.data?.dormitory_type?.length > 0 &&  dormitoryOnly?.data?.dormitory_type.map((v:any, k:number)=>(
                            <Link href={`/menage/room/${v.id}`} key={k} className="flex gap-2 h-28 col-span-1">
                                <div className="h-full aspect-square bg-slate-200 rounded-xl overflow-hidden">
                                    <Carousel data={v.dormitory_typeimg} path='dormitoryTypeImages'/>
                                </div>
                                <div
                                    className="py-2 text-left flex flex-col justify-start relative flex-1"
                                >
                                    <FaRegEdit className='text-sm opacity-70 absolute top-0 right-0'/>
                                    <h1 className="font-medium">{v.name}</h1>
                                    <p className="font-semibold text-sm">THB{v.price}</p>
                                    <p className='text-xs opacity-70'>ขนาดห้อง {((v.width/100)*(v.length/100)).toFixed(1)} ตร.ม.</p>
                                    <p className='text-xs opacity-70'>จำนวณผู้เข้าพัก {v.occupied}/{v.quantity} คน</p>
                                </div>
                            </Link>
                        ))}
                        <div className='col-span-1'>
                            <Link href={`/menage/${dormitoryOnly?.data?.id}/room/add`} className='border-dashed border-2 border-slate-500/40 flex-center text-6xl
                            bg-slate-500/30 rounded-xl aspect-square w-28 opacity-30 hover:opacity-60 transition-300'>
                                <AiOutlinePlusCircle className='opacity-50'/>
                            </Link>
                        </div>
                    </div>
                    <h4 className='text-lg lg:text-xl font-semibold mt-6'>สถานที่ใกล้กับหอพัก</h4>
                    <Table sx={{ width: '100%' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>สถานที่</TableCell>
                                <TableCell align="right" className="w-32">ห่างจากหอพัก</TableCell>
                                <TableCell align="right" className="w-12"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dormitoryOnly?.data?.location_distance?.map((v:any, k:number) => (
                                <TableRow
                                    key={k}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" className='py-3 cursor-pointer'>
                                        {isEditLocation && isEditLocation === v.id ? 
                                            <input 
                                                type="text"
                                                value={dormitoryOnly.data?.location_distance[k]?.location}
                                                onBlur={()=>handleLocationBlur(v.id, k)}
                                                onChange={(e)=>dormitoryOnly.setEditLocation(e.target.value, k)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        handleLocationBlur(v.id, k);
                                                    }
                                                }}
                                                autoFocus
                                                className="border-none outline-none bg-transparent"
                                            />
                                            :
                                            <p onClick={()=>setIsEditLocation(v.id)} className="cursor-pointer w-full">
                                                {v.location}
                                            </p>
                                        }
                                    </TableCell>
                                    <TableCell align="right" className="w-32 py-3 cursor-pointer">
                                        {isEditDistance && isEditDistance === v.id ? 
                                            <div className='flex justify-end'>
                                                <input 
                                                    type="number"
                                                    value={dormitoryOnly.data?.location_distance[k]?.distance}
                                                    onBlur={()=>handleDistanceBlur(v.id, k)}
                                                    onChange={(e)=>dormitoryOnly.setEditDistance(e.target.value, k)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            handleDistanceBlur(v.id, k);
                                                        }
                                                    }}
                                                    autoFocus
                                                    className="border-none outline-none bg-transparent text-right"
                                                />
                                                &nbsp;กม.
                                            </div>
                                            :
                                            <p onClick={()=>setIsEditDistance(v.id)} className="cursor-pointer w-full">
                                                {Number.isInteger(v.distance) ? v.distance+'.0' : v.distance} กม.
                                            </p>
                                        }
                                    </TableCell>
                                    <TableCell align="right" className="w-12 py-3 pe-0">
                                        {dormitoryOnly.loadingState === v.id ?
                                            <div className='flex-center aspect-square pe-2'>
                                                <CircularProgress size={20} sx={{ color: 'red' }} className=""/>
                                            </div>
                                            :
                                            <button onClick={()=>dormitoryOnly.deleteLocation(v.id)} type='submit' className='aspect-square rounded-sm flex-center h-full 
                                            bg-red-400 hover:bg-red-500 transition-300 text-white px-0'>
                                                <IoMdClose className="text-2xl"/>
                                            </button>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <form onSubmit={(e)=>dormitoryOnly.addLocation(e)} className='flex pt-4'>
                        <div className='flex-1 pe-4 py-3'>
                            <TextField
                                label="เพิ่มสถานที่ใกล้เคียงหอพัก"
                                variant='outlined'
                                name='location'
                                sx={{ width: '100%' }}
                                size="small"
                                required
                            />
                        </div>
                        <div className='w-32 pe-2 py-3'>
                            <TextField
                                type='number'
                                sx={{ width: '100%' }}
                                variant='outlined'
                                name='distance'
                                size="small"
                                required
                                defaultValue='0'
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">กม.</InputAdornment>,
                                    inputProps: { step: 0.1 }
                                }}
                            />
                        </div>
                        <div className='w-14 px-4 py-3'>
                            <button type='submit' className='aspect-square rounded-md flex-center h-full 
                            bg-blue-400 hover:bg-blue-500 transition-300 text-white px-0'>
                                <FiPlusSquare className="text-2xl"/>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
})

export default page