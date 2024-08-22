import SectionHero from "@/components/about/SectionHero";
import GlassBackground from "@/components/home/GlassBackground";
import React from "react";
import rightImg from "@/assets/images/about-hero-right.png";
import BackgroundSection from "@/components/common/partials/BackgroundSection";
import SectionClientSay from "@/components/home/sections/SectionClientSay";

const About = () => {
  return (
    <div>
      <div className='className="nc-PageAbout py-16"'>
        <GlassBackground />
        <SectionHero
          rightImg={rightImg}
          heading="👋 About Us."
          btnText=""
          subHeading="Discover the World on Foot with Local Expertise"
        >
          <p>
            {`At Walkwise, we connect curious travelers with passionate local
            guides to create authentic and affordable walking tours. Our
            platform is designed for those who want to experience the true
            heartbeat of a destination, going beyond the usual tourist spots to
            explore hidden treasures and local culture. Whether you're a budget
            traveler or just someone who prefers to walk, Walkwise offers
            personalized tours that turn every journey into a memorable
            adventure.`}
          </p>
          <p>
            {`With our local experts leading the way, you'll see the world through
            the eyes of those who know it best.`}
          </p>
        </SectionHero>
      </div>
      <div className="relative py-16 my-24">
        <BackgroundSection className="bg-neutral-100 dark:bg-black dark:bg-opacity-20 " />
        <SectionClientSay />
      </div>
    </div>
  );
};

export default About;
