"use client";

import type React from "react";

import { useState, useRef, useEffect, useMemo } from "react";
import { X, ChevronDown, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tag } from "../ui/tag";
import { useBlogTags } from "@/hooks/admin/useBlogTags";
import { useProductTypes } from "@/hooks/admin/useProductTypes";

interface ProductTypeSelectorProps {
  value: any;
  onChange: (productTypeId: any) => void;
  initialName?: any;
  inputClassName?: string;
}

export function ProductTypeSelector({
  value = "",
  onChange,
  inputClassName = "",
  initialName = "",
}: ProductTypeSelectorProps) {
  const [inputProductType, setInputProductType] = useState("");
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: productTypes = [] }: any = useProductTypes();

  const { data: listProductTypes = [] } = productTypes || {};

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  

  console.log("[v0] filteredTags:", value);

  const filteredProductTypes = useMemo(() => {
    return listProductTypes.filter(
      (productType: any) =>
        value !== productType.id &&
        productType.name.toLowerCase().includes(inputProductType.toLowerCase())
    );
  }, [value, inputProductType, listProductTypes]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <Input
          placeholder="Chọn loại sản phẩm..."
          value={inputProductType || initialName || ""}
          onChange={(e) => {
            setInputProductType(e.target.value);
            onChange("");
            setIsOpenDropdown(true);
          }}
          onFocus={() => setIsOpenDropdown(true)}
          className={inputClassName}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
          onClick={() => setIsOpenDropdown(!isOpenDropdown)}
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpenDropdown ? "rotate-180" : ""
            }`}
          />
        </Button>
      </div>

      {isOpenDropdown && (
        <div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredProductTypes.length > 0 ? (
            <div className="py-1">
              {filteredProductTypes.map((productType: any) => (
                <button
                  key={productType?.id}
                  type="button"
                  onClick={() => {
                    onChange(productType.id);
                    setInputProductType(productType.name);
                    setIsOpenDropdown(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-accent flex items-center gap-2 text-sm"
                >
                  <span>{productType.name}</span>
                  {value === productType.id && (
                    <Check className="w-4 h-4 ml-auto" />
                  )}
                </button>
              ))}
            </div>
          ) : inputProductType.trim() ? (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              Nhấn Enter để thêm "{inputProductType.trim()}"
            </div>
          ) : (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              Không tìm thấy loại sản phẩm nào
            </div>
          )}
        </div>
      )}
    </div>
  );
}
