import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Custom from "./pages/Custom";
// import About from "./pages/About";

import CartDrawer from "./components/shop/CartDrawer";
import Shop from "./pages/Shop";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/custom" element={<Custom />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>

      <CartDrawer />
    </>
  );
}