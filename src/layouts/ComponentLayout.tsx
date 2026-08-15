import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Menu, ChevronLeft } from "lucide-react";

type Props = {};

const ComponentLayout = ({ }: Props) => {
  const location = useLocation();
  console.log("this is a location of componentLayout: ", location);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  console.log("is sidebar opned: ", sidebarOpen)

  const components = [
    "Button",
    "Card",
    "Modal",
    "Input",
    "Navbar",
    "Carousel",
    "Tooltip",
    "Layout",
  ];

  return (
    <div className="flex min-h-screen text-gray-900">
      <aside
        className={`
          w-64 flex flex-col
          border-r border-gray-300
          fixed md:static top-0 left-0 h-full z-20
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out
          md:translate-x-0
          ${sidebarOpen && "bg-[var(--bg-color)]"}
        `}
      >
        <div className={`${sidebarOpen && "bg-[var(--bg-color)] flex gap-4 justify-between px-5 items-center"} border-b border-gray-300 mb-6 py-5`}>
          <h2 className="text-md font-bold text-[var(--text-color)]">Components</h2>
          <button
            className="md:hidden text-gray-700 cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {
              sidebarOpen && <ChevronLeft size={24} strokeWidth={2} />
            } 
          </button>
        </div>
        <ul className="flex flex-col gap-2 p-6">
          {components.map((item) => (
            <li
              onClick={() => navigate(item.toLowerCase())}
              key={item}
              className={`cursor-pointer hover:text-gray-600 text-md hover:translate-x-1 transition-all duration-200 ease-in-out ${location.pathname === `/components/${item.toLowerCase()}`
                ? "text-blue-500 font-bold"
                : "text-gray-400"
                }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>

      <div className="flex-1 ml-10 overflow-auto h-screen p-6">
        {
          !sidebarOpen && (
            <button
              className="md:hidden mb-4 text-gray-700 cursor-pointer"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={24} />
            </button>
          )
        }
        <Outlet />
      </div>
    </div>
  );
};

export default ComponentLayout;
