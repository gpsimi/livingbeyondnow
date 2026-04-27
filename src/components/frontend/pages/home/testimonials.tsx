"use client"

import { testimonials } from '@/constants'
import React, { useState } from 'react'
import Slider from 'react-slick'

function TestimonialCard({ t, index }: { t: { name: string; location?: string; programme: string; text: string; featured?: boolean }; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const isOdd = index % 2 === 0 // 0, 2, 4 mapped to odd 1st, 3rd, 5th items

  return (
    <div
      className={`rounded-2xl p-8 flex flex-col h-full ${t.featured ? 'bg-accent-blue text-primary-foreground' : isOdd ? 'bg-secondary/10 border border-transparent' : 'bg-background border border-border'}`}
    >
      <div className="mb-6">
        <span className={`inline-block font-heading text-xs tracking-wider uppercase px-3 py-1 rounded-full ${t.featured ? 'bg-gold/20 text-gold' : 'bg-surface text-navy'}`}>
          {t.programme}
        </span>
      </div>
      
      <div className="grow mb-8 flex flex-col items-start text-left">
        <p
          className={`font-body text-sm leading-relaxed ${!expanded ? 'line-clamp-4' : ''} ${t.featured ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}
        >
          {t.text}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className={`mt-2 font-body text-xs font-semibold hover:underline ${t.featured ? 'text-gold' : 'text-navy'}`}
        >
          {expanded ? 'See less' : 'See more...'}
        </button>
      </div>

      <div className="flex items-center gap-3 mt-auto">
        <div
          className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-heading text-sm ${t.featured ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-surface text-navy'}`}
        >
          {t.name[0]}
        </div>
        <div>
          <p
            className={`font-body font-semibold text-sm ${t.featured ? 'text-primary-foreground' : 'text-navy'}`}
          >
            {t.name}
          </p>
          {t.location && (
            <p
              className={`font-body text-xs ${t.featured ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}
            >
              {t.location}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}


function TestimonialsSlider() {
  const settings = {
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 1,
    // slidesToScroll: 2,
    speed: 500,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <div
      className="slider-container container-narrow mx-auto pb-10 px-0 md:px-4 gap-12
      [&_.slick-dots_li_button:before]:text-secondary!
      [&_.slick-dots_li_button:before]:opacity-30!
      [&_.slick-dots_li.slick-active_button:before]:text-secondary!
      [&_.slick-dots_li.slick-active_button:before]:opacity-100!
      [&_.slick-dots]:bottom-2"
    >
      <Slider {...settings}>
        {testimonials.map((t, index) => (
          <div key={t.name} className="px-3 outline-none h-full">
            <TestimonialCard t={t} index={index} />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default TestimonialsSlider
