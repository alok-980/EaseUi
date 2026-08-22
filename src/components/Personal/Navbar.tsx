import { useState } from "react";
import { toggleTheme } from "@/features/ThemeSlice";
import { Moon, Search, Sun, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";

const GITHUB_URL = "https://github.com/alok-980";
const LINKEDIN_URL = "https://www.linkedin.com/in/alok-chauhan/";

const pages = ["Docs", "Components", "About", "Templates"];

interface IconProps {
  size?: number;
  className?: string;
}

const GithubIcon = ({ size = 18, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55v-1.94c-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.28 5.69.42.36.79 1.07.79 2.16v3.2c0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
  </svg>
);

const LinkedinIcon = ({ size = 18, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
  </svg>
);

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { mode } = useSelector(
    (state: { theme: { mode: string } }) => state.theme
  );

  const handleNavigate = (path: string) => {
    navigate(`${path.toLowerCase()}`);
    setMobileOpen(false);
  };

  const isActive = (path: string) =>
    location.pathname.startsWith(`/${path.toLowerCase()}`);

  return (
    <nav className="sticky top-0 z-20 bg-[var(--bg-color)]/90 backdrop-blur-md border-b border-gray-200 h-16 w-full flex items-center justify-between px-6 sm:px-8">
      <div className="flex items-center gap-10">
        <h1
          onClick={() => navigate("/")}
          className="font-bold text-2xl tracking-tight cursor-pointer"
          style={{ color: "var(--text-color)" }}
        >
          ease<span className="text-[var(--primary-color)]">UI</span>
        </h1>

        <div className="hidden sm:flex items-center bg-white rounded-md px-3 py-1.5 border border-gray-200 transition-colors focus-within:border-[var(--primary-color)]">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search components"
            className="ml-2 w-40 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
          />
          <span className="ml-2 text-[10px] font-mono text-gray-400 bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5">
            ⌘K
          </span>
        </div>
      </div>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        <ul className="flex items-center gap-6">
          {pages.map((path, i) => (
            <li
              key={i}
              onClick={() => handleNavigate(path)}
              className={`relative pb-1 text-sm cursor-pointer transition-colors ${isActive(path)
                ? "text-[var(--primary-color)] font-medium"
                : "text-gray-500 hover:text-gray-800"
                }`}
            >
              {path}
              {isActive(path) && (
                <span className="absolute left-0 -bottom-[1px] w-full h-[2px] rounded-full bg-[var(--primary-color)]" />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 border-l border-gray-200 pl-4">
          <button
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle theme"
            className="cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            {mode === "dark" ? (
              <Sun size={18} className="text-amber-400" />
            ) : (
              <Moon size={18} className="text-gray-500" />
            )}
          </button>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900"
          >
            <GithubIcon size={18} />
          </a>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900"
          >
            <LinkedinIcon size={18} />
          </a>
        </div>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-label="Toggle menu"
        className="md:hidden p-2 rounded-md hover:bg-gray-100 text-gray-700 cursor-pointer"
      >
        {mobileOpen ? <X size={20} /> : <span className="text-xl leading-none">☰</span>}
      </button>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full md:hidden bg-[var(--bg-color)] border-b border-gray-200 shadow-lg">
          <ul className="flex flex-col p-4 gap-1">
            {pages.map((path, i) => (
              <li
                key={i}
                onClick={() => handleNavigate(path)}
                className={`px-3 py-2.5 rounded-md text-sm cursor-pointer transition-colors ${isActive(path)
                  ? "bg-indigo-50 text-[var(--primary-color)] font-medium"
                  : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                {path}
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between px-4 py-4 border-t border-gray-200">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
            >
              {mode === "dark" ? (
                <Sun size={18} className="text-amber-400" />
              ) : (
                <Moon size={18} className="text-gray-500" />
              )}
              {mode === "dark" ? "Light mode" : "Dark mode"}
            </button>

            <div className="flex items-center gap-1">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <LinkedinIcon size={18} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;