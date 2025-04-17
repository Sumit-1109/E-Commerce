import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setCategory } from "../../store/slices/categorySlice";
import { getProductsByCategory } from "../../services/product";
import { addToCart } from "../../store/slices/cartSlice";
import "./Category.scss";

function Category() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [animateGrid, setAnimateGrid] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    setAnimateGrid(false);
    const timer = setTimeout(() => {
      setAnimateGrid(true);
    }, 50);
  
    return () => clearTimeout(timer);
  }, [filteredProducts]);
  

  useEffect(() => {
    dispatch(setCategory(slug ? slug : "All"));
  }, [slug, dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProductsByCategory(slug);
  
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
          setFilteredProducts(data);
        } else {
          alert("Failed to fetch products");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [slug]);  

  useEffect(() => {
    let result = [...products];

    if (search) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredProducts(result);
  }, [search, sort, priceRange, products]);

  if (loading) {
    return <div className="loading-text">Loading products...</div>;
  }

  return (
    <div className="products-section">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Sort By</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name (A-Z)</option>
        </select>

        <div className="price-filter">
          <label>
            Min:{" "}
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              min={0}
            />
          </label>
          <label>
            Max:{" "}
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              min={0}
            />
          </label>
        </div>
      </div>

      <div className={`products-grid ${animateGrid ? "slide-in-top" : ""}`}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const isInCart = cartItems.some((item) => item.id === product.id);

            return (
              <div key={product.id} className="product-card">
                <button
                  className={`add-btn ${isInCart ? "added" : ""}`}
                  onClick={() => {
                    if (!isInCart) {
                      dispatch(
                        addToCart({
                          id: product.id,
                          title: product.title,
                          price: product.price,
                          image: product.images[0],
                        })
                      );
                    }
                  }}
                >
                  {isInCart ? "✓" : "+"}
                </button>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="product-img"
                />
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">${product.price}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-products">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default Category;