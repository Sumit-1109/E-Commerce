import React from 'react'
import "./Modal.scss";
import { useDispatch, useSelector } from 'react-redux'
import { closeCart, closeProductDetail } from '../../store/slices/modalSlice';
import { addToCart, updateQuantity, removeFromCart, clearCart } from '../../store/slices/cartSlice';
import { addOrder } from '../../store/slices/orderslice';
import { useNavigate } from 'react-router-dom';

function Modal() {

    const dispatch = useDispatch();
    const { cartOpen, productDetail = {} } = useSelector((state) => state.modal);
    const cartItems = useSelector((state) => state.cart.items);
    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const navigate = useNavigate();
    const orders = useSelector((state) => state.orders.list);

    if (!cartOpen && (!productDetail || !productDetail.open)) return null;

    const closeAll = () => {
        dispatch(closeCart());
        dispatch(closeProductDetail());
    };

    const handleCheckOut = () => {
        if(cartItems.length === 0) return;

        const newOrder = {
            id : Date.now(),
            items : cartItems,
            total : totalPrice,
            date : new Date().toLocaleString(),
        };

        const newOrderIndex = orders.length;

        dispatch(addOrder(newOrder));
        dispatch(clearCart());
        closeAll();
        navigate(`/home/my-orders/${newOrderIndex}`)
    }

  return (
    <div className='modal-overlay' onClick={closeAll}>
      
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
    {
        cartOpen && (
            <div className='cart-modal'>
                <h2>My order</h2>
                
                <div className="cart-items">
                {
                    cartItems.length  > 0 && (
                        cartItems.map((item) => (
                            <div key={item.id} className='cart-item'>
                                <img src={item.image} alt="item.title" />
                                <div className="product-info-cart">
                                    <p>{item.title}</p>
                                    <p>{item.price}</p>
                                    <div className="quantity-decider">
                                        <button onClick={() => {
                                            if (item.quantity === 1) {
                                                dispatch(removeFromCart(item.id));
                                            } else {
                                                dispatch(updateQuantity({ id : item.id, quantity : item.quantity - 1}))
                                            }
                                        }}>-</button>
                                        <p>{item.quantity}</p>
                                        <button onClick={() => dispatch(addToCart(item))}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                }
                </div>

                <div className="checkout">
                    
                    <div className="amount">
                    <p>Total : </p>
                    <p>{totalPrice.toFixed(2)}</p>
                    </div>

                    <button onClick={handleCheckOut}>Checkout</button>
                </div>
            </div>
        )
    }

    {productDetail.open && productDetail.product && (
          <div className="product-detail-modal">
            <h2>{productDetail.product.title}</h2>
            <img
              src={productDetail.product.image}
              alt={productDetail.product.title}
            />
            <p>${productDetail.product.price}</p>
            <p>{productDetail.product.description || "No description"}</p>
          </div>
        )}
      </div>

    </div>
  )
}

export default Modal
