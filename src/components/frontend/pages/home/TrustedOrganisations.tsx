import AnimatedSection from '@/components/frontend/AnimatedSection'
import Brands from './Brands'

// const orgs = [
//   'BT Group plc',
//   'Aleto Foundation',
//   'UK Youth',
//   'Winners Chapel International Birmingham',
//   'Proud To Be Me',
// ]

const TrustedOrganisations = () => (
  <section className="section-padding-1 bg-background">
    <div className="container-narrow">
      <AnimatedSection>
        <h2 className="heading-display text-2xl md:text-3xl text-foreground text-center mb-16">
          TRUSTED ACROSS CORPORATE AND YOUTH LEADERSHIP ENVIRONMENTS
        </h2>
      </AnimatedSection>


      <div className='max-md:px-6'>
        <Brands />
      </div>



      {/* <div className="flex flex-wrap justify-center items-center gap-12">
        {orgs.map((org, i) => (
          <AnimatedSection key={org} delay={i * 0.1}>
            <div className="text-center px-6 py-4">
              <span className="font-body text-sm font-semibold text-muted-foreground tracking-wider uppercase opacity-60 hover:opacity-100 transition-opacity duration-300">
                {org}
              </span>
            </div>
          </AnimatedSection>
        ))}
      </div> */}
    </div>
  </section>
)

export default TrustedOrganisations
