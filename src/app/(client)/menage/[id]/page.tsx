import Loader from '@/components/Loader'
import Link from "next/link";
import axios from "axios";
import { headers } from "next/headers";

// Components
import MenageMenu from '@/components/dormitory/MenageMenu';
import Carousel from "@/components/dormitory/Carousel";

// Icons
import { IoIosFitness } from "react-icons/io";
import { BiCctv } from "react-icons/bi";
import { FaWifi, FaSmoking, FaCarSide, FaMotorcycle, FaRegEdit } from "react-icons/fa";
import { PiDogFill } from "react-icons/pi";
import { GiLift, GiSecurityGate, GiKeyCard, GiWashingMachine } from "react-icons/gi";
import { RiFingerprintFill, RiRestaurantLine } from "react-icons/ri";
import { GrUserPolice } from "react-icons/gr";
import { MdStorefront } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";

// Mui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


async function getData(id: string) {
    try {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getDormitory/${id}`);
        return result.data;
    } catch (error) {
        // console.error("Error fetching data:", error);
        return null;
    }
}

const page = async ({ params }: { params: { id: string } }) => {
    const headerRequest = headers();
    const name = headerRequest.get('name');
    const data = await getData(params.id);
    const totalQuantity = data.dormitory_type.reduce((sum:number, dormitory:any) => sum + dormitory.quantity, 0);
    const totalOccupied = data.dormitory_type.reduce((sum:number, dormitory:any) => sum + dormitory.occupied, 0);
    const percentage = (totalOccupied / totalQuantity) * 100;
    return (
        <div className='pt-16 md:pt-20 sm:pb-10'>
            <MenageMenu param={params.id}/>
            <div className='sm:container'>
                <div className='flex-y-center flex-col lg:flex-row gap-4 pt-6'>
                    <div className='flex-1 flex flex-col items-center lg:items-start'>
                        <h1 className='text-2xl md:text-4xl font-bold'>
                            ยินดีต้อนรับคุณ, {name?.startsWith('null') ? 'ยังไม่กำหนดชื่อ' : name}!
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
                            <Loader percentage={percentage}/>
                        </div>
                    </div>
                </div>
                <div className='card rounded-3xl rounded-b-none sm:rounded-b-3xl mt-8 px-4 md:px-16 pt-8 pb-8
                relative overflow-hidden'>
                    <Link href={`/menage/${params.id}/edit`} className='absolute ps-[0.65rem] pb-[0.65rem] p-2 
                    md:right-8 md:top-8 top-4 right-4
                    bg-black dark:bg-white flex-center rounded-full transition-300
                    hover:bg-blue-400 hover:text-white text-white dark:text-black'>
                        <FaRegEdit/>
                    </Link>
                    <div className='flex-y-center flex-col'>
                        <h1 className='text-xl font-semibold text-center max-w-[90%]'>{data.name}</h1>
                        <p className='text-center opacity-70 max-w-[90%]'>{data.engname ? data.engname : ''}</p>
                    </div>
                    <div className='h-96 rounded-xl overflow-hidden relative mt-4'>
                        <Carousel data={data.dormitory_img} path='dormitoryImages'/>
                        <h1 className='absolute top-0 right-0 py-2 px-4 font-bold bg-blue-400 text-white z-50 rounded-bl-3xl'>
                            THE {data.price}
                        </h1>
                    </div>
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
                            ${data.dormitory_state?.wifi ? '' : 'opacity-50 grayscale'}`}>
                            <FaWifi className="text-xl text-blue-500"/> วายฟาย
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${data.dormitory_state?.park_car ? '' : 'opacity-50 grayscale'}`}>
                            <FaCarSide className="text-xl text-blue-500"/> ลาจอดรถยนต์
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${data.dormitory_state?.park_motorcycle ? '' : 'opacity-50 grayscale'}`}>
                            <FaMotorcycle className="text-xl text-blue-500"/> ลานจอดรถมอไซค์
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${data.dormitory_state?.washing ? '' : 'opacity-50 grayscale'}`}>
                            <GiWashingMachine className="text-xl text-blue-500"/> เครื่องซักผ้า
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${data.dormitory_state?.restaurant ? '' : 'opacity-50 grayscale'}`}>
                            <RiRestaurantLine className="text-xl text-blue-500"/> ร้านอาหาร
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${data.dormitory_state?.store ? '' : 'opacity-50 grayscale'}`}>
                            <MdStorefront className="text-xl text-blue-500"/> ร้านสะดวกซื้อ
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${data.dormitory_state?.lift ? '' : 'opacity-50 grayscale'}`}>
                            <GiLift className="text-xl text-blue-500"/> ลิฟต์
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${data.dormitory_state?.security_door ? '' : 'opacity-50 grayscale'}`}>
                            <GiSecurityGate className="text-xl text-blue-500"/> ประตูรักษาปลอดภัย
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${data.dormitory_state?.keycard ? '' : 'opacity-50 grayscale'}`}>
                            <GiKeyCard className="text-xl text-blue-500"/> บัตรผ่านประตู
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${data.dormitory_state?.animal ? '' : 'opacity-50 grayscale'}`}>
                            <PiDogFill className="text-xl text-blue-500"/> เลี้ยงสัตว์ได้
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${data.dormitory_state?.fitness ? '' : 'opacity-50 grayscale'}`}>
                            <IoIosFitness className="text-xl text-blue-500"/> ฟิตเนส
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${data.dormitory_state?.fingerprint ? '' : 'opacity-50 grayscale'}`}>
                            <RiFingerprintFill className="text-xl text-blue-500"/> ตรวจสอบลายนิ้วมือ
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${data.dormitory_state?.cctv ? '' : 'opacity-50 grayscale'}`}>
                            <BiCctv className="text-xl text-blue-500"/> ก้องวงจรปิด
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${data.dormitory_state?.security_guard ? '' : 'opacity-50 grayscale'}`}>
                            <GrUserPolice className="text-xl text-blue-500"/> รปภ.
                        </span>
                        <span className={`col-span-2 flex-y-center gap-4 text-sm
                            ${data.dormitory_state?.smoke ? '' : 'opacity-50 grayscale'}`}>
                            <FaSmoking className="text-xl text-blue-500"/> พื้นที่สูบบุหรี่
                        </span>
                    </section>
                    <h4 className='text-lg lg:text-xl font-semibold mt-6 mb-4'>ห้องพัก</h4>
                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {data.dormitory_type.map((v:any, k:number)=>(
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
                            {data.location_distance.map((v:any, k:number) => (
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
}

export default page