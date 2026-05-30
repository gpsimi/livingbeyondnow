import {
  HeroSection,
  ProblemSection,
  ResponseSection,
  ServiceTiers,
  ImpactMetrics,
  ManifestoSection,
  ShopPreview,
  BlogPreview,
  FinalCTA,
} from "@/components/frontend/pages/home";

const Home = () => (
  <main className="">
    <HeroSection />
    <ProblemSection />
    <ResponseSection />
    <ServiceTiers />
    <ImpactMetrics />
    <ManifestoSection />
    <ShopPreview />
    <BlogPreview />
    <FinalCTA />
  </main>
);

export default Home;
