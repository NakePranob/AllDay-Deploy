'use client';
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

const Carousel = ({ data }: any) => {
  const progressCircle = useRef<SVGSVGElement>(null);
  const progressContent = useRef<HTMLSpanElement>(null);

  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (progressCircle.current && progressContent.current) {
      const progressValue = 1 - progress;
      progressCircle.current.style.setProperty('--progress', `${progressValue}`);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

    return (
        <section className="w-full h-full overflow-hidden">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 10000, // 10 seconds
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
            >
                {data?.length > 0 ? (
                    data.map((item: any, i: number) => (
                        <SwiperSlide key={i}>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dormitoryTypeImages/${item.url}`}
                            alt={item.url}
                            width={1920}
                            height={950}
                            className="h-full w-full object-cover object-center"
                            priority
                        />
                        </SwiperSlide>
                    ))
                ) : (
                    <p>ไม่พบข้อมูลสำหรับแสดง</p>
                )}

                <div className="autoplay-progress scale-75 -mb-2 -me-2" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </section>
    );
};

export default Carousel;