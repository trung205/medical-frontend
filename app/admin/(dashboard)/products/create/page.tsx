"use client";

import type React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { ChevronLeft, Upload, X } from "lucide-react";
import { useMemo, useState } from "react";
import Image from "next/image";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { useCategories } from "@/hooks/admin/useCategories";
import { useCreateMultipleProductImages, useCreateProduct } from "@/hooks/admin/useProducts";

const productSchema = z.object({
  name: z
    .string()
    .min(1, "Tên sản phẩm là bắt buộc")
    .max(200, "Tên sản phẩm không được quá 200 ký tự"),
  slug: z
    .string()
    .min(1, "Slug là bắt buộc")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug chỉ được chứa chữ thường, số và dấu gạch ngang"
    ),
  sku: z.string().min(1, "Mã SKU là bắt buộc"),
  summary: z.string(),
  description: z.string(),
  specifications: z.string(),
  origin: z.string(),
  categoryLevel1Id: z.string().min(1, "Danh mục cấp 1 là bắt buộc"),
  categoryLevel2Id: z.string().min(1, "Danh mục cấp 2 là bắt buộc"),
  categoryLevel3Id: z.string().min(1, "Danh mục cấp 3 là bắt buộc"),
  status: z.enum(["active", "inactive"]),
  isFeatured: z.boolean(),
  images: z
    .array(z.instanceof(File))
    .min(1, "Cần ít nhất 1 hình ảnh")
    .max(5, "Tối đa 5 hình ảnh"),
});

type ProductFormData = z.infer<typeof productSchema>;


export default function CreateProductPage() {
  const router = useRouter();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { mutate: mutateCreate, isPending: isCreating } = useCreateProduct();
  const { mutate: createProductImages } = useCreateMultipleProductImages();
  const { data: level1Categories, isLoading: isLoadingLevel1 }: any =
    useCategories({
      level: 1,
    });

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      slug: "",
      sku: "",
      summary: "",
      description: "",
      specifications: "",
      origin: "",
      categoryLevel1Id: "",
      categoryLevel2Id: "",
      categoryLevel3Id: "",
      status: "active",
      isFeatured: false,
      images: [],
    },
  });

  const { data: level2Categories, isLoading: isLoadingLevel2 }: any =
    useCategories(
      {
        level: 2,
        parentId: form.getValues("categoryLevel1Id"), // Giả sử API nhận `parentId`
      },
      {
        enabled: !!form.getValues("categoryLevel1Id"), // CHỈ chạy query nếu selectedLevel1 có giá trị
      }
    );

  const { data: level3Categories, isLoading: isLoadingLevel3 }: any =
    useCategories(
      {
        level: 3,
        parentId: form.getValues("categoryLevel2Id"), // Giả sử API nhận `parentId`
      },
      {
        enabled: !!form.getValues("categoryLevel2Id"), // CHỈ chạy query nếu selectedLevel2 có giá trị
      }
    );

  const level1CategoriesOption = useMemo(() => {
    return (
      level1Categories?.data?.map((item: any) => ({
        ...item,
        value: item.id.toString(),
      })) || []
    );
  }, [level1Categories]);

  const level2CategoriesOption = useMemo(() => {
    return (
      level2Categories?.data?.map((item: any) => ({
        ...item,
        value: item.id.toString(),
      })) || []
    );
  }, [level2Categories]);

  const level3CategoriesOption = useMemo(() => {
    console.log("level3Categories:", level3Categories);
    return (
      level3Categories?.data?.map((item: any) => ({
        ...item,
        value: item.id.toString(),
      })) || []
    );
  }, [level3Categories]);


  const onSubmit = (data: ProductFormData) => {
    const {images, ...rest} = data
    const payload = {
      ...rest,
      categoryLevel1Id: Number(rest.categoryLevel1Id),
      categoryLevel2Id: Number(rest.categoryLevel2Id),
      categoryLevel3Id: Number(rest.categoryLevel3Id),
    };
    mutateCreate({
      payload,
    }, {
      onSuccess: (data) => {
        console.log("data:", data);
        console.log("images:", images);
        createProductImages({
          productId: data?.data.id,
          images,
        }, {
          onSuccess: (data) => {
            console.log("data:", data);
            router.push("/admin/products");
          },
        })
      },
    });
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const currentImages = form.getValues("images");

    if (currentImages.length + files.length > 5) {
      alert("Tối đa 5 hình ảnh");
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreviews((prev) => [...prev, result]);
        form.setValue("images", [...form.getValues("images"), file]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    const newImages = form.getValues("images").filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    form.setValue("images", newImages);
  };

  const handleCategory1Change = (value: string) => {
    form.setValue("categoryLevel1Id", value);
    form.setValue("categoryLevel2Id", "");
    form.setValue("categoryLevel3Id", "");
  };

  const handleCategory2Change = (value: string) => {
    form.setValue("categoryLevel2Id", value);
    form.setValue("categoryLevel3Id", "");
  };

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
                  name="origin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Xuất xứ</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập xuất xứ"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryLevel1Id"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Danh mục cấp 1</FormLabel>
                      <Select
                        onValueChange={handleCategory1Change}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn danh mục cấp 1" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isLoadingLevel1 ? (
                            <SelectItem key="loading" value="loading">
                              Loading...
                            </SelectItem>
                          ) : (
                            (level1CategoriesOption as any)?.map(
                              (category: any) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.value}
                                >
                                  {category.name}
                                </SelectItem>
                              )
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryLevel2Id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Danh mục cấp 2</FormLabel>
                      <Select
                        onValueChange={handleCategory2Change}
                        value={field.value}
                        disabled={!form.watch("categoryLevel1Id")}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn danh mục cấp 2" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isLoadingLevel2 ? (
                            <SelectItem key="loading" value="loading">
                              Loading...
                            </SelectItem>
                          ) : (
                            (level2CategoriesOption as any)?.map(
                              (category: any) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.value}
                                >
                                  {category.name}
                                </SelectItem>
                              )
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryLevel3Id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Danh mục cấp 3</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!form.watch("categoryLevel2Id")}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn danh mục cấp 3" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isLoadingLevel3 ? (
                            <SelectItem key="loading" value="loading">
                              Loading...
                            </SelectItem>
                          ) : (
                            (level3CategoriesOption as any)?.map(
                              (category: any) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.value}
                                >
                                  {category.name}
                                </SelectItem>
                              )
                            )
                          )}
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="col-span-2 flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Sản phẩm nổi bật</FormLabel>
                        <FormDescription>
                          Hiển thị trên trang chủ
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
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
                                <div
                                  key={index}
                                  className="relative aspect-square rounded-lg overflow-hidden border"
                                >
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
                      <FormDescription>
                        Ảnh đầu tiên sẽ là ảnh chính của sản phẩm
                      </FormDescription>
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
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specifications"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Thông số kỹ thuật</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center gap-3">
                <Button type="submit">Tạo sản phẩm</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Hủy
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
