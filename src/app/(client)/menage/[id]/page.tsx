import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <div className='flex'>
            <div className='card rounded-none w-72 h-screen pt-20 md:pt-24 px-4'>
                sss
            </div>
            <div className='flex-1 h-screen pt-20 md:pt-24 overflow-y-auto container'>
                <div className='flex gap-4'>
                    <div className="card text-white w-80 h-44 bg-blue-400 p-4 overflow-hidden relative">
                        <h1 className='text-lg font-semibold'>จำนวนผู้เช่าที่ได้รับการยืนยัน</h1>
                        <div className='absolute -bottom-[4.5rem] -right-0 text-[10rem] italic opacity-30 font-bold'>
                            42
                        </div>
                    </div>
                    <div className="card flex-1 h-44 p-4">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default page