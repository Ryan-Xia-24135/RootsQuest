import SnapScroller from "@/components/SnapScroller";
import {
  CourseConnectionContent,
  CourseInstructorContent,
  CourseOutcomesContent,
} from "@/components/CoursesOffersContent";

export default function CoursesPage() {
  return (
    <SnapScroller
      continuousBackground="/assets/courses-offers-background.png"
      sections={[
        { id: "connection", content: <CourseConnectionContent /> },
        { id: "outcomes", content: <CourseOutcomesContent /> },
        { id: "instructor", content: <CourseInstructorContent /> },
      ]}
    />
  );
}
