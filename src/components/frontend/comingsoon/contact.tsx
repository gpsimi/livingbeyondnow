import React from 'react'
import { CONTACT_INFO } from '@/components/frontend/spm/data/constants'

const Contact = () => {
  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container max-w-7xl mx-auto ">
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-secondary text-[10px] font-black uppercase tracking-[0.3em] block">
                Get in Touch
              </span>
              <h2 className="text-5xl md:text-6xl tracking mt-4 uppercase text-primary">Contact</h2>
              <div className="w-12 h-1 bg-secondary rounded-full mt-6" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-20">
              <p className="text-2xl md:text-3xl font-bold leading-tight tracking-tight text-primary">
                <span className="text-secondary">
                  We will launch our new website as soon as possible.
                </span>{' '}
                For customer support and query, feel free to get in touch with us.
              </p>
              <div className="space-y-6">
                {/* <div>
                  <h4 className="text-[18px] font-bold uppercase tracking-widest text-zinc-900 mb-2">
                    Living In:
                  </h4>
                  <p className="text-zinc-500 font-medium">30 Shacham street, Los Angeles, USA.</p>
                </div> */}
                <div>
                  <h4 className="text-[18px] font-bold uppercase tracking-widest mb-2 text-primary">
                    Email:
                  </h4>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-zinc-500 font-medium cursor-pointer hover:text-secondary transition-colors"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
                <div>
                  <h4 className="text-[18px] font-bold uppercase tracking-wides mb-2 text-primary">
                    Call:
                  </h4>
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="text-zinc-500 font-medium hover:text-secondary transition-colors"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
