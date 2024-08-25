import Link from "next/link";
import { headers } from "next/headers";
import axios from "axios";

async function getData(id: string | null) {
    if (id) {
        try {
            const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/dormitory/owner/${id}`);
            return result.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    } else {
        return [];
    }
}

const Page = async () => {
    const headerRequest = headers();
    const userId = headerRequest.get('userId');
    const data = await getData(userId);
    
    return (
        <div className='container pt-24 md:pt-28 pb-8'>
            <h1 className='text-xl font-semibold mb-4 border-b-base'>
                รายการหอพักที่คุณเป็นเจ้าของ
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-2 md:gap-y-6'>
                {data.length > 0 ? (
                    data.map((item:any, i:number) => (
                        <Link 
                            key={i} 
                            href={`/menage/${item.id}`} 
                            className='card p-4 h-48 relative overflow-hidden transition-all duration-300
                            hover:shadow-2xl dark:hover:shadow-xl hover:shadow-blue-300/60 dark:hover:shadow-blue-950/60'>
                            <span className='w-44 h-56 rounded-2xl bg-blue-400/20 rotate-45 absolute -left-16 -top-10'></span>
                            <span className='w-56 h-80 rounded-2xl bg-blue-400/10 rotate-45 absolute -left-16 -top-10'></span>
                            <div className='flex justify-between relative'>
                                <div className='flex-1 overflow-hidden pr-2'>
                                    <h1 className='text-lg font-semibold'>
                                        {item.name || 'ชื่อหอพัก'}
                                    </h1>
                                    <p className='text-sm text-ellipsis whitespace-nowrap overflow-hidden -mt-2 opacity-70'>
                                        {item.engname || 'ไม่มีชื่อหอพักภาษาอังกฤษ'}
                                    </p>
                                </div>
                                <span className='opacity-70 text-xs'>
                                    {item.createdAt || 'ไม่มีวันที่สร้างหอพัก'}
                                </span>
                            </div>
                            <span className='absolute left-4 bottom-2 opacity-70 text-sm'>
                                {item.address || 'ไม่มีการกรอกที่อยู่'}
                            </span>
                        </Link>
                    ))
                ) : (
                    <p>ไม่พบรายการหอพัก</p>
                )}
            </div>
        </div>
    );
};

export default Page;
