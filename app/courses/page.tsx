import type { Metadata } from "next";import InteriorPage from "@/components/InteriorPage";
export const metadata:Metadata={title:"Courses"};
export default function CoursesPage(){return <InteriorPage eyebrow="Course information" title="ROOTS Quest Courses"><p>This route is ready for the upcoming Figma course designs. The “More of What ROOTS Quest Offers” button already links here.</p><p id="curriculum">The “More About Everything ROOTS Quest Teaches” button links to this curriculum section. It will be replaced with your supplied Figma page.</p></InteriorPage>}
