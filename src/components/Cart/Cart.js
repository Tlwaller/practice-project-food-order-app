import React, { useState, useContext } from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/Cart/cart-context";
import CartItem from "./CartItem";
import CartForm from "./CartForm";

const Card = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
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

  const submitHandler = async (address) => {
    setIsSubmitting(true);
    await fetch(
      "https://reactmeals-a3476-default-rtdb.firebaseio.com/Orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          address,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {formIsShown && (
        <CartForm onConfirm={submitHandler} formToggler={formToggler} />
      )}
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
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = <p>Order successfully sent!</p>;

  return (
    <Modal onToggleDisplay={props.onCartToggle}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Card;
