import { useEffect, useRef } from 'react'
import { Button } from '@/components'
import gsap from 'gsap'
import { useNavigate } from 'react-router';

const materials = [
  { name: "React", note: "component runtime" },
  { name: "Radix Slot", note: "polymorphic composition" },
  { name: "class-variance-authority", note: "variant logic" },
  { name: "Tailwind CSS", note: "styling layer" },
  { name: "GSAP", note: "motion engine" },
];

const principles = [
  {
    title: "Every state is drawn, not assumed",
    body: "Hover, press, disabled, focus — each gets its own deliberate motion, not a CSS transition left to guess.",
  },
  {
    title: "Motion is a material, not a garnish",
    body: "Animation ships as a prop (animation, hoverAnimation), so it's chosen per use, never bolted on after.",
  },
  {
    title: "Variants describe intent, not just color",
    body: "primary, destructive, ghost — names read like decisions, so the API stays legible months later.",
  },
  {
    title: "Nothing is a black box",
    body: "Every component forwards its ref and spreads its props. It composes, it doesn't trap.",
  },
];

const stats = [
  { value: "6+", label: "components shipped" },
  { value: "0", label: "runtime CSS-in-JS deps" },
  { value: "100%", label: "typed API surface" },
];

const AboutPage = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const items = el.querySelectorAll(".about-item");
    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1 }
    );
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-20">
      {/* ---------- HEADER ---------- */}
      <div ref={headerRef}>
        <p className="about-item inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[var(--primary-color)] bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-color)]" />
          ABOUT THE KIT
        </p>
        <h1
          className="about-item text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] max-w-2xl"
          style={{ color: "var(--text-color)" }}
        >
          Every piece ships with its own motion, its own variants, and its own reasons for existing.
        </h1>

        <div className="about-item grid grid-cols-3 gap-4 mt-10">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-gray-200 bg-white p-5 text-center transition-colors hover:border-[var(--primary-color)]"
            >
              <p className="text-2xl sm:text-3xl font-bold text-[var(--primary-color)]">{s.value}</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- SIGNATURE / DIAGRAM ---------- */}
      <section className="space-y-4">
        <p className="text-xs font-mono tracking-[0.2em] text-[var(--primary-color)]">
          IN PRACTICE
        </p>
        <h2 className="text-2xl font-semibold" style={{ color: "var(--text-color)" }}>
          How a component is built
        </h2>
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100 bg-gray-50">
            <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
            <span className="ml-3 text-xs font-mono text-gray-400">Button.tsx</span>
          </div>
          <div className="p-10 flex flex-col items-center gap-6 bg-gradient-to-b from-gray-50/50 to-white">
            <Button variant="primary" size="lg" hoverAnimation="jiggle">
              Hover me
            </Button>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-gray-500 justify-center">
              <span className="text-[var(--primary-color)]">variant: primary</span>
              <span>hoverAnimation: jiggle</span>
              <span>size: lg</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- MATERIALS ---------- */}
      <section className="space-y-4">
        <p className="text-xs font-mono tracking-[0.2em] text-[var(--primary-color)]">
          UNDER THE HOOD
        </p>
        <h2 className="text-2xl font-semibold" style={{ color: "var(--text-color)" }}>
          Materials
        </h2>
        <div className="flex flex-wrap gap-3">
          {materials.map((m) => (
            <div
              key={m.name}
              className="flex items-center gap-2.5 rounded-full border border-gray-200 bg-white pl-2 pr-4 py-2 transition-colors hover:border-[var(--primary-color)]"
            >
              <span className="w-2 h-2 shrink-0 rounded-full bg-[var(--primary-color)] ml-1" />
              <span className="text-sm font-medium text-gray-800">{m.name}</span>
              <span className="text-xs text-gray-400 font-mono">{m.note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- PRINCIPLES ---------- */}
      <section className="space-y-4">
        <p className="text-xs font-mono tracking-[0.2em] text-[var(--primary-color)]">
          PHILOSOPHY
        </p>
        <h2 className="text-2xl font-semibold" style={{ color: "var(--text-color)" }}>
          Principles
        </h2>

        <div className="pt-4">
          {principles.map((p, i) => (
            <div key={p.title} className="relative">
              {i < principles.length - 1 && (
                <span className="hidden sm:block absolute left-[15px] top-10 bottom-[-2.5rem] w-px bg-gray-200" />
              )}
              <div className="flex gap-4 pb-10 last:pb-0">
                <span className="hidden sm:flex shrink-0 items-center justify-center w-8 h-8 rounded-full text-xs font-mono border-2 border-gray-300 text-gray-400 bg-white">
                  {i + 1}
                </span>
                <div className="flex-1 rounded-lg p-3 -mx-3 transition-colors hover:bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {p.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{p.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- FOOTER / STATUS ---------- */}
      <section className="relative overflow-hidden rounded-2xl bg-[var(--primary-color)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-6 p-8">
          <div>
            <p className="text-xs font-mono text-indigo-100 mb-2 tracking-[0.15em]">
              CURRENTLY ON THE BENCH
            </p>
            <h3 className="text-2xl font-semibold text-white max-w-md">
              Next up: a Modal and a Command Palette.
            </h3>
          </div>
          <Button
            onClick={() => navigate('/components')}
            variant="dark"
            size="lg"
          >
            View components
          </Button>
        </div>
      </section>
    </div>
  )
}

export default AboutPage