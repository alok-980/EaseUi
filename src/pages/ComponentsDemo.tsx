import { useState } from "react";
import { Code } from "lucide-react";
import CodeBlock from "@/components/Personal/CodeBlock";

interface ComponentDemoProps {
  children?: React.ReactNode;
  code: string;
  showCode?: boolean;
}

const ComponentDemo = ({ children, code }: ComponentDemoProps) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  console.log("code visibale: ", isCodeVisible)

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-[var(--bg-main-2)]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-[var(--bg-main)] text-[var(--text-main)]">
        <span className="text-sm font-medium">Preview</span>
        <button
          onClick={() => setIsCodeVisible(!isCodeVisible)}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-[var(--bg-button)] hover:bg-[var(--bg-button-hover)] rounded transition-colors cursor-pointer"
        >
          <Code size={14} />
          {isCodeVisible ? "Hide Code" : "View Code"}
        </button>
      </div>

      <div className="py-20 px-4 flex items-center justify-center gap-4">{children}</div>

      {isCodeVisible && (
        <div className="">
          <CodeBlock code={code} />
        </div>
      )}
    </div>
  );
};

export default ComponentDemo;
