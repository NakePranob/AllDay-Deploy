'use client'
import { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import dormitory from '@/stores/dormitory';
import useScrollToBottom from '@/function/useScrollToBottom';

// Material UI
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

// Components
import CardDormitoryList from './CardDormitoryList';

// Icons
import { RxDashboard } from "react-icons/rx";
import { LuLayoutList } from "react-icons/lu";
import { LuFilter } from "react-icons/lu";
import { IoRefresh } from "react-icons/io5";

const CardDormitory = observer(({data}: any) => {
    const isBottom = useScrollToBottom();
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        dormitory.setDormitoryList(data);
    }, [])

    useEffect(() => {
        if (isBottom) {
          console.log('You have reached the bottom of the page');
          dormitory.addData();
        }
    }, [isBottom]);

    useEffect(() => {
        if (width === 0) {
            setWidth(window.innerWidth);
            dormitory.setResponsive(window.innerWidth);
        }
        const handleResize = () => {
            setWidth(window.innerWidth);
            dormitory.setResponsive(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [width]);

    return (
        <>
            <section className='card h-12 flex-y-center justify-end px-2 relative overflow-hidden'>
                <p className='text-sm opacity-70 me-2'>แสดง {dormitory.dormitoryList?.length} รายการ</p>
                <span className='h-6 border-r border-gray-300 dark:border-gray-700 mx-2'></span>
                <Tooltip 
                    onClick={()=>dormitory.setLayoutList(true)} 
                    title="ตาราง" 
                    sx={{ fontSize: "1.125rem"}} 
                    className={`hover:bg-blue-500/10 hidden md:block ${dormitory.layoutList && 'text-blue-400'}`}>
                    <IconButton>
                        <RxDashboard />
                    </IconButton>
                </Tooltip>
                <Tooltip 
                    onClick={()=>dormitory.setLayoutList(false)} 
                    title="แนวนอน" 
                    sx={{ fontSize: "1.125rem"}} 
                    className={`hover:bg-blue-500/10 hidden md:block ${!dormitory.layoutList && 'text-blue-400'}`}
                >
                    <IconButton>
                        <LuLayoutList />
                    </IconButton>
                </Tooltip>
                <Tooltip 
                    onClick={()=>dormitory.setFilterDrawer()} 
                    title="กรองรายการ" sx={{ fontSize: "1.125rem"}} 
                    className={`hover:bg-blue-500/10 xl:hidden ${dormitory.filterDrawer && 'text-blue-400'}`}
                >
                    <IconButton>
                        <LuFilter />
                    </IconButton>
                </Tooltip>
                <Tooltip 
                    onClick={()=>dormitory.getData()} 
                    title="คืนค่าหน้าแรก" sx={{ fontSize: "1.125rem"}} 
                    className={`hover:bg-blue-500/10`}
                >
                    <IconButton>
                        <IoRefresh />
                    </IconButton>
                </Tooltip>
                <div className='p-8 bg-blue-600/10 rounded-full flex-center -left-20 -bottom-44 absolute'>
                    <span className='w-52 h-52 bg-blue-400 rounded-full'></span>
                </div>
            </section>
            <div className={`grid mt-4 
            ${dormitory.layoutList ? 
            "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-x-2 gap-y-3" : 
            "grid-cols-1 gap-3"}`}>
                <CardDormitoryList/>
            </div>
        </>
    )
})

export default CardDormitory