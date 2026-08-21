import { useEffect, useRef } from "react";
import { Button } from "@/components/Button";
import { Tooltip } from "@/components/Tooltip";
import { Layout } from "@/components/Layout";
import { Carousel } from "@/components/Carousel";
import gsap from "gsap";
import { useNavigate } from "react-router";

type Props = {};

const features = [
  {
    title: "Motion-first API",
    description: "Every component ships with animation and hoverAnimation props — motion is a decision, not an afterthought.",
  },
  {
    title: "Variant-driven",
    description: "Built on class-variance-authority, so intent stays readable: primary, destructive, ghost — not bg-blue-600.",
  },
  {
    title: "Fully composable",
    description: "asChild + Radix Slot let any component wrap any element without losing its behavior.",
  },
  {
    title: "Typed end to end",
    description: "Every prop, variant and animation key is inferred — no guessing, no any.",
  },
  {
    title: "Accessible by default",
    description: "Focus-visible rings, disabled states and keyboard interaction are handled, not bolted on.",
  },
  {
    title: "Lightweight",
    description: "Tailwind + a handful of dependencies. No runtime CSS-in-JS tax.",
  },
];

const builtWith = ["React", "TypeScript", "Tailwind CSS", "GSAP", "Radix UI", "CVA"];

const HomePage = ({ }: Props) => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const items = el.querySelectorAll(".hero-item");
    gsap.fromTo(
      items,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12 }
    );
  }, []);

  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden">
        {/* background: grid + glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse 60% 60% at 50% 0%, black 40%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 0%, black 40%, transparent 100%)",
            }}
          />
          <div className="absolute top-[-10rem] left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-[var(--primary-color)] opacity-[0.12] blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
          <div ref={heroRef} className="space-y-6">
            <p className="hero-item inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[var(--primary-color)] bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-color)] animate-pulse" />
              REACT · TYPESCRIPT · GSAP
            </p>

            <h1
              className="hero-item text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05]"
              style={{ color: "var(--text-color)" }}
            >
              Interfaces that move
              <br />
              with{" "}
              <span className="text-[var(--primary-color)] italic">intention</span>.
            </h1>

            <p className="hero-item text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
              easeUI is a component kit where animation isn&apos;t decoration —
              every button, tooltip and layout ships with motion built in,
              ready to compose into your product.
            </p>

            <div className="hero-item flex items-center justify-center gap-3 pt-2">
              <Button onClick={() => navigate("/components")} variant="primary" size="lg">
                Browse Components
              </Button>
              <Button variant="outline" size="lg">
                View on GitHub
              </Button>
            </div>

            <p className="hero-item text-xs text-gray-400 pt-1">
              Open source · MIT licensed · no sign-up required
            </p>
          </div>

          {/* Live demo canvas — browser-style glass panel */}
          <div className="hero-item mt-16 rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-md shadow-xl shadow-gray-200/50 overflow-hidden text-left">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100 bg-gray-50/80">
              <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
              <span className="ml-3 text-xs font-mono text-gray-400">
                live-preview.tsx
              </span>
            </div>

            <div className="p-10">
              <p className="text-xs font-mono text-gray-400 mb-8">
                hover / click anything below
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button variant="primary" hoverAnimation="jiggle">
                  Primary
                </Button>
                <Button variant="secondary" hoverAnimation="bounce">
                  Secondary
                </Button>
                <Button variant="destructive" hoverAnimation="scale">
                  Destructive
                </Button>
                <Tooltip content="Tooltips animate in too" variant="dark" side="top" animation="fadeIn">
                  <Button variant="ghost">Hover for tooltip</Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center max-w-lg mx-auto mb-12 space-y-2">
          <p className="text-xs font-mono tracking-[0.2em] text-[var(--primary-color)]">
            WHY EASEUI
          </p>
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ color: "var(--text-color)" }}
          >
            Built to feel, not just to work
          </h2>
          <p className="text-gray-600">
            Small enough to read in an afternoon, opinionated enough to save you weeks.
          </p>
        </div>

        <Layout cols={3} gap="lg" animation="fadeIn" stagger>
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-lg border border-gray-200 bg-white p-6 space-y-3 transition-all hover:border-[var(--primary-color)] hover:shadow-md hover:-translate-y-0.5"
            >
              <span className="block w-2 h-2 rounded-full bg-[var(--primary-color)]" />
              <h3 className="font-semibold text-gray-900">{f.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </Layout>
      </section>

      {/* ---------- MOTION SHOWCASE ---------- */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center max-w-lg mx-auto mb-10 space-y-2">
          <p className="text-xs font-mono tracking-[0.2em] text-[var(--primary-color)]">
            MOTION
          </p>
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ color: "var(--text-color)" }}
          >
            See it in motion
          </h2>
          <p className="text-gray-600">
            Same component, three entrance animations — pick what fits.
          </p>
        </div>

        <Carousel
          variant="light"
          size="default"
          animation="fadeIn"
          autoPlay
          interval={2800}
          slides={[
            <div key="1" className="flex flex-col items-center gap-3">
              <span className="text-xs font-mono text-gray-400">animation=&quot;fadeIn&quot;</span>
              <Button variant="primary" size="lg">Fade In</Button>
            </div>,
            <div key="2" className="flex flex-col items-center gap-3">
              <span className="text-xs font-mono text-gray-400">animation=&quot;bounceIn&quot;</span>
              <Button variant="secondary" size="lg">Bounce In</Button>
            </div>,
            <div key="3" className="flex flex-col items-center gap-3">
              <span className="text-xs font-mono text-gray-400">animation=&quot;slideUp&quot;</span>
              <Button variant="dark" size="lg">Slide Up</Button>
            </div>,
          ]}
        />
      </section>

      {/* ---------- BUILT WITH ---------- */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-center text-xs font-mono tracking-[0.2em] text-gray-400 mb-6">
          BUILT WITH
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {builtWith.map((tool) => (
            <span
              key={tool}
              className="text-sm text-gray-700 bg-gray-100 border border-gray-200 px-4 py-1.5 rounded-full transition-colors hover:bg-gray-200"
            >
              {tool}
            </span>
          ))}
        </div>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section className="relative overflow-hidden bg-[var(--primary-color)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 py-16 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Start building with easeUI
          </h2>
          <p className="text-indigo-100 max-w-md mx-auto">
            Drop a component in, wire up a variant, and let the motion do the rest.
          </p>
          <Button onClick={() => navigate("/components")} variant="dark" size="lg">
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;