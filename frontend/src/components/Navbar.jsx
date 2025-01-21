import React from "react";
import { IoMdCart, IoMdSearch } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="navbar">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVcXo7GO_EkS7E_HXnMRAuQnyXZPZNr0Cz5A&s"
        alt="Logo"
      />
      <div className="center-navbar">
        <input
          type="text"
          className="search-bar"
          placeholder="Search Shoppings"
        />
        <div className="search-icon">
          <IoMdSearch size={24} />
        </div>
      </div>
      <div className="right-navigations">
        <IoMdCart size={36} />
      </div>
    </div>
  );
};

export default Navbar;
