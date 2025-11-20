"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useRouter } from "next/navigation"


export function ProductFilters({
  slug = '',
  productTypeSlug = '',
}: any) {
  const router = useRouter();

  const {data: categoriesData}: any = useCategories({
    productTypeSlug,
    limit: 0,
    sortName: 'asc'
  }, {
    onSuccess: (data: any) => {
      console.log(data)
    }
  });

  const categoryList = useMemo(() => buildCategoryTree(categoriesData?.data || []), [categoriesData]);


  const onCategorySelect = (categorySlug: string) => {
    router.push(`/san-pham/${productTypeSlug}/${categorySlug}`);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Danh Mục</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={category} />
              <Label htmlFor={category} className="text-sm font-normal">
                {category}
              </Label>
            </div>
          ))} */}
          {categoryList?.map((category) => (
            <CategoryItem
              key={category.slug}
              category={category}
              onCategorySelect={onCategorySelect}
              currentSlug={slug}
              depth={0}
            />
          ))}
        </CardContent>
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle className="text-lg">Thương Hiệu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox id={brand} />
              <Label htmlFor={brand} className="text-sm font-normal">
                {brand}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card> */}

      {/* <Card>
        <CardHeader>
          <CardTitle className="text-lg">Khoảng Giá</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={1000000000}
              step={1000000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{priceRange[0].toLocaleString("vi-VN")} VNĐ</span>
              <span>{priceRange[1].toLocaleString("vi-VN")} VNĐ</span>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
}

import { ChevronRight, ChevronDown } from 'lucide-react'; 
import { useCategories } from "@/hooks/user/useCategories"

// Component này sẽ tự gọi lại chính nó
const CategoryItem = ({ category, onCategorySelect, currentSlug = '', depth = 0 }: any) => {
  // Quản lý trạng thái mở/đóng của danh mục con
  const [isOpen, setIsOpen] = useState(false);
  
  // Kiểm tra xem danh mục có con hay không
  const hasChildren = category.children && category.children.length > 0;
  
  // Tính toán lề để tạo hiệu ứng cấp bậc
  const paddingLeft = `${depth * 16}px`; // Mỗi cấp bậc lùi vào 16px (1rem)

  const isActive = category.slug === currentSlug;

  // Hàm xử lý khi click vào mũi tên
  const handleToggle = (e: any) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền lên Checkbox/Label
    setIsOpen(!isOpen);
  };

  // Hàm xử lý khi chọn Checkbox
  const handleSelect = () => {
    onCategorySelect(category.slug);
  };

   useEffect(() => {
    // Chỉ cần kiểm tra nếu có con và có slug để tìm
    if (category.children && category.children.length > 0 && currentSlug) {
      
      // KIỂM TRA ĐỆ QUY TỪ CÁC CON TRỰC TIẾP
      const isDescendantActive = isSlugInSubtree(category.children, currentSlug);
      
      // Nếu bất kỳ con cháu nào đang active, mở danh mục cha này
      if (isDescendantActive) {
        setIsOpen(true);
      }
    }
  }, [category.children, currentSlug]);

  return (
    <div className="space-y-2">
      <div 
        className={`flex items-center space-x-2 w-full cursor-pointer p-1 rounded transition-colors ${
          isActive 
            ? 'bg-[#E5EFFA]  font-semibold' // Style khi ACTIVE
            : 'hover:bg-gray-50'                        // Style mặc định
        }`}
        style={{ paddingLeft: paddingLeft }}
        onClick={handleSelect}
      >
        {/* 1. Mũi tên */}
        {hasChildren ? (
          <div className={`p-1 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} onClick={handleToggle}>
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </div>
        ) : (
          <div className="h-6 w-6 p-1"></div> 
        )}

        {/* 3. Label */}
        <Label 
          htmlFor={category.id.toString()} 
          className={`text-sm flex-1 cursor-pointer ${isActive ? 'font-semibold' : 'font-normal'}`}
        >
          {category.name}
        </Label>
      </div>

      {/* 4. Danh sách con */}
      {isOpen && hasChildren && (
        <div className="ml-0">
          {category.children.map((child: any) => (
            <CategoryItem 
              key={child.id} 
              category={child} 
              onCategorySelect={onCategorySelect} 
              currentSlug={currentSlug} // TRUYỀN TIẾP XUỐNG
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryItem;

const buildCategoryTree = (categories: any = []) => {
  const map: any = {};
  const tree: any[] = [];

  categories?.forEach((cat: any) => {
    map[cat.id] = { ...cat, children: [] };
  });

  categories?.forEach((cat: any) => {
    if (cat.parentId === null) {
      tree.push(map[cat.id]);
    } else if (map[cat.parentId]) {
      map[cat.parentId].children.push(map[cat.id]);
    }
  });

  return tree;
};


const isSlugInSubtree = (children: any[], targetSlug: string): boolean => {
  if (!children || !targetSlug) return false;

  for (const child of children) {
    // 1. Kiểm tra bản thân category con này
    if (child.slug === targetSlug) {
      return true;
    }
    
    // 2. Kiểm tra đệ quy các cháu của nó
    if (child.children && child.children.length > 0) {
      if (isSlugInSubtree(child.children, targetSlug)) {
        return true;
      }
    }
  }
  return false;
};