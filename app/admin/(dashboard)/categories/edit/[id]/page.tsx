"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, useParams } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { useEffect } from "react"

const categorySchema = z.object({
  name: z.string().min(1, "Tên danh mục là bắt buộc").max(100, "Tên danh mục không được quá 100 ký tự"),
  slug: z
    .string()
    .min(1, "Slug là bắt buộc")
    .regex(/^[a-z0-9-]+$/, "Slug chỉ được chứa chữ thường, số và dấu gạch ngang"),
  description: z.string().max(500, "Mô tả không được quá 500 ký tự").optional(),
  parentId: z.string().nullable(),
  order: z.number().min(0, "Thứ tự phải lớn hơn hoặc bằng 0"),
})

type CategoryFormData = z.infer<typeof categorySchema>

const mockCategories = [
  { id: "1", name: "Thiết bị chẩn đoán hình ảnh", level: 1 },
  { id: "2", name: "Máy siêu âm", level: 2, parentId: "1" },
  { id: "7", name: "Thiết bị hồi sức", level: 1 },
]

const mockCategoryData: Record<string, any> = {
  "1": {
    name: "Thiết bị chẩn đoán hình ảnh",
    slug: "thiet-bi-chan-doan-hinh-anh",
    description: "Các thiết bị dùng để chẩn đoán hình ảnh y khoa",
    parentId: null,
    order: 1,
  },
  "2": {
    name: "Máy siêu âm",
    slug: "may-sieu-am",
    description: "Thiết bị siêu âm y khoa",
    parentId: "1",
    order: 1,
  },
}

export default function EditCategoryPage() {
  const router = useRouter()
  const params = useParams()
  const categoryId = params.id as string
  const categoryData = mockCategoryData[categoryId]

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      parentId: null,
      order: 0,
    },
  })

  useEffect(() => {
    if (categoryData) {
      form.reset(categoryData)
    }
  }, [categoryData, form])

  const onSubmit = (data: CategoryFormData) => {
    console.log("[v0] Updated category data:", data)
    router.push("/admin/categories")
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
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ChevronLeft className="w-4 h-4 mr-1" />
          Quay lại
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chỉnh sửa danh mục</CardTitle>
          <CardDescription>Cập nhật thông tin danh mục</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <FormDescription>URL thân thiện cho danh mục</FormDescription>
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
                      <Textarea placeholder="Nhập mô tả cho danh mục" rows={3} {...field} />
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
                    <FormLabel>Danh mục cha</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || undefined}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn danh mục cha (nếu có)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="null">Không có (Cấp 1)</SelectItem>
                        {mockCategories
                          .filter((c) => c.id !== categoryId)
                          .map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {"  ".repeat(category.level - 1)}
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Để trống nếu đây là danh mục cấp 1</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thứ tự hiển thị</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Số thứ tự để sắp xếp danh mục</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-3">
                <Button type="submit">Cập nhật</Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Hủy
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
