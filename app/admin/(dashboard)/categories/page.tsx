"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  ChevronRight,
  Pencil,
  Trash2,
  FolderOpen,
  ChevronDown,
  Check,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CategoryDialog } from "@/components/admin/category-dialog";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
} from "@/hooks/admin/useCategories";
import { CommonPagination } from "@/components/ui/common-pagination";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useProductTypes } from "@/hooks/admin/useProductTypes";
import { any } from "zod";
import { useDebounce } from "@/hooks/common/useDebounce";
import { ProductTypeSelector } from "@/components/admin/product-type-selector";

export default function CategoriesPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [conditions, setConditions] = useState({
    search: "",
    level: 1,
    productTypeId: "",
  });
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const debouncedSearch = useDebounce(conditions.search, 500);

  const { data, isLoading, isError }: any = useCategories({
    page,
    search: debouncedSearch,
    level: conditions.level,
    productTypeId: conditions.productTypeId,
  });
  const { mutate: mutateUpdate, isPending: isUpdating } = useUpdateCategory();
  const { mutate: mutateCreate, isPending: isCreating } = useCreateCategory();

  const { data: categories = [], pagination = {} } = data || {};
  const { totalPages, total } = pagination || {};

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleSubmitEdit = (data: any) => {
    console.log("[v0] Edit category data:", data);
    mutateUpdate({
      id: data.id,
      payload: data,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      console.log("[v0] Delete category:", id);
    }
  };

  const handleCreate = () => {
    setEditingCategory(null);
    setIsDialogOpen(true);
  };

  const handleSubmitCreate = (data: any) => {
    console.log("[v0] Create category data:", data);
    mutateCreate({
      payload: data,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Quản lý danh mục
          </h1>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm danh mục
        </Button>
      </div>
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Tìm kiếm sản phẩm..."
          value={conditions?.search}
          onChange={(e) =>
            setConditions({ ...conditions, search: e.target.value })
          }
          className="max-w-sm pr-10
              border-gray-300
              bg-white
              dark:bg-zinc-900
              dark:border-zinc-700
              shadow-sm
              hover:border-gray-400
              focus:border-primary
              focus:ring-2
              focus:ring-primary/40
              transition-all
              duration-200"
        />
        <ProductTypeSelector
          value={conditions.productTypeId}
          onChange={(productTypeId: any) =>
            setConditions({ ...conditions, productTypeId })
          }
          inputClassName="
            pr-10
            border-gray-300
            bg-white
            dark:bg-zinc-900
            dark:border-zinc-700
            shadow-sm
            hover:border-gray-400
            focus:border-primary
            focus:ring-2
            focus:ring-primary/40
            transition-all
            duration-200
            min-w-sm
          "
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh mục cấp 1</CardTitle>
          <CardDescription>{total} danh mục</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên danh mục</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Loại sản phẩm</TableHead>
                <TableHead className="text-center">Danh mục con</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories?.length > 0 ? (
                categories?.map((category: any) => (
                  <TableRow
                    key={category.id}
                    className="cursor-pointer"
                    onClick={() =>
                      router.push(`/admin/categories/${category.id}`)
                    }
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-navy-100 rounded-lg flex items-center justify-center">
                          <FolderOpen className="w-5 h-5 text-navy-600" />
                        </div>
                        <div>
                          <div className="font-medium">{category.name}</div>
                          <Badge variant="outline" className="mt-1">
                            Cấp {category.level}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {category.slug}
                      </code>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm bg-muted px-2 py-1 rounded">
                        {category.productType?.name || "-"}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {category.children.length > 0 ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            router.push(`/admin/categories/${category.id}`)
                          }
                          className="text-primary"
                        >
                          {category.children.length} danh mục
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(category)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(category.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground py-8"
                  >
                    Chưa có danh mục con
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

      <CategoryDialog
        category={editingCategory}
        parentCategory={selectedCategory}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onHandleSubmitEdit={handleSubmitEdit}
        onHandleSubmitCreate={handleSubmitCreate}
        level={1}
      />
    </div>
  );
}
