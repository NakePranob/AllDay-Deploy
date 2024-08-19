'use client'
import { observer } from 'mobx-react';
import registerEntrepreneur from '@/stores/registerEntrepreneur';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Image from 'next/image';

import { MdDeleteOutline } from "react-icons/md";
import { FiUploadCloud } from "react-icons/fi";

type Props = {}

const roomSize = (size:number) => {
    const num = size / 100;
    return num.toFixed(2);
}

const FormTypeRoom = observer((props: Props) => {
    return (
        <>
            { registerEntrepreneur.typeRoomList.length !== 0 && registerEntrepreneur.typeRoomList.map((item:any, i:number) => {
                return (
                    <section className='border-b border-slate-200 dark:border-gray-800 col-span-12 pb-4 relative' key={i}>
                        <div className='flex justify-between flex-wrap'>
                            <p className='font-semibold w-full md:w-52 lg:w-72 overflow-hidden 
                            text-ellipsis whitespace-nowrap mb-1 flex-y-center gap-2'>
                                <button onClick={()=>registerEntrepreneur.removeTypeRoom(i)} 
                                className='text-xl hover:text-red-500 transition-300 -mt-[.15rem]'>
                                    <MdDeleteOutline/>
                                </button>
                                {item.name} 
                            </p>
                            <span className='text-xs opacity-70 md:w-64 flex justify-end md:justify-center pt-[.15rem]'>
                                ราคา {item.price} บาท/เดือน - ขนาด {roomSize(item.width)} x {roomSize(item.length)} เมตร
                            </span>
                            <span className='text-sm opacity-70 md:w-52 lg:w-72 flex justify-end'>
                                {item.quantity} ห้อง
                            </span>
                        </div>
                        <div className='flex flex-wrap xl:justify-around gap-x-4'>
                            <FormControlLabel 
                                control={<Checkbox checked={item.facilitate.fan}
                                    onChange={(e)=> registerEntrepreneur.setFacilitate(i, 'fan', e.target.checked)}
                                />}
                                label="พัดลม"
                            />
                            <FormControlLabel 
                                control={<Checkbox checked={item.facilitate.air}
                                    onChange={e=> registerEntrepreneur.setFacilitate(i, 'air', e.target.checked)}
                                />} 
                                label="เครื่องปรับอากาศ"
                            />
                            <FormControlLabel 
                                control={<Checkbox checked={item.facilitate.closet}
                                    onChange={e=> registerEntrepreneur.setFacilitate(i, 'closet', e.target.checked)}
                                />} 
                                label="ตู้เสื้อผ้า"
                            />
                            <FormControlLabel 
                                control={<Checkbox checked={item.facilitate.water_heater}
                                    onChange={e=> registerEntrepreneur.setFacilitate(i, 'water_heater', e.target.checked)}
                                />} 
                                label="เครื่องทำน้ำอุ่น"
                            />
                            <FormControlLabel 
                                control={<Checkbox checked={item.facilitate.fridge}
                                    onChange={e=> registerEntrepreneur.setFacilitate(i, 'fridge', e.target.checked)}    
                                />} 
                                label="ตู้เย็น"
                            />
                            <FormControlLabel 
                                control={<Checkbox checked={item.facilitate.table}
                                    onChange={e=> registerEntrepreneur.setFacilitate(i, 'table', e.target.checked)}   
                                />} 
                                label="โต๊ะทำงาน"
                            />
                            <FormControlLabel 
                                control={<Checkbox checked={item.facilitate.dressing_table}
                                    onChange={e=> registerEntrepreneur.setFacilitate(i, 'dressing_table', e.target.checked)}    
                                />} 
                                label="โต๊ะเครื่องแป้ง"
                            />
                            <FormControlLabel 
                                control={<Checkbox checked={item.facilitate.bed}
                                    onChange={e=> registerEntrepreneur.setFacilitate(i, 'bed', e.target.checked)}    
                                />} 
                                label="เตียงนอน"
                            />
                            <FormControlLabel 
                                control={<Checkbox checked={item.facilitate.tv}
                                    onChange={e=> registerEntrepreneur.setFacilitate(i, 'tv', e.target.checked)}    
                                />} 
                                label="โทรศัพท์"
                            />
                        </div>
                        <div className='flex flex-wrap gap-4 pt-4'>
                            <div className='md:h-56 w-full aspect-video md:w-auto md:aspect-square relative'>
                                <Button variant="contained" onClick={()=>registerEntrepreneur.addImageTypeRoomList(i)} disabled={item.imageSelect === null ? true : false}
                                sx={{ position: 'absolute', bottom: '1rem', right: '1rem', color: 'white', zIndex: 50 }}>
                                    เพิ่มรูปภาพ
                                </Button>
                                <div className="flex items-center aspect-video md:aspect-auto md:h-full justify-center w-full">
                                    <label htmlFor={`listtype-image${i}`} className="relative overflow-hidden flex h-full flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50/40 dark:bg-gray-700/40 hover:bg-sky-100/40 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700/80 transition-300">
                                        {item.imageSelect !== null && (
                                            <div className="overflow-hidden h-full w-full absolute">
                                                <img 
                                                    src={URL.createObjectURL(item.imageSelect)} 
                                                    alt={item.imageSelect.name} 
                                                    className='h-full w-full
                                                    object-cover object-center'
                                                />
                                            </div>
                                        )}
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <FiUploadCloud className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"'/>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">คลิกเพื่ออัพโหลดรูปภาพ</span></p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or webp (MAX. 1MB)</p>
                                        </div>
                                        <input id={`listtype-image${i}`} accept="image/*" type="file" className="hidden" onChange={(e) => registerEntrepreneur.setImageTypeRoom(e, i)}/>
                                    </label>
                                </div> 
                            </div>
                            <div className={`${item.room_img.length === 0 && 'hidden'} w-full md:w-auto md:flex-1 h-44 md:h-56 overflow-x-auto flex gap-1 snap-x snap-mandatory xl:snap-none`}>
                                { item.room_img.length !== 0 && item.room_img.map((inner:any, ii:number) => {
                                    return (
                                        <div key={ii} className="w-64 min-w-64 md:w-80 md:min-w-80 overflow-hidden rounded-lg snap-always snap-center relative">
                                            <img
                                                src={URL.createObjectURL(inner.imgFile)}
                                                alt={inner.imgFile.name}
                                                className='h-full w-full
                                                object-cover object-center'
                                                loading='lazy'
                                            />
                                            <div className='w-full h-full bg-black/50 opacity-0 hover:opacity-100 transition-300 
                                            flex-center absolute top-0 left-0'>
                                                <button
                                                    onClick={()=>registerEntrepreneur.removeImageTypeRoom(i, ii)}
                                                    className='text-2xl text-red-500 hover:bg-red-200/20 p-2 rounded-full hover:text-red-600 transition-300'>
                                                    <MdDeleteOutline/>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </section>
                )
            })}
            <TextField 
                label="ชื่อประเภทห้องพัก" variant="outlined" className='col-span-12 lg:col-span-3'
                value={registerEntrepreneur.typeRoomName} required
                onChange={(e)=>registerEntrepreneur.setTypeRoomName(e.target.value)}
            />
            <TextField 
                label="ราคาต่อเดือน" variant="outlined" 
                InputProps={{
                    endAdornment: <InputAdornment position="end">บาท</InputAdornment>,
                }}
                value={registerEntrepreneur.typeRoomPrice} required
                onChange={(e)=>registerEntrepreneur.setTypeRoomPrice(e.target.value)}
                className='col-span-12 sm:col-span-3 lg:col-span-2'
            />
            <TextField 
                label="ความกว้าง" variant="outlined" 
                InputProps={{
                    endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                }}
                value={registerEntrepreneur.typeRoomWidth} required
                onChange={(e)=>registerEntrepreneur.setTypeRoomWidth(e.target.value)}
                className='col-span-12 sm:col-span-3 lg:col-span-2'
            />
            <TextField 
                label="ความยาว" variant="outlined" 
                InputProps={{
                    endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                }}
                value={registerEntrepreneur.typeRoomLength} required
                onChange={(e)=>registerEntrepreneur.setTypeRoomLength(e.target.value)}
                className='col-span-12 sm:col-span-3 lg:col-span-2'
            />
            <TextField 
                label="จำนวนห้อง" variant="outlined" 
                InputProps={{
                    endAdornment: <InputAdornment position="end">ห้อง</InputAdornment>,
                }}
                value={registerEntrepreneur.typeRoomQuantity} required
                onChange={(e)=>registerEntrepreneur.setTypeRoomQuantity(e.target.value)}
                className='col-span-12 sm:col-span-3 lg:col-span-2'
            />
            <Button 
                variant="contained" sx={{fontSize: '1rem', color: 'white'}} 
                className='col-span-12 lg:col-span-1'
                disabled={registerEntrepreneur.typeRoomName === '' || registerEntrepreneur.typeRoomWidth === '' 
                || registerEntrepreneur.typeRoomLength === '' || registerEntrepreneur.typeRoomQuantity === '' ? true : false}
                onClick={()=>registerEntrepreneur.addTypeRoom()}
            >
                เพิ่ม
            </Button>
        </>
    )
})

export default FormTypeRoom