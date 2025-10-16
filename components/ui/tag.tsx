import * as React from "react"
import { cn } from "@/lib/utils"

const colorVariants: any = {
  gray: "bg-gray-100 text-gray-800 border border-gray-300",
  red: "bg-red-100 text-red-800 border border-red-300",
  green: "bg-green-100 text-green-800 border border-green-300",
  blue: "bg-blue-100 text-blue-800 border border-blue-300",
  orange: "bg-orange-100 text-orange-800 border border-orange-300",
  purple: "bg-purple-100 text-purple-800 border border-purple-300",
  cyan: "bg-cyan-100 text-cyan-800 border border-cyan-300",
  pink: "bg-pink-100 text-pink-800 border border-pink-300",
}

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: any
}

export function Tag({ color = "gray", className, children, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-sm font-medium rounded-md transition-colors",
        colorVariants[color] || colorVariants.gray,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
