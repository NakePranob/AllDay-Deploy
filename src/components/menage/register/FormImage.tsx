'use client'
import { observer } from 'mobx-react';
import registerEntrepreneur from '@/stores/registerEntrepreneur';
import Button from '@mui/material/Button';
import { FiUploadCloud } from "react-icons/fi";

type Props = {}

const FormImage = observer((props: Props) => {
    return (
        <div className='p-4 flex-1 relative'>
            <Button variant="contained" onClick={()=>registerEntrepreneur.addImageList()} disabled={registerEntrepreneur.imageSelect === null ? true : false}
            sx={{ position: 'absolute', bottom: '2rem', right: '2rem', color: 'white', zIndex: 50 }}>
                เพิ่มรูปภาพ
            </Button>
            <div className="flex items-center aspect-video md:aspect-auto md:h-full justify-center w-full">
                <label htmlFor="dropzone-file" className="relative overflow-hidden flex h-full flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50/40 dark:bg-gray-700/40 hover:bg-sky-100/40 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700/80 transition-300">
                    {registerEntrepreneur.imageSelect !== null && (
                        <div className="overflow-hidden h-full w-full absolute">
                            <img 
                                src={URL.createObjectURL(registerEntrepreneur.imageSelect)} 
                                alt='Preview' 
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
                    <input id="dropzone-file" accept="image/*" type="file" className="hidden" onChange={(e) => registerEntrepreneur.setImageSelect(e)}/>
                </label>
            </div> 
        </div>
    )
})

export default FormImage