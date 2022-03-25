import { useState, useContext } from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/Cart/cart-context";
import CartItem from "./CartItem";
import CartForm from "./CartForm";

const Card = (props) => {
  const cartCtx = useContext(CartContext);
  const [formIsShown, setFormIsShown] = useState(false);

  const totalAmount = `$${Math.max(cartCtx.totalAmount, 0).toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const formToggler = () => setFormIsShown(!formIsShown);

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onToggleDisplay={props.onCartToggle}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {formIsShown && <CartForm formToggler={formToggler} />}
      {!formIsShown && (
        <div className={classes.actions}>
          <button
            className={classes["button--alt"]}
            onClick={props.onCartToggle}
          >
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={formToggler}>
              Next
            </button>
          )}
        </div>
      )}
    </Modal>
  );
};

export default Card;
