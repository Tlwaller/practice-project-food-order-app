import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
const MealItem = props => {
    const price = `$${props.meal.price.toFixed(2)}`;

    return (
    <li className={classes.meal}>
        <div>
            <h3>{props.meal.name}</h3>
            <div className={classes.description}>{props.meal.desc}</div>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
            <MealItemForm id={props.meal.id}/>
        </div>
    </li>
    )
}

export default MealItem;