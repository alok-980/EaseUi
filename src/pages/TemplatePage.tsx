import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components'
import gsap from 'gsap'
import { useNavigate } from 'react-router'

type Props = {}

type LayoutKind = "landing" | "dashboard" | "pricing" | "auth" | "grid" | "article";

interface TemplateItem {
  slug: string;
  name: string;
  category: string;
  description: string;
  accent: string;
  layout: LayoutKind;
}

const templates: TemplateItem[] = [
  {
    slug: "saas-landing",
    name: "SaaS Landing",
    category: "Marketing",
    description: "Hero, feature grid, pricing aur CTA section — product launch ke liye ready.",
    accent: "bg-indigo-500",
    layout: "landing",
  },
  {
    slug: "admin-dashboard",
    name: "Admin Dashboard",
    category: "App",
    description: "Sidebar navigation, stat cards aur data table layout.",
    accent: "bg-slate-700",
    layout: "dashboard",
  },
  {
    slug: "pricing-page",
    name: "Pricing Page",
    category: "Marketing",
    description: "3-tier pricing cards with toggle for monthly/yearly billing.",
    accent: "bg-green-500",
    layout: "pricing",
  },
  {
    slug: "auth-screens",
    name: "Auth Screens",
    category: "Utility",
    description: "Login, signup aur forgot-password — centered card layout.",
    accent: "bg-red-500",
    layout: "auth",
  },
  {
    slug: "portfolio",
    name: "Portfolio",
    category: "Personal",
    description: "Grid-based project showcase with about aur contact section.",
    accent: "bg-amber-500",
    layout: "grid",
  },
  {
    slug: "blog-docs",
    name: "Blog / Docs",
    category: "Content",
    description: "Sidebar table-of-contents ke saath readable article layout.",
    accent: "bg-cyan-600",
    layout: "article",
  },
];

const categories = ["All", ...Array.from(new Set(templates.map((t) => t.category)))];

/** Small card-size mockup shown in the grid */
const TemplateMockPreview = ({ layout, accent }: { layout: LayoutKind; accent: string }) => {
  const blockCountByLayout: Record<LayoutKind, number> = {
    landing: 4,
    dashboard: 3,
    pricing: 3,
    auth: 1,
    grid: 4,
    article: 3,
  };
  const blocks = blockCountByLayout[layout];

  return (
    <div className="w-full h-40 rounded-t-lg bg-gray-50 border-b border-gray-200 p-3 flex flex-col gap-2 overflow-hidden transition-transform duration-300 group-hover:scale-[1.03]">
      <div className={`h-3 w-1/3 rounded ${accent} opacity-80`} />
      <div className="h-2 w-1/2 rounded bg-gray-200" />
      <div className="flex-1 grid gap-2" style={{ gridTemplateColumns: `repeat(${blocks}, 1fr)` }}>
        {Array.from({ length: blocks }).map((_, i) => (
          <div key={i} className="rounded bg-white border border-gray-200" />
        ))}
      </div>
    </div>
  );
};

/** Bigger, layout-aware mockup shown inside the Preview modal */
const TemplateFullPreview = ({ layout, accent }: { layout: LayoutKind; accent: string }) => {
  if (layout === "landing") {
    return (
      <div className="space-y-3">
        <div className="h-8 rounded bg-gray-100 flex items-center px-3 gap-2">
          <span className={`w-2 h-2 rounded-full ${accent}`} />
          <span className="h-2 w-16 rounded bg-gray-300" />
        </div>
        <div className="h-28 rounded-lg bg-gray-50 border border-gray-200 flex flex-col items-center justify-center gap-2">
          <span className="h-3 w-1/3 rounded bg-gray-300" />
          <span className="h-2 w-1/2 rounded bg-gray-200" />
          <span className={`h-6 w-20 rounded ${accent} opacity-80`} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 rounded-lg bg-white border border-gray-200" />
          ))}
        </div>
        <div className="h-10 rounded-lg bg-gray-100" />
      </div>
    );
  }

  if (layout === "dashboard") {
    return (
      <div className="flex gap-3 h-64">
        <div className="w-1/4 rounded-lg bg-gray-100 space-y-2 p-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-2.5 rounded bg-gray-300" />
          ))}
        </div>
        <div className="flex-1 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={`h-14 rounded-lg border border-gray-200 flex items-end p-2`}>
                <span className={`h-2 w-8 rounded ${accent} opacity-70`} />
              </div>
            ))}
          </div>
          <div className="h-32 rounded-lg bg-gray-50 border border-gray-200" />
        </div>
      </div>
    );
  }

  if (layout === "pricing") {
    return (
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={`rounded-lg border p-4 space-y-3 ${i === 1 ? "border-2 border-[var(--primary-color)]" : "border-gray-200"
              }`}
          >
            <span className="h-2 w-12 rounded bg-gray-300 block" />
            <span className="h-5 w-16 rounded bg-gray-800 block" />
            <div className="space-y-1.5 pt-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <span key={j} className="h-1.5 w-full rounded bg-gray-200 block" />
              ))}
            </div>
            <span className={`h-6 w-full rounded ${accent} opacity-80 block`} />
          </div>
        ))}
      </div>
    );
  }

  if (layout === "auth") {
    return (
      <div className="flex justify-center py-8">
        <div className="w-64 rounded-lg border border-gray-200 p-5 space-y-3">
          <span className="h-3 w-1/2 rounded bg-gray-300 block mx-auto" />
          <span className="h-8 w-full rounded bg-gray-100 block" />
          <span className="h-8 w-full rounded bg-gray-100 block" />
          <span className={`h-8 w-full rounded ${accent} opacity-80 block`} />
        </div>
      </div>
    );
  }

  if (layout === "grid") {
    return (
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-lg bg-gray-50 border border-gray-200" />
        ))}
      </div>
    );
  }

  // article
  return (
    <div className="flex gap-4">
      <div className="w-1/4 space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="h-2 w-full rounded bg-gray-200 block" />
        ))}
      </div>
      <div className="flex-1 space-y-2">
        <span className="h-3 w-1/2 rounded bg-gray-300 block" />
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="h-2 w-full rounded bg-gray-100 block" />
        ))}
      </div>
    </div>
  );
};

const TemplatePage = (props: Props) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const items = el.querySelectorAll(".header-item");
    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1 }
    );
  }, []);

  const filteredTemplates =
    activeCategory === "All"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  const handleUseTemplate = (template: TemplateItem) => {
    navigate(`/templates/${template.slug}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      {/* ---------- HEADER ---------- */}
      <div ref={headerRef}>
        <p className="header-item inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[var(--primary-color)] bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-color)]" />
          {templates.length} TEMPLATES
        </p>
        <h1
          className="header-item text-4xl font-bold tracking-tight"
          style={{ color: "var(--text-color)" }}
        >
          Templates
        </h1>
        <p className="header-item text-lg text-gray-600 max-w-xl mt-2 leading-relaxed">
          Ready-made page layouts built with easeUI components — copy, customize, ship.
        </p>

        <div className="header-item flex flex-wrap gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm px-4 py-1.5 rounded-full border transition-colors cursor-pointer ${activeCategory === cat
                  ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ---------- TEMPLATE GRID ---------- */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.slug}
              className="group rounded-lg border border-gray-200 overflow-hidden bg-white transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/60 hover:-translate-y-1 hover:border-[var(--primary-color)]"
            >
              <button
                type="button"
                onClick={() => setPreviewTemplate(template)}
                className="w-full text-left cursor-pointer"
              >
                <TemplateMockPreview layout={template.layout} accent={template.accent} />
              </button>

              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {template.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {template.description}
                </p>
                <div className="flex gap-2 pt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPreviewTemplate(template)}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUseTemplate(template)}
                  >
                    Use Template
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm">
            No templates in this category yet.
          </div>
        )}
      </section>

      {/* ---------- PREVIEW MODAL ---------- */}
      {previewTemplate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
          onClick={() => setPreviewTemplate(null)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h3 className="font-semibold text-gray-900">{previewTemplate.name}</h3>
                <span className="text-xs text-gray-500">{previewTemplate.category}</span>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="text-gray-400 hover:text-gray-700 text-xl leading-none cursor-pointer"
                aria-label="Close preview"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              <TemplateFullPreview layout={previewTemplate.layout} accent={previewTemplate.accent} />
              <p className="text-sm text-gray-600 leading-relaxed">
                {previewTemplate.description}
              </p>
            </div>

            <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-200">
              <Button variant="outline" size="sm" onClick={() => setPreviewTemplate(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleUseTemplate(previewTemplate)}
              >
                Use Template
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TemplatePage