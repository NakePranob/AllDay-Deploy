import React from 'react'
import Avatar from '@mui/material/Avatar';

const page = ({ params }: { params: { id: string } }) => {
    return (
        <div className='container pb-2 pt-20 md:pt-28 lg:pb-8 h-screen flex flex-col'>
            <div className='card p-4 flex-1 flex flex-col justify-end'>
                <div className='flex-1 bg-blue-300 overflow-y-auto flex flex-col justify-end'>
                    <div className=' bg-yellow-100 p-4'>

                    </div>
                </div>
                <div className='w-full h-16 bg-red-400'>

                </div>
            </div>
        </div>
    )
}

export default page