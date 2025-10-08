"use client"

import type React from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"
import { ChevronLeft, Upload, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { RichTextEditor } from "@/components/admin/rich-text-editor"

const productSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm là bắt buộc").max(200, "Tên sản phẩm không được quá 200 ký tự"),
  slug: z
    .string()
    .min(1, "Slug là bắt buộc")
    .regex(/^[a-z0-9-]+$/, "Slug chỉ được chứa chữ thường, số và dấu gạch ngang"),
  sku: z.string().min(1, "Mã SKU là bắt buộc"),
  price: z.number().min(0, "Giá phải lớn hơn 0"),
  salePrice: z.number().nullable(),
  stock: z.number().min(0, "Tồn kho phải lớn hơn hoặc bằng 0"),
  category1: z.string().min(1, "Danh mục cấp 1 là bắt buộc"),
  category2: z.string().min(1, "Danh mục cấp 2 là bắt buộc"),
  category3: z.string().min(1, "Danh mục cấp 3 là bắt buộc"),
  status: z.enum(["active", "inactive"]),
  featured: z.boolean(),
  images: z.array(z.string()).min(1, "Cần ít nhất 1 hình ảnh").max(5, "Tối đa 5 hình ảnh"),
  description: z.string().min(1, "Mô tả là bắt buộc"),
})

type ProductFormData = z.infer<typeof productSchema>

const mockCategoriesLevel1 = [
  { id: "1", name: "Thiết bị chẩn đoán hình ảnh" },
  { id: "7", name: "Thiết bị hồi sức" },
  { id: "10", name: "Thiết bị phẫu thuật" },
]

const mockCategoriesLevel2: Record<string, any[]> = {
  "1": [
    { id: "2", name: "Máy siêu âm" },
    { id: "5", name: "Máy X-quang" },
  ],
  "7": [{ id: "8", name: "Máy thở" }],
  "10": [
    { id: "11", name: "Dụng cụ phẫu thuật" },
    { id: "12", name: "Bàn mổ" },
  ],
}

const mockCategoriesLevel3: Record<string, any[]> = {
  "2": [
    { id: "3", name: "Siêu âm 4D" },
    { id: "4", name: "Siêu âm Doppler" },
  ],
  "5": [{ id: "6", name: "X-quang kỹ thuật số" }],
  "8": [{ id: "9", name: "Máy thở ICU" }],
  "11": [{ id: "13", name: "Dao mổ điện" }],
  "12": [{ id: "14", name: "Bàn mổ điện" }],
}

export default function CreateProductPage() {
  const router = useRouter()
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [level2Categories, setLevel2Categories] = useState<any[]>([])
  const [level3Categories, setLevel3Categories] = useState<any[]>([])

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      slug: "",
      sku: "",
      price: 0,
      salePrice: null,
      stock: 0,
      category1: "",
      category2: "",
      category3: "",
      status: "active",
      featured: false,
      images: [],
      description: "",
    },
  })

  const onSubmit = (data: ProductFormData) => {
    console.log("[v0] Product data:", data)
    router.push("/admin/products")
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const currentImages = form.getValues("images")

    if (currentImages.length + files.length > 5) {
      alert("Tối đa 5 hình ảnh")
      return
    }

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreviews((prev) => [...prev, result])
        form.setValue("images", [...form.getValues("images"), result])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index)
    const newImages = form.getValues("images").filter((_, i) => i !== index)
    setImagePreviews(newPreviews)
    form.setValue("images", newImages)
  }

  const handleCategory1Change = (value: string) => {
    form.setValue("category1", value)
    form.setValue("category2", "")
    form.setValue("category3", "")
    setLevel2Categories(mockCategoriesLevel2[value] || [])
    setLevel3Categories([])
  }

  const handleCategory2Change = (value: string) => {
    form.setValue("category2", value)
    form.setValue("category3", "")
    setLevel3Categories(mockCategoriesLevel3[value] || [])
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ChevronLeft className="w-4 h-4 mr-1" />
          Quay lại
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thêm sản phẩm mới</CardTitle>
          <CardDescription>Tạo sản phẩm mới cho cửa hàng</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Tên sản phẩm</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập tên sản phẩm"
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
                        <Input placeholder="slug-san-pham" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mã SKU</FormLabel>
                      <FormControl>
                        <Input placeholder="SKU-001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá gốc (VNĐ)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá khuyến mãi (VNĐ)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                        />
                      </FormControl>
                      <FormDescription>Để trống nếu không có khuyến mãi</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tồn kho</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category1"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Danh mục cấp 1</FormLabel>
                      <Select onValueChange={handleCategory1Change} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn danh mục cấp 1" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockCategoriesLevel1.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Danh mục cấp 2</FormLabel>
                      <Select
                        onValueChange={handleCategory2Change}
                        value={field.value}
                        disabled={!form.watch("category1")}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn danh mục cấp 2" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {level2Categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Danh mục cấp 3</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} disabled={!form.watch("category2")}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn danh mục cấp 3" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {level3Categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trạng thái</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn trạng thái" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Đang bán</SelectItem>
                          <SelectItem value="inactive">Ngừng bán</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="col-span-2 flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Sản phẩm nổi bật</FormLabel>
                        <FormDescription>Hiển thị trên trang chủ</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Hình ảnh sản phẩm (Tối đa 5 ảnh)</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          {imagePreviews.length > 0 && (
                            <div className="grid grid-cols-5 gap-4">
                              {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                                  <Image
                                    src={preview || "/placeholder.svg"}
                                    alt={`Preview ${index + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-1 right-1 h-6 w-6"
                                    onClick={() => removeImage(index)}
                                  >
                                    <X className="w-3 h-3" />
                                  </Button>
                                  {index === 0 && (
                                    <div className="absolute bottom-1 left-1 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded">
                                      Chính
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          {imagePreviews.length < 5 && (
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                              <span className="text-sm text-muted-foreground">
                                Click để tải ảnh lên ({imagePreviews.length}/5)
                              </span>
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                              />
                            </label>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>Ảnh đầu tiên sẽ là ảnh chính của sản phẩm</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Mô tả sản phẩm</FormLabel>
                      <FormControl>
                        <RichTextEditor value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center gap-3">
                <Button type="submit">Tạo sản phẩm</Button>
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
