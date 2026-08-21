import { Layout } from '@/components/Layout/index'
import ComponentDemo from '../ComponentsDemo'
import PropsTable from '@/components/Personal/PropsTable'

const LayoutPage = () => {
  const basicUsageCode = `
import { Layout } from "@/components/Layout/Layout"

<Layout cols={3} gap="default" animation="fadeIn" stagger>
  <div className="bg-indigo-100 rounded-md p-6 text-center">1</div>
  <div className="bg-indigo-100 rounded-md p-6 text-center">2</div>
  <div className="bg-indigo-100 rounded-md p-6 text-center">3</div>
  <div className="bg-indigo-100 rounded-md p-6 text-center">4</div>
  <div className="bg-indigo-100 rounded-md p-6 text-center">5</div>
  <div className="bg-indigo-100 rounded-md p-6 text-center">6</div>
</Layout>`;

  const propsData = [
    {
      prop: "cols",
      type: "1 | 2 | 3 | 4 | 5 | 6 | 12",
      default: "3",
      description: "Number of grid columns (responsive breakpoints built in)",
    },
    {
      prop: "gap",
      type: '"none" | "sm" | "default" | "lg" | "xl"',
      default: '"default"',
      description: "Spacing between grid items",
    },
    {
      prop: "align",
      type: '"start" | "center" | "end" | "stretch"',
      default: '"stretch"',
      description: "Vertical alignment of items within their row",
    },
    {
      prop: "justify",
      type: '"start" | "center" | "end" | "between"',
      default: '"start"',
      description: "Horizontal alignment of items within the grid",
    },
    {
      prop: "animation",
      type: '"fadeIn" | "scaleIn" | "slideUp" | "bounceIn" | "none"',
      default: '"fadeIn"',
      description: "Animation applied when the layout mounts",
    },
    {
      prop: "stagger",
      type: "boolean",
      default: "false",
      description: "Animate each grid item one-by-one instead of all at once",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <header className="space-y-2">
        <p
          className="text-4xl font-bold tracking-tight"
          style={{ color: "var(--text-color)" }}
        >
          Layout
        </p>
        <p className="text-lg text-gray-600">
          Layout is the structural arrangement of visual and interactive elements on a screen.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--primary-color)]">Usage</h2>
        <ComponentDemo code={basicUsageCode}>
          <Layout cols={3} gap="default" animation="fadeIn" stagger>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-indigo-100 text-indigo-700 font-medium rounded-md p-6 text-center"
              >
                {i + 1}
              </div>
            ))}
          </Layout>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--primary-color)]">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  )
}

export default LayoutPage