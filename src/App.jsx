import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Category from "./pages/Category/Category";
import Modal from "./components/Modal/Modal";
import Order from "./pages/Order/Order";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import Account from "./pages/Account/Account";
import Login from "./pages/UserAuth/Login/Login";
import Signup from "./pages/UserAuth/Signup/Signup";

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup/>} />

        <Route path="/home" element={<Home />}>
          <Route index element={<Category category="All" />} />
          <Route path=":slug" element={<Category />} />
          <Route path="my-orders" element={<Order />} />
          <Route path="my-orders/:id" element={<OrderDetails />} />
          <Route path="my-account" element={<Account />} />
        </Route>
      </Routes>

      <Modal />
    </>
  );
}

export default App;
