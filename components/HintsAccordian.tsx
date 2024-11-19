import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface HintsAccordionProps {
  hints: string[];
}

const HintsAccordion: React.FC<HintsAccordionProps> = ({ hints }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="hints" className="border-zinc-700">
        <AccordionTrigger className="text-xl font-bold text-zinc-100">
          <div className="flex items-center">
            <HelpCircle className="w-5 h-5 mr-2" />
            Hints
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="list-none space-y-2 text-base">
            {hints.map((hint, index) => (
              <li key={index} className="flex items-start gap-2 text-zinc-300">
                <span className="text-blue-400">•</span>
                {hint}
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default HintsAccordion;
