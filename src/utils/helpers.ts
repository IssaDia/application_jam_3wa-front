import { Category, Product } from "../useCases/entities";

export const filterProductsByType = (
  products: Product[],
  categories: Category[],
  selectedType: string
) => {
  if (selectedType === "") {
    return products;
  }

  const productsByType: Product[] = [];

  const categoryFiltered = categories?.filter((category: Category) => {
    return category.name === selectedType;
  });

  categoryFiltered?.forEach((category: Category) => {
    const categoryProducts = category.products;
    categoryProducts.forEach((product) => {
      productsByType.push(product);
    });
  });

  return productsByType;
};
export const filterProductsByPrice = (
  products: Product[],
  min: number,
  max: number
) => {
  return products?.filter((product: Product) => {
    const price = product.price;
    return price >= min && price <= max;
  });
};
export const filterProductsBySearch = (
  products: Product[],
  inputValue: string
) => {
  if (!inputValue) {
    return products;
  }

  return products?.filter((product: Product) => {
    return product.name.toLowerCase().includes(inputValue.toLowerCase());
  });
};
export const sortProducts = (
  products: Product[],
  field: string,
  order: string
) => {
  return [...products].sort((a, b) => {
    if (field === "name") {
      if (order === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    } else if (field === "price") {
      if (order === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    }
    return 0;
  });
};
