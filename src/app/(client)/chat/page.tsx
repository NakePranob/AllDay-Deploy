import React from 'react'
import Avatar from '@mui/material/Avatar';

type Props = {}

const page = (props: Props) => {
    return (
        <div className='container pt-20 md:pt-28 pb-8'>
            <div className='card py-4 px-6'>
                <h1 className='text-xl font-semibold mb-4'>รายการแชท</h1>
                <ul>
                    <li className='px-4 py-2'>
                        <div className='flex-y-center gap-2'>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <div>
                                <p className='font-semibold -mb-2 mt-1'>Remy Sharp</p>
                                <span className='text-xs opacity-70'>มีหอพักว่างไหม</span>
                            </div>
                        </div>
                    </li>
                    <li className='px-4 py-2'>
                        <div className='flex-y-center gap-2'>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <div>
                                <p className='font-semibold -mb-2 mt-1'>Remy Sharp</p>
                                <span className='text-xs opacity-70'>มีหอพักว่างไหม</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default page