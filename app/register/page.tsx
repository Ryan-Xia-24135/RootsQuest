import InterestForm from "@/components/InterestForm";
import SiteNav from "@/components/SiteNav";

export default function RegisterPage() {
  return (
    <main className="relative h-svh overflow-y-auto bg-black font-['Inter',Arial,sans-serif]">
      <div className="pointer-events-none fixed inset-0 opacity-30 [background-image:radial-gradient(rgba(217,217,217,0.35)_1px,transparent_1px)] [background-size:12px_12px]" />
      <div className="sticky top-0 z-30"><SiteNav /></div>
      <div className="relative z-10 px-4 py-[clamp(28px,6vh,64px)]">
        <InterestForm />
      </div>
    </main>
  );
}
