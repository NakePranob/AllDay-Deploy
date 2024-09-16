import axios from 'axios';
import Boxmsg from './Boxmsg';

async function getData(id:number) {
    try {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/msg/${id}`);
        return result.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

const page = async ({ params }: { params: { id: string } }) => {
    const data = await getData(Number(params.id));

    return (
        <div className='container pb-2 pt-20 md:pt-28 lg:pb-8 h-screen flex flex-col'>
            <div className='card rounded-3xl p-4 flex-1 flex flex-col justify-end'>
                <h1 className='text-lg opacity-50 font-semibold mb-2'>{data.user.firstname} {data.user.lastname}</h1>
                <Boxmsg chatId={data.id} userId={data.user.id} dmtId={data.dormitory.id} msg={data.msg}/>
            </div>
        </div>
    )
}


export default page