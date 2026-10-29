import { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store/store";
import ProductList from "./pages/ProductList";
import CartItem from "./pages/CartItem";

function Home({ onGetStarted }) {
  return (
    <div className="app-container">
      <h1>Welcome to Paradise Nursery</h1>
      <button
        className="get-started-button"
        onClick={() => onGetStarted(true)}
      >
        Get Started
      </button>
    </div>
  );
}

function AppContent() {
  const [showProductList, setShowProductList] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          showProductList ? (
            <ProductList />
          ) : (
            <Home onGetStarted={setShowProductList} />
          )
        }
      />
      <Route path="/products" element={<ProductList />} />
      <Route path="/cart" element={<CartItem />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}
