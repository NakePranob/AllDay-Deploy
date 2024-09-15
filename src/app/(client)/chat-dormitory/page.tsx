import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import Link from 'next/link';
import { headers } from "next/headers";

async function getData(id:number) {
    try {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/dmtChat/${id}`);
        return result.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

const page = async() => {
const headerRequest = headers();
    const userId = headerRequest.get('userId');
    const data = await getData(Number(userId));
    return (
        <div className='container pt-20 md:pt-28 pb-8'>
            <div className='card rounded-3xl py-4 px-6'>
                <h1 className='text-xl font-semibold mb-4'>รายการแชท</h1>
                    {data.length > 0 ? (
                        data.map((item:any, i:number) => (
                            <div key={i} className='p-2'>
                                <Link href={`/chat/${item.id}`} className='flex-y-center gap-2'>
                                    <Avatar 
                                        alt={item.user.profile 
                                            ? `${item.user.profile}`
                                            : '/404.png'
                                        }
                                        src={item.user.profile 
                                            ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profire/${item.user.profile}`
                                            : '/404.png'
                                        } 
                                        className='shadow-lg'
                                    />
                                    <div>
                                        <p className='font-semibold -mb-1'>{item.user.firstname+' '+item.user.lastname}</p>
                                        <p className='text-xs opacity-70 truncate w-40 max-w-40 overflow-hidden'>
                                            {item.latestMessage ? item.latestMessage : 'ไม่มีข้อความ'}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        )
                        
                    )) : (
                        <p>ไม่พบรายการแชท</p>
                    )}
            </div>
        </div>
    )
}

export default page