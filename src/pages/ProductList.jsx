import { useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/CartSlice";
import "./ProductList.css";

const products = {
  Succulents: [
    { id: 1, name: "Jade Plant", cost: 12.99, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400" },
    { id: 2, name: "Aloe Vera", cost: 9.99, image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400" },
    { id: 3, name: "Echeveria", cost: 8.99, image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400" },
    { id: 4, name: "Sedum", cost: 7.99, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400" },
    { id: 5, name: "Cactus Mix", cost: 10.99, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400" },
    { id: 6, name: "Haworthia", cost: 11.99, image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=400" },
  ],
  "Flowering Plants": [
    { id: 7, name: "Orchid", cost: 19.99, image: "https://images.unsplash.com/photo-1566907225472-514a9f8a9b26?w=400" },
    { id: 8, name: "Rose", cost: 15.99, image: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=400" },
    { id: 9, name: "Lavender", cost: 13.99, image: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=400" },
    { id: 10, name: "Petunia", cost: 12.99, image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400" },
    { id: 11, name: "Dahlia", cost: 16.99, image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400" },
    { id: 12, name: "Tulip", cost: 14.99, image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400" },
  ],
  "Foliage Plants": [
    { id: 13, name: "Monstera", cost: 24.99, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400" },
    { id: 14, name: "Pothos", cost: 11.99, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400" },
    { id: 15, name: "Philodendron", cost: 18.99, image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=400" },
    { id: 16, name: "Snake Plant", cost: 14.99, image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400" },
    { id: 17, name: "Spider Plant", cost: 9.99, image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400" },
    { id: 18, name: "Fern", cost: 13.99, image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400" },
  ],
  "Herb Plants": [
    { id: 19, name: "Basil", cost: 6.99, image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=400" },
    { id: 20, name: "Rosemary", cost: 7.99, image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=400" },
    { id: 21, name: "Mint", cost: 5.99, image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400" },
    { id: 22, name: "Thyme", cost: 6.49, image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400" },
    { id: 23, name: "Oregano", cost: 6.49, image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400" },
    { id: 24, name: "Cilantro", cost: 5.49, image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400" },
  ],
};

export default function ProductList() {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (plant) => {
    dispatch(cartActions.addItem(plant));
    setAddedToCart((previous) => ({
      ...previous,
      [plant.name]: true,
    }));
  };

 return (
    <>
      <Navbar />
      <div className="product-list">
      <h1 className="page-title">Our Plants Collection</h1>

      {Object.entries(products).map(([category, plants]) => (
        <section key={category} className="category-section">
          <h2 className="category-title">{category}</h2>

          <div className="products-grid">
            {plants.map((plant) => (
              <div key={plant.id} className="product-card">
                <img
                  className="product-image"
                  src={plant.image}
                  alt={plant.name}
                />
                <h3 className="product-name">{plant.name}</h3>
                <p className="product-price">${plant.cost.toFixed(2)}</p>

                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(plant)}
                  disabled={!!addedToCart[plant.name]}
                >
                  {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
      </div>
    </>
  );
}
