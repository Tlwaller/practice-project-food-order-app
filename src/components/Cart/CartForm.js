import { useRef, useState } from "react";
import classes from "./Cart.module.css";

const CartForm = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    zip: true,
    city: true,
  });
  const formRef = useRef();
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const zipInputRef = useRef();
  const cityInputRef = useRef();

  const isValid = (value, num) => {
    if (value.trim().length < num) {
      return false;
    } else return true;
  };

  const blurHandler = (e) => {
    if (isValid(e.target.value, 1)) {
      setFormValidity({ ...formValidity, [e.target.id]: true });
    } else {
      setFormValidity({ ...formValidity, [e.target.id]: false });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const name = nameInputRef.current.value;
    const street = streetInputRef.current.value;
    const zip = zipInputRef.current.value;
    const city = cityInputRef.current.value;

    const nameIsValid = isValid(name, 1);
    const streetIsValid = isValid(street, 1);
    const zipIsValid = isValid(zip, 5);
    const cityIsValid = isValid(city, 1);

    setFormValidity({
      name: nameIsValid,
      street: streetIsValid,
      zip: zipIsValid,
      city: cityIsValid,
    });

    if (nameIsValid && streetIsValid && zipIsValid && cityIsValid) {
      props.onConfirm({ name, street, zip, city });
      formRef.current.reset();
      return;
    } else {
      return;
    }
  };

  return (
    <form
      className={classes["cart-form"]}
      onSubmit={submitHandler}
      ref={formRef}
    >
      <label>
        Your Name:
        <input id="name" type="text" ref={nameInputRef} onBlur={blurHandler} />
        {!formValidity.name && <p>Please enter a valid name.</p>}
      </label>
      <label>
        Your Street:
        <input
          id="street"
          type="text"
          ref={streetInputRef}
          onBlur={blurHandler}
        />
        {!formValidity.street && <p>Please enter a valid street address.</p>}
      </label>
      <label>
        Your Postal Code:
        <input id="zip" type="text" ref={zipInputRef} onBlur={blurHandler} />
        {!formValidity.zip && <p>Please enter a valid postal code.</p>}
      </label>
      <label>
        Your City:
        <input id="city" type="text" ref={cityInputRef} onBlur={blurHandler} />
        {!formValidity.city && <p>Please enter a valid city.</p>}
      </label>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.formToggler}>
          Cancel
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </form>
  );
};

export default CartForm;
