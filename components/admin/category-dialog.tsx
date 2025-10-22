"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { ProductTypeSelector } from "./product-type-selector";

const categoryLevel1Schema = z.object({
  name: z
    .string()
    .min(1, "Tên danh mục là bắt buộc")
    .max(100, "Tên danh mục không được quá 100 ký tự"),
  slug: z
    .string()
    .min(1, "Slug là bắt buộc")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug chỉ được chứa chữ thường, số và dấu gạch ngang"
    ),
  productTypeId: z
    .number({
      required_error: "Vui lòng chọn loại sản phẩm",
      invalid_type_error: "Loại sản phẩm không hợp lệ",
    })
    .min(1, { message: "Chọn loại sản phẩm" }),
  // description: z.string().max(500, "Mô tả không được quá 500 ký tự"),
  // parentId: z.string().nullable(),
});

const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Tên danh mục là bắt buộc")
    .max(100, "Tên danh mục không được quá 100 ký tự"),
  slug: z
    .string()
    .min(1, "Slug là bắt buộc")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug chỉ được chứa chữ thường, số và dấu gạch ngang"
    ),
  productTypeId: z
    .number({
      invalid_type_error: "Loại sản phẩm không hợp lệ",
    })
    .optional(),

});
type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryDialogProps {
  category?: any;
  parentCategory?: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onHandleSubmitEdit: (data: any) => void;
  onHandleSubmitCreate: (data: any) => void;
  level?: number;
}

export function CategoryDialog({
  category,
  parentCategory,
  open,
  onOpenChange,
  onHandleSubmitEdit,
  onHandleSubmitCreate,
  level,
}: CategoryDialogProps) {
  const [initialProductTypeName, setInitialProductTypeName] = useState("");
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(
      (level === 1 ? categoryLevel1Schema : categorySchema) as any
    ),
    defaultValues: {
      name: "",
      slug: "",
      productTypeId: undefined,
      // description: "",
      // parentId: parentCategory?.id || null,
    },
  });

  console.log("[v0] form errors:", form.formState.errors);


  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        slug: category.slug,
        productTypeId: category.productTypeId,
        // description: category.description,
        // parentId: category.parentId,
      });
      setInitialProductTypeName(category?.productType?.name || "");
    } else {
      form.reset({
        name: "",
        slug: "",
        productTypeId: undefined,
        // description: "",
        // parentId: parentCategory?.id || null,
      });
    }
  }, [category, parentCategory, form]);

  const onSubmit = (data: CategoryFormData) => {
    console.log("[v0] Category data:", data);
    if (category?.id) {
      onHandleSubmitEdit({ id: category?.id || "", ...data });
    } else {
      onHandleSubmitCreate({ ...data });
    }
    onOpenChange(false);
  };

  const handleNameChange = (value: string) => {
    const slug = value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    form.setValue("slug", slug);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {category ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
          </DialogTitle>
          <DialogDescription>
            {category
              ? "Cập nhật thông tin danh mục"
              : "Tạo danh mục mới cho hệ thống"}
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
                        field.onChange(e);
                        handleNameChange(e.target.value);
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

            {level === 1 && (
              <FormField
                control={form.control}
                name="productTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại sản phẩm</FormLabel>
                    <FormControl>
                      <ProductTypeSelector
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          setInitialProductTypeName("");
                        }}
                        initialName={initialProductTypeName}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* <FormField
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
            /> */}

            {/* <FormField
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
            /> */}

            <div className="flex items-center gap-3 pt-4">
              <Button type="submit">
                {category ? "Cập nhật" : "Tạo danh mục"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
