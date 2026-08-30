"use client";

import { PlusIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export type AccordionEntry = { id: string; title: string; content: string };
export interface Accordion05Props { items: AccordionEntry[] }

export function Accordion05({ items }: Accordion05Props) {
  return (
    <div className="mx-auto w-full max-w-[1540px]">
      <Accordion type="single" defaultValue={items[0]?.id} collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="border-white/25 last:border-b">
            <AccordionTrigger className="group cursor-pointer overflow-hidden px-[clamp(12px,1.8vw,28px)] py-[clamp(9px,min(1.45vw,2.15vh),18px)] text-left text-white/60 duration-200 hover:text-white hover:no-underline data-[state=open]:rounded-t-[14px] data-[state=open]:bg-[#ccdecd] data-[state=open]:text-[#112e1b] [&>svg:last-child]:hidden">
              <div className="flex min-w-0 flex-1 items-center gap-[clamp(10px,1.55vw,24px)]">
                <span className="w-[2ch] shrink-0 font-['Inter',Arial,sans-serif] text-[clamp(9px,min(1vw,1.7vh),15px)] tabular-nums opacity-70">{item.id.padStart(2, "0")}</span>
                <h2 className="m-0 min-w-0 flex-1 font-['Asta_Sans',Arial,sans-serif] text-[clamp(18px,min(3vw,4.8vh),46px)] font-semibold leading-[1.08] tracking-[-0.03em]">{item.title}</h2>
                <PlusIcon className="size-[clamp(16px,min(1.85vw,3.1vh),28px)] shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-45" aria-hidden="true" />
              </div>
            </AccordionTrigger>
            <AccordionContent className="rounded-b-[14px] bg-[#ccdecd] px-[clamp(40px,6vw,92px)] pb-[clamp(12px,min(2vw,2.8vh),24px)] text-[#23452f]">
              <p className="m-0 max-h-[18vh] overflow-y-auto font-['Inter',Arial,sans-serif] text-[clamp(11px,min(1.7vw,2.9vh),26px)] font-normal leading-[1.35] tracking-[-0.02em]">{item.content}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
