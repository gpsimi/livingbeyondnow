import React from 'react'
import FadeIn from '@/components/frontend/FadeIn'
import Image from 'next/image'
import {team1, team2, team3} from "@/assets/images/team/index"


const teamMembers = [
  {
    initials: 'OA',
    img: team1,
    name: 'Orimoloye Ayoola',
    role: 'LEAD CONSULTANT',
    description:
      "Visionary leader driving Prime Counsel's strategic direction and leadership development programmes across the UK and globally.",
  },
  {
    initials: 'JB',
    img: team2,
    name: 'Joel Babatunde',
    role: 'CREATIVE DIRECTOR',
    description:
      'Shaping the visual identity and brand experience of Prime Counsel with precision and creative excellence.',
  },
  {
    initials: 'FA',
    img: team3,
    name: 'Audrey Bakenda Ilomba',
    role: 'BRAND VOICE',
    description:
      "Crafting the narrative and communication strategy that defines Prime Counsel's distinctive presence and messaging.",
  },
]

const OurTeam = () => {
  return (
    <section className="py-20 md:py-28 bg-navy">
      <div className="container-narrow mx-auto px-4 md:px-8">
        <FadeIn>
          <div className="mb-16 md:mb-24 max-w-3xl">
            <p className="section-label">Our Team</p>
            <h2 className="font-heading text-3xl md:text-5xl text-primary-foreground mb-6">
              The People Behind the <span className="text-gold">Mission</span>
            </h2>
            <p className="font-body text-primary-foreground/70 text-lg leading-relaxed">
              To be the world&apos;s most trusted institution for leadership development — producing
              leaders who are visionary, ethically grounded, and globally positioned.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {teamMembers.map((member, idx) => (
            <FadeIn key={idx} delay={0.1 * (idx + 1)}>
              <div className="flex flex-col items-center text-center">
                <Image 
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mb-8"
                />
                <h3 className="text-primary-foreground font-heading text-xl md:text-2xl mb-2">
                  {member.name}
                </h3>
                <p className="text-gold font-body font-bold tracking-[0.15em] text-xs uppercase mb-4">
                  {member.role}
                </p>
                <p className="text-primary-foreground/70 font-body text-sm md:text-base leading-relaxed max-w-[280px]">
                  {member.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurTeam