import React from "react";
import ProductGrid from "../components/ProductGrid";

const Dashboard = () => {

    const products = [1,2,2,2,1,1,1,1,1,1,1,1,1,]
  return (
    <div className="dashboard">
      <div className="main-container">
        {products.map((product, index) => <ProductGrid />)}
      </div>
    </div>
  );
};

export default Dashboard;
