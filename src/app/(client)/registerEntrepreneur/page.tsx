import RegisterForm from "@/components/menage/register/RegisterForm"
import FormImage from "@/components/menage/register/FormImage"
import ListImage from "@/components/menage/register/ListImage"
import FormState from "@/components/menage/register/FormState"
import FormTypeRoom from "@/components/menage/register/FormTypeRoom"
import FormSubmit from "@/components/menage/register/FormSubmit"
import Formlandmark from "@/components/menage/register/Formlandmark"

type Props = {}

const page = (props: Props) => {
    return (
        <div className='pt-24 md:pt-28 pb-10 container'>
            <div className="flex justify-center sm:justify-start">
                <h1 className='text-xl sm:text-2xl sm:font-semibold sm:mb-4 text-center sm:text-left bg-blue-400 sm:bg-white/0
                py-1 px-6 sm:p-0 rounded-t-3xl text-white sm:text-black sm:dark:text-white'>
                    สมัครเป็นผู้ประกอบการ
                </h1>
            </div>
            <div className='grid grid-cols-12 gap-4'>
                <section className='card overflow-hidden relative col-span-12 md:col-span-5'>
                    <span className="absolute w-80 h-80 bg-blue-400/20 -top-20 -left-44 rotate-[50deg] rounded-[3rem]"></span>
                    <span className="absolute w-[35rem] h-72 bg-blue-400/10 -top-10 -left-40 -rotate-[30deg] rounded-[2rem]"></span>
                    <h1 className="text-lg font-medium px-4 py-2 backdrop-blur-md z-50 w-full relative">ข้อมูลพื้นฐาน</h1>
                    <hr className="hr-w"/>
                    <RegisterForm/>
                </section>
                <section className='card overflow-hidden relative col-span-12 md:col-span-7 flex flex-col'>
                    <span className="absolute w-40 h-56 bg-sky-400/[.05] dark:bg-sky-900/10 blur-xl -top-12 -left-14 rotate-[65deg] rounded-[1.5rem]"></span>
                    <span className="absolute w-80 h-80 bg-blue-400/20 -bottom-20 -right-44 rotate-[50deg] rounded-[3rem]"></span>
                    <span className="absolute w-[35rem] h-72 bg-blue-400/10 -bottom-10 -right-40 -rotate-[20deg] rounded-[2rem]"></span>
                    <h1 className="text-lg font-medium px-4 py-2 backdrop-blur-md z-50 w-full relative">เพิ่มรูปภาพ (ภาพรวม)</h1>
                    <hr className="hr-w"/>
                    <FormImage/>
                </section>
            </div>
            <div className="grid grid-cols-12 gap-4 mt-4">
                <section className="card overflow-hidden col-span-12 md:col-span-7 relative">
                    <span className="absolute w-64 h-44 bg-sky-400/[.05] dark:bg-sky-900/10 blur-2xl -top-12 -right-14 rotate-[65deg] rounded-[4rem]"></span>
                    <span className="absolute w-80 h-80 bg-blue-400/20 -bottom-20 -left-44 rotate-[50deg] rounded-[3rem]"></span>
                    <span className="absolute w-[35rem] h-72 bg-blue-400/10 -bottom-10 -left-40 rotate-[30deg] rounded-[2rem]"></span>
                    <h1 className="text-lg font-medium px-4 py-2 z-50 w-full relative">ตัวอย่างรูปภาพ</h1>
                    <hr className="hr-w hidden md:block"/>
                    <ListImage/>
                </section>
                <section className="card overflow-hidden col-span-12 md:col-span-5 relative">
                <span className="absolute w-40 h-56 bg-sky-400/[.05] dark:bg-sky-900/10 blur-xl -top-12 -left-14 rotate-[65deg] rounded-[1.5rem]"></span>
                <span className="absolute w-80 h-80 bg-blue-400/20 -bottom-10 -right-56 rotate-[35deg] rounded-[3rem]"></span>
                <span className="absolute w-[35rem] h-80 bg-blue-400/10 bottom-10 -right-64 -rotate-[40deg] rounded-[2rem]"></span>
                    <h1 className="text-lg font-medium px-4 py-2 backdrop-blur-md z-50 w-full relative">สิ่งที่มีให้บริการ</h1>
                    <hr className="hr-w"/>
                    <FormState/>
                </section>
            </div>
            <h1 className='mt-6 font-medium text-xl'>
                ประเภทห้องพัก <span className="font-normal text-base opacity-70">(หากเป็นบ้านเพิ่มแค่ 1 ประเภท)</span>
            </h1>
            <section className="card overflow-hidden col-span-12 mt-2 grid grid-cols-12 gap-4 p-4 relative">
                <span className="absolute w-20 h-52 bg-blue-400/20 -top-10 -left-12 rotate-[50deg] rounded-[1rem]"></span>
                <span className="absolute w-[35rem] h-44 bg-blue-400/10 -top-10 -left-40 -rotate-[20deg] rounded-[2rem]"></span>
                <FormTypeRoom/>
            </section>
            <Formlandmark/>
            <div className="mt-8">
                <FormSubmit/>
            </div>
        </div>
    )
}

export default page