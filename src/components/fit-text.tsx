import { useLayoutEffect, useRef, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

function fitElement(el: HTMLElement) {
  el.style.fontSize = "";
  const computed = parseFloat(getComputedStyle(el).fontSize);
  if (!computed || !el.clientWidth) return;
  if (el.scrollWidth <= el.clientWidth + 1) return;
  let lo = 8;
  let hi = computed;
  let best = lo;
  for (let i = 0; i < 16; i++) {
    const mid = (lo + hi) / 2;
    el.style.fontSize = `${mid}px`;
    if (el.scrollWidth <= el.clientWidth + 1) {
      best = mid;
      lo = mid;
    } else {
      hi = mid;
    }
  }
  el.style.fontSize = `${best}px`;
}

type FitTextProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * Shrinks display type until scrollWidth fits the element's width.
 * Headings should be block-level and width-constrained (w-full min-w-0).
 */
export function FitText<T extends ElementType = "div">({ as, children, className, ...props }: FitTextProps<T>) {
  const Comp = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const run = () => fitElement(el);
    run();
    const ro = new ResizeObserver(run);
    ro.observe(el);
    if (el.parentElement) ro.observe(el.parentElement);
    void document.fonts?.ready?.then(run);
    window.addEventListener("resize", run);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", run);
    };
  }, [children]);

  return (
    <Comp
      {...props}
      ref={ref}
      data-fit-text=""
      className={cn("block w-full min-w-0 max-w-full break-words", className)}
    >
      {children}
    </Comp>
  );
}
