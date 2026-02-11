import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function FilterSection({ value, title, children }) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  )
}
