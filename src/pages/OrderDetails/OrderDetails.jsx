import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./OrderDetails.scss";

function OrderDetails() {
  const { id } = useParams();
  const orders = useSelector((state) => state.orders.list);
  
  const order = orders[id];
  const navigate = useNavigate();

  if (!order) {
    return <p>Order not found!</p>;
  }

  return (
    <div className="order-details-page">
      <div className="title">
      <img onClick={() => navigate('/my-orders')} src="/back.png" alt="" />
      <p>My Order</p>
      </div>

      <div className="order-details">
        
        <div className="order-items-list">
          {order.items.map((item) => (
            <div key={item.id} className="order-item">
              <img src={item.image} alt={item.title} className="item-image" />
              <div className="item-info">
                <p className="item-title">{item.title}</p>
                
                <p className="item-price">
                  ${item.price.toFixed(2)}
                </p>

                <span className="item-quantity">
                  {item.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
