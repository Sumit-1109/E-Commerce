import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../store/slices/categorySlice";
import { getCategories } from "../../services/product";

function Navbar() {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.category.selectedCategory);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();

        if (res.status === 200) {
          const data = await res.json();
          const formatted = data.map((category) => ({
            name: category.name,
            slug: category.slug,
          }));
          setCategories(formatted);
        }
      } catch (error) {
        alert("Failed to load categories");
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const visibleCategories = categories
    .filter((category) => !category.name.includes(" "))
    .slice(0, 4);
  const moreCategories = categories.filter(
    (cat) => cat.name.includes(" ") || !visibleCategories.includes(cat)
  );

  const handleClick = (categorySlug) => {
    dispatch(setCategory(categorySlug));
  };

  if (loading) {
    return (
      <div className="navbar loading-navbar">
        <div className="right-section">
          <div className="skeleton skeleton-logo" />
          <div className="skeleton skeleton-link" />
          <div className="skeleton skeleton-link" />
          <div className="skeleton skeleton-link" />
        </div>
      </div>
    );
  }

  return (
    <div className="navbar">
      <div className="right-section">
        <NavLink to="/" className="logo-text">
          Shopi
        </NavLink>

        <NavLink
          to="/"
          onClick={() => handleClick("All")}
          className={`category-text ${selected === "All" ? "active" : ""}`}
        >
          All {selected === "All" && <span className="underline" />}
        </NavLink>

        {visibleCategories.map((category) => (
          <NavLink
            key={category.slug}
            to={`/${category.slug}`}
            onClick={() => handleClick(category.slug)}
            className={`category-text ${
              selected === category.slug ? "active" : ""
            }`}
          >
            {category.name}
            {selected === category.slug && <span className="underline" />}
          </NavLink>
        ))}

        {moreCategories.length > 0 && (
          <div className="dropdown">
            <span className="category-text">More ▾</span>
            <div className="dropdown-content">
              {moreCategories.map((category) => (
                <NavLink
                  key={category.slug}
                  to={`/${category.slug}`}
                  onClick={() => handleClick(category.slug)}
                  className={`dropdown-item ${
                    selected === category.slug ? "active" : ""
                  }`}
                >
                  {category.name}
                  {selected === category.slug && <span className="underline" />}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="right-section">
        <p className="username">Name</p>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive ? "navlink active" : "navlink"
          }
        >
          My Orders
          {selected === "orders" && <span className="underline" />}
        </NavLink>

        <NavLink
          to="/account"
          className={({ isActive }) =>
            isActive ? "navlink active" : "navlink"
          }
        >
          My Account
          {selected === "account" && <span className="underline" />}
        </NavLink>

        <div className="cart-icon">
          <img src="/cart.png" alt="cart" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
