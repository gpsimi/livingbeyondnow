"use client"

import { clientsLogo } from "@/constants";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

const Brands = () => {
    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 10000,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
        ],
    };

    return (
        <div className="">
            <Slider {...settings}>
                {clientsLogo.map((items) => (
                        <div key={items.id} className="flex items-center">
                            <Image
                                src={items.logo}
                                width={200}
                                height={20}
                                alt="client-images"
                                className=""
                            />
                        </div>
                    ))}
            </Slider>
        </div>
    );
}


export default Brands