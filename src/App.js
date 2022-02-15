import { useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';

function App() {
  const [cartState, setCartState] = useState(false);

  const toggleCartHandler = () => {
    if(cartState === true) {
      setCartState(false);
    } else setCartState(true);
  }

  return (
    <>
      {cartState && <Cart onCartToggle={toggleCartHandler}/>}
      <Header onCartToggle={toggleCartHandler}/>
      <main>
        <Meals/>
      </main>
    </>
  );
}

export default App;
