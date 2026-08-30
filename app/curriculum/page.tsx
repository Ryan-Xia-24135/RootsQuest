import SnapScroller from "@/components/SnapScroller";
import {
  CurriculumOverviewHeading,
  ResearchSkillsContent,
  SystemsThinkingContent,
} from "@/components/CurriculumContent";

export default function CurriculumPage() {
  return (
    <SnapScroller
      continuousBackground="/assets/curriculum-background.png"
      sections={[
        { id: "systems-thinking", content: <SystemsThinkingContent /> },
        { id: "research-skills", content: <ResearchSkillsContent /> },
        { id: "curriculum-overview", content: <CurriculumOverviewHeading /> },
      ]}
    />
  );
}
