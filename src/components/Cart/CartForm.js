import { useRef } from "react";
import Input from "../UI/Input";
import classes from "./Cart.module.css";

const CartForm = (props) => {
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

    if (nameIsValid && streetIsValid && zipIsValid && cityIsValid) {
      alert(`Order shipping to ${name} at ${street} ${city}, ${zip}`);
      formRef.current.reset();
    } else {
      alert("Please review shipping info.");
    }
  };

  return (
    <form
      className={classes["cart-form"]}
      onSubmit={submitHandler}
      ref={formRef}
    >
      <Input
        ref={nameInputRef}
        label="Your Name:"
        input={{
          id: "name",
          type: "text",
        }}
      />
      <Input
        ref={streetInputRef}
        label="Your Street:"
        input={{
          id: "street",
          type: "text",
        }}
      />
      <Input
        ref={zipInputRef}
        label="Your Postal Code:"
        input={{
          id: "zip",
          type: "text",
        }}
      />
      <Input
        ref={cityInputRef}
        label="Your City:"
        input={{
          id: "city",
          type: "text",
        }}
      />
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
