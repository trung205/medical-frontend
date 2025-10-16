// components/form/multi-select-tag-field.tsx (Đặt tên mới để dễ phân biệt)

import React from "react"
// Sửa đổi để nhận FieldProps trực tiếp
import { ControllerRenderProps, FieldValues } from "react-hook-form" 
import { TagItem } from "@/components/ui/tag-item" // Component TagItem ở ví dụ trước

// Định nghĩa cấu trúc cho mỗi tùy chọn tag
interface TagOption {
  value: string
  label: string
  color: string // Ví dụ: "bg-blue-500 hover:bg-blue-600"
}

interface MultiSelectTagProps<TFieldValues extends FieldValues> {
  // Nhận props 'field' từ FormField
  field: ControllerRenderProps<TFieldValues, any> 
  options: TagOption[] // Danh sách các tag
}

// KHÔNG CẦN Controller nữa vì FormField đã bọc
export function MultiSelectTagField<TFieldValues extends FieldValues>({
  field,
  options,
}: MultiSelectTagProps<TFieldValues>) {
  
  // field.value là giá trị hiện tại của trường (một mảng các tag được chọn)
  const selectedValues = (field.value as string[] | undefined) || []

  // Hàm xử lý khi một tag được click
  const handleTagClick = (tagValue: string) => {
    const isSelected = selectedValues.includes(tagValue)
    let newValues: string[]

    if (isSelected) {
      // Bỏ chọn: Lọc bỏ tag đó khỏi mảng
      newValues = selectedValues.filter((v) => v !== tagValue)
    } else {
      // Chọn: Thêm tag đó vào mảng
      newValues = [...selectedValues, tagValue]
    }

    // Dùng field.onChange để cập nhật giá trị trong React Hook Form
    field.onChange(newValues)
  }

  return (
    <div className="flex flex-wrap gap-3" onBlur={field.onBlur} tabIndex={0}>
      {options.map((option) => (
        <TagItem
          key={option.value}
          value={option.value}
          colorClass={option.color}
          selected={selectedValues.includes(option.value)}
          onSelect={handleTagClick}
        >
          {option.label}
        </TagItem>
      ))}
    </div>
  )
}