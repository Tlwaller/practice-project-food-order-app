import mealsImg from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCart';

const Header = props => {
    return (
        <>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={props.onCartToggle}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImg} alt="Table full of delicious food"/>
            </div>
        </>
    );
}

export default Header;