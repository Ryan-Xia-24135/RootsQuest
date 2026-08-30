import SnapScroller from "@/components/SnapScroller";
import AboutOverviewContent from "@/components/AboutOverviewContent";
import AboutMeaningContent from "@/components/AboutMeaningContent";

export default function AboutPage() {
  return (
    <SnapScroller
      sections={[
        { id: "about-overview", background: "/assets/about-background-overview.png", content: <AboutOverviewContent /> },
        { id: "about-more", background: "/assets/about-background-meaning.png", content: <AboutMeaningContent /> },
      ]}
    />
  );
}
