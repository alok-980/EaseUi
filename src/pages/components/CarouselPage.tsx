import { Carousel } from '@/components/Carousel/index'
import ComponentDemo from '../ComponentsDemo'
import PropsTable from '@/components/Personal/PropsTable'

const CarouselPage = () => {
  const basicUsageCode = `
import { Carousel } from "@/components/Carousel/Carousel"

<Carousel
  variant="light"
  size="default"
  animation="fadeIn"
  autoPlay
  interval={3000}
  slides={[
    <div className="text-2xl font-semibold">Slide 1</div>,
    <div className="text-2xl font-semibold">Slide 2</div>,
    <div className="text-2xl font-semibold">Slide 3</div>,
  ]}
/>`;

  const propsData = [
    {
      prop: "slides",
      type: "React.ReactNode[]",
      default: "—",
      description: "Array of items to render as individual slides",
    },
    {
      prop: "variant",
      type: '"primary" | "secondary" | "dark" | "ghost" | "light"',
      default: '"light"',
      description: "The visual style variant of the carousel background",
    },
    {
      prop: "size",
      type: '"sm" | "default" | "lg" | "xl" | "full"',
      default: '"default"',
      description: "Height of the carousel container",
    },
    {
      prop: "animation",
      type: '"fadeIn" | "scaleIn" | "slideUp" | "bounceIn" | "none"',
      default: '"fadeIn"',
      description: "Animation when carousel mounts",
    },
    {
      prop: "hoverAnimation",
      type: '"jiggle" | "scale" | "bounce" | "none"',
      default: '"none"',
      description: "Hover animation applied to arrow buttons",
    },
    {
      prop: "autoPlay",
      type: "boolean",
      default: "false",
      description: "Automatically cycle through slides",
    },
    {
      prop: "interval",
      type: "number",
      default: "3000",
      description: "Auto-play delay in milliseconds",
    },
    {
      prop: "showArrows",
      type: "boolean",
      default: "true",
      description: "Show previous/next navigation arrows",
    },
    {
      prop: "showDots",
      type: "boolean",
      default: "true",
      description: "Show dot indicators at the bottom",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <header className="space-y-2">
        <p
          className="text-4xl font-bold tracking-tight"
          style={{ color: "var(--text-color)" }}
        >
          Carousel
        </p>
        <p className="text-lg text-gray-600">
          Carousels show a collection of items that can be scrolled on and off the screen.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--primary-color)]">Usage</h2>
        <ComponentDemo code={basicUsageCode}>
          <Carousel
            variant="light"
            size="default"
            animation="fadeIn"
            autoPlay
            interval={3000}
            slides={[
              <div key="1" className="text-2xl font-semibold text-gray-800">
                Slide 1
              </div>,
              <div key="2" className="text-2xl font-semibold text-gray-800">
                Slide 2
              </div>,
              <div key="3" className="text-2xl font-semibold text-gray-800">
                Slide 3
              </div>,
            ]}
          />
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--primary-color)]">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  )
}

export default CarouselPage