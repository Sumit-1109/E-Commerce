export const getCategories = () => {
  return fetch('https://api.escuelajs.co/api/v1/categories', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getProductsByCategory = async (categorySlug = '') => {

  const categoriesRes = await fetch('https://api.escuelajs.co/api/v1/categories');
  const categoriesData = await categoriesRes.json();

  const category = categoriesData.find(cat => cat.slug === categorySlug);
  const categoryId = category ? category.id : '';

  const url = categoryId
    ? `https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`
    : 'https://api.escuelajs.co/api/v1/products';

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

