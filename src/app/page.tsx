import BackgroundSection from "@/components/common/partials/BackgroundSection";
import GlassBackground from "@/components/home/GlassBackground";
import SectionClientSay from "@/components/home/sections/SectionClientSay";
import SectionFeatured from "@/components/home/sections/SectionFeatured";
import SectionHero from "@/components/home/sections/SectionHero";
import SectionHowItWork from "@/components/home/sections/SectionHowItWork";
import SectionOurFeatures from "@/components/home/sections/SectionOurFeatures";
import SectionSliderNewCategories from "@/components/home/sections/SectionSliderNewCategories";
import SectionSubscribe from "@/components/home/sections/SectionSubscribe";

export default function Home() {


  return (
    <main className="nc-PageHome relative overflow-hidden">
      <GlassBackground />
      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-24 mt-16">
        <SectionHero />
        <SectionSliderNewCategories />
        <SectionOurFeatures />
        <SectionFeatured />
        <SectionHowItWork />
        <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionClientSay />
        </div>
        <SectionSubscribe />
      </div>
    </main>
  );
}
