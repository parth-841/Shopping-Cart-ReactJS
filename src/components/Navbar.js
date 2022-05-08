import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";

function Navbar() {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = useContext(CartContext);
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-around"
        style={{ height: 80 }}
      >
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          style={{ width: 500 }}
          onChange={(e) =>
            productDispatch({
              type: "FILTER_BY_SEARCH",
              payload: e.target.value,
            })
          }
        />
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <FaShoppingCart fontSize="25px" />{" "}
            <span className="badge">{cart.length}</span>
          </button>
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenuButton"
            style={{ minWidth: 370 }}
          >
            {cart.length > 0 ? (
              <>
                {cart.map((product) => (
                  <span
                    key={product.id}
                    className="d-flex align-items-center justify-content-between mx-2 mb-2"
                  >
                    <div className="d-flex">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="rounded-circle"
                        width="50px"
                        height="50px"
                        style={{ objectFit: "cover" }}
                      />
                      <div className="d-flex px-2 flex-column">
                        <span>{product.name}</span>
                        <span>&#8377; {product.price.split(".")[0]}</span>
                      </div>
                    </div>
                    <AiFillDelete
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: product,
                        })
                      }
                    />
                  </span>
                ))}
                <Link to="/cart">
                  <button
                    style={{ width: "95%", margin: "0 10px" }}
                    className="btn btn-primary"
                  >
                    Go To Cart
                  </button>
                </Link>
              </>
            ) : (
              <span style={{ padding: 10 }}>Cart is Empty!!</span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
