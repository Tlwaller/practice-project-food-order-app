import { useState, useEffect } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://reactmeals-a3476-default-rtdb.firebaseio.com/Meals.json"
      );

      if (!response.ok) {
        throw new Error("ERROR O O P S :|");
      }

      const data = await response.json();

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          desc: data[key].desc,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, []);

  return (
    <section className={classes.meals}>
      <Card>
        {loading && <p style={{ color: "red" }}>Loading...</p>}
        {error ? (
          <p style={{ color: "red", "text-align": "center" }}>{error}</p>
        ) : (
          <ul>
            {meals.map((meal) => (
              <MealItem key={meal.id} meal={meal} />
            ))}
          </ul>
        )}
      </Card>
    </section>
  );
};

export default AvailableMeals;
