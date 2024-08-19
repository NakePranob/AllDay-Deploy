'use client'
import { Button } from "@mui/material"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import { observer } from "mobx-react"
import registerEntrepreneur from "@/stores/registerEntrepreneur"

import { MdDeleteOutline } from "react-icons/md";

type Props = {}

const Formlandmark = observer((props: Props) => {
    return (
        <section className="w-full card mt-4 overflow-hidden relative">
            <span className="absolute w-80 h-80 bg-sky-400/10 dark:bg-sky-900/10 -top-20 -left-44 rotate-[50deg] rounded-[3rem]"></span>
            <span className="absolute w-[35rem] h-72 bg-blue-300/[.05] dark:bg-blue-950/10 -top-10 -left-40 -rotate-[30deg] rounded-[2rem]"></span>
            <h1 className="text-lg font-medium px-4 py-2 backdrop-blur-md z-50 w-full relative">ระยะทางระหว่างหอพักกับสถานที่ต่างๆ</h1>
            <hr className="hr-w"/>
            <div className="grid grid-cols-12 gap-4 px-4 py-4">
                <TextField label="ชื่อสถานที่" variant="outlined" sx={{width: '100%'}} className="col-span-7 md:col-span-7"
                    value={registerEntrepreneur.locationName}
                    onChange={(e)=>registerEntrepreneur.setLocationName(e.target.value)}
                />
                <TextField 
                    label="ระยะทางจากหอพัก" variant="outlined"
                    sx={{width: '100%'}}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">กม.</InputAdornment>,
                    }}
                    value={registerEntrepreneur.locationDistance}
                    onChange={(e)=>registerEntrepreneur.setLocationDistance(e.target.value)}
                    className='col-span-5 md:col-span-3'
                />
                <Button variant="contained" sx={{color: 'white'}} className="col-span-12 md:col-span-2"
                    onClick={()=>registerEntrepreneur.addLocationDistanceList()}
                    disabled={registerEntrepreneur.locationName === '' || registerEntrepreneur.locationDistance === '' ? true : false}
                >เพิ่มสถานที่</Button>
            </div>
            { registerEntrepreneur.locationDistanceList.length !== 0 &&
                <div className="relative overflow-x-auto mx-4">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xsuppercase">
                            <tr>
                                <th scope="col" className="px-6 py-3 w-4/5">
                                    ชื่อสถานที่
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            { registerEntrepreneur.locationDistanceList.length !== 0 && 
                            registerEntrepreneur.locationDistanceList.map((item:any, i:number) => {
                                return (
                                    <tr key={i} className="border-t dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.location}
                                        </th>
                                        <td className="py-4 text-right">
                                            {item.distance}
                                        </td>
                                        <td className="py-4 flex justify-end">
                                            <button className="text-red-500 text-xl hover:bg-red-100/50 dark:hover:bg-red-800/20 p-2 
                                            rounded-full hover:text-red-600 transition-300"
                                            onClick={()=>registerEntrepreneur.removeLocationDistanceList(i)}>
                                                <MdDeleteOutline/>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            }

        </section>
    )
})

export default Formlandmark