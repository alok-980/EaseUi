import React, { useEffect, useRef } from "react";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { cn } from "@/libs/utils";
import { entranceAnimations } from "@/libs/animations/entranceAnimation";

const layoutVariants = cva(`grid w-full`, {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
      5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-5",
      6: "grid-cols-1 sm:grid-cols-3 md:grid-cols-6",
      12: "grid-cols-12",
    },
    gap: {
      none: "gap-0",
      sm: "gap-2",
      default: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
  },
  defaultVariants: {
    cols: 3,
    gap: "default",
    align: "stretch",
    justify: "start",
  },
});

interface LayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof layoutVariants> {
  animation?: keyof typeof entranceAnimations;
  stagger?: boolean;
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  (
    {
      className,
      cols,
      gap,
      align,
      justify,
      animation = "fadeIn",
      stagger = false,
      children,
      ...props
    },
    ref
  ) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const el = wrapperRef.current;
      if (!el || animation === "none") return;

      if (stagger) {
        const items = Array.from(el.children) as HTMLElement[];
        items.forEach((item, index) => {
          setTimeout(() => {
            entranceAnimations[animation]?.(item);
          }, index * 80);
        });
      } else {
        entranceAnimations[animation]?.(el);
      }
    }, [animation, stagger]);

    return (
      <div
        ref={(node) => {
          wrapperRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
        }}
        className={cn(layoutVariants({ cols, gap, align, justify, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Layout.displayName = "Layout";
export { Layout, layoutVariants };