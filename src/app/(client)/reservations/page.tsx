import axios from "axios";
import Link from "next/link"
import Starscore from "@/components/Starscore"
import { headers } from "next/headers";

// Components
import Carousel from "@/components/reservations/Carousel";
import Delete from "@/components/reservations/Delete";

// Material UI
import Button from "@mui/material/Button";

// Icons
import { SiGooglemaps } from "react-icons/si";
import { IoIosFitness } from "react-icons/io";
import { BiCctv, BiCloset } from "react-icons/bi";
import { FaWifi, FaSmoking, FaCarSide, FaMotorcycle, FaShower, FaTable } from "react-icons/fa";
import { PiDogFill, PiFan, PiTelevisionSimple } from "react-icons/pi";
import { GiLift, GiSecurityGate, GiKeyCard, GiWashingMachine } from "react-icons/gi";
import { RiFingerprintFill, RiRestaurantLine } from "react-icons/ri";
import { GrUserPolice } from "react-icons/gr";
import { LuAirVent } from "react-icons/lu";
import { TbFridge } from "react-icons/tb";
import { IoBed } from "react-icons/io5";

async function getData(id: string | null) {
    if (id) {
      try {
        const result = await axios.get(`https://all-day-deploy.vercel.app/api/reserve/${id}`);
        return result.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    } else {
      return null;
    }
}

const page = async () => {
    const headerRequest = headers();
    const userId = headerRequest.get('userId')
    const data = await getData(userId);

    if (!data || data.length === 0) {
        return (
            <div className="flex-center h-screen">
                <h1>ไม่มีข้อมูลการจอง</h1>
            </div>
        );
    }

    return (
        <div className='pt-20 md:pt-28 pb-10 container'>
            <h1 className="text-2xl font-semibold">
                รายละเอียดการจองของฉัน
            </h1>
            <div className="bg-blue-400/30 rounded-2xl px-4 py-2 mt-2 sm:flex justify-between">
                <div className="sm:flex gap-2 items-end">
                    <p className="font-semibold">หมายเลขการจอง:</p>
                    <p className="text-sm">{data?.code}</p>
                </div>
                <p className="font-semibold text-blue-600 dark:text-blue-300">{data?.dormitory_type.name}</p>
            </div>
            <div className="gap-4 mt-6">
                <div className="flex justify-center">
                    <div className="card w-full md:w-[92%] aspect-video sm:aspect-[16/7] rounded-3xl relative overflow-hidden hover:aspect-square lg:hover:aspect-video
                    md:hover:w-full
                    transition-all duration-700 ease-in-out hover:shadow-2xl dark:hover:shadow-xl hover:shadow-blue-300/60 dark:hover:shadow-blue-950/60">
                        <Carousel data={data?.dormitory_type.dormitory_typeimg}/>
                        <p className="font-semibold text-white bg-blue-400 shadow-lg
                        absolute right-0 top-0 px-4 py-2 rounded-bl-3xl text-xl z-50">
                            <span className="text-sm me-1">THB</span>
                            {data?.dormitory_type.price}
                        </p>
                    </div>
                </div>
                <div className="flex items-start justify-between gap-4 mt-6 md:border-t-items pt-4 px-4 sm:px-0">
                    <h1 className="text-lg font-semibold ">{data?.dormitory_type.dormitory.name}</h1>
                    <div className="text-yellow-400 text-base mt-1">
                        <Starscore score={data?.dormitory_type.dormitory.reviewScore}/>
                    </div>
                </div>
               <div className="px-4 sm:px-0">
                <p className="text-sm opacity-70">{data?.dormitory_type.dormitory.address}</p>
                    <Link href={data?.dormitory_type.dormitory.location} passHref className="flex gap-1 items-center mt-2 bg-blue-400/20 px-2 py-1 rounded-full transition-300
                    hover:shadow-2xl dark:hover:shadow-xl hover:shadow-blue-300/60 dark:hover:shadow-blue-950/60 text-blue-500
                    hover:bg-blue-400/40">
                        <SiGooglemaps/>ดูแผนที่
                    </Link>
               </div>
                <div className="card p-4 relative pb-14 overflow-hidden mt-6">
                    <span className="absolute -bottom-16 -right-32 w-56 h-56 rotate-45 bg-blue-400/20 rounded-2xl"></span>
                    <span className="absolute -bottom-28 -right-40 w-72 h-96 rotate-45 bg-blue-400/20 rounded-2xl"></span>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
                        <span className={`col-span-1 flex-y-center gap-4 text-sm
                            ${data?.dormitory_type.dormitory.dormitory_state.wifi ? '' : 'opacity-50 grayscale'}`}>
                            <FaWifi className="text-xl text-blue-500"/> วายฟาย
                        </span>
                        <span className={`col-span-1 flex-y-center gap-4 text-sm
                            ${data?.dormitory_type.dormitory.dormitory_state.park_car ? '' : 'opacity-50 grayscale'}`}>
                            <FaCarSide className="text-xl text-blue-500"/> ลาจอดรถยนต์
                        </span>
                        <span className={`col-span-1 flex-y-center gap-4 text-sm
                            ${data?.dormitory_type.dormitory.dormitory_state.park_motorcycle ? '' : 'opacity-50 grayscale'}`}>
                            <FaMotorcycle className="text-xl text-blue-500"/> ลานจอดรถมอไซค์
                        </span>
                        <span className={`col-span-1 flex-y-center gap-4 text-sm
                            ${data?.dormitory_type.dormitory.dormitory_state.washing ? '' : 'opacity-50 grayscale'}`}>
                            <GiWashingMachine className="text-xl text-blue-500"/> เครื่องซักผ้า
                        </span>
                        <span className={`col-span-1 flex-y-center gap-4 text-sm
                            ${data?.dormitory_type.dormitory.dormitory_state.restaurant ? '' : 'opacity-50 grayscale'}`}>
                            <RiRestaurantLine className="text-xl text-blue-500"/> ร้านอาหาร
                        </span>
                        <span className={`col-span-1 flex-y-center gap-4 text-sm
                            ${data?.dormitory_type.dormitory.dormitory_state.store ? '' : 'opacity-50 grayscale'}`}>
                            <BiCctv className="text-xl text-blue-500"/> ร้านสะดวกซื้อ
                        </span>
                        <span className={`col-span-1 flex-y-center gap-4 text-sm
                            ${data?.dormitory_type.dormitory.dormitory_state.lift ? '' : 'opacity-50 grayscale'}`}>
                            <GiLift className="text-xl text-blue-500"/> ลิฟต์
                        </span>
                        <span className={`col-span-1 flex-y-center gap-4 text-sm
                            ${data?.dormitory_type.dormitory.dormitory_state.security_door ? '' : 'opacity-50 grayscale'}`}>
                            <GiSecurityGate className="text-xl text-blue-500"/> ประตูรักษาปลอดภัย
                        </span>
                        <span className={`col-span-1 flex-y-center gap-4 text-sm
                            ${data?.dormitory_type.dormitory.dormitory_state.keycard ? '' : 'opacity-50 grayscale'}`}>
                            <GiKeyCard className="text-xl text-blue-500"/> บัตรผ่านประตู
                        </span>
                        <span className={`col-span-1 flex-y-center gap-4 text-sm
                            ${data?.dormitory_type.dormitory.dormitory_state.animal ? '' : 'opacity-50 grayscale'}`}>
                            <PiDogFill className="text-xl text-blue-500"/> เลี้ยงสัตว์ได้
                        </span>
                        <span className={`col-span-1 flex-y-center gap-4 text-sm
                            ${data?.dormitory_type.dormitory.dormitory_state.fitness ? '' : 'opacity-50 grayscale'}`}>
                            <IoIosFitness className="text-xl text-blue-500"/> ฟิตเนส
                        </span>
                        <span className={`col-span-1 flex-y-center gap-4 text-sm
                            ${data?.dormitory_type.dormitory.dormitory_state.fingerprint ? '' : 'opacity-50 grayscale'}`}>
                            <RiFingerprintFill className="text-xl text-blue-500"/> ตรวจสอบลายนิ้วมือ
                        </span>
                        <span className={`col-span-1 flex-y-center gap-4 text-sm
                            ${data?.dormitory_type.dormitory.dormitory_state.cctv ? '' : 'opacity-50 grayscale'}`}>
                            <BiCctv className="text-xl text-blue-500"/> ก้องวงจรปิด
                        </span>
                        <span className={`col-span-1 flex-y-center gap-4 text-sm
                            ${data?.dormitory_type.dormitory.dormitory_state.security_guard ? '' : 'opacity-50 grayscale'}`}>
                            <GrUserPolice className="text-xl text-blue-500"/> รปภ.
                        </span>
                        <span className={`col-span-1 flex-y-center gap-4 text-sm
                            ${data?.dormitory_type.dormitory.dormitory_state.smoke ? '' : 'opacity-50 grayscale'}`}>
                            <FaSmoking className="text-xl text-blue-500"/> พื้นที่สูบบุหรี่
                        </span>
                        <span className={`col-span-1 flex-y-center gap-4 text-sm
                            ${data?.dormitory_type.dormitory_facilitate.fan ? '' : 'opacity-50 grayscale'}`}>
                            <PiFan className="text-xl text-blue-500"/> พัดลม
                        </span>
                        <span className={`col-span-1 flex-y-center gap-4 text-sm
                            ${data?.dormitory_type.dormitory_facilitate.air ? '' : 'opacity-50 grayscale'}`}>
                            <LuAirVent className="text-xl text-blue-500"/> เครื่องปรับอากาศ
                        </span>
                        <span className={`col-span-1 flex-y-center gap-4 text-sm
                            ${data?.dormitory_type.dormitory_facilitate.bed ? '' : 'opacity-50 grayscale'}`}>
                            <IoBed className="text-xl text-blue-500"/> เตียงนอน
                        </span>
                        <span className={`col-span-1 flex-y-center gap-4 text-sm
                            ${data?.dormitory_type.dormitory_facilitate.dressing_table ? '' : 'opacity-50 grayscale'}`}>
                            <FaTable className="text-xl text-blue-500"/> โต๊ะเครื่องแป้ง
                        </span>
                        <span className={`col-span-1 flex-y-center gap-4 text-sm
                            ${data?.dormitory_type.dormitory_facilitate.closet ? '' : 'opacity-50 grayscale'}`}>
                            <BiCloset className="text-xl text-blue-500"/> ตู้เสื้อผ้า
                        </span>
                        <span className={`col-span-1 flex-y-center gap-4 text-sm
                            ${data?.dormitory_type.dormitory_facilitate.water_heater ? '' : 'opacity-50 grayscale'}`}>
                            <FaShower className="text-xl text-blue-500"/> น้ำอุ่น
                        </span>
                        <span className={`col-span-1 flex-y-center gap-4 text-sm
                            ${data?.dormitory_type.dormitory_facilitate.fridge ? '' : 'opacity-50 grayscale'}`}>
                            <TbFridge className="text-xl text-blue-500"/> ตู้เย็น
                        </span>
                        <span className={`col-span-1 flex-y-center gap-4 text-sm
                            ${data?.dormitory_type.dormitory_facilitate.tv ? '' : 'opacity-50 grayscale'}`}>
                            <PiTelevisionSimple className="text-xl text-blue-500"/> โทรศัพท์
                        </span>
                    </div>
                    <div className="px-4 py-2 mt-4 flex items-end justify-between gap-2
                    absolute left-0 bottom-0 w-full">
                        <div className="flex items-end gap-2">
                            <b>วันที่เข้าดูห้องพัก</b>
                            <p className="text-sm">2024-07-30</p>
                        </div>
                        <Delete id={data?.id}/>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <Link href={`/dormitory/${data?.dormitory_type.dormitory.id}`}>
                    <Button variant="contained" sx={{ color: '#fff', borderRadius: '3rem' }}>ดูรายละเอียดเพิ่มเติม</Button>
                </Link>
            </div>
        </div>
    )
}

export default page