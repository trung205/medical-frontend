// components/ui/tag-item.tsx

import * as React from "react"
import { cn } from "@/lib/utils"

interface TagItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  children: React.ReactNode
  colorClass: string // Ví dụ: "bg-blue-500 hover:bg-blue-600"
  selected?: boolean
  onSelect?: (value: any) => void
  value: any
}

export const TagItem = React.forwardRef<HTMLDivElement, TagItemProps>(
  ({ children, colorClass, selected, onSelect, value, className, ...props }, ref) => {
    
    // Xử lý logic màu sắc khi được chọn
    const selectedClasses = selected
      ? cn(colorClass, "border-2 border-primary ring-2 ring-primary ring-offset-2 text-white")
      : cn(colorClass.replace("-500", "-100").replace("-600", "-200"), "text-gray-800")
      
    // Đảo ngược màu sắc cho chế độ tối
    const darkClasses = selected 
        ? cn("dark:border-white dark:ring-white dark:text-white") 
        : cn("dark:text-white dark:bg-gray-700/50");

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        onClick={() => onSelect?.(value)}
        className={cn(
          "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-all cursor-pointer select-none",
          "hover:shadow-md",
          selectedClasses,
          darkClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

TagItem.displayName = "TagItem"