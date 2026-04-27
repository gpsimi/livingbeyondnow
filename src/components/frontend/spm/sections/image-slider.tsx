'use client'

import Image from 'next/image'
import React from 'react'
import Slider from 'react-slick'

// Static imports for images
import image1 from '@/assets/images/spm/image-1.png'
import image2 from '@/assets/images/spm/image-2.png'
import image3 from '@/assets/images/spm/image-3.png'

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  }

  const images = [
    { src: image1, alt: 'SPM 1.0 Highlights 1' },
    { src: image2, alt: 'SPM 1.0 Highlights 2' },
    { src: image3, alt: 'SPM 1.0 Highlights 3' },
  ]

  return (
    <div
      className="slider-container max-w-5xl mx-auto pb-10 px-0 md:px-4
      [&_.slick-dots_li_button:before]:text-secondary!
      [&_.slick-dots_li_button:before]:opacity-30!
      [&_.slick-dots_li.slick-active_button:before]:text-secondary!
      [&_.slick-dots_li.slick-active_button:before]:opacity-100!
      [&_.slick-dots]:bottom-2"
    >
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="outline-none">
            <div className="relative aspect-4/3 md:aspect-video rounded-lg overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default ImageSlider
