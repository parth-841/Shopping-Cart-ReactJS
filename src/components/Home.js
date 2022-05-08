import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import Card from "./Card";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

function Home() {
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = useContext(CartContext);

  const transformProducts = () => {
    let sortedProducts = products;
    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((product) => product.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((product) => product.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (product) => product.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <>
      <Navbar />
      <div className="d-flex w-100 min-vh-100">
        <SideBar />
        <div className="row w-75 px-3">
          {transformProducts().map((product) => {
            return <Card product={product} key={product.id} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
