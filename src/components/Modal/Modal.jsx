import React from 'react'
import "./Modal.scss";
import { useDispatch, useSelector } from 'react-redux'
import { closeCart, closeProductDetail } from '../../store/slices/modalSlice';
import { addToCart, updateQuantity, removeFromCart } from '../../store/slices/cartSlice';

function Modal() {

    const dispatch = useDispatch();
    const { cartOpen, productDetail = {} } = useSelector((state) => state.modal);
    const cartItems = useSelector((state) => state.cart.items);

    if (!cartOpen && (!productDetail || !productDetail.open)) return null;

    const closeAll = () => {
        dispatch(closeCart());
        dispatch(closeProductDetail());
    };

  return (
    <div className='modal-overlay' onClick={closeAll}>
      
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
    {
        cartOpen && (
            <div className='cart-modal'>
                <h2>My order</h2>
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
