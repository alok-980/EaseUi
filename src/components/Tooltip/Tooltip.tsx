import { Slot } from "@radix-ui/react-slot";
import React, { useEffect, useRef, useState } from "react";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { cn } from "@/libs/utils";
import gsap from "gsap";
import { entranceAnimations } from "@/libs/animations/entranceAnimation";
import { hoverAnimations } from "@/libs/animations/hoverAnimation";

interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
  VariantProps<typeof tooltipVariants> {
  asChild?: boolean;
  content: React.ReactNode;
  animation?: keyof typeof entranceAnimations;
  hoverAnimation?: keyof typeof hoverAnimations;
}

const tooltipVariants = cva(
  `absolute z-50 whitespace-nowrap rounded-md text-xs font-medium px-3 py-1.5 pointer-events-none shadow-md`,
  {
    variants: {
      variant: {
        dark: "bg-slate-900 text-white",
        primary: "bg-indigo-600 text-white",
        secondary: "bg-indigo-500 text-white",
        destructive: "bg-red-700 text-white",
        ok: "bg-green-500 text-white",
        ghost: "bg-gray-50 text-gray-700 border border-gray-200",
        light: "bg-white text-gray-700 border border-gray-200",
      },
      side: {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
      },
    },
    defaultVariants: {
      variant: "dark",
      side: "top",
    },
  }
);

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      className,
      variant,
      side,
      asChild = false,
      content,
      animation = "fadeIn",
      hoverAnimation = "none",
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const el = tooltipRef.current;
      if (!el || !visible || animation === "none") return;
      entranceAnimations[animation]?.(el);
    }, [visible, animation]);

    const handleMouseEnter = () => {
      setVisible(true);
      const el = tooltipRef.current;
      if (!el) return;
      hoverAnimations[hoverAnimation]?.(el);
    };

    const handleMouseLeave = () => {
      const el = tooltipRef.current;
      if (!el) return;
      gsap.to(el, {
        opacity: 0,
        scale: 0.95,
        duration: 0.15,
        onComplete: () => setVisible(false),
      });
    };

    const handleMouseDown = () => {
      gsap.to(tooltipRef.current, { scale: 0.95, duration: 0.1 });
    };

    const handleMouseUp = () => {
      gsap.to(tooltipRef.current, {
        scale: 1,
        duration: 0.15,
        ease: "back.out(2)",
      });
    };

    return (
      <Comp
        ref={(node) => {
          wrapperRef.current = node as HTMLDivElement;
          if (typeof ref === "function") ref(node as HTMLDivElement);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
        }}
        className="relative inline-flex"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        {...props}
      >
        {children}
        {visible && (
          <span
            ref={tooltipRef}
            className={cn(tooltipVariants({ variant, side, className }))}
          >
            {content}
          </span>
        )}
      </Comp>
    );
  }
);
Tooltip.displayName = "Tooltip";
export { Tooltip, tooltipVariants };