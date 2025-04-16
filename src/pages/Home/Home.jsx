import React from "react";
import "./Home.scss";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="body">
      <Navbar />

      <div className="products">
        <Outlet />
      </div>

    </div>
  );
}

export default Home;
