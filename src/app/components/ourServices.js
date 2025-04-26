"use client";

import { useEffect, useState } from "react";
import { database } from "../../../firebase";
import { ref, onValue } from "firebase/database";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import "../style/ourServices.css";

export default function OurServices() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const servicesRef = ref(database, "services");
        onValue(servicesRef, (snapshot) => {
            const data = snapshot.val();
            const array = data ? Object.entries(data).map(([id, val]) => ({ id, ...val })) : [];
            setServices(array);
        });
    }, []);

    return (
        <div className="ourServicesMain">
            <h2>Hizmetlerimiz</h2>
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={30}
                slidesPerView={3}
                autoplay={{ delay: 5000 }}
                pagination={{ clickable: true }}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="ourServicesSwiper"
            >
                {services.map(service => (
                    <SwiperSlide key={service.id}>
                        <div className="serviceSlide">
                            <img src={service.image} alt={service.title} className="serviceImage" />
                            <div className="serviceText">
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}