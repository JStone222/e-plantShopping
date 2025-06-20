import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export function calculateTotalAmount(cart) {
    let total = 0;
    cart.forEach(item => {
      const price = parseFloat(item.cost.substring(1));
      total += price * item.quantity;
    });
    return total.toFixed(2);
}

const CartItem = ({ name, image, cost, quantity, onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items, shallowEqual);
    const dispatch = useDispatch();
  
    // Track "added" status to disable button
    const [added, setAdded] = useState(false);

    // Handlers
    const handleAdd = () => {
    dispatch(addItem({ cart, name, image, cost}));
    setAdded(true);
    };
    const totalQty = cart.reduce((sum, i) => sum + i.quantity, 0);
    const totalAmount = calculateTotalAmount(cart);
  
    const handleContinueShopping = (e) => {
      if (onContinueShopping) onContinueShopping(e);
    };
  
    const handleCheckoutShopping = () => {
      alert('Functionality to be added for future reference');
    };
  
    const handleIncrement = (item) => {
      dispatch(updateQuantity({ name, quantity: item.quantity + 1 }));
    };
  
    const handleDecrement = (item) => {
      if (item.quantity > 1) {
        dispatch(updateQuantity({ name, quantity: item.quantity - 1 }));
      } else {
        dispatch(removeItem(item.name));
      }
    };
  
    const handleRemove = (item) => {
      dispatch(removeItem(item.name));
    };
  
    const subtotal = (item) =>
      (parseFloat(item.cost.substring(1)) * item.quantity).toFixed(2);
  
    return (
      <div className="cart-container">
        <h2>
            Cart ({totalQty} item{totalQty !== 1 && 's'}):{' '}
            {currencyFormatter.format(totalAmount)}
        </h2>
        <div>
          {cart.map(item => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{currencyFormatter.format(item.cost)}</div>
                <div className="cart-item-quantity">
                  <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                </div>
                <div className="cart-item-total">Total: ${subtotal(item)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
    
                </div>
            </div>
          ))}
        </div>
        <div className="continue_shopping_btn">
          <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
          <br />
          <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
        </div>
      </div>
    );
};




export default CartItem;
