import InterestForm from "@/components/InterestForm";
import SiteNav from "@/components/SiteNav";

export default function RegisterPage() {
  return (
    <main className="relative h-svh overflow-y-auto bg-[#0D2B1F] font-['Lora',Georgia,serif]">
      <div className="pointer-events-none fixed inset-0 bg-[url('/assets/register-background.png')] bg-cover bg-center bg-no-repeat" />
      <div className="pointer-events-none fixed inset-0 bg-[#0D2B1F]/35" />
      <div className="sticky top-0 z-30"><SiteNav /></div>
      <div className="relative z-10 px-4 py-[clamp(28px,6vh,64px)]">
        <InterestForm />
      </div>
    </main>
  );
}
