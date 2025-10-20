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
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, Plus, Trash2, Upload, X } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import {
  useCreateMultipleProductImages,
  useProduct,
  useRemoveMultipleProductImages,
  useUpdateProduct,
} from "@/hooks/admin/useProducts";
import {
  useCategories,
  useGetCategoriesOptions,
} from "@/hooks/admin/useCategories";
import { getImageProduct } from "@/utils/images";
import { ProductTypeSelector } from "@/components/admin/product-type-selector";
import { Textarea } from "@/components/ui/textarea";

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
  origin: z.string(),
  categoryLevel1Id: z.string().min(1, "Danh mục cấp 1 là bắt buộc"),
  categoryLevel2Id: z.string().optional(),
  categoryLevel3Id: z.string().optional(),
  // status: z.enum(["active", "inactive"]),
  status: z.string().optional(),
  isFeatured: z.boolean(),
  productTypeId: z
    .number({
      required_error: "Vui lòng chọn loại sản phẩm",
      invalid_type_error: "Loại sản phẩm không hợp lệ",
    })
    .min(1, { message: "Chọn loại sản phẩm" }),
  imagesUpdate: z
    .array(z.any()),
  images: z
    .array(z.any()),
  specifications: z
    .array(z.object({ key: z.string(), value: z.string() }))
    .optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const [initialProductTypeName, setInitialProductTypeName] = useState("");

  const [isInitialLoad, setIsInitialLoad] = useState({
    categoryLevel1Id: true,
    categoryLevel2Id: true,
    categoryLevel3Id: true,
  });

  const [specifications, setSpecifications] = useState<
    Array<{ key: string; value: string }>
  >([{ key: "", value: "" }]);

  const {
    data: product,
    isLoading,
    error,
  }: any = useProduct(Number(productId));
  const { mutate: mutateUpdate, isPending: isUpdating } = useUpdateProduct();
  const { mutate: createProductImages } = useCreateMultipleProductImages();
  const { mutate: deleteProductImage } = useRemoveMultipleProductImages();

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      slug: "",
      sku: "",
      summary: "",
      description: "",
      origin: "",
      categoryLevel1Id: "",
      categoryLevel2Id: "",
      categoryLevel3Id: "",
      status: "active",
      isFeatured: false,
      images: [],
      productTypeId: undefined,
      specifications: [{ key: "", value: "" }],
    },
  });

  console.log("form error:", form.formState.errors)
  console.log("form values:", form.getValues());

  const { data: level1Categories, isLoading: isLoadingLevel1 }: any =
    useCategories(
      {
        level: 1,
        productTypeId: form.getValues("productTypeId"),
      },
      {
        enabled: !!form.getValues("productTypeId"),
      }
    );

  const { data: level2Categories, isLoading: isLoadingLevel2 }: any =
    useCategories(
      {
        level: 2,
        parentId: form.getValues("categoryLevel1Id"),
      },
      {
        enabled: !!form.getValues("categoryLevel1Id"),
      }
    );

  const { data: level3Categories, isLoading: isLoadingLevel3 }: any =
    useCategories(
      {
        level: 3,
        parentId: form.getValues("categoryLevel2Id"),
      },
      {
        enabled: !!form.getValues("categoryLevel2Id"),
      }
    );

  const onSubmit = (data: ProductFormData) => {
    // const { images, imagesUpdate, ...payload } = {
    //   ...data,
    //   categoryLevel1Id: Number(data.categoryLevel1Id),
    //   ...(data.categoryLevel2Id && {
    //     categoryLevel2Id: Number(data.categoryLevel2Id),
    //   }),
    //   ...(data.categoryLevel3Id && {
    //     categoryLevel3Id: Number(data.categoryLevel3Id),
    //   }),
    // };

    const {
      images,
      imagesUpdate,
      categoryLevel2Id,
      categoryLevel3Id,
      ...rest
    } = data;
    const payload = {
      ...rest,
      categoryLevel1Id: Number(rest.categoryLevel1Id),
      ...(categoryLevel2Id && {
        categoryLevel2Id: Number(categoryLevel2Id),
      }),
      ...(categoryLevel3Id && {
        categoryLevel3Id: Number(categoryLevel3Id),
      }),
    };

    const listImageRemove = images.filter(
      (item: any) =>
        !imagesUpdate.some((updateItem: any) => updateItem?.id === item?.id)
    );
    const listImageAdd = imagesUpdate.filter(
      (item: any) =>
        !images.some((updateItem: any) => updateItem?.id === item?.id)
    );

    if (listImageRemove.length > 0) {
      deleteProductImage(
        {
          images: listImageRemove,
        },
        {
          onSuccess: (data) => {
            console.log("data:", data);
          },
        }
      );
    }

    if (listImageAdd.length > 0) {
      createProductImages(
        {
          productId: Number(productId),
          images: listImageAdd,
        },
        {
          onSuccess: (data) => {
            console.log("data:", data);
          },
        }
      );
    }

    mutateUpdate(
      {
        id: Number(productId),
        payload,
      },
      {
        onSuccess: (data) => {
          router.push("/admin/products");
        },
      }
    );
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
    const currentImages = form.getValues("imagesUpdate");

    if (currentImages.length + files.length > 5) {
      alert("Tối đa 5 hình ảnh");
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreviews((prev) => [...prev, result]);
        form.setValue("imagesUpdate", [
          ...form.getValues("imagesUpdate"),
          file,
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    const newImages = form
      .getValues("imagesUpdate")
      .filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    form.setValue("imagesUpdate", newImages);
  };

  const handleProductTypeChange = (value: number) => {
    form.setValue("productTypeId", value);
    form.setValue("categoryLevel1Id", "");
    form.setValue("categoryLevel2Id", "");
    form.setValue("categoryLevel3Id", "");
    setInitialProductTypeName("");
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
    return (
      level3Categories?.data?.map((item: any) => ({
        ...item,
        value: item.id.toString(),
      })) || []
    );
  }, [level3Categories]);

  const addSpecification = () => {
    const newSpecs = [...specifications, { key: "", value: "" }];
    setSpecifications(newSpecs);
    form.setValue("specifications", newSpecs);
  };

  const removeSpecification = (index: number) => {
    const newSpecs = specifications.filter((_, i) => i !== index);
    setSpecifications(newSpecs);
    form.setValue("specifications", newSpecs);
  };

  const updateSpecification = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newSpecs = [...specifications];
    newSpecs[index][field] = value;
    setSpecifications(newSpecs);
    form.setValue("specifications", newSpecs);
  };

  useEffect(() => {
    if (product) {
      const { images, specifications, ...rest } = product;
      form.reset({
        ...rest,
        ...(rest.categoryLevel1Id && {
          categoryLevel1Id: rest.categoryLevel1Id?.toString(),
        }),
        ...(rest.categoryLevel2Id && {
          categoryLevel2Id: rest.categoryLevel2Id?.toString(),
        }),
        ...(rest.categoryLevel3Id && {
          categoryLevel3Id: rest.categoryLevel3Id?.toString(),
        }),
        imagesUpdate: images,
        images: images,
        status: product?.status || 'active',
        ...(specifications && {
          specifications: JSON.parse(specifications),
        })
      });
      if (images && images.length > 0) {
        setImagePreviews(images.map((item: any) => getImageProduct(item)));
      }
      if (product?.productType?.name) {
        setInitialProductTypeName(product?.productType?.name);
      }
      if (specifications && specifications.length > 0) {
        setSpecifications(JSON.parse(specifications));
      }
    }
  }, [product, form]);

  useEffect(() => {
    if (level1CategoriesOption.length > 0 && isInitialLoad.categoryLevel1Id) {
      form.setValue(
        "categoryLevel1Id",
        product?.categoryLevel1Id?.toString() || ""
      );
      setIsInitialLoad({
        ...isInitialLoad,
        categoryLevel1Id: false,
      });
    }
  }, [level1CategoriesOption]);

  useEffect(() => {
    if (level2CategoriesOption.length > 0 && isInitialLoad.categoryLevel2Id) {
      form.setValue(
        "categoryLevel2Id",
        product?.categoryLevel2Id?.toString() || ""
      );
      setIsInitialLoad({
        ...isInitialLoad,
        categoryLevel2Id: false,
      });
    }
  }, [level2CategoriesOption]);

  useEffect(() => {
    if (level3CategoriesOption.length > 0 && isInitialLoad.categoryLevel3Id) {
      form.setValue(
        "categoryLevel3Id",
        product?.categoryLevel3Id?.toString() || ""
      );
      setIsInitialLoad({
        ...isInitialLoad,
        categoryLevel3Id: false,
      });
    }
  }, [level3CategoriesOption]);

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
          <CardTitle>Chỉnh sửa sản phẩm</CardTitle>
          <CardDescription>Cập nhật thông tin sản phẩm</CardDescription>
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
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productTypeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại sản phẩm</FormLabel>
                      <FormControl>
                        <ProductTypeSelector
                          value={field.value}
                          // onChange={(e) => {
                          //   console.log(e);
                          //   field.onChange(e);
                          //   setInitialProductTypeName("");
                          // }}
                          onChange={handleProductTypeChange}
                          initialName={initialProductTypeName}
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
                            <SelectValue placeholder={"Chọn danh mục cấp 1"} />
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
                            <SelectValue placeholder={"Chọn danh mục cấp 2"} />
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
                            <SelectValue placeholder={"Chọn danh mục cấp 3"} />
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
                  name="summary"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Mô tả ngắn</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập mô tả ngắn về sản phẩm (tối đa 500 ký tự)"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
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
                  name="imagesUpdate"
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
                                    className="object-contain"
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
                <div className="col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <FormLabel>Thông số kỹ thuật</FormLabel>
                      <FormDescription>
                        Thêm các thông số kỹ thuật của sản phẩm
                      </FormDescription>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addSpecification}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Thêm thông số
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {specifications?.length > 0 && specifications?.map((spec, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <Input
                          placeholder="Tên thông số (VD: Công suất)"
                          value={spec.key}
                          onChange={(e) =>
                            updateSpecification(index, "key", e.target.value)
                          }
                          className="flex-1"
                        />
                        <Input
                          placeholder="Giá trị (VD: 1000W)"
                          value={spec.value}
                          onChange={(e) =>
                            updateSpecification(index, "value", e.target.value)
                          }
                          className="flex-1"
                        />
                        {specifications.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSpecification(index)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button type="submit">Cập nhật</Button>
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
