import Link from "next/link"

type Props = {}

const page = (props: Props) => {
    return (
        <div className='container pt-24 md:pt-28'>
            <h1 className='text-xl font-semibold mb-4 border-b-base'>
                รายการหอพักที่คุณเป็นเจ้าของ
            </h1>
            <div className='grid grid-cols-3 gap-4'>
                <Link href={'#'} className='card p-4 h-48 relative overflow-hidden transition-300
                hover:shadow-2xl dark:hover:shadow-xl hover:shadow-blue-300/60 dark:hover:shadow-blue-950/60'>
                    <span className='w-44 h-56 rounded-2xl bg-blue-400/20 rotate-45 absolute -left-16 -top-10'></span>
                    <span className='w-56 h-80 rounded-2xl bg-blue-400/10 rotate-45 absolute -left-16 -top-10'></span>
                    <div className='flex justify-between relative'>
                        <div className='flex-1 overflow-hidden pe-2'>
                            <h1 className='text-lg font-semibold'>
                                ชื่อหอพัก ชื่อหอพัก ชื่อหอพักชื่อหอพักชื่อหอพัก
                            </h1>
                            <p className='text-sm text-ellipsis text-nowrap overflow-hidden -mt-2 opacity-70'>
                                sdsadsadasdasdsad
                            </p>
                        </div>
                        <span className='opacity-70 text-xs'>
                            2024-07-30
                        </span>
                    </div>
                    <span className='absolute left-4 bottom-2 opacity-70 text-sm'>
                        บ้านเลขที่ 186/4 หมู่ 2 ,อ.เมือง, ต.เมือง, จ.เลย, 42000
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default page