import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: { default: "ROOTS Quest", template: "%s | ROOTS Quest" },
  description: "Systems thinking and regenerative design for students in Grades 6–8."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteNav />{children}</body></html>;
}
