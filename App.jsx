import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductList from "./ProductList";
import CartItem from "./CartItem";
import AboutUs from "./AboutUs";
import "./App.css";

export default function App() {
  const [view, setView] = useState("home");
  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="app-container">
      {view === "home" && (
        <div className="landing-page">
          <div className="background-image" />
          <div className="landing_content">
            <h1>Welcome to Paradise Nursery</h1>
            <p>Where Green Meets Serenity</p>
            <button
              className="get-started-button"
              onClick={() => setView("plants")}
            >
              Get Started
            </button>
          </div>
          <AboutUs />
        </div>
      )}

      {view === "plants" && (
        <ProductList
          onHomeClick={() => setView("home")}
          onPlantsClick={() => setView("plants")}
          onCartClick={() => setView("cart")}
          totalItems={totalItems}
        />
      )}

      {view === "cart" && (
        <CartItem
          onHomeClick={() => setView("home")}
          onPlantsClick={() => setView("plants")}
          onContinueShopping={() => setView("plants")}
        />
      )}
    </div>
  );
}
