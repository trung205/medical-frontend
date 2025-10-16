"use client"

import type React from "react"

import { useState, useRef, useEffect, useMemo } from "react"
import { X, ChevronDown, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tag } from "../ui/tag"
import { useBlogTags } from "@/hooks/admin/useBlogTags"

interface TagSelectorProps {
  value: any
  onChange: (tags: string[]) => void
}

export function TagSelector({ value = [], onChange }: TagSelectorProps) {
  const [inputValue, setInputValue] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [conditions, setConditions] = useState({
    search: "",
  })

  const {data: blogTags}: any = useBlogTags({
    ...conditions,
  })
  const {data: blogTagsList = []} = blogTags || {}



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleAddTag = (tag: any) => {
    if (tag && !value.includes(tag.id)) {
      onChange([...value, tag])
    }
    setInputValue("")
  }

  const handleRemoveTag = (tagToRemove: any) => {
    onChange(value.filter((tag: any) => tag.id !== tagToRemove.id))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag({ id: Date.now(), name: inputValue.trim(), color: "gray" })
    }
  }

  const filteredTags = useMemo(() => {
    return blogTagsList.filter(
      (tag: any) => !value.map((v: any) => v.id).includes(tag.id) && tag.name.toLowerCase().includes(inputValue.toLowerCase()),
    )
  }, [value, inputValue, blogTagsList])

  console.log("[v0] filteredTags:", value)

  return (
    <div className="space-y-3">
      {/* Selected tags */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((tag: any) => (
            <Tag key={tag.id} color={tag?.color || 'gray'} className={`hover:opacity-90 pr-1`}>
              {tag.name}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 hover:bg-white/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Tag>
          ))}
        </div>
      )}

      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <Input
            placeholder="Tìm kiếm hoặc nhập tag mới..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </Button>
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredTags.length > 0 ? (
              <div className="py-1">
                {filteredTags.map((tag: any) => (
                  <button
                    key={tag?.id}
                    type="button"
                    onClick={() => {
                      handleAddTag(tag)
                      // setIsOpen(false)
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-accent flex items-center gap-2 text-sm"
                  >
                    <span className={`w-3 h-3 rounded-full bg-${tag.color} flex-shrink-0`} />
                    <span>{tag.name}</span>
                    {value.includes(tag.name) && <Check className="w-4 h-4 ml-auto" />}
                  </button>
                ))}
              </div>
            ) : inputValue.trim() ? (
              <div className="px-3 py-2 text-sm text-muted-foreground">Nhấn Enter để thêm "{inputValue.trim()}"</div>
            ) : (
              <div className="px-3 py-2 text-sm text-muted-foreground">Không tìm thấy tag nào</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
