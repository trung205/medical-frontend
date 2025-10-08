"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect } from "react"

const categorySchema = z.object({
  name: z.string().min(1, "Tên danh mục là bắt buộc").max(100, "Tên danh mục không được quá 100 ký tự"),
  slug: z
    .string()
    .min(1, "Slug là bắt buộc")
    .regex(/^[a-z0-9-]+$/, "Slug chỉ được chứa chữ thường, số và dấu gạch ngang"),
  description: z.string().max(500, "Mô tả không được quá 500 ký tự"),
  parentId: z.string().nullable(),
})

type CategoryFormData = z.infer<typeof categorySchema>

const mockCategories = [
  { id: "1", name: "Thiết bị chẩn đoán hình ảnh", level: 1 },
  { id: "2", name: "Máy siêu âm", level: 2, parentId: "1" },
  { id: "7", name: "Thiết bị hồi sức", level: 1 },
]

interface CategoryDialogProps {
  category?: any
  parentCategory?: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CategoryDialog({ category, parentCategory, open, onOpenChange }: CategoryDialogProps) {
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      parentId: parentCategory?.id || null,
    },
  })

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        slug: category.slug,
        description: category.description,
        parentId: category.parentId,
      })
    } else {
      form.reset({
        name: "",
        slug: "",
        description: "",
        parentId: parentCategory?.id || null,
      })
    }
  }, [category, parentCategory, form])

  const onSubmit = (data: CategoryFormData) => {
    console.log("[v0] Category data:", data)
    onOpenChange(false)
  }

  const handleNameChange = (value: string) => {
    const slug = value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
    form.setValue("slug", slug)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{category ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}</DialogTitle>
          <DialogDescription>
            {category ? "Cập nhật thông tin danh mục" : "Tạo danh mục mới cho hệ thống"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên danh mục</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập tên danh mục"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        handleNameChange(e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="slug-danh-muc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Nhập mô tả danh mục" rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Danh mục cha (tùy chọn)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || undefined}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục cha" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="null">Không có (Cấp 1)</SelectItem>
                      {mockCategories
                        .filter((cat) => cat.level < 3)
                        .map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name} (Cấp {cat.level})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-3 pt-4">
              <Button type="submit">{category ? "Cập nhật" : "Tạo danh mục"}</Button>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Hủy
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
