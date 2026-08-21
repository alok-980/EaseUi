import { Tooltip } from '../../components/Tooltip/index'
import ComponentDemo from '../ComponentsDemo'
import PropsTable from '@/components/Personal/PropsTable'
import { Button } from '@/components'

const TooltipPage = () => {
  const basicUsageCode = `
import { Tooltip } from "@/components/Tooltip/Tooltip"

<Tooltip content="Primary tooltip" variant="primary" side="top" animation="fadeIn">
  <Button variant="primary" size="sm">Hover me</Button>
</Tooltip>
<Tooltip content="Secondary tooltip" variant="secondary" side="bottom" animation="scaleIn">
  <Button variant="secondary" size="sm">Hover me</Button>
</Tooltip>
<Tooltip content="Destructive tooltip" variant="destructive" side="right" animation="slideUp">
  <Button variant="destructive" size="sm">Hover me</Button>
</Tooltip>
<Tooltip content="Dark tooltip" variant="dark" side="left" animation="bounceIn">
  <Button variant="dark" size="sm">Hover me</Button>
</Tooltip>`;

  const propsData = [
    {
      prop: "content",
      type: "React.ReactNode",
      default: "—",
      description: "The text/content shown inside the tooltip",
    },
    {
      prop: "variant",
      type: '"primary" | "secondary" | "outline" | "destructive" | "ghost" | "dark" | "ok" | "light"',
      default: '"dark"',
      description: "The visual style variant of the tooltip",
    },
    {
      prop: "side",
      type: '"top" | "bottom" | "left" | "right"',
      default: '"top"',
      description: "Position of the tooltip relative to the trigger element",
    },
    {
      prop: "animation",
      type: '"fadeIn" | "scaleIn" | "slideUp" | "bounceIn" | "none"',
      default: '"fadeIn"',
      description: "Animation when tooltip appears on hover",
    },
    {
      prop: "hoverAnimation",
      type: '"jiggle" | "scale" | "bounce" | "none"',
      default: '"none"',
      description: "Extra hover animation applied to tooltip element",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <header className="space-y-2">
        <p
          className="text-4xl font-bold tracking-tight"
          style={{ color: "var(--text-color)" }}
        >
          Tooltip
        </p>
        <p className="text-lg text-gray-600">
          A tooltip is a small pop-up box that appears when you move your mouse cursor over an item on a screen.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--primary-color)]">Usage</h2>
        <ComponentDemo code={basicUsageCode}>
          <Tooltip content="Primary tooltip" variant="primary" side="top" animation="fadeIn">
            <Button variant="primary" size="sm">Hover me</Button>
          </Tooltip>
          <Tooltip content="Secondary tooltip" variant="secondary" side="bottom" animation="scaleIn">
            <Button variant="secondary" size="sm">Hover me</Button>
          </Tooltip>
          <Tooltip content="Destructive tooltip" variant="destructive" side="right" animation="slideUp">
            <Button variant="destructive" size="sm">Hover me</Button>
          </Tooltip>
          <Tooltip content="Dark tooltip" variant="dark" side="left" animation="bounceIn">
            <Button variant="dark" size="sm">Hover me</Button>
          </Tooltip>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--primary-color)]">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  )
}

export default TooltipPage