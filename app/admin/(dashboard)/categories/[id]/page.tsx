"use client";
import { Button } from "@/components/ui/button";
import {
  Plus,
  ChevronRight,
  ChevronLeft,
  FolderOpen,
  Trash2,
  Pencil,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter, useParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CommonPagination } from "@/components/ui/common-pagination";
import { CategoryDialog } from "@/components/admin/category-dialog";
import {
  useCategories,
  useCategory,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "@/hooks/admin/useCategories";
import { useEffect, useState } from "react";

export default function CategoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id as string;
  const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const [condition, setCondition] = useState({
    search: "",
    parentId: categoryId,
  });
  const { data, isLoading, isError }: any = useCategories({
    page,
    search: condition.search,
    parentId: condition.parentId,
  });
  const { data: category } = useCategory(parseInt(categoryId));
  const { mutate: mutateUpdate, isPending: isUpdating } = useUpdateCategory();
  const { mutate: mutateCreate, isPending: isCreating } = useCreateCategory();
  const { mutate: mutateDelete, isPending: isDeleting } = useDeleteCategory();

  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: categories, pagination } = data || {};
  const { totalPages, total } = pagination || {};

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleSubmitEdit = (data: any) => {
    mutateUpdate({
      id: data.id,
      payload: data,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      mutateDelete(parseInt(id));
    }
  };

  const handleCreate = () => {
    setEditingCategory(null);
    setIsDialogOpen(true);
  };

  const handleSubmitCreate = (data: any) => {
    const payload = {
      ...data,
      parentId: parseInt(categoryId),
    };
    mutateCreate({
      payload,
    });
  };

  useEffect(() => {
    if (categoryId) {
      setCondition({
        ...condition,
        parentId: categoryId,
      });
    }
  }, [categoryId]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Quay lại
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            {category?.name}
          </h1>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm danh mục
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Danh mục cấp {category?.level + 1}</CardTitle>
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            router.push(`/admin/categories/${category.id}`)
                          }
                          className="text-primary"
                        >
                          {category?.children?.length || 0} danh mục
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
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
      />
    </div>
  );
}
