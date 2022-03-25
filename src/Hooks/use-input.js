import { useReducer } from "react/cjs/react.production.min";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case "INPUT":
      return { value: action.payload, isTouched: state.isTouched };
    case "BLUR":
      return { value: state.value, isTouched: true };

    case "RESET":
      return { value: "", isTouched: false };
  }
};

const useInput = (validate) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const isValid = validate(inputState);
  const hasError = inputState.isTouched && !isValid;

  const inputHandler = (e) => {
    dispatch({ type: "INPUT", payload: e.target.value });
  };

  const blurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid,
    isTouched: inputState.isTouched,
    hasError,
    inputHandler,
    blurHandler,
    reset,
  };
};

export default useInput;
