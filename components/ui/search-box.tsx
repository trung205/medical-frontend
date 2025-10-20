"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { useProducts } from "@/hooks/user/useProducts";
import { useDebounce } from "@/hooks/common/useDebounce";
import { getImageProduct } from "@/utils/images";
import { useRouter } from "next/navigation"

interface Product {
  id: number;
  name: string;
  image: string;
  description?: string;
}

export default function SearchBox() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<Product[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [suggestions] = React.useState([
    ""
  ]);
  const debouncedSearch = useDebounce(query, 500);

  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { data: products }: any = useProducts(
    {
      search: debouncedSearch,
      limit: 6,
    },
    {
      enabled: !!debouncedSearch,
    }
  );

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleShowProductDetail = (product: any) => {
    router.push(`/san-pham/chi-tiet/${product?.slug || ""}`);
  };

  React.useEffect(() => {
    if (products) {
      setResults(products?.data || []);
    }
  }, [products]);

  React.useEffect(() => {
    if (!query) {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="relative hidden md:flex items-center bg-secondary rounded-lg px-3 py-2 min-w-[300px] bg-white">
      <Search className="h-4 w-4 text-muted-foreground mr-2" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Tìm kiếm ..."
        className="bg-white border-none outline-none flex-1 text-sm"
        value={query}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-64 overflow-y-auto z-50"
        >
          {loading ? (
            <div className="p-3 text-sm text-gray-500">Đang tìm kiếm...</div>
          ) : results.length > 0 ? (
            results.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  handleShowProductDetail(item);
                }}
              >
                <img
                  src={getImageProduct(item?.images?.[0]) || "/placeholder.svg"}
                  alt={item.name}
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="flex-1 w-full overflow-hidden">
                  <div className="font-medium text-sm truncate">
                    {item.name}
                  </div>
                  {/* {item.description && (
                    <div className="text-xs text-gray-500 truncate">
                      {item.description}
                    </div>
                  )} */}
                </div>
              </div>
            ))
          ) : query ? (
            <div className="p-3 text-sm text-gray-500">
              Không tìm thấy kết quả.
            </div>
          ) : (
            <>
              <div className="p-2 text-xs text-gray-500">Từ khóa phổ biến</div>
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => {
                    setQuery(s);
                  }}
                >
                  {s}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
