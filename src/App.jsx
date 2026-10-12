
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import About from "./components/About";
import Categories from "./components/Categories";
import Products from "./components/Products";
import WhyUs from "./components/WhyUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProductDetails from "./components/ProductDetails";

import "./styles.css";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const consumeCategory = () => setSelectedCategory("");

  return (
    <main>
      <HeroSlider />
      <Categories onChooseCategory={setSelectedCategory} />
      <Products
        selectedCategory={selectedCategory}
        onCategoryConsumed={consumeCategory}
      />
      <About />
      <WhyUs />
      <Contact />
    </main>
  );
}

function AppLayout() {
  const location = useLocation();

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="*" element={<HomePage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
