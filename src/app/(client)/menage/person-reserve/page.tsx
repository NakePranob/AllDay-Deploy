import axios from "axios"
import Link from "next/link"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { headers } from "next/headers";

import Card from './Card'

async function getData(id: string | null) {
    try {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/reserve?userId=${id}`);
        return result.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

const page = async () => {
    const headerRequest = headers();
    const userId = headerRequest.get('userId');
    const data = await getData(userId);

    return (
        <div className='container pt-20 md:pt-28 pb-8'>
            <h1 className='text-xl font-semibold mb-4 border-b-base'>
                รายการหอพักที่คุณเป็นเจ้าของ
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-2 md:gap-y-6'>
                {data.length > 0 ? (
                    <Card data={data} />
                ) : (
                    <p className="fixed-center">ไม่พบรายการหอพัก</p>
                )}
            </div>
        </div>
    )
}

export default page