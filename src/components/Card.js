import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import Rating from "./Rating";

function Card(props) {
  const {
    state: { cart },
    dispatch,
  } = useContext(CartContext);
  return (
    <div className="col-lg-4 col-md-6 card-group p-3">
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={props.product.image}
          className="card-img-top"
          alt={props.product.name}
        />
        <div className="card-body">
          <h5 className="card-title">{props.product.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            <span>&#8377; {props.product.price.split(".")[0]}</span>
            {props.product.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 days delivery</div>
            )}
            <Rating rate={props.product.ratings} />
          </h6>
          {cart.some((product) => product.id === props.product.id) ? (
            <button
              onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: props.product,
                });
              }}
              className="btn btn-danger"
            >
              Remove from Cart
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch({
                  type: "ADD_TO_CART",
                  payload: props.product,
                });
              }}
              className="btn btn-primary"
              disabled={!props.product.inStock}
            >
              {props.product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
