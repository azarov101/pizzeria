import React from 'react';

/**
 * @desc This functional component handles the addition of the toppings for the current order to the shopping cart. 
 * @param {Object} props - The props parameter contains the cart order. 
 * @return {JSX} Decorated jsx toppings object.
 */
export default function CartToppings(props){
    const {order} = props;

    /**
     * @desc This function shows the toppings for the specific pizza.
     * @param {number} numOfToppings - Number of toppings for this pizza.
     * @param {Object} toppings - The toppings object.
     * @return {JSX} Decorated jsx toppings list or No toppings text if there are no toppings for this pizza.
     */
    const showToppings = (numOfToppings, toppings) => {
        if (numOfToppings === 0){
            return <React.Fragment>No toppings</React.Fragment>
        }

        return (
            <React.Fragment>
                {Object.values(toppings).map((topping, toppingIndex) => {
                    if (toppingIndex === numOfToppings-1){
                        return (topping.item);
                    } 
                    return (`${topping.item}, `);                                              
                })}
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            {order.toppings && Object.values(order.toppings).map((toppings, pizzaIndex) => { 
                let numOfToppings = Object.values(toppings).length;
                
                return (
                    <p className="cartP" key={pizzaIndex}>
                        <span className="underLine">{order.numberOfPizzas > 1 && "Pizza #" + (pizzaIndex + 1) + ": "}</span>
                        {showToppings(numOfToppings, toppings)}
                    </p>
                );
            })}
        </React.Fragment>
    );
}