'use client'

import * as React from 'react'
import { X, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'

/**
 * Tag option structure
 */
interface TagOption {
  label: string
  value: any
  color?: keyof typeof colorVariants
}

/**
 * Props for the TagSelector component
 */
interface TagSelectorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: TagOption[]
  value?: any[]
  onChange?: (value: any[]) => void
  placeholder?: string
  disabled?: boolean
}

const colorVariants = {
  gray: 'bg-gray-100 text-gray-800 border border-gray-300 dark:bg-gray-800 dark:text-gray-100',
  red: 'bg-red-100 text-red-800 border border-red-300 dark:bg-red-900 dark:text-red-100',
  green: 'bg-green-100 text-green-800 border border-green-300 dark:bg-green-900 dark:text-green-100',
  blue: 'bg-blue-100 text-blue-800 border border-blue-300 dark:bg-blue-900 dark:text-blue-100',
  orange:
    'bg-orange-100 text-orange-800 border border-orange-300 dark:bg-orange-900 dark:text-orange-100',
  purple:
    'bg-purple-100 text-purple-800 border border-purple-300 dark:bg-purple-900 dark:text-purple-100',
}

/**
 * TagSelector Component (forwardRef compatible with FormControl)
 */
export const TagSelector = React.forwardRef<HTMLDivElement, TagSelectorProps>(
  (
    {
      options,
      value = [],
      onChange,
      placeholder = 'Chọn tag...',
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)

    const handleToggle = (val: string) => {
      const newValue = value.includes(val)
        ? value.filter((v) => v !== val)
        : [...value, val]
      onChange?.(newValue)
    }

    const selectedTags = options.filter((o) => value.includes(o.value))

    return (
      <div
        ref={ref} // ✅ cho FormControl truy cập
        className={cn(
          'flex min-h-10 w-full flex-wrap items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      >
        {/* Các tag đã chọn */}
        {selectedTags.length ? (
          selectedTags.map((tag) => (
            <span
              key={tag.value}
              className={cn(
                'inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium',
                colorVariants[tag.color ?? 'gray']
              )}
            >
              {tag.label}
              {!disabled && (
                <X
                  size={14}
                  className="cursor-pointer opacity-70 hover:opacity-100"
                  onClick={() => handleToggle(tag.value)}
                />
              )}
            </span>
          ))
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}

        {/* Nút + mở menu */}
        {!disabled && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="ml-auto h-6 w-6 shrink-0 hover:bg-accent"
                onClick={() => setOpen((prev) => !prev)} // ✅ đảm bảo toggle thủ công
              >
                <Plus size={14} />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              side="bottom"
              align="start"
              className="w-56 p-1 z-[9999]"
            >
              <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                {options.map((option) => {
                  const isSelected = value.includes(option.value)
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleToggle(option.value)}
                      className={cn(
                        'flex w-full items-center justify-between rounded-md px-2 py-1 text-sm transition-colors',
                        'hover:bg-muted',
                        isSelected && 'bg-muted'
                      )}
                    >
                      <span>{option.label}</span>
                      {isSelected && <span>✔️</span>}
                    </button>
                  )
                })}
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    )
  }
)

TagSelector.displayName = 'TagSelector'
