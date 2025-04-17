import React from "react";
import "./Order.scss";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Order() {
  const orders = useSelector((state) => state.orders.list);

  return (
    <div className="orders-page">
      
      <p className="title">My Order</p>

      <div className="orders-list">
        {orders.length === 0 ? (
          <p>Nothing yet, add some products and check them out :\</p>
        ) : (
          orders.map((order, index) => (
            <NavLink
              to={`/my-orders/${index}`}
              key={order.id}
              className="order-card"
            >
              <div className="order-info">
                <p className="order-date">{order.date}</p>
                <p className="order-items">{order.items.length} items</p>
              </div>

              <p className="order-total">${order.total.toFixed(2)}</p>

              
            </NavLink>
          ))
        )}
      </div>
    </div>
  );
}

export default Order;
