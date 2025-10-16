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
import { ProductTypeDialog } from "@/components/admin/product-type-dialog";
import { useProductTypes, useUpdateProductType } from "@/hooks/admin/useProductTypes";
import { useCreateProductType } from "@/hooks/admin/useProductTypes";

export default function ProductTypesPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [condition, setCondition] = useState({
    search: "",
  });
  const { data, isLoading, isError }: any = useProductTypes({
    page,
    search: condition.search,
  });
  const { mutate: mutateUpdate, isPending: isUpdating } = useUpdateProductType();
  const { mutate: mutateCreate, isPending: isCreating } = useCreateProductType();

  const [editingProductType, setEditingProductType] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: productTypes = [], pagination = {} } = data || {};
  const { totalPages, total } = pagination || {};

  const handleEdit = (productType: any) => {
    setEditingProductType(productType);
    setIsDialogOpen(true);
  };

  const handleSubmitEdit = (data: any) => {
    console.log("[v0] Edit product type data:", data);
    mutateUpdate({
      id: data.id,
      payload: data,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa loại sản phẩm này?")) {
      console.log("[v0] Delete product type:", id);
    }
  };

  const handleCreate = () => {
    setEditingProductType(null);
    setIsDialogOpen(true);
  };

  const handleSubmitCreate = (data: any) => {
    console.log("[v0] Create product type data:", data);
    mutateCreate({
      payload: data,
    });
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Quản lý loại sản phẩm
          </h1>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm loại sản phẩm
        </Button>
      </div>

      <Card>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên loại sản phẩm</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productTypes?.length > 0 ? (
                productTypes?.map((productType: any) => (
                  <TableRow key={productType.id}> 
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-navy-100 rounded-lg flex items-center justify-center">
                          <FolderOpen className="w-5 h-5 text-navy-600" />
                        </div>
                        <div>
                          <div className="font-medium">{productType.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {productType.slug}
                      </code>
                    </TableCell>
                    {/* <TableCell className="text-center">
                      {productType.children.length > 0 ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/admin/product-types/${productType.id}`)}
                          className="text-primary"
                        >
                          {productType.children.length} danh mục
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell> */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(productType)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(productType.id)}
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

      <ProductTypeDialog
        productType={editingProductType}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onHandleSubmitEdit={handleSubmitEdit}
        onHandleSubmitCreate={handleSubmitCreate}
      />
    </div>
  );
}
