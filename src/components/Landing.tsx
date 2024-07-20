import SectionOne from "@/components/LandingPageComponents/SectionOne";
import SectionTwo from "@/components/LandingPageComponents/SectionTwo";
import SectionThree from "@/components/LandingPageComponents/SectionThree";
import SectionFour from "@/components/LandingPageComponents/SectionFour";
import SectionFive from "@/components/LandingPageComponents/SectionFive";
import SectionSix from "@/components/LandingPageComponents/SectionSix";
import SectionSeven from "@/components/LandingPageComponents/SectionSeven";
import SectionEight from  "@/components/LandingPageComponents/SectionEight";


const LandingPage = () => {
  return (
    <div className="overflow-hidden">
      <SectionOne />
      <SectionTwo/>
      <SectionThree/>
      <SectionFour/>
      <SectionFive/>
      <SectionSix/>
      <SectionSeven/>
      <SectionEight/>
    </div>
  );
};

export default LandingPage;
