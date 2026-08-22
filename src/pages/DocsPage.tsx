import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components'
import gsap from 'gsap'
import { useNavigate } from 'react-router'

interface CodeBlockProps {
    code: string;
    label?: string;
}

const CodeBlock = ({ code, label }: CodeBlockProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            setCopied(false);
        }
    };

    return (
        <div className="rounded-lg border border-gray-800 bg-gray-900 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800 bg-gray-800/60">
                <span className="text-xs font-mono text-gray-400">{label ?? "terminal"}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>
            <pre className="p-4 overflow-x-auto">
                <code className="text-sm font-mono text-gray-100 whitespace-pre">{code}</code>
            </pre>
        </div>
    );
};

const steps = [
    {
        id: "install",
        title: "Install the package",
        body: "easeUI is published on npm. Install it in your React project.",
        code: "npm install @devalokchauhan/dev-ease-ui-alok",
        label: "terminal",
    },
    {
        id: "tailwind",
        title: "Make sure Tailwind CSS is installed",
        body: "easeUI components are styled with Tailwind utility classes, so your project needs Tailwind set up first.",
        code: "npm install tailwindcss @tailwindcss/vite",
        label: "terminal",
    },
    {
        id: "vite-plugin",
        title: "Check the Tailwind plugin in Vite",
        body: "Make sure this is already in your vite.config.ts. If not, add it.",
        code: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})`,
        label: "vite.config.ts",
    },
    {
        id: "styles",
        title: "Import the styles",
        body: "In your global stylesheet (usually index.css), import Tailwind and then the easeUI stylesheet, in that order.",
        code: `@import "tailwindcss";

/* Import Dev Ease UI Styles */
@import "@devalokchauhan/dev-ease-ui-alok/style.css";`,
        label: "index.css",
    },
    {
        id: "usage",
        title: "Use the components",
        body: "Import whatever you need directly from the package and drop it into your JSX.",
        code: `import { Button, Card, Input } from '@devalokchauhan/dev-ease-ui-alok';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <Card className="max-w-md w-full p-6 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Account Setup
        </h2>
        <Input type="email" placeholder="Enter your email" label="Email Address" />
        <Button onClick={() => alert('Welcome aboard! 🚀')}>
          Get Started
        </Button>
      </Card>
    </div>
  );
}

export default App;`,
        label: "App.tsx",
    },
];

const DocsPage = () => {
    const headerRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(steps[0].id);

    useEffect(() => {
        const el = headerRef.current;
        if (!el) return;
        const items = el.querySelectorAll(".docs-item");
        gsap.fromTo(
            items,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1 }
        );
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveStep(entry.target.id);
                    }
                });
            },
            { rootMargin: "-20% 0px -70% 0px" }
        );

        steps.forEach((step) => {
            const el = document.getElementById(step.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToStep = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* ---------- HEADER ---------- */}
            <div ref={headerRef} className="max-w-2xl space-y-4 pb-16">
                <p className="docs-item inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[var(--primary-color)] bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-color)]" />
                    DOCUMENTATION
                </p>
                <h1
                    className="docs-item text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]"
                    style={{ color: "var(--text-color)" }}
                >
                    Get started in under 5 minutes.
                </h1>
                <p className="docs-item text-lg text-gray-600 leading-relaxed">
                    Install the package, wire up Tailwind, and start dropping in
                    pre-built, animated components — no extra config beyond this page.
                </p>
                <p className="docs-item text-sm text-gray-400 font-mono pt-1">
                    {steps.length} steps · ~5 min read
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[14rem_1fr] gap-12">
                {/* ---------- STICKY SIDEBAR TOC ---------- */}
                <aside className="hidden lg:block">
                    <div className="sticky top-8 space-y-1">
                        <p className="text-xs font-mono tracking-[0.15em] text-gray-400 mb-3">
                            ON THIS PAGE
                        </p>
                        {steps.map((step, i) => (
                            <button
                                key={step.id}
                                onClick={() => scrollToStep(step.id)}
                                className={`flex items-center gap-2.5 w-full text-left text-sm py-1.5 pl-3 border-l-2 transition-colors cursor-pointer ${activeStep === step.id
                                        ? "border-[var(--primary-color)] text-[var(--primary-color)] font-medium"
                                        : "border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-400"
                                    }`}
                            >
                                <span className="font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
                                {step.title}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* ---------- STEPS ---------- */}
                <section className="space-y-16 pb-20 max-w-2xl">
                    {steps.map((step, i) => (
                        <div key={step.id} id={step.id} className="relative scroll-mt-8">
                            {i < steps.length - 1 && (
                                <span className="hidden sm:block absolute left-[15px] top-10 bottom-[-4rem] w-px bg-gray-200" />
                            )}
                            <div className="flex gap-4">
                                <span
                                    className={`hidden sm:flex shrink-0 items-center justify-center w-8 h-8 rounded-full text-xs font-mono border-2 transition-colors ${activeStep === step.id
                                            ? "border-[var(--primary-color)] text-[var(--primary-color)] bg-indigo-50"
                                            : "border-gray-300 text-gray-400 bg-white"
                                        }`}
                                >
                                    {i + 1}
                                </span>
                                <div className="flex-1 space-y-3 min-w-0">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">{step.body}</p>
                                    </div>
                                    <CodeBlock code={step.code} label={step.label} />
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>

            {/* ---------- FOOTER / NEXT STEPS ---------- */}
            <section className="pt-4 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-8 pb-12">
                    <div>
                        <p className="text-xs font-mono text-gray-400 mb-2">
                            WHAT'S NEXT
                        </p>
                        <h3 className="text-2xl font-semibold text-gray-900 max-w-md">
                            Browse every component, its props and live demos.
                        </h3>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() =>
                                window.open(
                                    "https://www.npmjs.com/package/@devalokchauhan/dev-ease-ui-alok",
                                    "_blank"
                                )
                            }
                        >
                            View on npm
                        </Button>
                        <Button variant="primary" size="lg" onClick={() => navigate('/components')}>
                            Browse Components
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DocsPage