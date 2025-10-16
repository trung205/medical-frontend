"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tag } from "@/components/ui/tag"
import { useBlogTags, useCreateBlogTag, useDeleteBlogTag, useUpdateBlogTag } from "@/hooks/admin/useBlogTags"
import { Pagination } from "@/components/ui/pagination"
import { CommonPagination } from "@/components/ui/common-pagination"

const tagSchema = z.object({
  name: z.string().min(1, "Tên tag là bắt buộc").max(50, "Tên tag không được quá 50 ký tự"),
  slug: z
    .string()
    .min(1, "Slug là bắt buộc")
    .regex(/^[a-z0-9-]+$/, "Slug chỉ được chứa chữ thường, số và dấu gạch ngang"),
  // description: z.string().max(200, "Mô tả không được quá 200 ký tự").optional(),
  // color: z.string().min(1, "Màu sắc là bắt buộc"),
})

type TagFormData = z.infer<typeof tagSchema>

const COLOR_OPTIONS = [
  { value: "bg-blue-500", label: "Xanh dương", color: "#3b82f6" },
  { value: "bg-cyan-500", label: "Xanh lơ", color: "#06b6d4" },
  { value: "bg-purple-500", label: "Tím", color: "#a855f7" },
  { value: "bg-red-500", label: "Đỏ", color: "#ef4444" },
  { value: "bg-green-500", label: "Xanh lá", color: "#22c55e" },
  { value: "bg-orange-500", label: "Cam", color: "#f97316" },
  { value: "bg-yellow-600", label: "Vàng", color: "#ca8a04" },
  { value: "bg-pink-500", label: "Hồng", color: "#ec4899" },
  { value: "bg-indigo-500", label: "Chàm", color: "#6366f1" },
  { value: "bg-teal-500", label: "Xanh ngọc", color: "#14b8a6" },
]

const mockTags = [
  {
    id: "1",
    name: "Thiết bị chẩn đoán",
    slug: "thiet-bi-chan-doan",
    description: "Các bài viết về thiết bị chẩn đoán y tế",
    color: "bg-blue-500",
    postCount: 12,
  },
  {
    id: "2",
    name: "Máy siêu âm",
    slug: "may-sieu-am",
    description: "Thông tin về máy siêu âm",
    color: "bg-cyan-500",
    postCount: 8,
  },
  {
    id: "3",
    name: "Máy X-quang",
    slug: "may-x-quang",
    description: "Bài viết về máy X-quang",
    color: "bg-purple-500",
    postCount: 6,
  },
  {
    id: "4",
    name: "Thiết bị phẫu thuật",
    slug: "thiet-bi-phau-thuat",
    description: "Thiết bị dùng trong phẫu thuật",
    color: "bg-red-500",
    postCount: 10,
  },
  {
    id: "5",
    name: "Hướng dẫn",
    slug: "huong-dan",
    description: "Hướng dẫn sử dụng thiết bị",
    color: "bg-green-500",
    postCount: 15,
  },
]

export default function BlogTagsPage() {
   const [page, setPage] = useState(1);
  const [conditions, setConditions] = useState({
    search: "",
  });
  const [tags, setTags] = useState(mockTags)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTag, setEditingTag] = useState<any>(null)

  const {data, isLoading}: any = useBlogTags({
    page,
    ...conditions,
  });

  const { data: blogTags = [], pagination = {} } = data || {};
  const { totalPages, total } = pagination || {};

  const { mutate: mutateUpdate, isPending: isUpdating } = useUpdateBlogTag();
  const { mutate: mutateCreate, isPending: isCreating } = useCreateBlogTag(); 
  const { mutate: mutateDelete, isPending: isDeleting } = useDeleteBlogTag(); 

  const form = useForm<TagFormData>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      name: "",
      slug: "",
      // description: "",
      // color: "bg-blue-500",
    },
  })

  const handleCreate = () => {
    setEditingTag(null)
    form.reset({
      name: "",
      slug: "",
      // description: "",
      // color: "bg-blue-500",
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (tag: any) => {
    setEditingTag(tag)
    form.reset({
      name: tag.name,
      slug: tag.slug,
      // description: tag.description,
      // color: tag.color,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa tag này?")) {
      setTags(tags.filter((t) => t.id !== id))
      mutateDelete(Number(id), {
        onSuccess: () => {
          setIsDialogOpen(false)
        }
      });
    }
  }

  const handleSearch = (value: string) => {
    setConditions({
      ...conditions,
      search: value,
    })
  }

  const onSubmit = (data: TagFormData) => {
    console.log("[v0] Tag data:", data)
    if (editingTag) {
      mutateUpdate({
        id: editingTag.id,
        payload: data,
      }, {
        onSuccess: () => {
          setIsDialogOpen(false)
        }
      })
    } else {
      mutateCreate({
        payload: data,
      }, {
        onSuccess: () => {
          setIsDialogOpen(false)
        }
      })
    }
    // setIsDialogOpen(false)
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

  // const filteredTags = tags.filter(
  //   (tag) =>
  //     tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     tag.slug.toLowerCase().includes(searchQuery.toLowerCase()),
  // )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý Tags</h1>
          <p className="text-muted-foreground mt-1">Quản lý tags cho bài viết blog</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm tag mới
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách Tags</CardTitle>
          <CardDescription>{total} tags</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Tìm kiếm tag..."
            value={conditions.search}
            onChange={(e) => handleSearch(e.target.value)}
            className="max-w-sm"
          />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tag</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogTags.length > 0 ? (
                blogTags.map((tag: any) => (
                  <TableRow key={tag.id}>
                    <TableCell>
                      {/* <Badge className={`${tag.color} text-white`}>{tag.name}</Badge> */}
                      <Tag color={tag?.color}>{tag?.name}</Tag>
                    </TableCell>
                    <TableCell>
                      <code className="text-sm bg-muted px-2 py-1 rounded">{tag?.slug}</code>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-sm text-muted-foreground truncate">{tag?.description}</p>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(tag)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(tag.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    Không tìm thấy tag nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
           <CommonPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p)}
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingTag ? "Chỉnh sửa tag" : "Thêm tag mới"}</DialogTitle>
            <DialogDescription>
              {editingTag ? "Cập nhật thông tin tag" : "Tạo tag mới cho bài viết blog"}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên tag</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập tên tag"
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
                      <Input placeholder="slug-tag" {...field} />
                    </FormControl>
                    <FormDescription>URL thân thiện cho tag (tự động tạo từ tên)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả (tùy chọn)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Nhập mô tả cho tag" rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Màu sắc</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn màu sắc" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {COLOR_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: option.color }} />
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <div className="flex items-center gap-3 pt-4">
                <Button type="submit">{editingTag ? "Cập nhật" : "Tạo tag"}</Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Hủy
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
