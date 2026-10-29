import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cartActions } from "../store/CartSlice";
import "./CartItem.css";

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + Number(item.cost ?? item.price ?? 0) * item.quantity,
    0
  );

  const handleIncrement = (item) => {
    dispatch(
      cartActions.updateQuantity({
        id: item.id,
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity <= 1) {
      dispatch(cartActions.removeItem(item.id ?? item.name));
    } else {
      dispatch(
        cartActions.updateQuantity({
          id: item.id,
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  const handleRemove = (item) => {
    dispatch(cartActions.removeItem(item.id ?? item.name));
  };

  const handleCheckout = () => {
    alert("Coming Soon");
  };

  const handleContinueShopping = (e) => {
    if (e) e.preventDefault();

    if (onContinueShopping) {
      onContinueShopping(e);
    } else {
      navigate("/products");
    }
  };

return (
    <>
      <Navbar />
      <div className="cart-page">
      <h1 className="page-title">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Discover beautiful plants for your home!</p>
          <button
            className="get-started-button"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-container">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id ?? item.name}>
                <img
                  className="item-image"
                  src={item.image}
                  alt={item.name}
                />

                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>
                    Unit Price: $
                    {Number(item.cost ?? item.price ?? 0).toFixed(2)}
                  </p>
                  <p>
                    Subtotal: $
                    {(
                      Number(item.cost ?? item.price ?? 0) * item.quantity
                    ).toFixed(2)}
                  </p>

                  <div className="quantity-controls">
                    <button
                      onClick={() => handleDecrement(item)}
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item)}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="cart-item-delete"
                    onClick={() => handleRemove(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total: ${totalAmount.toFixed(2)}</h2>

            <button
              className="get-started-button1"
              onClick={handleCheckout}
            >
              Checkout
            </button>

            <button
              className="get-started-button"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
      </div>
    </>
  );
}
