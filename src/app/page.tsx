import Hero from "../components/Hero";
import Offerings from "../components/Offerings";
import Testimonials from "../components/Testimonials";
import FeaturedProducts from "../components/FeaturedProducts";
import Contact from "../components/Contact";
import Header from "../components/Header";
import ReputationScrollingText from "@/components/RevolvingText";

export default function Home() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Space Grotesk, Noto Sans, sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <Hero />
        <ReputationScrollingText />
        
            <Offerings />
            {/* <Testimonials /> */}
            <FeaturedProducts />
            <Contact />
         
      </div>
    </div>
  );
}
