export const fetchProducts = async () => {
  return await fetch(`${import.meta.env.VITE_API_URL}/api/products`).then(
    (response) => response.json()
  );
};
