import React from "react";

import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input
        ref={ref}
        {...props.input}
        // this ^^^ makes "id={props.input.id}" unnecessary,
        // as it causes this input to inherit the passed props
      />
    </div>
  );
});

export default Input;
