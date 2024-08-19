'use client'
import { Inter } from 'next/font/google'
import { useEffect } from "react"
import { observer } from "mobx-react"
import navStore from "@/stores/navStore"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from 'next-auth/react';

// Material UI
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Button } from "@mui/material"

// Icons
import { HiMiniBars3 } from "react-icons/hi2";
import { TbMapPinSearch } from "react-icons/tb";

import Themes from "./Themes"

const inter = Inter({ subsets: ["latin"] });

const NavBarEntrepreneur = observer(() => {
    const pathname = usePathname();
    const { data: session, status } = useSession()

    useEffect(() => {
        const onScroll = () => {
            navStore.setScroll(window.scrollY);
        };

        window.addEventListener('scroll', onScroll);
        if (navStore.scroll < 75) {
            navStore.setHead(true)
        } else if (navStore.scroll > navStore.lastScroll) {
            navStore.setHead(false)
        } else if (navStore.scroll < navStore.lastScroll && navStore.scroll !== 0) {
            navStore.setHead(true)
        }
        navStore.setLastScroll(navStore.scroll)
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [navStore.scroll]);

    return (
        <>
            <nav className={`fixed w-screen h-16 md:h-20 bg-base shadow-sm transition-300 border-b-items
            flex-center z-999 ${navStore.head ? 'translate-y-0' : '-translate-y-16 sm:-translate-y-20' }`}>
                <div className="container flex-y-center justify-between">
                    <div className='w-44 min-w-44 lg:w-auto lg:min-w-auto lg:hidden'>
                        <Tooltip title="เมณู" className='text-xl hover:bg-blue-500/10'>
                            <IconButton>
                                <HiMiniBars3 />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className='flex-y-center hidden sm:flex'>
                        <h1 className={`text-3xl font-bold text-black dark:text-white relative me-6 ${inter.className}`}>
                            <TbMapPinSearch className="absolute text-xl -right-4 -bottom-1 text-blue-400"/>
                            ALLDAY
                            <span className="h-[.2rem] w-20 bg-blue-400 rounded-full absolute right-2 -bottom-1"></span>
                        </h1>
                        <div className='gap-4 ms-4 hidden lg:flex'>
                            <Link href={'/'} className={`${pathname === '/' && 'font-bold text-blue-400'} rounded-md py-1 px-2 mt-1 
                            hover:bg-blue-500/10 transition-300`}>
                                หน้าหลัก
                            </Link>
                            <Link href={'/menage'} className={`${pathname === '/menage' && 'font-bold text-blue-400'} rounded-md py-1 px-2 mt-1 
                            hover:bg-blue-500/10 transition-300`}>
                                รายการหอพัก
                            </Link>
                            <Link href={'/5'} className={`${pathname === '/s' && 'font-bold text-blue-400'} rounded-md py-1 px-2 mt-1 
                            hover:bg-blue-500/10 transition-300`}>
                                กล่องข้อความ
                            </Link>
                            <Link href={'/5'} className={`${pathname === '/s' && 'font-bold text-blue-400'} rounded-md py-1 px-2 mt-1 
                            hover:bg-blue-500/10 transition-300`}>
                                ติดต่อผู้ดูแลระบบ
                            </Link>
                        </div>
                    </div>
                    <div className="flex-y-center justify-end gap-2 w-44 min-w-44 lg:w-auto lg:min-w-auto">
                        <Themes/>
                        <span className="border-e border-gray-300 dark:border-gray-700 h-8 me-2"></span>
                        {status === 'authenticated' && session.user ? 
                            <Button 
                                variant="outlined" 
                                sx={{ borderRadius: '3rem' }}
                                color="error" 
                                onClick={() => signOut({ callbackUrl: '/' })}
                            >
                                ออกจากระบบ
                            </Button>
                        :
                            <Link href={'/login'}>
                                <Button variant="outlined" sx={{ borderRadius: '3rem' }}>เข้าสู่ระบบ</Button>
                            </Link>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
})

export default NavBarEntrepreneur