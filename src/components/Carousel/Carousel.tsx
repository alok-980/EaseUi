import React, { useEffect, useRef, useState } from "react";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { cn } from "@/libs/utils";
import gsap from "gsap";
import { entranceAnimations } from "@/libs/animations/entranceAnimation";
import { hoverAnimations } from "@/libs/animations/hoverAnimation";

const carouselVariants = cva(`relative w-full overflow-hidden rounded-lg`, {
  variants: {
    variant: {
      dark: "bg-slate-900",
      primary: "bg-indigo-600",
      secondary: "bg-indigo-500",
      ghost: "bg-gray-50",
      light: "bg-white border border-gray-200",
    },
    size: {
      default: "h-72",
      sm: "h-48",
      lg: "h-96",
      xl: "h-[28rem]",
      full: "h-full",
    },
  },
  defaultVariants: {
    variant: "light",
    size: "default",
  },
});

interface CarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
  VariantProps<typeof carouselVariants> {
  slides: React.ReactNode[];
  animation?: keyof typeof entranceAnimations;
  hoverAnimation?: keyof typeof hoverAnimations;
  autoPlay?: boolean;
  interval?: number;
  loop?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      className,
      variant,
      size,
      slides,
      animation = "fadeIn",
      hoverAnimation = "none",
      autoPlay = false,
      interval = 3000,
      loop = true,
      showArrows = true,
      showDots = true,
      ...props
    },
    ref
  ) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const leftArrowRef = useRef<HTMLButtonElement | null>(null);
    const rightArrowRef = useRef<HTMLButtonElement | null>(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const slideCount = slides.length;
    const isFirst = activeIndex === 0;
    const isLast = activeIndex === slideCount - 1;

    // Mount animation
    useEffect(() => {
      const el = wrapperRef.current;
      if (!el || animation === "none") return;
      entranceAnimations[animation]?.(el);
    }, [animation]);

    // Slide transition — shift by (100 / slideCount)% per index, not by full track width
    useEffect(() => {
      const el = trackRef.current;
      if (!el) return;
      const shiftPercent = (100 / slideCount) * activeIndex;
      gsap.to(el, {
        xPercent: -shiftPercent,
        duration: 0.6,
        ease: "power3.inOut",
      });
    }, [activeIndex, slideCount]);

    // Autoplay — pauses on hover
    useEffect(() => {
      if (!autoPlay || isHovering) return;
      const timer = setInterval(() => {
        setActiveIndex((prev) => {
          if (prev === slideCount - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, interval);
      return () => clearInterval(timer);
    }, [autoPlay, interval, isHovering, loop, slideCount]);

    const goToNext = () => {
      setActiveIndex((prev) => {
        if (prev === slideCount - 1) return loop ? 0 : prev;
        return prev + 1;
      });
    };

    const goToPrev = () => {
      setActiveIndex((prev) => {
        if (prev === 0) return loop ? slideCount - 1 : prev;
        return prev - 1;
      });
    };

    const goToIndex = (index: number) => setActiveIndex(index);

    const handleArrowMouseEnter = (
      arrowRef: React.MutableRefObject<HTMLButtonElement | null>
    ) => {
      const el = arrowRef.current;
      if (!el) return;
      hoverAnimations[hoverAnimation]?.(el);
    };

    const handleArrowMouseLeave = (
      arrowRef: React.MutableRefObject<HTMLButtonElement | null>
    ) => {
      gsap.to(arrowRef.current, {
        scale: 1,
        rotation: 0,
        y: 0,
        duration: 0.3,
      });
    };

    const handleArrowMouseDown = (
      arrowRef: React.MutableRefObject<HTMLButtonElement | null>
    ) => {
      gsap.to(arrowRef.current, { scale: 0.85, duration: 0.1 });
    };

    const handleArrowMouseUp = (
      arrowRef: React.MutableRefObject<HTMLButtonElement | null>
    ) => {
      gsap.to(arrowRef.current, {
        scale: 1,
        duration: 0.15,
        ease: "back.out(2)",
      });
    };

    return (
      <div
        ref={(node) => {
          wrapperRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
        }}
        className={cn(carouselVariants({ variant, size, className }))}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        {...props}
      >
        <div
          ref={trackRef}
          className="flex h-full"
          style={{ width: `${slideCount * 100}%` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex h-full items-center justify-center shrink-0"
              style={{ width: `${100 / slideCount}%` }}
            >
              {slide}
            </div>
          ))}
        </div>

        {showArrows && slideCount > 1 && (
          <>
            <button
              ref={leftArrowRef}
              type="button"
              disabled={!loop && isFirst}
              onClick={goToPrev}
              onMouseEnter={() => handleArrowMouseEnter(leftArrowRef)}
              onMouseLeave={() => handleArrowMouseLeave(leftArrowRef)}
              onMouseDown={() => handleArrowMouseDown(leftArrowRef)}
              onMouseUp={() => handleArrowMouseUp(leftArrowRef)}
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md cursor-pointer transition-opacity",
                !loop && isFirst && "opacity-40 cursor-not-allowed"
              )}
            >
              ‹
            </button>
            <button
              ref={rightArrowRef}
              type="button"
              disabled={!loop && isLast}
              onClick={goToNext}
              onMouseEnter={() => handleArrowMouseEnter(rightArrowRef)}
              onMouseLeave={() => handleArrowMouseLeave(rightArrowRef)}
              onMouseDown={() => handleArrowMouseDown(rightArrowRef)}
              onMouseUp={() => handleArrowMouseUp(rightArrowRef)}
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md cursor-pointer transition-opacity",
                !loop && isLast && "opacity-40 cursor-not-allowed"
              )}
            >
              ›
            </button>
          </>
        )}

        {showDots && slideCount > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToIndex(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 cursor-pointer",
                  index === activeIndex ? "bg-white w-6" : "bg-white/50 w-2"
                )}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);
Carousel.displayName = "Carousel";
export { Carousel, carouselVariants };