import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import {
  getProductType,
  getProductTypes,
} from "@/services/public/productTypesService";

export const useProductTypes = (params?: any, options?: any) => {
  return useQuery({
    queryKey: ["product-types", params],
    queryFn: () => getProductTypes(params),
    select: (res: any) => res.data,
    ...options,
  });
};

export const useProductType = (id: number) => {
  return useQuery({
    queryKey: ["product-type", id],
    queryFn: () => getProductType(id),
    select: (res: any) => res.data,
  });
};

