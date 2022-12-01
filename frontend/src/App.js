import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import Login from "components/admin/layout/Login";
import AddProduct from "pages/admin/product/AddProduct";
import AddUser from "pages/admin/user/AddUser";
import Dashboard from "pages/admin/Dashboard";
import EditProduct from "pages/admin/product/EditProduct";
import EditUser from "pages/admin/user/EditUser";
import Product from "pages/admin/product/Product";
import User from "pages/admin/user/User";
import './App.css';
import NotFound from "components/admin/layout/NotFound";
import PrivateRoutes from "utils/PrivateRoutes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user" element={<User />} />
            <Route path="/user/add" element={<AddUser />} />
            <Route path="/user/edit/:id" element={<EditUser />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/add" element={<AddProduct />} />
            <Route path="/product/edit/:id" element={<EditProduct />} />
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
