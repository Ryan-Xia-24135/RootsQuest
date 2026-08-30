import SnapScroller from "@/components/SnapScroller";
import AboutOverviewContent from "@/components/AboutOverviewContent";
import AboutDetailsContent from "@/components/AboutDetailsContent";
import AboutMeaningContent from "@/components/AboutMeaningContent";

export default function AboutPage() {
  return (
    <SnapScroller
      continuousBackground="/assets/about-background-3-pages.png"
      sections={[
        { id: "about-overview", content: <AboutOverviewContent /> },
        { id: "about-details", content: <AboutDetailsContent /> },
        { id: "about-more", content: <AboutMeaningContent /> },
      ]}
    />
  );
}
