import * as React from "react"

type HeadingProps = {
  children: React.ReactNode
  /** Tailwind text size classes, e.g. "text-4xl" */
  textSize?: string
  /** Extra custom classes */
  className?: string
  /** Which tag to render as (h1 by default) */
  as?: React.ElementType
}

export default function Heading({
  children,
  textSize = "text-6xl",
  className = "",
  as: Component = "h1",
}: HeadingProps) {
  return (
    <Component className={`text-primary font-extrabold tracking-tight ${textSize} ${className}`}>
      {children}
    </Component>
  )
}
