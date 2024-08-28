'use client'
import { useRef } from 'react';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import type { Dormitory_img } from '@/Types/dormitory';

const Carousel = ({data}: any) => {
    const progressCircle = useRef<SVGSVGElement>(null);
    const progressContent = useRef<HTMLSpanElement>(null);

    const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
        if (progressCircle.current && progressContent.current) {
            progressCircle.current.style.setProperty('--progress', `${1 - progress}`);
            progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
        }
    };
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 10*1000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: false,
                dynamicBullets: true,
            }}
            navigation={false}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
        >
            {data?.map((item: Dormitory_img, i: number) => (
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
        </Swiper>
    )
}

export default Carousel