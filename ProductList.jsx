import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";
import "./ProductList.css";

const categories = [
  {
    name: "Air Purifying Plants",
    plants: [
      { name: "Snake Plant", cost: 18, image: "https://images.unsplash.com/photo-1593482892290-f54927ae2b3b?w=400" },
      { name: "Peace Lily", cost: 22, image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400" },
      { name: "Spider Plant", cost: 14, image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400" },
      { name: "Rubber Plant", cost: 25, image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400" },
      { name: "Boston Fern", cost: 17, image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=400" },
      { name: "Areca Palm", cost: 30, image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400" },
    ],
  },
  {
    name: "Aromatic Fragrant Plants",
    plants: [
      { name: "Lavender", cost: 16, image: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=400" },
      { name: "Jasmine", cost: 19, image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400" },
      { name: "Rosemary", cost: 12, image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=400" },
      { name: "Eucalyptus", cost: 20, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400" },
      { name: "Mint", cost: 10, image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400" },
      { name: "Gardenia", cost: 24, image: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=400" },
    ],
  },
  {
    name: "Low Maintenance Plants",
    plants: [
      { name: "Aloe Vera", cost: 11, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400" },
      { name: "ZZ Plant", cost: 21, image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400" },
      { name: "Golden Pothos", cost: 15, image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=400" },
      { name: "Jade Plant", cost: 13, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400" },
      { name: "Succulent Mix", cost: 9, image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400" },
      { name: "Ponytail Palm", cost: 28, image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400" },
    ],
  },
];

export function Navbar({ onHomeClick, onPlantsClick, onCartClick, totalItems }) {
  return (
    <nav className="navbar">
      <strong>Paradise Nursery</strong>
      <div className="nav-links">
        <button onClick={onHomeClick}>Home</button>
        <button onClick={onPlantsClick}>Plants</button>
        <button onClick={onCartClick}>🛒 Cart ({totalItems})</button>
      </div>
    </nav>
  );
}

export default function ProductList({
  onHomeClick,
  onPlantsClick,
  onCartClick,
}) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const addedToCart = Object.fromEntries(
    cartItems.map((item) => [item.name, true])
  );

  return (
    <div>
      <Navbar
        onHomeClick={onHomeClick}
        onPlantsClick={onPlantsClick}
        onCartClick={onCartClick}
        totalItems={totalItems}
      />

      <main className="product-list">
        <h1>Our Houseplants</h1>

        {categories.map((category) => (
          <section key={category.name}>
            <h2>{category.name}</h2>
            <div className="plant-grid">
              {category.plants.map((plant) => (
                <article className="plant-card" key={plant.name}>
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p>${plant.cost.toFixed(2)}</p>
                  <button
                    disabled={!!addedToCart[plant.name]}
                    onClick={() => dispatch(addItem(plant))}
                  >
                    {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                  </button>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
