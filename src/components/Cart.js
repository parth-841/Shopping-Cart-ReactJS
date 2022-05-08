import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import Rating from "./Rating";
import { AiFillDelete } from "react-icons/ai";

function Cart() {
  const {
    state: { cart },
    dispatch,
  } = useContext(CartContext);
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce(
        (acc, product) => acc + Number(product.price) * product.qty,
        0
      )
    );
  }, [cart]);

  return (
    <div className="d-flex min-vh-100">
      <ul className="list-group w-75">
        {cart.map((product) => (
          <li className="list-group-item" key={product.id}>
            <div className="row">
              <div className="col-md-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded img-fluid"
                />
              </div>
              <div className="col-md-2">
                <span>{product.name}</span>
              </div>
              <div className="col-md-2">
                <span>{product.price}</span>
              </div>
              <div className="col-md-2">
                <Rating rate={product.ratings} />
              </div>
              <div className="col-md-2">
                <select
                  class="form-control"
                  value={product.qty}
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE_CART_QTY",
                      payload: {
                        id: product.id,
                        qty: e.target.value,
                      },
                    })
                  }
                >
                  {[...Array(product.inStock).keys()].map((x) => (
                    <option key={x + 1}>{x + 1}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-2">
                <AiFillDelete
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: product,
                    })
                  }
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="bg-dark w-25 px-5">
        <span className="text-white lead">Subtotal ({cart.length}) items</span>{" "}
        <br />
        <span style={{ fontWeight: 700, fontSize: 20 }} className="text-white">
          Total: &#8377; {total}
        </span>
      </div>
    </div>
  );
}

export default Cart;
