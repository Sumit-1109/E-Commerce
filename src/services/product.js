

export const getCategories = () => {
    return fetch('https://api.escuelajs.co/api/v1/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  

export const getProductsByCategory = (categorySlug = '') => {
    const url = categorySlug
      ? `https://api.escuelajs.co/api/v1/products/?categorySlug=${categorySlug}`
      : 'https://api.escuelajs.co/api/v1/products';
  
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  