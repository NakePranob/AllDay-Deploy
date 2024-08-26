'use client'
import { observer } from 'mobx-react';
import dormitoryOnly from '@/stores/dormitoryOnly';
import { useRef, useEffect, createRef } from 'react';
import Image from 'next/image';
import { DayOption, months, YearPlus } from '@/function/dateTime';
import { useSession } from 'next-auth/react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { TfiRulerPencil } from "react-icons/tfi";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { MdBookmarkBorder, MdOutlineMeetingRoom } from "react-icons/md";
import { IoMdBookmark, IoIosFitness } from "react-icons/io";
import { BiChat, BiCctv, BiGitCompare, BiCloset } from "react-icons/bi";
import { FaFacebookSquare, FaWifi, FaSmoking, FaCarSide, FaMotorcycle, FaTable  } from "react-icons/fa";
import { PiPhoneCallFill, PiDogFill, PiGenderIntersex, PiPicnicTableBold, PiFan, PiTelevisionSimple } from "react-icons/pi";
import { FaLine, FaShower  } from "react-icons/fa6";
import { GiLift, GiSecurityGate, GiKeyCard, GiWashingMachine } from "react-icons/gi";
import { RiFingerprintFill, RiRestaurantLine, RiStore3Line } from "react-icons/ri";
import { GrUserPolice } from "react-icons/gr";
import { HiOutlineDocumentText, HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineMan, AiOutlineWoman } from "react-icons/ai";
import { LuAirVent } from "react-icons/lu";
import { TbFridge } from "react-icons/tb";
import { IoBed } from "react-icons/io5";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const RoomList = observer(() => {
    const { data: session, status } = useSession();

    const style = {
        position: 'absolute' as 'absolute',
        boxShadow: 24,
        p: 4,
    };

    const progressCircle = useRef<SVGSVGElement>(null);
    const progressContent = useRef<HTMLSpanElement>(null);

    const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
        if (progressCircle.current && progressContent.current) {
            progressCircle.current.style.setProperty('--progress', `${1 - progress}`);
            progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
        }
    };

    useEffect(() => {
        dormitoryOnly.targetRoom = dormitoryOnly.targetRoom || createRef<HTMLElement>();
    }, []);

    const setModal = (open:boolean,id:number) => {
        dormitoryOnly.setReserveState(open);
        dormitoryOnly.setFormReserve(id)
    }

    return (
        <>
            <Modal
                open={dormitoryOnly.reserveState}
                onClose={()=>dormitoryOnly.setReserveState(false)}
                aria-labelledby="modal-formReserve-title"
                aria-describedby="modal-formReserve-description"
                >
                <Box sx={style} className='card w-full rounded-b-none sm:rounded-b-2xl sm:w-[32rem] alert sm:top-1/2 sm:left-1/2 
                sm:translate-x-[-50%] sm:translate-y-[-50%] bottom-0 sm:bottom-auto left-0 p-4'>
                    <div className="w-full flex-center sm:hidden">
                        <span onClick={() => dormitoryOnly.setReserveState(false)} className="w-12 h-1 mb-4 rounded-full bg-blue-300/30"></span>
                    </div>
                    <Typography id="modal-formReserve-title" variant="h6" component="h2" className='flex justify-between'>
                        <p className='text-ellipsis max-w-[70%] overflow-hidden whitespace-nowrap'>
                            {dormitoryOnly?.data?.dormitory_type?.length > 0 && dormitoryOnly?.formReserve?.id !== undefined && dormitoryOnly?.data?.dormitory_type[dormitoryOnly.formReserve.id]?.name
                                ? dormitoryOnly.data.dormitory_type[dormitoryOnly.formReserve.id].name 
                                : 'ไม่พบห้องที่ท่านเลือก'
                            }
                        </p>
                        <p className='text-blue-400'>
                            <span className='text-sm'>฿</span>
                            {dormitoryOnly?.data?.dormitory_type?.length > 0 && dormitoryOnly?.formReserve?.id !== undefined && dormitoryOnly?.data?.dormitory_type[dormitoryOnly.formReserve.id]?.price ?
                                dormitoryOnly.data.dormitory_type[dormitoryOnly.formReserve.id].price 
                                : ''
                            }
                        </p>
                    </Typography>
                    <form 
                        onSubmit={(e)=>dormitoryOnly.addReserve(e, 
                            status === 'authenticated' && session?.user 
                                ? session?.user?.id 
                                : null,
                            dormitoryOnly?.data?.dormitory_type?.length > 0 
                                ? dormitoryOnly.data.dormitory_type[dormitoryOnly.formReserve.id].id 
                                : null
                        )}
                        id="modal-formReserve-description"
                        className='mt-6'
                    >
                        <div className='sm:border-items rounded-xl pb-4 sm:p-4 grid grid-cols-1 sm:grid-cols-3 gap-4'>
                            <InputLabel className='col-span-1 sm:col-span-3 mb-2'>วันที่เข้าดูหอพัก</InputLabel>
                            <TextField
                                id="day"
                                select
                                label="วันที่"
                                name='day'
                                defaultValue={new Date().getDate()}
                                className='col-span-1'
                                >
                                {DayOption().map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="month"
                                select
                                label="เดือน"
                                name='month'
                                defaultValue={new Date().getMonth()}
                                className='col-span-1'
                                >
                                {months.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="year"
                                select
                                label="ปี"
                                name='year'
                                defaultValue={new Date().getFullYear()}
                                className='col-span-1'
                                >
                                {YearPlus(1).map((option, i) => (
                                    <MenuItem key={i} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <Button type='submit' variant="contained" className='text-white w-full rounded-full h-10 mt-4'>
                            ทำการจอง
                        </Button>
                    </form>
                </Box>
            </Modal>
            <section ref={dormitoryOnly.targetRoom}>
                {dormitoryOnly.data?.dormitory_type?.map((item, i) => (
                    <section key={i} className='card rounded-none sm:rounded-2xl mb-4 shadow-md p-4 relative overflow-hidden'>
                        <span className="absolute hidden sm:block w-80 h-80 bg-blue-400/20 -top-20 -left-44 rotate-[50deg] rounded-[3rem]"></span>
                        <span className="absolute hidden sm:block h-[35rem] w-80 bg-blue-400/10 -top-20 -left-40 rotate-[50deg] rounded-[2rem]"></span>
                        <h1 className='font-semibold text-lg mb-2 flex justify-between'>
                            {item.name}
                            <span className={`py-2 px-3 text-white rounded-md text-sm font-medium
                                ${item.occupied === item.quantity ? 'bg-red-400 dark:bg-red-500' : 'hidden'}`}>
                                {item.occupied === item.quantity ? 'ห้องพักเต็ม' : 'ว่าง'}
                            </span>
                        </h1>
                        <div className='flex flex-wrap'>
                            <div className='aspect-[16/9] md:h-64 md:aspect-[10/8] overflow-hidden rounded-lg'>
                                <Swiper
                                    spaceBetween={30}
                                    centeredSlides={true}
                                    autoplay={{
                                        delay: 10 * 1000,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    navigation={false}
                                    modules={[Autoplay]}
                                    onAutoplayTimeLeft={onAutoplayTimeLeft}
                                >
                                    {item.dormitory_typeimg.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dormitoryTypeImages/${image.url}`}
                                                alt={image.url}
                                                width={1920}
                                                height={950}
                                                className='h-full w-full object-cover object-center'
                                                priority
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className='md:flex-1 w-full md:w-auto mt-4 md:mt-0 md:ms-4 sm:border-items rounded-lg sm:p-4 relative
                            flex flex-col items-center'>
                                <div className='flex-x-center py-2 gap-2 text-sm bg-slate-100 dark:bg-gray-800 rounded-full w-56'>
                                    <TfiRulerPencil className='text-blue-500 text-lg' />
                                    กว้าง {item.width ? item.width/100 : 'ไม่มี'} ม. 
                                    <span className='text-xs'>x</span> 
                                    ยาว {item.length ? item.length/100 : 'ไม่มี'} ม.
                                </div>
                                <div className='mt-4 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 
                                xl:grid-cols-10 gap-4 pb-12 mb-4 sm:mb-0 w-full'>
                                    <span className={`col-span-2 flex-y-center gap-4 text-sm
                                        ${item.dormitory_facilitate.fan ? '' : 'oopacity-50 grayscale'}`}>
                                        <PiFan className="text-xl text-blue-500"/> พัดลม
                                    </span>
                                    <span className={`col-span-2 flex-y-center gap-4 text-sm
                                        ${item.dormitory_facilitate.air ? '' : 'oopacity-50 grayscale'}`}>
                                        <LuAirVent className="text-xl text-blue-500"/> เครื่องปรับอากาศ
                                    </span>
                                    <span className={`col-span-2 flex-y-center gap-4 text-sm
                                        ${item.dormitory_facilitate.bed ? '' : 'oopacity-50 grayscale'}`}>
                                        <IoBed className="text-xl text-blue-500"/> เตียงนอน
                                    </span>
                                    <span className={`col-span-2 flex-y-center gap-4 text-sm
                                        ${item.dormitory_facilitate.dressing_table ? '' : 'oopacity-50 grayscale'}`}>
                                        <FaTable className="text-xl text-blue-500"/> โต๊ะเครื่องแป้ง
                                    </span>
                                    <span className={`col-span-2 flex-y-center gap-4 text-sm
                                        ${item.dormitory_facilitate.closet ? '' : 'oopacity-50 grayscale'}`}>
                                        <BiCloset className="text-xl text-blue-500"/> ตู้เสื้อผ้า
                                    </span>
                                    <span className={`col-span-2 flex-y-center gap-4 text-sm
                                        ${item.dormitory_facilitate.water_heater ? '' : 'oopacity-50 grayscale'}`}>
                                        <FaShower className="text-xl text-blue-500"/> น้ำอุ่น
                                    </span>
                                    <span className={`col-span-2 flex-y-center gap-4 text-sm
                                        ${item.dormitory_facilitate.fridge ? '' : 'oopacity-50 grayscale'}`}>
                                        <TbFridge className="text-xl text-blue-500"/> ตู้เย็น
                                    </span>
                                    <span className={`col-span-2 flex-y-center gap-4 text-sm
                                        ${item.dormitory_facilitate.tv ? '' : 'oopacity-50 grayscale'}`}>
                                        <PiTelevisionSimple className="text-xl text-blue-500"/> โทรศัพท์
                                    </span>
                                </div>
                                <div className='absolute bottom-0 left-0 w-full flex justify-between items-end sm:pb-2 sm:px-4'>
                                    <h1 className='text-blue-400 font-semibold text-xl'>
                                        <span className='text-sm me-1'>THB</span>{item.price}
                                    </h1>
                                    <Button
                                        disabled={item.occupied === item.quantity}
                                        onClick={() => setModal(true, i)} 
                                        variant="contained" className='text-white rounded-full'>
                                        เลือกห้องพัก
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </section>
        </>
    )
})

export default RoomList;
