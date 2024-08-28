'use client'
import { observer } from "mobx-react";
import { useEffect, createRef } from "react";
import dormitoryOnly from "@/stores/dormitoryOnly";

import { IoIosFitness } from "react-icons/io";
import { BiCctv } from "react-icons/bi";
import { FaWifi, FaSmoking, FaCarSide, FaMotorcycle } from "react-icons/fa";
import { PiDogFill } from "react-icons/pi";
import { GiLift, GiSecurityGate, GiKeyCard, GiWashingMachine } from "react-icons/gi";
import { RiFingerprintFill, RiRestaurantLine } from "react-icons/ri";
import { GrUserPolice } from "react-icons/gr";
import { MdStorefront } from "react-icons/md";

const Facilitate = observer(() => {
    useEffect(() => {
        dormitoryOnly.targetState = dormitoryOnly.targetState || createRef<HTMLElement>();
    }, []);
    return (
        <section ref={dormitoryOnly.targetState} className='card rounded-none sm:rounded-2xl shadow-md p-4 ps-8 sm:ps-4 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-4 relative overflow-hidden'>
            <span className={`col-span-2 flex-y-center gap-4 text-sm
                ${dormitoryOnly.data.dormitory_state?.wifi ? '' : 'opacity-50 grayscale'}`}>
                <FaWifi className="text-xl text-blue-500"/> วายฟาย
            </span>
            <span className={`col-span-2 flex-y-center gap-4 text-sm
                ${dormitoryOnly.data.dormitory_state?.park_car ? '' : 'opacity-50 grayscale'}`}>
                <FaCarSide className="text-xl text-blue-500"/> ลาจอดรถยนต์
            </span>
            <span className={`col-span-2 flex-y-center gap-4 text-sm
                ${dormitoryOnly.data.dormitory_state?.park_motorcycle ? '' : 'opacity-50 grayscale'}`}>
                <FaMotorcycle className="text-xl text-blue-500"/> ลานจอดรถมอไซค์
            </span>
            <span className={`col-span-2 flex-y-center gap-4 text-sm
                ${dormitoryOnly.data.dormitory_state?.washing ? '' : 'opacity-50 grayscale'}`}>
                <GiWashingMachine className="text-xl text-blue-500"/> เครื่องซักผ้า
            </span>
            <span className={`col-span-2 flex-y-center gap-4 text-sm
                ${dormitoryOnly.data.dormitory_state?.restaurant ? '' : 'opacity-50 grayscale'}`}>
                <RiRestaurantLine className="text-xl text-blue-500"/> ร้านอาหาร
            </span>
            <span className={`col-span-2 flex-y-center gap-4 text-sm
                ${dormitoryOnly.data.dormitory_state?.store ? '' : 'opacity-50 grayscale'}`}>
                <MdStorefront className="text-xl text-blue-500"/> ร้านสะดวกซื้อ
            </span>
            <span className={`col-span-2 flex-y-center gap-4 text-sm
                ${dormitoryOnly.data.dormitory_state?.lift ? '' : 'opacity-50 grayscale'}`}>
                <GiLift className="text-xl text-blue-500"/> ลิฟต์
            </span>
            <span className={`col-span-2 flex-y-center gap-4 text-sm
                ${dormitoryOnly.data.dormitory_state?.security_door ? '' : 'opacity-50 grayscale'}`}>
                <GiSecurityGate className="text-xl text-blue-500"/> ประตูรักษาปลอดภัย
            </span>
            <span className={`col-span-2 flex-y-center gap-4 text-sm
                ${dormitoryOnly.data.dormitory_state?.keycard ? '' : 'opacity-50 grayscale'}`}>
                <GiKeyCard className="text-xl text-blue-500"/> บัตรผ่านประตู
            </span>
            <span className={`col-span-2 flex-y-center gap-4 text-sm
                ${dormitoryOnly.data.dormitory_state?.animal ? '' : 'opacity-50 grayscale'}`}>
                <PiDogFill className="text-xl text-blue-500"/> เลี้ยงสัตว์ได้
            </span>
            <span className={`col-span-2 flex-y-center gap-4 text-sm
                ${dormitoryOnly.data.dormitory_state?.fitness ? '' : 'opacity-50 grayscale'}`}>
                <IoIosFitness className="text-xl text-blue-500"/> ฟิตเนส
            </span>
            <span className={`col-span-2 flex-y-center gap-4 text-sm
                ${dormitoryOnly.data.dormitory_state?.fingerprint ? '' : 'opacity-50 grayscale'}`}>
                <RiFingerprintFill className="text-xl text-blue-500"/> ตรวจสอบลายนิ้วมือ
            </span>
            <span className={`col-span-2 flex-y-center gap-4 text-sm
                ${dormitoryOnly.data.dormitory_state?.cctv ? '' : 'opacity-50 grayscale'}`}>
                <BiCctv className="text-xl text-blue-500"/> ก้องวงจรปิด
            </span>
            <span className={`col-span-2 flex-y-center gap-4 text-sm
                ${dormitoryOnly.data.dormitory_state?.security_guard ? '' : 'opacity-50 grayscale'}`}>
                <GrUserPolice className="text-xl text-blue-500"/> รปภ.
            </span>
            <span className={`col-span-2 flex-y-center gap-4 text-sm
                ${dormitoryOnly.data.dormitory_state?.smoke ? '' : 'opacity-50 grayscale'}`}>
                <FaSmoking className="text-xl text-blue-500"/> พื้นที่สูบบุหรี่
            </span>
        </section>
    )
})

export default Facilitate