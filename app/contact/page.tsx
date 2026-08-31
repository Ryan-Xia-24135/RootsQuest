import ContactForm from "@/components/ContactForm";
import SiteNav from "@/components/SiteNav";

export default function ContactPage() {
  return (
    <main className="relative h-svh overflow-y-auto bg-black font-['Inter',Arial,sans-serif]">
      <div className="pointer-events-none fixed inset-0 bg-[url('/assets/home-01.png')] bg-cover bg-center" />
      <div className="pointer-events-none fixed inset-0 bg-black/55" />
      <div className="sticky top-0 z-30"><SiteNav /></div>
      <div className="relative z-10 flex min-h-[calc(100svh-var(--nav-height))] items-center px-4 py-10 sm:px-6 lg:px-8">
        <ContactForm />
      </div>
    </main>
  );
}
