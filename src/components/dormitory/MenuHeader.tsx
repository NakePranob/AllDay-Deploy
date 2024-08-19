'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { observer } from "mobx-react";
import dormitoryOnly from "@/stores/dormitoryOnly";
import navStore from "@/stores/navStore";


// Material UI
import { Button } from "@mui/material"
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

// Icons
import { FaArrowUpWideShort } from "react-icons/fa6";

const MenuHeader = observer((props: any) => {
    useEffect(() => {
        dormitoryOnly.setData(props.data);
    }, [])
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                dormitoryOnly.scrollToOverview();
                break;
            case 1:
                dormitoryOnly.scrollToState();
                break;
            case 2:
                dormitoryOnly.scrollToRoom();
                break;
            case 3:
                dormitoryOnly.scrollToReview();
                break;
            default:
                dormitoryOnly.scrollToReview();
                break;
        }
        
    };

    return (
        <div className={`bg-base shadow-sm sticky z-[700] transition-all ease-in-out duration-300
        ${navStore.head && navStore.lastScroll > 30 ? 'top-16 md:top-20' : 'top-0' } border-b-items hidden sm:block`}>
            <div className="hidden sm:flex justify-between container items-end h-14">
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="ภาพรวม" sx={{ fontWeight: "bold" }}/>
                    <Tab label="สิ่งอำนวยความสะดวก" sx={{ fontWeight: "bold" }}/>
                    <Tab label="ห้องพัก" sx={{ fontWeight: "bold" }}/>
                    <Tab label="รายการรีวิว" sx={{ fontWeight: "bold" }}/>
                </Tabs>
                <div className="flex-y-center gap-2">
                    {dormitoryOnly.data.doc &&
                        <Link href={dormitoryOnly.data.doc ? dormitoryOnly.data.doc : '#'} 
                        className="font-bold opacity-70 hover:opacity-100 mb-1">
                            เอกสารเกี่ยวกับหอพัก
                        </Link>
                    }
                    <Button 
                        variant="text" 
                        sx={{ fontWeight: "bold", marginBottom: ".25rem", fontSize: "1rem",
                            display: "flex", alignItems: "center", gap: ".5rem"
                        }}
                        className="hidden md:flex"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <p>กลับไปด้านบน</p><FaArrowUpWideShort/>
                    </Button>
                </div>
            </div>
        </div>
    )
})

export default MenuHeader