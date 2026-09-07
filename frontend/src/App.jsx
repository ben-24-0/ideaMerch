import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Custom from "./pages/Custom";
import About from "./pages/About";

import CartDrawer from "./components/shop/CartDrawer";
import CartToast from "./components/ui/CartToast";

import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./pages/admin/ProtectedRoute";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import CustomRequests from "./pages/admin/CustomRequests";
import NewProduct from "./pages/admin/NewProduct";
 import EditProduct from "./pages/admin/EditProduct"
export default function App() {
  return (
    <>
      <Routes>

        {/* Store */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/custom" element={<Custom />} />
        <Route path="/about" element={<About />} />

        {/* Admin login */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* Protected admin */}
<Route element={<ProtectedRoute />}>
  <Route path="/admin" element={<Dashboard />} />
  <Route path="/admin/products" element={<Products />} />
  <Route path="/admin/products/new" element={<NewProduct />} />
  <Route path="/admin/orders" element={<Orders />} />
  <Route
    path="/admin/custom-requests"
    element={<CustomRequests />}
  />
  <Route
  path="/admin/products/:id/edit"
  element={<EditProduct />}
/>
</Route>

      </Routes>

      <CartDrawer />
      <CartToast />
    </>
  );
}