'use client'
import { useState, useEffect, useContext } from "react"
import { useTheme } from 'next-themes'
import { useStore } from "@/provider/Theme"
import { observer } from "mobx-react"

// Icons
import { MdSunny } from "react-icons/md";
import { IoMoon } from "react-icons/io5";
import { TfiLayoutMediaCenterAlt } from "react-icons/tfi";

type Props = {

}

const Themes = observer(({}: Props) => {
    const { theme, setTheme } = useTheme();
    const store = useStore();

    useEffect(() => {
        if (theme) {
            store.setTheme(theme);
        }
    }, [theme])

    const changmode = () => {
        if (store.theme === "light") {
            setTheme("dark");
        } else if (store.theme === "dark") {
            setTheme("system");
        } else {
            setTheme("light");
        }
    }

    return (
        <button onClick={changmode} className="px-2 py-1 rounded-md hover:bg-blue-500/10
         transition-300 font-bold">
            <span className={`${store.theme !== "light"   && "hidden"} flex-y-center gap-2`}>
                <MdSunny/> <p className="hidden lg:block">ธีมสว่าง</p>
            </span>
            <span className={`${store.theme !== "dark"   && "hidden"} flex-y-center gap-2`}>
                <IoMoon/> <p className="hidden lg:block">ธีมกลางคืน</p>
            </span>
            <span className={`${store.theme !== "system"   && "hidden"} flex-y-center gap-2`}>
                <TfiLayoutMediaCenterAlt/> <p className="hidden lg:block">ปรับตามธีมอุปกรณ์</p>
            </span>
        </button>
    )
})

export default Themes