'use client'
import { useState, useEffect } from 'react';
import { cloneElement } from 'react';
import { observer } from 'mobx-react';
import dormitoryRoom from '@/stores/dormitoryRoom';
import Link from "next/link";
import axios from "axios";
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import type { Dormitory_facilitate } from '@/Types/dormitory';

// Components
import Carousel from "@/components/dormitory/Carousel";

// Icons
import { BiCloset } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { PiFan, PiTelevisionSimple } from "react-icons/pi";
import { GiTable } from "react-icons/gi";
import { RiImageEditFill, RiImageEditLine } from "react-icons/ri";
import { MdDelete, MdDeleteOutline, MdOutlineKingBed  } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiUploadCloud } from "react-icons/fi";
import { FaShower  } from "react-icons/fa6";
import { LuAirVent } from "react-icons/lu";
import { TbFridge, TbTableAlias } from "react-icons/tb";
import { TfiRulerPencil } from "react-icons/tfi";
import { RiArrowLeftWideFill } from "react-icons/ri";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

// Mui
import CircularProgress from '@mui/material/CircularProgress';

// Type
type FacilityKey = keyof Dormitory_facilitate;

const page = observer(({ params }: { params: { id: string } }) => {
    const { data: session, status } = useSession();
    const [imgModal, setImgModal] = useState(false);
    const [allImg, setAllImg] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isHoveredEdit, setIsHoveredEdit] = useState<boolean>(false);
    const [isHoveredDelete, setIsHoveredDelete] = useState<boolean>(false);

    const [isEditName, setIsEditName] = useState(false);
    const [isEditWidth, setIsEditWidth] = useState(false);
    const [isEditLength, setIsEditLength] = useState(false);
    const [isEditPrice, setIsEditPrice] = useState(false);
    const [isEditQuantity, setIsEditQuantity] = useState(false);
    const [isEditOccupied, setIsEditOccupied] = useState(false);

    const handleNameBlur = () => {
        setIsEditName(false); // หยุดการแก้ไขเมื่อกดออกจาก input
        dormitoryRoom.updateRoom(dormitoryRoom.data.id, 'name', dormitoryRoom.data.name);
    };

    const handleWidthBlur = () => {
        setIsEditWidth(false); // หยุดการแก้ไขเมื่อกดออกจาก input
        dormitoryRoom.updateRoom(dormitoryRoom.data.id, 'width', dormitoryRoom.data.width);
    };

    const handleLengthBlur = () => {
        setIsEditLength(false);
        dormitoryRoom.updateRoom(dormitoryRoom.data.id, 'length', dormitoryRoom.data.length);
    };

    const handlePriceBlur = () => {
        setIsEditPrice(false); // หยุดการแก้ไขเมื่อกดออกจาก input
        dormitoryRoom.updateRoom(dormitoryRoom.data.id, 'price', dormitoryRoom.data.price);
    };

    const handleQuantityBlur = () => {
        setIsEditLength(false);
        dormitoryRoom.updateRoom(dormitoryRoom.data.id, 'quantity', dormitoryRoom.data.quantity);
    };

    const handleOccupiedBlur = () => {
        setIsEditLength(false);
        dormitoryRoom.updateRoom(dormitoryRoom.data.id, 'occupied', dormitoryRoom.data.occupied);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/dormitory/room/${params.id}`);
                dormitoryRoom.setData(result.data)
                dormitoryRoom.setPreviewImg(result.data?.dormitory_typeimg.length > 0 ? 0 : null);

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
            <div className='sm:container pt-8 sm:pt-12'>
                <Link href={`/menage/${dormitoryRoom.data.dmtId}`} 
                className='flex-y-center font-medium hover:font-semibold md:text-xl gap-2 hover:gap-4 transition-all duration-300 ease-in-out hover:text-blue-500'>
                    <RiArrowLeftWideFill/>
                    กลับไปหน้าจัดการหอพัก
                </Link>
                <div className='card rounded-3xl rounded-b-none sm:rounded-b-3xl mt-2 sm:mt-8 px-4 md:px-16 pt-8 pb-8 overflow-hidden'>
                    <div className='lg:flex-y-center lg:justify-between'>
                        <div className='flex text-xl font-semibold'>
                            {status === 'authenticated' && session?.user ?
                                <>
                                    {isEditName ? 
                                        <input 
                                            type="text"
                                            value={dormitoryRoom.data?.name}
                                            onBlur={()=>handleNameBlur()}
                                            onChange={(e)=>dormitoryRoom.setEditName(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleNameBlur();
                                                }
                                            }}
                                            autoFocus
                                            className="border-none outline-none bg-transparent ms-2"
                                        />
                                        :
                                        <h1 onClick={()=>setIsEditName(true)} className='ms-2 cursor-pointer'>
                                            {dormitoryRoom?.data?.name ? dormitoryRoom?.data?.name : 'ไม่มีชื่อ'}
                                        </h1>
                                    }
                                </>
                                :
                                'มีบางอย่างผิดพลาด'
                            }
                        </div>
                        <div className='lg:text-right'>
                            <section className='flex-y-center'>
                                จำนวนห้อง 
                                {isEditQuantity ? 
                                    <input 
                                        type="text"
                                        value={dormitoryRoom.data?.quantity ? dormitoryRoom.data?.quantity : ''}
                                        onBlur={()=>handleQuantityBlur()}
                                        onChange={(e)=>dormitoryRoom.setEditQuantity(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleQuantityBlur();
                                            }
                                        }}
                                        autoFocus
                                        className="border-none outline-none bg-transparent w-6 text-center font-bold"
                                    />
                                    :
                                    <b onClick={()=>setIsEditQuantity(true)} className='cursor-pointer w-6 text-center font-bold'>
                                        {dormitoryRoom?.data?.quantity ? dormitoryRoom?.data?.quantity : 0}
                                    </b>
                                }
                                ห้อง
                                เข้าอยู่แล้ว 
                                {isEditOccupied ? 
                                    <input 
                                        type="text"
                                        value={dormitoryRoom.data?.occupied ? dormitoryRoom.data?.occupied : ''}
                                        onBlur={()=>handleOccupiedBlur()}
                                        onChange={(e)=>dormitoryRoom.setEditOccupied(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleOccupiedBlur();
                                            }
                                        }}
                                        autoFocus
                                        className="border-none outline-none bg-transparent w-6 text-center font-bold"
                                    />
                                    :
                                    <b onClick={()=>setIsEditOccupied(true)} className='cursor-pointer w-6 text-center font-bold'>
                                        {dormitoryRoom?.data?.occupied ? dormitoryRoom?.data?.occupied : 0}
                                    </b>
                                }
                                ห้อง
                                ว่าง <b className='font-bold ms-1'>{dormitoryRoom.data?.quantity - dormitoryRoom.data?.occupied}</b>
                            </section>
                            <span className='text-xs opacity-50 font-normal'>(กดที่ตัวเลขเพื่อแก้ไข)</span>
                        </div>
                    </div>
                    <div className='relative overflow-hidden mt-4 rounded-xl'>
                        <div className='h-96 lg:h-[27rem]'>
                            {dormitoryRoom?.data?.dormitory_typeimg?.length > 0 ?
                                <div onClick={() => setImgModal(true)} className='w-full h-full cursor-pointer'>
                                    <Carousel data={dormitoryRoom?.data?.dormitory_typeimg} path='dormitoryTypeImages'/>
                                </div>
                                :
                                <>
                                <label htmlFor="dropzone-file" className="relative overflow-hidden flex h-full flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50/40 dark:bg-gray-700/40 hover:bg-sky-100/40 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700/80 transition-300">
                                    {dormitoryRoom.imageSelectEdit && (
                                        <div className="overflow-hidden h-full w-full absolute">
                                            <img 
                                                src={URL.createObjectURL(dormitoryRoom.imageSelectEdit)} 
                                                alt='Preview' 
                                                className='h-full w-full
                                                object-cover object-center'
                                            />
                                        </div>
                                    )}
                                    {dormitoryRoom.loadingUpload &&
                                        <span className='h-full w-full flex-center bg-black/50 absolute top-0 left-0'>
                                            <CircularProgress size={40}/>
                                        </span>
                                    }
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 relative">
                                        <FiUploadCloud className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"'/>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">คลิกเพื่ออัพโหลดรูปภาพ</span></p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or webp (MAX. 1MB)</p>
                                    </div>
                                    <input id="dropzone-file" accept="image/*" type="file" className="hidden" onChange={(e) => dormitoryRoom.handleEditImage(e, 'add')}/>
                                </label>
                                {!dormitoryRoom.loadingUpload && dormitoryRoom.imageSelectEdit &&
                                    <Button onClick={dormitoryRoom.addImage} 
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
                                    value={dormitoryRoom.data?.price}
                                    onBlur={()=>handlePriceBlur()}
                                    onChange={(e)=>dormitoryRoom.setEditPrice(e.target.value)}
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
                                    THB {dormitoryRoom?.data?.price} <FaRegEdit className='text-xs absolute top-0 -right-4'/>
                                </h1>
                            </div>
                        }
                    </div>
                    {imgModal && dormitoryRoom.data?.dormitory_typeimg?.length > 0 &&
                        <>
                            <div onClick={()=>setImgModal(false)} className='fixed top-0 left-0 z-999 bg-black/70 h-screen w-screen'></div>
                            <div className="w-[90%] lg:w-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-999">
                                <div className='flex-center mb-10'>
                                    <div className="relative rounded-2xl overflow-hidden">
                                        {dormitoryRoom.previewImg !== null ?
                                            <>
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dormitoryTypeImages/${dormitoryRoom.data?.dormitory_typeimg[dormitoryRoom.previewImg]?.url}`}
                                                    alt={dormitoryRoom.data?.dormitory_typeimg[dormitoryRoom.previewImg]?.url || '/404.png'}
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
                                                                onChange={(e) => dormitoryRoom.handleEditImage(e, 'edit')} // ฟังก์ชันอัปโหลดรูปภาพ
                                                            />
                                                        </label>
                                                        <button 
                                                            onClick={()=>dormitoryRoom.removeImage()}
                                                            className='text-2xl text-black/50 bg-white p-2 rounded-full 
                                                            transition-300 hover:scale-110 hover:text-red-500'    
                                                            onMouseEnter={() => setIsHoveredDelete(true)}
                                                            onMouseLeave={() => setIsHoveredDelete(false)}
                                                        >
                                                            {isHoveredDelete ? <MdDelete /> : <MdDeleteOutline />}
                                                        </button>
                                                    </div>
                                                </span>
                                                {dormitoryRoom.loadingUpload &&
                                                    <span className='h-full w-full flex-center bg-black/50 absolute top-0 left-0'>
                                                        <CircularProgress size={40}/>
                                                    </span>
                                                }
                                            </>
                                            : dormitoryRoom.imageSelectEdit &&
                                            <>
                                                {dormitoryRoom.loadingUpload &&
                                                    <span className='h-full w-full flex-center bg-black/50 absolute top-0 left-0'>
                                                        <CircularProgress size={40}/>
                                                    </span>
                                                }
                                                <img
                                                    src={URL.createObjectURL(dormitoryRoom.imageSelectEdit)}
                                                    alt={dormitoryRoom.imageSelectEdit?.name || '/404.png'}
                                                    className='object-center object-contain max-h-[65vh] rounded-2xl'
                                                    loading='lazy'
                                                />
                                                {!dormitoryRoom.loadingUpload &&
                                                    <div className='absolute -translate-x-1/2 left-1/2 bottom-4 flex gap-4'>
                                                        <Button onClick={dormitoryRoom.imageSubmitState === 'add' ? dormitoryRoom.addImage : dormitoryRoom.updateImage} 
                                                        variant='contained' className='rounded-full text-whit text-nowrap text-white'>
                                                            ยืนยัน{dormitoryRoom.imageSubmitState === 'add' ? 'การเพิ่มรูปภาพ' : 'การแก้ไขรูปภาพ'}
                                                        </Button>
                                                        {dormitoryRoom.imageSubmitState === 'edit' &&
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
                                                                    onChange={(e) => dormitoryRoom.handleEditImage(e, 'edit')} // ฟังก์ชันอัปโหลดรูปภาพ
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
                                    {dormitoryRoom?.data?.dormitory_typeimg.slice(0, dormitoryRoom?.data?.dormitory_typeimg.length > 8 ? 7 : dormitoryRoom?.data?.dormitory_typeimg.length - 1).map((item, index) => (
                                        <button onClick={()=>dormitoryRoom.setPreviewImg(index)} key={index} 
                                        className={`h-full aspect-square rounded-md bg-base overflow-hidden min-w-16
                                        ${dormitoryRoom.previewImg === index && 'border-[3px] border-blue-400'}`}>
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dormitoryTypeImages/${item.url}`}
                                                alt={item.url}
                                                width={100}
                                                height={100}
                                                className='object-center object-cover w-full h-full'
                                                loading='lazy'
                                            />
                                        </button>
                                    ))}
                                    {dormitoryRoom?.data?.dormitory_typeimg.length > 0 && (
                                        <div className='h-full aspect-square bg-base overflow-hidden relative min-w-16 rounded-md'>
                                            <button
                                                onClick={()=>setAllImg(true)}
                                                className="absolute w-full h-full flex-center text-white text-xs bg-black/50"
                                            >
                                                ดูเพิ่มเติม
                                            </button>
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dormitoryTypeImages/${dormitoryRoom?.data?.dormitory_typeimg[dormitoryRoom?.data?.dormitory_typeimg.length > 8 ? 7 : dormitoryRoom?.data?.dormitory_typeimg.length - 1]?.url}`}
                                                alt={dormitoryRoom?.data?.dormitory_typeimg?.[dormitoryRoom?.data?.dormitory_typeimg.length > 8 ? 7 : dormitoryRoom?.data?.dormitory_typeimg.length - 1]?.url || '/404.png'}
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
                                                {dormitoryRoom?.data?.dormitory_typeimg?.map((item, index) => (
                                                    <button onClick={()=>dormitoryRoom.setPreviewImg(index)} key={index} className='rounded-md h-16 aspect-square bg-base overflow-hidden min-w-16'>
                                                        <Image
                                                            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dormitoryTypeImages/${item.url}`}
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
                                                        onChange={(e) => dormitoryRoom.handleEditImage(e, 'add')}
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
                    <h4 className='text-lg lg:text-xl font-semibold mt-6'>
                        สิ่งอำนวยความสะดวก 
                        <span className='text-xs opacity-50 ms-2 font-normal'>(กดที่ไอคอนเพื่อเปลี่ยนสถานะ)</span>
                    </h4>
                    <section className='p-4 lg:ps-8 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4'>
                        {[
                            { key: 'fan', label: 'พัดลม', icon: <PiFan /> },
                            { key: 'air', label: 'เครื่องปรับอากาศ', icon: <LuAirVent /> },
                            { key: 'closet', label: 'ตู้เสื้อผ้า', icon: <BiCloset /> },
                            { key: 'water_heater', label: 'เครื่องทำน้ำอุ่น', icon: <FaShower /> },
                            { key: 'table', label: 'โต๊ะทำงาน', icon: <GiTable /> },
                            { key: 'dressing_table', label: 'โต๊ะเครื่องแป้ง', icon: <TbTableAlias /> },
                            { key: 'fridge', label: 'ตู้เย็น', icon: <TbFridge /> },
                            { key: 'bed', label: 'เตียงนอน', icon: <MdOutlineKingBed /> },
                            { key: 'tv', label: 'โทรทัศน์', icon: <PiTelevisionSimple /> },
                        ].map((facility) => (
                            <button
                                key={facility.key}
                                onClick={() => dormitoryRoom.setFacilities(facility.key)}
                                className={`col-span-2 gap-4 flex-y-center text-sm ${
                                    dormitoryRoom?.data?.dormitory_facilitate?.[facility.key as FacilityKey] ? '' : 'opacity-50 grayscale'
                                }`}
                            >
                                {dormitoryRoom.loadingState.some(item => item === facility.key)
                                    ? <CircularProgress size={20}/>
                                    : cloneElement(facility.icon, { className: 'text-xl text-blue-500' })
                                } <p className='text-left'>{facility.label}</p>
                            </button>
                        ))}
                    </section>
                    <div>
                        <h4 className='text-lg lg:text-xl font-semibold mt-6'>
                            ขนาดห้องพัก 
                            <span className='text-xs opacity-50 ms-2 font-normal'>(กดที่ตัวเลขเพื่อแก้ไข)</span>
                        </h4>
                        <section className='p-4 flex-y-center gap-2 text-sm'>
                            <TfiRulerPencil className='text-blue-500 text-xl'/>
                            <div className='flex-y-center bg-blue-400/10 shadow-sm rounded-full py-2 px-4'>
                                กว้าง
                                {isEditWidth ? 
                                    <input 
                                        type="text"
                                        value={dormitoryRoom.data?.width ? dormitoryRoom.data?.width : ''}
                                        onBlur={()=>handleWidthBlur()}
                                        onChange={(e)=>dormitoryRoom.setEditWidth(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleWidthBlur();
                                            }
                                        }}
                                        autoFocus
                                        className="border-none outline-none bg-transparent w-8 text-center"
                                    />
                                    :
                                    <p onClick={()=>setIsEditWidth(true)} className='cursor-pointer w-8 text-center'>
                                        {dormitoryRoom?.data?.width ? dormitoryRoom?.data?.width : 0}
                                    </p>
                                }
                                ซม.
                            </div>
                            <span className='text-sm font-semibold'>x</span> 
                            <div className='flex-y-center bg-blue-400/10 shadow-sm rounded-full py-2 px-4'>
                                ยาว
                                {isEditLength ? 
                                    <input 
                                        type="text"
                                        value={dormitoryRoom.data?.length ? dormitoryRoom.data?.length : ''}
                                        onBlur={()=>handleLengthBlur()}
                                        onChange={(e)=>dormitoryRoom.setEditLength(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleLengthBlur();
                                            }
                                        }}
                                        autoFocus
                                        className="border-none outline-none bg-transparent w-8 text-center"
                                    />
                                    : dormitoryRoom?.data?.length ?
                                        <p onClick={()=>setIsEditLength(true)} className='cursor-pointer w-8 text-center'>
                                            {dormitoryRoom?.data?.length}
                                        </p>
                                        :
                                        <p onClick={()=>setIsEditLength(true)} className='cursor-pointer w-8 text-center'>
                                            0
                                        </p>
                                }
                                ซม.
                            </div>
                        </section>
                    </div>
                </div>
                <div className='w-full flex-center py-8 sm:pt-6 sm:pb-0 bg-base sm:bg-black/0 sm:dark:bg-black/0'>
                    <Button variant='contained' color='error' sx={{ borderRadius: '99999px', color: '#fff' }}
                    onClick={()=>dormitoryRoom.deleteRoom()}>
                        ลบประเภทห้องพัก
                    </Button>
                </div>
            </div>
        </div>
    )
})

export default page