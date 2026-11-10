import { FitText } from "@/components/fit-text";
import { cn, displayFontClass } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

export function DisplayTitle({
  as: Comp = "h2",
  children,
  className,
}: {
  as?: Tag;
  children: string;
  className?: string;
}) {
  const text = children.replace(/\s+/g, " ").trim();
  return (
    <FitText as={Comp} className={cn(displayFontClass(text), className)}>
      {text}
    </FitText>
  );
}
