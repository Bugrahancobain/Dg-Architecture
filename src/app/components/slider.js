'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import "../style/sliderStyle.css"
import { Pagination, Autoplay } from 'swiper/modules';

export default function App() {
    return (
        <>
            <Swiper
                direction={'vertical'}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                autoplay={{
                    delay: 5000, // 3 saniyede bir geçiş yapar
                    disableOnInteraction: false, // kullanıcı tıklayınca autoplay durmaz
                }}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src="https://khgmimarlik.com.tr/wp-content/uploads/2022/08/KHG-Mimarlik-Mossa-Bademli-0a.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://khgmimarlik.com.tr/wp-content/uploads/2025/03/2.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://khgmimarlik.com.tr/wp-content/uploads/2025/03/3lu.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://khgmimarlik.com.tr/wp-content/uploads/2022/08/KHG-Mimarlik-Mossa-Bademli-4a.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://khgmimarlik.com.tr/wp-content/uploads/2022/08/KHG-Mimarlik-Mossa-Bademli-2a.jpg" alt="" />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
