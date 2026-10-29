import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import store from "./store/store";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import CartItem from "./pages/CartItem";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to Paradise Nursery</h1>
      <p>Discover beautiful plants to bring nature into your home.</p>
      <button
        className="get-started-button1"
        onClick={() => navigate("/products")}
      >
        Get Started
      </button>
    </div>
  );
}

function AppContent() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
