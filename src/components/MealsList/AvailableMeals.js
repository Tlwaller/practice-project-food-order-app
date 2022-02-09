const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    desc: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    desc: "A German specialty",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    desc: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    desc: "Healthy...and green...",
    price: 18.99,
  },
];

const AvailableMeals = () => {
    return (
        <ul>
            {
                DUMMY_MEALS.map(meal => {
                    return <li>{meal.name}</li>
                })
            }
        </ul>
    )
}

export default AvailableMeals;