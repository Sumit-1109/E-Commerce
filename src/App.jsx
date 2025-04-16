import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Category from "./pages/Category/Category";
import Modal from "./components/Modal/Modal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Category category="All" />} />
          <Route path=":slug" element={<Category />} />
        </Route>
      </Routes>

      <Modal />
    </>
  );
}

export default App;
