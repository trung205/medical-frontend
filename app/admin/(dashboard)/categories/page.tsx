"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ChevronRight, Pencil, Trash2, FolderOpen } from "lucide-react";
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
import { useCategories, useCreateCategory, useUpdateCategory } from "@/hooks/admin/useCategories";
import { CommonPagination } from "@/components/ui/common-pagination";
import { useRouter } from "next/navigation"

export default function CategoriesPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [condition, setCondition] = useState({
    search: "",
    level: 1,
  });
  const { data, isLoading, isError }: any = useCategories({
    page,
    search: condition.search,
    level: condition.level,
  });
  const { mutate: mutateUpdate, isPending: isUpdating } = useUpdateCategory();
  const { mutate: mutateCreate, isPending: isCreating } = useCreateCategory();

  const [selectedCategory, setSelectedCategory] = useState<any | null>(
    null
  );
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

      <Card>
        <CardHeader>
          <CardTitle>
            Danh mục cấp 1
          </CardTitle>
          <CardDescription>{total} danh mục</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên danh mục</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-center">Danh mục con</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories?.length > 0 ? (
                categories?.map((category: any) => (
                  <TableRow key={category.id}>
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
                    <TableCell className="text-center">
                      {category.children.length > 0 ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/admin/categories/${category.id}`)}
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
      />
    </div>
  );
}
