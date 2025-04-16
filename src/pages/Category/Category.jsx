import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setCategory } from "../../store/slices/categorySlice";
import { getProductsByCategory } from "../../services/product";
import { addToCart } from "../../store/slices/cartSlice";
import { useSelector } from "react-redux";
import "./Category.scss";

function Category() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const cartItems = useSelector((state) => state.cart.items);

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
          console.log(data);
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

  if (loading) {
    return <div className="loading-text">Loading products...</div>;
  }

  return (
    <div className="products-section">
      <div className="search-bar">
        <input type="text" placeholder="Search products..." disabled />
      </div>

      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => {
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
          <p className="no-products">No products found in this category.</p>
        )}
      </div>
    </div>
  );
}

export default Category;
