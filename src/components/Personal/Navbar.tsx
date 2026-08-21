import { toggleTheme } from "@/features/ThemeSlice";
import { Moon, Search, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { mode } = useSelector(
    (state: { theme: { mode: string } }) => state.theme
  );
  console.log("this is theme->", mode);

  const pages = [
    "Components",
    "About",
    "Templates"
  ]

  return (
    <nav className="sticky top-0 z-10 bg-[var(--bg-color)] h-16 w-full flex items-center justify-between px-8">
      <div className="flex items-center gap-10">
        <h1
          onClick={() => navigate("/")}
          className="font-bold text-2xl cursor-pointer"
        >
          EaseUi
        </h1>

        <div className="hidden sm:flex items-center bg-transparent rounded-md px-3 py-1.5 shadow-xs shadow-gray-300 border border-gray-200">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search components"
            className="ml-2 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      <ul className="hidden md:flex items-center gap-6 text-gray-400">
        {
          pages.map((path, i) => (
            <li
              key={i}
              onClick={() => navigate(`${path.toLowerCase()}`)}
              className={`${location.pathname.startsWith(`/${path.toLowerCase()}`) ? "text-blue-500 font-bold" : "text-gray-400"} cursor-pointer hover:text-gray-600 flex flex-col gap-1`}
            >
              {`${path}`}
              {
                location.pathname.startsWith(`/${path.toLowerCase()}`) && <hr className="border border-[2px] rounded-lg" />
              }
            </li>
          ))
        }

        {mode === "dark" && (
          <li
            className="cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => dispatch(toggleTheme())}
          >
            <Sun size={20} className="text-yellow-400" />
          </li>
        )}
        {mode === "light" && (
          <li
            className="cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => dispatch(toggleTheme())}
          >
            <Moon size={20} className="text-gray-600 dark:text-gray-400" />
          </li>
        )}
      </ul>

      {/* Mobile Hamburger */}
      <button className="md:hidden text-gray-700">☰</button>
    </nav>
  );
};

export default Navbar;
