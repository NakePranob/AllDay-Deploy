'use client'
import { observer } from "mobx-react"
import navStore from "@/stores/navStore"
import { usePathname } from "next/navigation"
import Link from "next/link"

type Props = {
    param: string
}

const MenageMenu = observer(({param}: Props) => {
    const pathname = usePathname();
    return (
        <div className={`bg-base shadow-sm sticky z-[700] transition-all ease-in-out duration-300 h-14 flex px-4 justify-center
        ${navStore.head && navStore.lastScroll > 30 ? 'top-[63px] md:top-[79px]' : 'top-[-1px]' } border-b-items hidden sm:block`}>
            <div className={`${pathname.startsWith('/menage/') ? "" : "xl:w-[90%]"} w-full h-full flex-y-center gap-4`}>
                <Link href={'#'} className="py-1 px-2 hover:text-blue-400 h-full transition-300 relative flex-center">
                    ข้อมูลทั่วไป
                    <span className="absolute w-full h-1 bg-blue-400 rounded-t-full -bottom-[1px] left-0"></span>
                </Link>
                <Link href={'#'} className="rounded-md py-1 px-2 hover:bg-blue-500/10 transition-300">
                    ห้องพัก
                </Link>
                <Link href={'#'} className="rounded-md py-1 px-2 hover:bg-blue-500/10 transition-300">
                    รีวิวหอพัก
                </Link>
                <Link href={'#'} className="rounded-md py-1 px-2 hover:bg-blue-500/10 transition-300">
                    โอนย้ายหอพัก
                </Link>
            </div>
        </div>
    )
})

export default MenageMenu