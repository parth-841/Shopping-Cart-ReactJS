import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import Rating from "./Rating";

function SideBar() {
  const {
    productState: { byStock, byFastDelivery, sort, byRating },
    productDispatch,
  } = useContext(CartContext);
  return (
    <div className="bg-dark w-25 px-5">
      <span className="lead text-white">Filter Products</span>
      <span>
        <div className="form-check my-2">
          <input
            className="form-check-input"
            type="radio"
            name="group1"
            id="exampleRadios1"
            onChange={() =>
              productDispatch({
                type: "SORT_BY_PRICE",
                payload: "lowToHigh",
              })
            }
            checked={sort === "lowToHigh" ? true : false}
          />
          <label
            className="form-check-label text-white"
            htmlFor="exampleRadios1"
          >
            Ascending
          </label>
        </div>
        <div className="form-check my-2">
          <input
            className="form-check-input"
            type="radio"
            name="group1"
            id="exampleRadios2"
            onChange={() =>
              productDispatch({
                type: "SORT_BY_PRICE",
                payload: "highToLow",
              })
            }
            checked={sort === "highToLow" ? true : false}
          />
          <label
            className="form-check-label text-white"
            htmlFor="exampleRadios2"
          >
            Descending
          </label>
        </div>

        <div className="form-check my-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="defaultCheck1"
            onChange={() =>
              productDispatch({
                type: "FILTER_BY_DELIVERY",
              })
            }
            checked={byFastDelivery}
          />
          <label
            className="form-check-label text-white"
            htmlFor="defaultCheck1"
          >
            Fast Delivery Only
          </label>
        </div>

        <div className="form-check my-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="defaultCheck2"
            onChange={() =>
              productDispatch({
                type: "FILTER_BY_STOCK",
              })
            }
            checked={byStock}
          />
          <label
            className="form-check-label text-white"
            htmlFor="defaultCheck2"
          >
            Include Out of Stock
          </label>
        </div>
      </span>
      <span>
        <label className="lead text-white">Rating:</label>
        <Rating
          rate={byRating}
          onClick={(i) =>
            productDispatch({
              type: "FILTER_BY_RATING",
              payload: i + 1,
            })
          }
          style={{ cursor: "pointer" }}
        />
      </span>
      <br />
      <button
        className="btn btn-light w-100"
        onClick={() =>
          productDispatch({
            type: "CLEAR_FILTERS",
          })
        }
      >
        Clear Filter
      </button>
    </div>
  );
}

export default SideBar;
