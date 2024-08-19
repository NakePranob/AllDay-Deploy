import Link from 'next/link';
import axios from 'axios';

// Components
import CardDormitory from '@/components/index/CardDormitory';
import Filter from '@/components/index/Filter'

async function getData() {
    try {
        const result = await axios.get('http://localhost:3000/api/getDormitory', {
            headers: {
                'getType': 'get',
            },
        });
        return result.data.data
    } catch (error) {
        console.log(error);
    }
}

async function Page() {
    const data = await getData();
    return (
        <>
            <div className='pt-16 md:pt-20 pb-10'>
                <div className="flex-center gap-2 h-9 bg-blue-400 text-white text-sm">
                    ลงทะเบียนเป็นสมาชิคกับเราได้ที่ <Link href="/register" className="font-bold cursor-pointer">สมัครสมาชิก</Link>
                </div>
                <div className='flex gap-4 container pt-6'>
                    <Filter/>
                    <div className='flex-1'>
                        <CardDormitory data={data}/>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Page;