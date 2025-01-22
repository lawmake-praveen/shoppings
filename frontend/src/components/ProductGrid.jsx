import React from "react";

const ProductGrid = ({ product }) => {
  return (
    <div className="product-grid">
      <img
        src="https://m.media-amazon.com/images/I/41kFpOLaEBL._SX300_SY300_QL70_FMwebp_.jpg"
        alt="Product image"
      />
      <p>
        Redmi Note 14 5G (Phantom Purple, 8GB RAM 128GB Storage) | Global Debut
        MTK Dimensity 7025 Ultra | 2100 nits Segment Brightest 120Hz AMOLED |
        50MP Sony LYT 600 OIS+EIS Triple Camera
      </p>
      <p>Ratings 5.4</p>
      <p>#19,999</p>
      
    </div>
  );
};

export default ProductGrid;
