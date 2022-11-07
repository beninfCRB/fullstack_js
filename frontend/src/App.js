import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import Login from "./components/Login";
import AddProduct from "./pages/AddProduct";
import AddUser from "./pages/AddUser";
import Dashboard from "./pages/Dashboard";
import EditProduct from "./pages/EditProduct";
import EditUser from "./pages/EditUser";
import Product from "./pages/Product";
import User from "./pages/User";
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/add" element={<AddUser />} />
          <Route path="/user/edit/:id" element={<EditUser />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/product/edit/:id" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
