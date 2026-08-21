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
    <div className="max-w-4xl mx-auto p-6 space-y-16">
      {/* ---------- HEADER ---------- */}
      <div ref={headerRef}>
        <p className="about-item inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[var(--primary-color)] bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-color)]" />
          ABOUT THE KIT
        </p>
        <h1
          className="about-item text-4xl font-bold tracking-tight leading-[1.1]"
          style={{ color: "var(--text-color)" }}
        >
          Every piece ships with its own motion, its own variants, and its own reasons for existing.
        </h1>

        <div className="about-item flex flex-wrap gap-10 mt-10 pt-8 border-t border-gray-200">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-[var(--text-color)]">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- SIGNATURE / DIAGRAM ---------- */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--primary-color)]">
          How a component is built
        </h2>
        <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100 bg-gray-50">
            <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
            <span className="ml-3 text-xs font-mono text-gray-400">Button.tsx</span>
          </div>
          <div className="p-10 flex flex-col items-center gap-6">
            <Button variant="primary" size="lg" hoverAnimation="jiggle">
              Hover me
            </Button>
            <div className="flex flex-wrap gap-6 text-xs font-mono text-gray-500 justify-center">
              <span className="text-[var(--primary-color)]">variant: primary</span>
              <span>hoverAnimation: jiggle</span>
              <span>size: lg</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- MATERIALS ---------- */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--primary-color)]">
          Materials
        </h2>
        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
          {materials.map((m) => (
            <div
              key={m.name}
              className="flex items-baseline gap-3 border-b border-gray-200 pb-3 transition-colors hover:border-[var(--primary-color)]"
            >
              <span className="w-2 h-2 shrink-0 rounded-full bg-[var(--primary-color)]" />
              <span className="text-gray-800 font-medium">{m.name}</span>
              <span className="text-xs text-gray-500 font-mono ml-auto">
                {m.note}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- PRINCIPLES ---------- */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--primary-color)]">
          Principles
        </h2>
        <div className="space-y-8">
          {principles.map((p, i) => (
            <div
              key={p.title}
              className="grid grid-cols-[2.5rem_1fr] gap-4 rounded-lg p-3 -mx-3 transition-colors hover:bg-gray-50"
            >
              <span className="font-mono text-gray-400 text-sm">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {p.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- FOOTER / STATUS ---------- */}
      <section className="pt-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6">
          <div>
            <p className="text-xs font-mono text-gray-400 mb-2">
              CURRENTLY ON THE BENCH
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 max-w-md">
              Next up: a Modal and a Command Palette.
            </h3>
          </div>
          <Button onClick={() => navigate('/components')} variant="outline" size="lg">
            View components
          </Button>
        </div>
      </section>
    </div>
  )
}

export default AboutPage