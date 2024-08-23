'use client'
import { Inter } from 'next/font/google'
import { useEffect, useState } from "react"
import { observer } from "mobx-react"
import navStore from "@/stores/navStore"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from 'next-auth/react';

// Material UI
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';

// Icons
import { HiMiniBars3 } from "react-icons/hi2";
import { MdLogout } from "react-icons/md";
import { TbMapPinSearch } from "react-icons/tb";
import { GoHome, GoHomeFill, GoPerson } from "react-icons/go";
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";
import { RiDoorOpenFill, RiDoorOpenLine,
    RiHotelFill, RiHotelLine,
    RiSettings3Fill, RiSettings3Line
} from "react-icons/ri";


import Themes from "./Themes"

const inter = Inter({ subsets: ["latin"] });

const NavBar = observer(() => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const { data: session, status } = useSession()

    const DrawerList = (
        <Box sx={{ width: 280, height: '100vh' }} role="presentation"
        onClick={() => setOpen(false)} className='bg-base flex flex-col'>
            <List className='flex px-4 pb-4 pt-4'>
                <h1 className={`text-3xl font-bold text-black dark:text-white relative ${inter.className}`}>
                    <TbMapPinSearch className="absolute text-xl -right-4 -bottom-1 text-blue-400"/>
                    ALLDAY
                    <span className="h-[.2rem] w-20 bg-blue-400 rounded-full absolute right-2 -bottom-1"></span>
                </h1>
            </List>
            <List className='pt-4 flex-1'>
                <ListItem disablePadding sx={{ fontSize: '2rem' }}> 
                    <Link href={'/'} className={`w-11/12 rounded-e-full
                        ${pathname === '/' && 'text-blue-500 bg-blue-500/10'}`}>
                        <ListItemButton className='rounded-e-full'>
                            <ListItemIcon className={`text-2xl ${pathname === '/' && 'text-blue-500'}`}>
                                {pathname === '/' ? <GoHomeFill /> : <GoHome />}
                            </ListItemIcon>
                            <h4 className='text-base font-medium opacity-75'>
                                หน้าแรก
                            </h4>
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding sx={{ fontSize: '2rem' }}> 
                    <Link href={'/favorites'} className={`w-11/12 rounded-e-full
                        ${pathname === '/favorites' && 'text-blue-500 bg-blue-500/10'}`}>
                        <ListItemButton className='rounded-e-full'>
                            <ListItemIcon className={`text-2xl ${pathname === '/favorites' && 'text-blue-500'}`}>
                                {pathname === '/favorites' ? <MdBookmark /> : <MdBookmarkBorder />}
                            </ListItemIcon>
                            <h4 className='text-base font-medium opacity-75'>
                                รายการโปรด
                            </h4>
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding sx={{ fontSize: '2rem' }}> 
                    <Link href={'/reservations'} className={`w-11/12 rounded-e-full
                        ${pathname === '/reservations' && 'text-blue-500 bg-blue-500/10'}`}>
                        <ListItemButton className='rounded-e-full'>
                            <ListItemIcon className={`text-2xl ${pathname === '/reservations' && 'text-blue-500'}`}>
                                {pathname === '/reservations' ? <RiDoorOpenFill /> : <RiDoorOpenLine />}
                            </ListItemIcon>
                            <h4 className='text-base font-medium opacity-75'>
                                ห้องพักที่จอง
                            </h4>
                        </ListItemButton>
                    </Link>
                </ListItem>
                <hr className='hr-11/12 mb-2 mt-4 mx-4'/>
                <ListItem disablePadding sx={{ fontSize: '2rem' }}> 
                    <Link href={'/menage'} className={`w-11/12 rounded-e-full
                        ${pathname.startsWith('/menage') && 'text-blue-500 bg-blue-500/10'}`}>
                        <ListItemButton className='rounded-e-full'>
                            <ListItemIcon className={`text-2xl ${pathname.startsWith('/menage') && 'text-blue-500'}`}>
                                {pathname.startsWith('/menage') ? <RiHotelFill /> : <RiHotelLine />}
                            </ListItemIcon>
                            <h4 className='text-base font-medium opacity-75'>
                                จัดการหอพัก
                            </h4>
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding sx={{ fontSize: '2rem' }}> 
                    <Link href={'/favorites'} className={`w-11/12 rounded-e-full
                        ${pathname === '/favorites' && 'text-blue-500 bg-blue-500/10'}`}>
                        <ListItemButton className='rounded-e-full'>
                            <ListItemIcon className={`text-2xl ${pathname === '/favorites' && 'text-blue-500'}`}>
                                {pathname === '/favorites' ? <RiSettings3Fill /> : <RiSettings3Line />}
                            </ListItemIcon>
                            <h4 className='text-base font-medium opacity-75'>
                                ผู้ดูแลระบบ
                            </h4>
                        </ListItemButton>
                    </Link>
                </ListItem>
            </List>
            <List className='flex-y-center gap-4 px-4 pb-4 pt-4 border-t-items'>
                <Avatar 
                    alt={status === 'authenticated' && session.user 
                        ? session.user.image 
                        : 'profile.webp'
                    }
                    src={status === 'authenticated' && session.user 
                        ? session.user.image 
                        : '/images/profile/profile.webp'
                    } 
                />
                <div>
                    <p className='text-ellipsis text-nowrap overflow-hidden whitespace-nowrap font-medium max-w-52 -mb-2'>
                        {status === 'authenticated' && session.user ? session.user.name : 'บัญชีนี้ยังไม่มีชื่อ'}
                    </p>
                    <span className='text-xs opacity-70'>
                        {status === 'authenticated' && session.user ? session.user.email : 'มีบางอย่างผิดพลาด'}
                    </span>
                </div>
            </List>
        </Box>
    );

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
                <div className="w-full mx-4 xl:w-11/12 flex-y-center justify-between">
                    <div className='w-12 min-w-12 lg:w-auto lg:min-w-auto lg:hidden'>
                        <Tooltip 
                            onClick={()=>setOpen(true)}
                            title="เปิดเมณู" className='text-xl hover:bg-blue-500/10'
                        >
                            <IconButton>
                                <HiMiniBars3 />
                            </IconButton>
                        </Tooltip>
                        <Drawer open={open} onClose={()=>setOpen(false)}>
                            {DrawerList}
                        </Drawer>
                    </div>
                    <div className='flex-y-center flex'>
                        <Tooltip title="เปิดเมณู" onClick={()=>setOpen(true)}>
                            <h1 className={`cursor-pointer text-3xl font-bold text-black dark:text-white relative lg:me-6 ${inter.className}`}>
                                <TbMapPinSearch className="absolute text-xl -right-4 -bottom-1 text-blue-400"/>
                                ALLDAY
                                <span className="h-[.2rem] w-20 bg-blue-400 rounded-full absolute right-2 -bottom-1"></span>
                            </h1>
                        </Tooltip>
                        <div className='gap-4 ms-0 xl:ms-12 hidden lg:flex-y-center'>
                            <Link href={'/'} className={`${pathname === '/' && 'font-bold text-blue-400'} rounded-md py-1 px-2 mt-1 
                            hover:bg-blue-500/10 transition-300`}>
                                หน้าหลัก
                            </Link>
                            <Link href={'/favorites'} className={`${pathname === '/favorites' && 'font-bold text-blue-400'} rounded-md py-1 px-2 mt-1 
                            hover:bg-blue-500/10 transition-300`}>
                                รายการโปรด
                            </Link>
                            <Link href={'/reservations'} className={`${pathname === '/reservations' && 'font-bold text-blue-400'} rounded-md py-1 px-2 mt-1 
                            hover:bg-blue-500/10 transition-300`}>
                                ห้องพักที่จอง
                            </Link>
                            <Link href={'/menage'} className={`${pathname === '/menage' && 'font-bold text-blue-400'} rounded-md py-1 px-2 mt-1 
                            hover:bg-blue-500/10 transition-300`}>
                                กล่องจดหมาย
                            </Link>
                            <Link href={'/menage'} className={`${pathname === '/menage' && 'font-bold text-blue-400'} rounded-md py-1 px-2 mt-1 
                            hover:bg-blue-500/10 transition-300`}>
                                จัดการหอพัก
                            </Link>
                        </div>
                    </div>
                    <div className="flex-y-center justify-end gap-2 w-12 min-w-12 lg:w-auto lg:min-w-auto">
                        <div className='hidden lg:block'>
                            <Themes/>
                            <span className="border-e border-gray-300 dark:border-gray-700 h-8 me-2"></span>
                        </div>
                        {status === 'authenticated' && session.user ? 
                            <>
                                <Button 
                                    variant="outlined" 
                                    sx={{ borderRadius: '3rem' }}
                                    color="error" 
                                    className='hidden lg:block'
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                >
                                    ออกจากระบบ
                                </Button>
                                <button className='lg:hidden text-xl' onClick={() => signOut({ callbackUrl: '/' })}>
                                    <MdLogout/>
                                </button>
                            </>
                        :
                            <Link href={'/login'}>
                                <Button 
                                    variant="outlined" 
                                    className='hidden lg:block'
                                    sx={{ borderRadius: '3rem' }}
                                >
                                    เข้าสู่ระบบ
                                </Button>
                                <GoPerson className='lg:hidden text-xl'/>
                            </Link>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
})

export default NavBar