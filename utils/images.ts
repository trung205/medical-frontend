const DEFAULT_LINK = process.env.NEXT_PUBLIC_API_URL || "/placeholder.svg";

export const getImageBlog = (id?: string) => {
  return id ? DEFAULT_LINK + `/blogs/thumbnail/${id}` : '';
};

export const getImageProduct = (image?: any) => {
  return image ? `${DEFAULT_LINK}/products/${image.productId}/images/${image.id}` : '';
};
