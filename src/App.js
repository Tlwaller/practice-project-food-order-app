import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartState, setCartState] = useState(false);

  const toggleCartHandler = () => {
    if (cartState === true) {
      setCartState(false);
    } else setCartState(true);
  };

  return (
    <CartProvider>
      {cartState && <Cart onCartToggle={toggleCartHandler} />}
      <Header onCartToggle={toggleCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
