'use client'
import { observer } from 'mobx-react'
import Image from 'next/image'

// Material UI
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { Button } from '@mui/material'
import Rating from '@mui/material/Rating';
import Checkbox from '@mui/material/Checkbox';

// Store
import dormitory from '@/stores/dormitory'

// Icons
import { IoIosArrowDown } from 'react-icons/io'

const Filter = observer(() => {
    function truncateDecimals(number: number): number {
        return Math.floor(number);
    }

    function valuetext(value: number) {
        value = (value / 100) * 10000;
        value = truncateDecimals(value)
        return `${value}`;
    }

    return (
        <>
            <span onClick={()=>dormitory.setFilterDrawer()} 
                className={`h-screen w-screen bg-black/60 fixed z-999 left-0 top-0 ${!dormitory.filterDrawer && "hidden"}`}>
            </span>
            <aside className={`w-72 lg:w-80 fixed xl:static scrollreg border-e-items xl:border-0 ${dormitory.filterDrawer ? "left-0" : "-left-80"}
            bg-base xl:bg-white/0 xl:dark:bg-dark/0 top-0 z-999 xl:z-0 xl:h-auto h-screen overflow-y-auto 
            transition-all duration-500 xl:duration-0 ease-in-out`}>
                <div className='flex flex-col xl:gap-2'>
                    <section className='aspect-[16/7]  rounded-none xl:rounded-2xl overflow-hidden relative shadow-md'>
                        <Image
                            src={`/bg.jpg`}
                            alt="list DMT"
                            width={250}
                            height={150}
                            className='h-full w-full
                            object-cover object-top'
                            priority
                        />
                        <p className="absolute bottom-2 left-2 text-white backdrop-blur-md
                        px-3 rounded-md bg-white/10">
                            ค้นหาหอพักตรงใจคุณ
                        </p>
                    </section>
                    <Button
                        onClick={()=>dormitory.getDataFillter()}
                        variant="contained" 
                        sx={{ borderRadius: "3rem", color: "#fff", marginTop: ".5rem" }}
                        className='h-10 mt-2 mx-2 mb-2 xl:mb-0 xl:mx-0'>
                        ค้นหาหอพักตรงใจคุณ
                    </Button>
                    <section className={`w-full card rounded-none ${!dormitory.priceState ? "h-11 xl:rounded-3xl" : "h-40 xl:rounded-2xl"}
                    p-4 pt-2 overflow-hidden transition-all transition-500`}>
                        <span onClick={()=>dormitory.setPriceState(!dormitory.priceState)} className="w-full relative flex-y-center font-bold transition-300">
                            <span className="opacity-70">ช่วงราคาที่คุณต้องการ</span>
                            <IoIosArrowDown className={`absolute right-0 text-lg text-blue-500
                            ${dormitory.priceState && "-rotate-180"} transition-300 cursor-pointer`}/>
                        </span>
                        <div className="mt-4">
                            <div className="flex-y-center mb-6 text-sm">
                                <span className="border dark:border-gray-500 h-7 w-24 flex-center rounded-full">
                                    THB {dormitory.priceValue[0]}
                                </span>
                                <span className="border-b dark:border-gray-500 flex-1"></span>
                                <span className="border dark:border-gray-500 h-7 w-24 flex-center rounded-full">
                                    THB {dormitory.priceValue[1]}
                                </span>
                            </div>
                            <Slider
                                getAriaLabel={() => 'Temperature range'}
                                value={dormitory.value}
                                onChange={dormitory.priceHandleChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                valueLabelFormat={valuetext}
                                className='w-full'
                            />
                        </div>
                    </section>
                    <section className={`w-full card rounded-none ${!dormitory.reviewState ? "h-11 xl:rounded-3xl" : "h-28 xl:rounded-2xl"}
                    p-4 pt-2 overflow-hidden transition-all transition-500`}>
                        <span onClick={()=>dormitory.setReviewState(!dormitory.reviewState)} className="w-full relative flex-y-center font-bold transition-300">
                            <span className="opacity-70">คะแนนรีวิวที่คุณคาดหวัง</span>
                            <IoIosArrowDown className={`absolute right-0 text-lg text-blue-500
                            ${dormitory.reviewState && "-rotate-180"} transition-300 cursor-pointer`}/>
                        </span>
                        <div className="mt-6">
                        <Rating
                            name="simple-controlled"
                            value={dormitory.reviewValue}
                            size="large"
                            onChange={(event, newValue) => {dormitory.setReviewValue(newValue)}}
                            className='text-yellow-300'
                        />
                        </div>
                    </section>
                    <section className={`w-full card rounded-none ${!dormitory.typeState ? "h-11  xl:rounded-3xl" : "h-48  xl:rounded-2xl"}
                    p-4 pt-2 overflow-hidden transition-all transition-500`}>
                        <span onClick={()=>dormitory.setTypeState(!dormitory.typeState)} className="w-full relative flex-y-center font-bold transition-300">
                            <span className="opacity-70">ประเภทหอพักที่คุณต้องการ</span>
                            <IoIosArrowDown className={`absolute right-0 text-lg text-blue-500
                            ${dormitory.typeState && "-rotate-180"} transition-300 cursor-pointer`}/>
                        </span>
                        <div className="mt-4">
                            <Box>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.manValue}
                                    onChange={(event) => dormitory.setManValue(event.target.checked)} /> หอพักชาย
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.femaleValue}
                                    onChange={(event) => dormitory.setFemaleValue(event.target.checked)} /> หอพักหญิง
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.homeValue}
                                    onChange={(event) => dormitory.setHomeValue(event.target.checked)} /> บ้านพัก
                                </div>
                            </Box>
                        </div>
                    </section>
                    <section className={`w-full card rounded-none ${!dormitory.handyState ? "h-11 xl:rounded-3xl" : "h-[67rem] xl:rounded-2xl"}
                    p-4 pt-2 overflow-hidden transition-all transition-500`}>
                        <span onClick={()=>dormitory.setHandyState(!dormitory.handyState)} className="w-full relative flex-y-center font-bold transition-300">
                            <span className="opacity-70">สิ่งอำนวยความสะดวก</span>
                            <IoIosArrowDown className={`absolute right-0 text-lg text-blue-500
                            ${dormitory.handyState && "-rotate-180"} transition-300 cursor-pointer`}/>
                        </span>
                        <div className="mt-4">
                            <Box>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.fanValue}
                                    onChange={(event) => dormitory.setFanValue(event.target.checked)}/> พัดลม
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.airValue}
                                    onChange={(event) => dormitory.setAirValue(event.target.checked)} /> เครื่องปรับอากาศ
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.closetValue}
                                    onChange={(event) => dormitory.setClosetValue(event.target.checked)} /> ตู้เสื้อผ้า 
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.waterHeaterValue}
                                    onChange={(event) => dormitory.setWaterHeaterValue(event.target.checked)} /> เครื่องทำน้ำอุ่น
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.tableValue}
                                    onChange={(event) => dormitory.setTableValue(event.target.checked)} /> โต๊ะทำงาน
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.dressingValue}
                                    onChange={(event) => dormitory.setDressingValue(event.target.checked)} /> โต๊ะเครื่องแป้ง 
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.fridgeValue}
                                    onChange={(event) => dormitory.setFridgeValue(event.target.checked)} /> ตู้เย็น 
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.bedValue}
                                    onChange={(event) => dormitory.setBedValue(event.target.checked)} /> เตียงนอน
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.tvValue}
                                    onChange={(event) => dormitory.setTvValue(event.target.checked)} /> โทรทัศน์
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.wifiValue}
                                    onChange={(event) => dormitory.setWifiValue(event.target.checked)} /> Wi-Fi
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.cctvValue}
                                    onChange={(event) => dormitory.setCctvValue(event.target.checked)} /> กล้องวงจรปิด
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.parkCarValue}
                                    onChange={(event) => dormitory.setParkCarValue(event.target.checked)} /> ลานจอดรถยนต
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.motorcycleValue}
                                    onChange={(event) => dormitory.setMotorcycleValue(event.target.checked)} />  ลานจอดรถมอเตอร์ไซค์
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.securityValue}
                                    onChange={(event) => dormitory.setSecurityValue(event.target.checked)} /> ประตูนิรภัย 
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.guardValue}
                                    onChange={(event) => dormitory.setGuardValue(event.target.checked)} /> เจ้าหน้าที่รักษาความปลอดภัย
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.fingerPrintValue}
                                    onChange={(event) => dormitory.setFingerPrintValue(event.target.checked)} /> ระบบลายนิ้วมือ
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.keycardValue}
                                    onChange={(event) => dormitory.setKeycardValue(event.target.checked)} /> ระบบ keycard 
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.animalValue}
                                    onChange={(event) => dormitory.setAnimalValue(event.target.checked)} /> เลี้ยงสัตว์
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.fitnessValue}
                                    onChange={(event) => dormitory.setFitnessValue(event.target.checked)} /> ฟิตเนส 
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.liftValue}
                                    onChange={(event) => dormitory.setLiftValue(event.target.checked)} /> ลิฟท์โดยสาร
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.smokeValue}
                                    onChange={(event) => dormitory.setSmokeValue(event.target.checked)} /> พื้นที่สูบบุหรี่
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.restaurantValue}
                                    onChange={(event) => dormitory.setRestaurantValue(event.target.checked)} /> ร้านอาหาร
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.storeValue}
                                    onChange={(event) => dormitory.setStoreValue(event.target.checked)} /> ร้านสะดวกซื้อ
                                </div>
                                <div className="flex-y-center">
                                    <Checkbox checked={dormitory.washingValue}
                                    onChange={(event) => dormitory.setWashingValue(event.target.checked)} /> เครื่องซักผ้า
                                </div>
                            </Box>
                        </div>
                    </section>
                </div>
            </aside>
        </>
    )
})

export default Filter