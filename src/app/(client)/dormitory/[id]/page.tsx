import Link from "next/link";
import axios from "axios";

// Material UI
import { Button } from "@mui/material";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

// Components
import Carousel from "@/components/dormitory/Carousel";
import MenuHeader from "@/components/dormitory/MenuHeader";
import Overview from "@/components/dormitory/Overview";
import RoomList from "@/components/dormitory/RoomList";
import Facilitate from "@/components/dormitory/Facilitate";
import Review from "@/components/dormitory/Review";

// Fetch data function
async function getData(id: string) {
    try {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getDormitory/${id}`);
        return result.data;
    } catch (error) {
        // console.error("Error fetching data:", error);
        return null;
    }
}

// Page component
async function Page({ params }: { params: { id: string } }) {
    const data = await getData(params.id);
    
    if (data) {
        return (
            <div className='pt-16 md:pt-20 pb-10'>
                <div className="flex-center gap-2 h-9 bg-blue-400 text-white text-sm">
                    ลงทะเบียนเป็นสมาชิคกับเราได้ที่ <Link href="/register" className="font-bold cursor-pointer">สมัครสมาชิก</Link>
                </div>
                <MenuHeader data={data}/>
                <div className="sm:container sm:pt-6 xl:px-16 z-10">
                    <Carousel/>
                    <Overview dmtId={params.id}/>
                    <h1 className='text-lg lg:text-xl font-semibold mt-4 py-2 ps-4 sm:ps-0 border-t sm:border-none
                    bg-base sm:bg-white/0 dark:sm:bg-black/0 border-gray-400/30 dark:border-gray-700/20'>
                        สิ่งอำนวยความสะดวก
                    </h1>
                    <Facilitate/>
                    <h1 className='text-lg lg:text-xl font-semibold mt-4 py-2 ps-4 sm:ps-0 border-t sm:border-none
                    bg-base sm:bg-white/0 dark:sm:bg-black/0 border-gray-400/30 dark:border-gray-700/20'>ห้องว่างที่ให้ผู้เข้าพักจองที่เปิดให้บริการ</h1>
                    <RoomList/>
                    <Review dormitoryId={params.id}/>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex-center h-screen w-screen">
                ไม่พบบริการที่เลือก
            </div>
        );
    }
}

export default Page;
