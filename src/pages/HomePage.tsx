import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { Tooltip } from "@/components/Tooltip";
import { Layout } from "@/components/Layout";
import { Carousel } from "@/components/Carousel";
import gsap from "gsap";
import { useNavigate } from "react-router";

type Props = {};

const componentShowcase = [
  {
    name: "Button",
    description: "8 variants, 4 hover animations, one API.",
    route: "/components/button",
  },
  {
    name: "Tooltip",
    description: "Positioned on any side, animates in on hover.",
    route: "/components/tooltip",
  },
  {
    name: "Carousel",
    description: "Autoplay, arrows, dots — no extra config.",
    route: "/components/carousel",
  },
  {
    name: "Layout",
    description: "Responsive grid with staggered entrance.",
    route: "/components/layout",
  },
];

const whyPoints = [
  {
    title: "Motion is a prop, not a plugin",
    description: "animation and hoverAnimation ship on every component — no separate animation library to wire up.",
  },
  {
    title: "Variants read like decisions",
    description: "primary, destructive, ghost — not bg-blue-600. The API stays legible months later.",
  },
  {
    title: "Fully typed",
    description: "Every prop, variant and animation key is inferred. No guessing, no any.",
  },
  {
    title: "Composable, not trapped",
    description: "asChild + Radix Slot let any component wrap any element without losing its behavior.",
  },
];

const builtWith = ["React", "TypeScript", "Tailwind CSS", "GSAP", "Radix UI", "CVA"];

const InstallSnippet = () => {
  const [copied, setCopied] = useState(false);
  const command = "npm install @devalokchauhan/dev-ease-ui-alok";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="group flex items-center gap-3 w-full max-w-md mx-auto rounded-lg border border-gray-200 bg-white px-4 py-3 text-left transition-colors hover:border-[var(--primary-color)] cursor-pointer"
    >
      <span className="text-gray-400 font-mono text-sm">$</span>
      <span className="flex-1 font-mono text-sm text-gray-800 truncate">{command}</span>
      <span className="text-xs font-mono text-gray-400 group-hover:text-[var(--primary-color)]">
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
};

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
              <Button onClick={() => navigate("/docs")} variant="outline" size="lg">
                Get Started
              </Button>
            </div>

            <p className="hero-item text-xs text-gray-400 pt-1">
              Open source · MIT licensed · no sign-up required
            </p>
          </div>

          {/* Live demo canvas */}
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

          {/* Quick install */}
          <div className="hero-item mt-6">
            <InstallSnippet />
          </div>
        </div>
      </section>

      {/* ---------- COMPONENT SHOWCASE ---------- */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-mono tracking-[0.2em] text-[var(--primary-color)] mb-2">
              THE KIT
            </p>
            <h2
              className="text-3xl font-bold tracking-tight"
              style={{ color: "var(--text-color)" }}
            >
              What's inside
            </h2>
          </div>
          <button
            onClick={() => navigate("/components")}
            className="hidden sm:block text-sm font-medium text-[var(--primary-color)] hover:underline cursor-pointer"
          >
            View all →
          </button>
        </div>

        <Layout cols={4} gap="lg" animation="fadeIn" stagger>
          <div
            onClick={() => navigate("/components")}
            className="rounded-lg border border-gray-200 bg-white p-5 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:border-[var(--primary-color)] hover:shadow-md hover:-translate-y-0.5"
          >
            <Button variant="primary" size="sm" hoverAnimation="jiggle">
              Click
            </Button>
            <p className="text-sm font-semibold text-gray-900">Button</p>
          </div>

          <div
            onClick={() => navigate("/components")}
            className="rounded-lg border border-gray-200 bg-white p-5 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:border-[var(--primary-color)] hover:shadow-md hover:-translate-y-0.5"
          >
            <Tooltip content="Like this" variant="dark" side="top" animation="fadeIn">
              <Button variant="ghost" size="sm">
                Hover
              </Button>
            </Tooltip>
            <p className="text-sm font-semibold text-gray-900">Tooltip</p>
          </div>

          <div
            onClick={() => navigate("/components")}
            className="rounded-lg border border-gray-200 bg-white p-5 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:border-[var(--primary-color)] hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="w-full max-w-[7rem]">
              <Carousel
                variant="light"
                size="sm"
                animation="none"
                autoPlay
                interval={2000}
                showArrows={false}
                slides={[
                  <div key="1" className="text-xs font-mono text-gray-500">1</div>,
                  <div key="2" className="text-xs font-mono text-gray-500">2</div>,
                  <div key="3" className="text-xs font-mono text-gray-500">3</div>,
                ]}
              />
            </div>
            <p className="text-sm font-semibold text-gray-900">Carousel</p>
          </div>

          <div
            onClick={() => navigate("/components")}
            className="rounded-lg border border-gray-200 bg-white p-5 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:border-[var(--primary-color)] hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="grid grid-cols-2 gap-1 w-10">
              <span className="h-4 rounded-sm bg-indigo-200" />
              <span className="h-4 rounded-sm bg-indigo-300" />
              <span className="h-4 rounded-sm bg-indigo-300" />
              <span className="h-4 rounded-sm bg-indigo-200" />
            </div>
            <p className="text-sm font-semibold text-gray-900">Layout</p>
          </div>
        </Layout>

        <button
          onClick={() => navigate("/components")}
          className="sm:hidden mt-6 text-sm font-medium text-[var(--primary-color)] hover:underline cursor-pointer"
        >
          View all components →
        </button>
      </section>

      {/* ---------- CODE SNIPPET ---------- */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center max-w-lg mx-auto mb-10 space-y-2">
          <p className="text-xs font-mono tracking-[0.2em] text-[var(--primary-color)]">
            THE API
          </p>
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ color: "var(--text-color)" }}
          >
            Three lines to a working button
          </h2>
          <p className="text-gray-600">
            No theme provider, no config file. Import and go.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-900 overflow-hidden">
          <div className="flex items-center px-4 py-2.5 border-b border-gray-800 bg-gray-800/60">
            <span className="text-xs font-mono text-gray-400">App.tsx</span>
          </div>
          <pre className="p-5 overflow-x-auto">
            <code className="text-sm font-mono text-gray-100 whitespace-pre">
              {`import { Button } from '@devalokchauhan/dev-ease-ui-alok';

<Button variant="primary" hoverAnimation="jiggle">
  Get Started
</Button>`}
            </code>
          </pre>
        </div>
      </section>

      {/* ---------- WHY EASEUI ---------- */}
      <section className="max-w-4xl mx-auto px-6 py-16">
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
        </div>

        <Layout cols={2} gap="lg" animation="fadeIn" stagger>
          {whyPoints.map((f) => (
            <div
              key={f.title}
              className="rounded-lg border border-gray-200 bg-white p-6 space-y-2 transition-all hover:border-[var(--primary-color)] hover:shadow-md"
            >
              <h3 className="font-semibold text-gray-900">{f.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </Layout>
      </section>

      {/* ---------- BUILT WITH ---------- */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
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
          <div className="flex items-center justify-center gap-3">
            <Button onClick={() => navigate("/docs")} variant="dark" size="lg">
              Get Started
            </Button>
            <Button
              onClick={() => navigate("/components")}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[var(--primary-color)] bg-transparent"
            >
              Browse Components
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;