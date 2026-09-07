import SnapScroller from "@/components/SnapScroller";
import AboutOverviewContent from "@/components/AboutOverviewContent";
import AboutMeaningContent from "@/components/AboutMeaningContent";
import { CourseInstructorContent } from "@/components/CoursesOffersContent";

export default function AboutPage() {
  return (
    <SnapScroller
      sections={[
        { id: "about-overview", background: "/assets/about-background-meaning.png", content: <AboutOverviewContent /> },
        { id: "instructor", background: "/assets/about-background-meaning.png", content: <CourseInstructorContent theme="about" /> },
        { id: "about-more", background: "/assets/about-background-meaning.png", content: <AboutMeaningContent /> },
      ]}
    />
  );
}
