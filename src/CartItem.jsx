import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const item = useSelector(state =>
    state.cart.items.find(i => i.name === props.item.name)
  );
  const totalCost = useSelector(state =>
    state.cart.items.reduce((sum, i) => {
        const price = parseFloat(i.cost.substring(1));
        return sum + price * i.quantity;
    }, 0)
  );
  const totalItems = useSelector(state =>
    state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
  );
  const cartItems = useSelector(state => state.cart.items);
  const isAdded = cartItems.some(i => i.name === plant.name);
  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;

    cart.forEach(item => {
        const { quantity, cost } = item;
        const price = parseFloat(cost.substring(1)); // remove "$" and convert to number
        total += price * quantity;
    });

  return total;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
  alert('Functionality to be added for future reference');
  };


  const handleIncrement = (item) => {
    dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity + 1
    }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1
      }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const unitPrice = parseFloat(item.cost.substring(1)); // removes '$' and converts to number
    return unitPrice * item.quantity;
  };


  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                    disabled={isAdded}
                    style={{
                        backgroundColor: isAdded ? 'gray' : 'palegreen',
                        cursor: isAdded ? 'not-allowed' : 'pointer'
                    }}
                    onClick={() => dispatch(addItem(plant))}
                >
                    {isAdded ? 'Added to Cart' : 'Add to Cart'}
                </button>
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


