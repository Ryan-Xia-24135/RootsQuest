import AboutSectionContent from "@/components/AboutSectionContent";
import CourseSectionContent from "@/components/CourseSectionContent";
import HeroSectionContent from "@/components/HeroSectionContent";
import ImportanceSectionContent from "@/components/ImportanceSectionContent";
import SignupSectionContent from "@/components/SignupSectionContent";
import SnapScroller from "@/components/SnapScroller";

export default function HomePage() {
  return (
    <SnapScroller
      sections={[
        { background: "/assets/home-01.png", content: <HeroSectionContent /> },
        { background: "/assets/home-02.png", content: <AboutSectionContent /> },
        { background: "/assets/home-03.png", content: <CourseSectionContent /> },
        { background: "/assets/home-04.png", content: <ImportanceSectionContent /> },
        { background: "/assets/home-05.png", content: <SignupSectionContent /> },
      ]}
    />
  );
}
