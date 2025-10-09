"use client"
import { Button } from "@/components/ui/button"
import { Plus, ChevronRight, ChevronLeft, FolderOpen, Edit, Trash2, Pencil } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CommonPagination } from "@/components/ui/common-pagination"
import { CategoryDialog } from "@/components/admin/category-dialog"
import { useCategories, useCreateCategory, useUpdateCategory } from "@/hooks/admin/useCategories"
import { useState } from "react"

// Mock data for subcategories
const mockSubcategories: Record<string, any[]> = {
  "1": [
    {
      id: "2",
      name: "Máy siêu âm",
      slug: "may-sieu-am",
      description: "Thiết bị siêu âm y khoa",
      childCount: 2,
      productCount: 8,
      level: 2,
    },
    {
      id: "5",
      name: "Máy X-quang",
      slug: "may-x-quang",
      description: "Thiết bị chụp X-quang",
      childCount: 1,
      productCount: 7,
      level: 2,
    },
  ],
  "2": [
    {
      id: "3",
      name: "Siêu âm 4D",
      slug: "sieu-am-4d",
      description: "Máy siêu âm 4 chiều",
      childCount: 0,
      productCount: 4,
      level: 3,
    },
    {
      id: "4",
      name: "Siêu âm Doppler",
      slug: "sieu-am-doppler",
      description: "Siêu âm Doppler màu",
      childCount: 0,
      productCount: 4,
      level: 3,
    },
  ],
}

const categoryNames: Record<string, string> = {
  "1": "Thiết bị chẩn đoán hình ảnh",
  "2": "Máy siêu âm",
  "7": "Thiết bị hồi sức",
}

export default function CategoryDetailPage() {
  // const params = useParams()
  // const router = useRouter()
  // const categoryId = params.id as string
  // const subcategories = mockSubcategories[categoryId] || []
  // const categoryName = categoryNames[categoryId] || "Danh mục"
  // const isLevel3 = subcategories.length > 0 && subcategories[0].level === 3

  // const handleDelete = (id: string) => {
  //   if (confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
  //     // Handle delete
  //   }
  // }

  // return (
  //   <div className="space-y-6">
  //     <div className="flex items-center justify-between">
  //       <div className="space-y-1">
  //         <div className="flex items-center gap-2">
  //           <Button variant="ghost" size="sm" onClick={() => router.back()}>
  //             <ChevronLeft className="w-4 h-4 mr-1" />
  //             Quay lại
  //           </Button>
  //         </div>
  //         <h1 className="text-3xl font-bold text-foreground">{categoryName}</h1>
  //         <p className="text-muted-foreground">
  //           {isLevel3 ? "Danh mục cấp 3 (cuối cùng)" : "Nhấn vào để xem danh mục con"}
  //         </p>
  //       </div>
  //       <div className="flex items-center gap-2">
  //         <Link href={`/admin/categories/edit/${categoryId}`}>
  //           <Button variant="outline">
  //             <Edit className="w-4 h-4 mr-2" />
  //             Sửa danh mục này
  //           </Button>
  //         </Link>
  //         <Link href={`/admin/categories/create?parent=${categoryId}`}>
  //           <Button>
  //             <Plus className="w-4 h-4 mr-2" />
  //             Thêm danh mục con
  //           </Button>
  //         </Link>
  //       </div>
  //     </div>

  //     {subcategories.length === 0 ? (
  //       <Card>
  //         <CardContent className="flex flex-col items-center justify-center py-12">
  //           <FolderOpen className="w-12 h-12 text-muted-foreground mb-4" />
  //           <p className="text-lg font-medium text-foreground">Chưa có danh mục con</p>
  //           <p className="text-sm text-muted-foreground mb-4">Thêm danh mục con để tổ chức sản phẩm tốt hơn</p>
  //           <Link href={`/admin/categories/create?parent=${categoryId}`}>
  //             <Button>
  //               <Plus className="w-4 h-4 mr-2" />
  //               Thêm danh mục con đầu tiên
  //             </Button>
  //           </Link>
  //         </CardContent>
  //       </Card>
  //     ) : isLevel3 ? (
  //       <Card>
  //         <CardHeader>
  //           <CardTitle>Danh sách danh mục cấp 3</CardTitle>
  //           <CardDescription>Đây là cấp danh mục cuối cùng, không thể thêm danh mục con</CardDescription>
  //         </CardHeader>
  //         <CardContent>
  //           <Table>
  //             <TableHeader>
  //               <TableRow>
  //                 <TableHead>Tên danh mục</TableHead>
  //                 <TableHead>Slug</TableHead>
  //                 <TableHead>Mô tả</TableHead>
  //                 <TableHead className="text-right">Sản phẩm</TableHead>
  //                 <TableHead className="text-right">Thao tác</TableHead>
  //               </TableRow>
  //             </TableHeader>
  //             <TableBody>
  //               {subcategories.map((category) => (
  //                 <TableRow key={category.id}>
  //                   <TableCell className="font-medium">{category.name}</TableCell>
  //                   <TableCell>
  //                     <code className="text-xs bg-muted px-2 py-1 rounded">{category.slug}</code>
  //                   </TableCell>
  //                   <TableCell className="text-muted-foreground">{category.description}</TableCell>
  //                   <TableCell className="text-right">
  //                     <Badge variant="secondary">{category.productCount}</Badge>
  //                   </TableCell>
  //                   <TableCell className="text-right">
  //                     <div className="flex items-center justify-end gap-2">
  //                       <Link href={`/admin/categories/edit/${category.id}`}>
  //                         <Button variant="ghost" size="sm">
  //                           <Edit className="w-4 h-4" />
  //                         </Button>
  //                       </Link>
  //                       <Button variant="ghost" size="sm" onClick={() => handleDelete(category.id)}>
  //                         <Trash2 className="w-4 h-4 text-destructive" />
  //                       </Button>
  //                     </div>
  //                   </TableCell>
  //                 </TableRow>
  //               ))}
  //             </TableBody>
  //           </Table>
  //         </CardContent>
  //       </Card>
  //     ) : (
  //       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  //         {subcategories.map((category) => (
  //           <Card
  //             key={category.id}
  //             className="hover:shadow-lg transition-shadow cursor-pointer group"
  //             onClick={() => router.push(`/admin/categories/${category.id}`)}
  //           >
  //             <CardHeader>
  //               <div className="flex items-start justify-between">
  //                 <div className="flex items-center gap-3">
  //                   <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors">
  //                     <FolderOpen className="w-6 h-6 text-teal-600" />
  //                   </div>
  //                   <div>
  //                     <CardTitle className="text-lg">{category.name}</CardTitle>
  //                     <CardDescription className="text-sm mt-1">{category.slug}</CardDescription>
  //                   </div>
  //                 </div>
  //                 <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
  //               </div>
  //             </CardHeader>
  //             <CardContent>
  //               <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
  //               <div className="flex items-center gap-4 text-sm">
  //                 <div className="flex items-center gap-1">
  //                   <span className="font-medium text-foreground">{category.childCount}</span>
  //                   <span className="text-muted-foreground">danh mục con</span>
  //                 </div>
  //                 <div className="flex items-center gap-1">
  //                   <span className="font-medium text-foreground">{category.productCount}</span>
  //                   <span className="text-muted-foreground">sản phẩm</span>
  //                 </div>
  //               </div>
  //             </CardContent>
  //           </Card>
  //         ))}
  //       </div>
  //     )}
  //   </div>
  // )
  const params = useParams()
  const router = useRouter()
  const categoryId = params.id as string
  const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const [condition, setCondition] = useState({
    search: "",
    parentId: categoryId,
  });
  const { data, isLoading, isError } = useCategories({
    page,
    search: condition.search,
    parentId: condition.parentId,
  });
  const { mutate: mutateUpdate, isPending: isUpdating } = useUpdateCategory();
  const { mutate: mutateCreate, isPending: isCreating } = useCreateCategory();

  const [selectedCategory, setSelectedCategory] = useState<any | null>(
    null
  );
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: categories, pagination } = data || {};
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

  const handleShowCategory = (category: any) => {
    setSelectedCategory(category);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Quản lý danh mục
          </h1>
          <p className="text-muted-foreground mt-1">
            {/* {selectedCategory
              ? `Danh mục con của "${selectedCategory.name}"`
              : "Danh mục cấp 1"} */}
            Danh mục cấp 1
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm danh mục
        </Button>
      </div>

      {/* {selectedCategory && (
        <div className="flex items-center gap-2 text-sm">
          <Button variant="ghost" size="sm" onClick={() => setSelectedCategory(null)}>
            Tất cả danh mục
          </Button>
          {getBreadcrumb().map((cat, index) => (
            <div key={cat.id} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className={index === getBreadcrumb().length - 1 ? "font-semibold" : ""}
              >
                {cat.name}
              </Button>
            </div>
          ))}
        </div>
      )} */}

      <Card>
        <CardHeader>
          <CardTitle>
            {/* {selectedCategory
              ? `Danh mục cấp ${selectedCategory.level + 1}`
              : "Danh mục cấp 1"} */}
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
                {/* <TableHead>Mô tả</TableHead> */}
                <TableHead className="text-center">Danh mục con</TableHead>
                {/* <TableHead className="text-center">Sản phẩm</TableHead> */}
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
                    {/* <TableCell className="max-w-xs">
                      <p className="text-sm text-muted-foreground truncate">
                        {category.description}
                      </p>
                    </TableCell> */}
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
                    {/* <TableCell className="text-center">
                      <Badge variant="secondary">{category.productCount}</Badge>
                    </TableCell> */}
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
