'use client'
import { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import dormitoryRoom from '@/stores/dormitoryRoom';
import Link from "next/link";
import axios from "axios";
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { cloneElement } from 'react';
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
import { IoImage } from "react-icons/io5";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

// Mui
import CircularProgress from '@mui/material/CircularProgress';

// Type
type FacilityKey = keyof {
    fan: boolean;
    air: boolean;
    closet: boolean;
    water_heater: boolean;
    table: boolean;
    dressing_table: boolean;
    fridge: boolean;
    bed: boolean;
    tv: boolean;
};

const page = observer(({ params }: { params: { id: string } }) => {
    const { data: session, status } = useSession();
    const [isHoveredDelete, setIsHoveredDelete] = useState<boolean>(false);

    return (
        <>
            {dormitoryRoom.loadingState.some(item => item === 'addroom') &&
                <span className='fixed top-0 left-0 h-screen w-screen bg-black/70 z-999 flex-center'>
                    <CircularProgress />
                </span>
            }
            <div className='pt-16 md:pt-20 sm:pb-10'>
                <div className='sm:container pt-8 sm:pt-12'>
                    <Link href={`/menage/${params.id}`} 
                    className='flex-y-center font-medium hover:font-semibold md:text-xl gap-2 hover:gap-4 transition-all duration-300 ease-in-out hover:text-blue-500'>
                        <RiArrowLeftWideFill/>
                        กลับไปหน้าจัดการหอพัก
                    </Link>
                    <div className='card rounded-3xl rounded-b-none sm:rounded-b-3xl mt-2 sm:mt-8 px-4 md:px-16 pt-8 pb-8 overflow-hidden'>
                        <form onSubmit={(e)=>dormitoryRoom.handleSubmit(e, params.id)} className='grid grid-cols-12 gap-x-4 gap-y-2'>
                            <h4 className='col-span-12 font-semibold text-lg'>เพิ่มประเภทห้องพัก</h4>
                            <TextField label="ประเภทห้อง" variant="outlined" className='col-span-12 md:col-span-6' required
                                onChange={(e) => dormitoryRoom.setName(e.target.value)} value={dormitoryRoom.name}
                            />
                            <TextField label="จำนวนห้อง" variant="outlined" className='col-span-12 md:col-span-3' type='number' required
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">ห้อง</InputAdornment>
                                }}
                                onChange={(e) => dormitoryRoom.setQuantity(e.target.value)} value={dormitoryRoom.quantity}
                            />
                            <TextField label="ราคาเริ่มต้น" variant="outlined" className='col-span-12 md:col-span-3' type='number' required
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">บาท</InputAdornment>
                                }}
                                onChange={(e) => dormitoryRoom.setPrice(e.target.value)} value={dormitoryRoom.price}
                            />
                            <h4 className='col-span-12 font-semibold text-lg mt-2'>ขนาดห้อง</h4>
                            <TextField label="กว้าง" variant="outlined" className='col-span-12 md:col-span-5' type='number' required
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">ซม.</InputAdornment>
                                }}
                                onChange={(e) => dormitoryRoom.setWidth(e.target.value)} value={dormitoryRoom.width}
                            />
                            <TextField label="ยาว" variant="outlined" className='col-span-12 md:col-span-5' type='number' required
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">ซม.</InputAdornment>
                                }}
                                onChange={(e) => dormitoryRoom.setLength(e.target.value)} value={dormitoryRoom.length}
                            />
                            <TextField variant="outlined" className='col-span-12 md:col-span-2' type='number' disabled 
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">ตร.ม.</InputAdornment>
                                }}
                                value={
                                    dormitoryRoom.length
                                    ? ((Number(dormitoryRoom.length) / 100) * (Number(dormitoryRoom.length) / 100)).toFixed(1)
                                    : 0
                                }
                            />
                            <h4 className='col-span-12 font-semibold text-lg mt-2'>สิ่งอำนวยความสะดวก</h4>
                            <section className='p-4 col-span-12 lg:ps-8 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4'>
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
                                    <span
                                        key={facility.key}
                                        onClick={() => dormitoryRoom.setAddFacilities(facility.key)}
                                        className={`col-span-2 gap-4 flex items-center text-sm cursor-pointer ${
                                            dormitoryRoom?.addFacilities[facility.key as FacilityKey] ? '' : 'opacity-50 grayscale'
                                        }`}
                                    >
                                        {cloneElement(facility.icon, { className: 'text-xl text-blue-500' })}
                                        <p className='text-left'>{facility.label}</p>
                                    </span>
                                ))}
                            </section>
                            <h4 className='col-span-12 font-semibold text-lg mt-2'>รูปภาพภายในห้อง</h4>
                            <div className='col-span-12 mt-2 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-10 xl:grid-cols-12 gap-2 rounded-md'>
                                <label className='col-span-2 aspect-square border-dashed border-2 border-slate-500/40 rounded-md
                                flex-center text-4xl bg-slate-500/30 text-slate-500/40 opacity-60 hover:opacity-100 transition-300 cursor-pointer'>
                                    {dormitoryRoom.previews.length === 0 ?
                                        <input
                                            type='file'
                                            accept="image/*" 
                                            className="hidden"
                                            multiple
                                            onChange={(e) => dormitoryRoom.handleFileChange(e)}
                                        />
                                        :
                                        <input
                                            type='file'
                                            accept="image/*" 
                                            className="hidden"
                                            multiple
                                            onChange={(e) => dormitoryRoom.handleAddFiles(e)}
                                        />

                                    }
                                    <IoImage />
                                </label>
                                {dormitoryRoom.previews.length > 0 && dormitoryRoom.previews.map((preview, index) => (
                                    <div key={index} className='rounded-md col-span-2 overflow-hidden aspect-square bg-blue-500/10 relative'>
                                        <Image
                                            src={preview}
                                            alt={`Preview ${index}`}
                                            width={100}
                                            height={100}
                                            className='object-center object-cover w-full h-full'
                                        />
                                        <span className='w-full h-full bg-black/50 opacity-0 hover:opacity-100 transition-300 
                                        flex-center absolute top-0 left-0'>
                                            <button
                                                onClick={()=>dormitoryRoom.handleRemoveImage(index)}
                                                onMouseEnter={() => setIsHoveredDelete(true)}
                                                onMouseLeave={() => setIsHoveredDelete(false)}
                                                className='text-2xl text-black/50 bg-white p-2 rounded-full 
                                                transition-300 hover:scale-110 hover:text-red-500 cursor-pointer'
                                            >
                                                {isHoveredDelete ? <MdDelete /> : <MdDeleteOutline />}
                                            </button>
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className='col-span-12 flex-center mt-4'>
                                <Button variant='contained' className='rounded-full text-whit text-nowrap text-white' type='submit'>
                                    ยืนยันการเพิ่มประเภทห้องพัก
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
})

export default page