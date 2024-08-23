'use client'
import { useRef } from 'react';
import Image from 'next/image';
import { observer } from 'mobx-react';
import dormitoryOnly from "@/stores/dormitoryOnly";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import type { Dormitory_img } from '@/Types/dormitory';

const Carousel = observer(({data}: any) => {
    const progressCircle = useRef<SVGSVGElement>(null);
    const progressContent = useRef<HTMLSpanElement>(null);

    const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
        if (progressCircle.current && progressContent.current) {
            progressCircle.current.style.setProperty('--progress', `${1 - progress}`);
            progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
        }
    };
    return (
        <section className="sm:card border-0 h-56 sm:h-72 md:h-96 rounded-b-none overflow-hidden sm:mx-5 shadow-md">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 10*1000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
            >
                {dormitoryOnly.data?.dormitory_img?.map((item, i) => (
                    <SwiperSlide key={i}>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dormitoryImages/${item.url}`}
                            alt={item.url}
                            width={1920}
                            height={950}
                            className='h-full w-full object-cover object-center'
                            priority
                        />
                    </SwiperSlide>
                ))}
                <div className="autoplay-progress scale-75 -mb-2 -me-2 hidden sm:block" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </section>
    )
})

export default Carousel