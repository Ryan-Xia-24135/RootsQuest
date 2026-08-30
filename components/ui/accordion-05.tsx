"use client";

import { PlusIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export type AccordionEntry = { id: string; title: string; content: string };
export interface Accordion05Props { items: AccordionEntry[] }

export function Accordion05({ items }: Accordion05Props) {
  return (
    <div className="mx-auto w-full max-w-[1180px]">
      <Accordion type="single" defaultValue={items[0]?.id} collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="border-white/25 last:border-b">
            <AccordionTrigger className="group cursor-pointer overflow-hidden px-[clamp(10px,1.6vw,24px)] py-[clamp(6px,min(1.1vw,1.7vh),13px)] text-left text-white/60 duration-200 hover:text-white hover:no-underline data-[state=open]:rounded-t-[12px] data-[state=open]:bg-[#ccdecd] data-[state=open]:text-[#112e1b] [&>svg:last-child]:hidden">
              <div className="flex min-w-0 flex-1 items-center gap-[clamp(8px,1.3vw,20px)]">
                <span className="w-[2ch] shrink-0 font-['Inter',Arial,sans-serif] text-[clamp(8px,min(0.85vw,1.5vh),13px)] tabular-nums opacity-70">{item.id.padStart(2, "0")}</span>
                <h2 className="m-0 min-w-0 flex-1 font-['Asta_Sans',Arial,sans-serif] text-[clamp(15px,min(2.45vw,4vh),37px)] font-semibold leading-[1.08] tracking-[-0.03em]">{item.title}</h2>
                <PlusIcon className="size-[clamp(14px,min(1.6vw,2.7vh),24px)] shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-45" aria-hidden="true" />
              </div>
            </AccordionTrigger>
            <AccordionContent className="rounded-b-[12px] bg-[#ccdecd] px-[clamp(34px,5.4vw,82px)] pb-[clamp(9px,min(1.6vw,2.3vh),20px)] text-[#23452f]">
              <p className="m-0 max-h-[16vh] overflow-y-auto font-['Inter',Arial,sans-serif] text-[clamp(10px,min(1.45vw,2.5vh),22px)] font-normal leading-[1.35] tracking-[-0.02em]">{item.content}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
