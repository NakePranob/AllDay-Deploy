import Card from "@/components/favorites/Card"
import axios from "axios";
import { headers } from "next/headers"


async function getData(id: string | null) {
    if (id) {
      try {
        const result = await axios.get(`https://all-day-deploy.vercel.app/api/favorite/${id}`);
        return result.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    } else {
      return null;
    }
}

const page = async () => {
    const headerRequest = headers();
    const userId = headerRequest.get('userId')
    const data = await getData(userId);

    return (
        <div className='pt-20 md:pt-24 pb-10 container
        grid grid-cols-12 gap-x-1 gap-y-2 sm:gap-4'>
            <h1 className="col-span-12 text-xl sm:text-2xl mt-2 font-semibold border-b
            border-slate-300 dark:border-slate-800 pb-1 sm:pb-2">รายการหอพักที่คุณสนใจ</h1>
            <Card data={data}/>
        </div>
    )
}

export default page