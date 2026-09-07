import SnapScroller from "@/components/SnapScroller";
import {
  CourseConnectionContent,
  CourseOutcomesContent,
} from "@/components/CoursesOffersContent";
import {
  CurriculumOverviewHeading,
  ResearchSkillsContent,
  SystemsThinkingContent,
} from "@/components/CurriculumContent";

const background = "/assets/courses-offers-background.png";
const backgroundPageCount = 3;

export default function CoursesPage() {
  return (
    <SnapScroller
      sections={[
        { id: "connection", background, backgroundPage: 0, backgroundPageCount, content: <CourseConnectionContent /> },
        { id: "outcomes", background, backgroundPage: 1, backgroundPageCount, content: <CourseOutcomesContent /> },
        { id: "systems-thinking", background, backgroundPage: 0, backgroundPageCount, content: <SystemsThinkingContent /> },
        { id: "research-skills", background, backgroundPage: 1, backgroundPageCount, content: <ResearchSkillsContent /> },
        { id: "curriculum-overview", background, backgroundPage: 2, backgroundPageCount, content: <CurriculumOverviewHeading /> },
      ]}
    />
  );
}
