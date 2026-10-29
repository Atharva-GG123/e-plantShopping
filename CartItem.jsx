import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import { Navbar } from "./ProductList";

export default function CartItem({
  onHomeClick,
  onPlantsClick,
  onContinueShopping,
}) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.cost * item.quantity,
    0
  );

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-page">
      <Navbar
        onHomeClick={onHomeClick}
        onPlantsClick={onPlantsClick}
        onCartClick={() => {}}
        totalItems={totalItems}
      />

      <h1>Your Shopping Cart</h1>
      <h2>Total Cart Amount: ${totalAmount.toFixed(2)}</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. Browse our plants to get started!</p>
      ) : (
        cartItems.map((item) => (
          <article className="cart-item" key={item.name}>
            <img src={item.image} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>Unit price: ${item.cost.toFixed(2)}</p>
              <div className="quantity-controls">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                  aria-label={`Decrease ${item.name} quantity`}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                  aria-label={`Increase ${item.name} quantity`}
                >
                  +
                </button>
              </div>
              <p>Subtotal: ${(item.cost * item.quantity).toFixed(2)}</p>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </article>
        ))
      )}

      <div className="cart-actions">
        <button className="get-started-button" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <button
          className="get-started-button1"
          onClick={() => window.alert("Coming Soon")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
