import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as Action from '../../actions';
import '../../style/cart.css';

const ShoppingCart = (props) => {

    const removeCartItemHandler = index => {
        props.removeFromCartAction(index);
        props.rearrangeCartOrdersAction(index);
    }

    const cart = () => {
        const {order: orders} = props.cart;
        const rowStyle = "layout-inline row";
        const oddRowStyle = " row-bg2";
        let currentRowStyle = "";

        return (
            <div className="cartContainer">
                <div className="heading">
                    <h1 className="cartHeader">Shopping Cart</h1>
                    <a className="visibility-cart transition is-open"><i className="shopping cart icon"></i></a>    
                </div>
                
                <div className="cart transition is-open">
                    <div className="table">
                        <div className="layout-inline row th">
                            <div className="col col-remove"></div>
                            <div className="col">Product</div>
                            <div className="col">Toppings</div>
                            <div className="col">Drinks</div>
                            <div className="col col-total">Total</div>
                        </div>
                        {Object.keys(orders).length >0 && Object.values(orders).map((order, index) => {
                            currentRowStyle = index % 2 ? rowStyle + oddRowStyle : rowStyle;
                            let toppingsPrice = 0;
                            let drinksPrice = 0;
                            
                            return (
                                <div className={currentRowStyle} key={index}>
                                    <div className="col-remove removeRow transition"><i className="times circle icon" onClick={() => removeCartItemHandler(index+1)}></i></div>
                                    <div className="col layout-inline">
                                        <img className="pizzaCartImg" src={order.pizzaDescription.image} alt={order.pizzaDescription.item} />
                                        <p className="cartP">{order.pizzaDescription.item}</p>             
                                        <p className="cartMiniP"><span style={{textDecoration: "underline"}}>Amount:</span>{order.numberOfPizzas}</p>
                                    </div>
                                    <div className="col">
                                        <p className="cartP">
                                            {order.toppings && Object.values(order.toppings).map((toppings, pizzaIndex) => { 
                                                let numOfToppings = Object.values(toppings).length;
                                                return (
                                                    <React.Fragment key={pizzaIndex}><span style={{textDecoration: "underline"}}>{order.numberOfPizzas > 1 && "Pizza #" + (pizzaIndex + 1) + ": "}</span>
                                                        {Object.values(toppings).map((topping, toppingIndex) => {
                                                            toppingsPrice += topping.price;
                                                            if (toppingIndex === numOfToppings-1){
                                                                return (topping.item);
                                                            } 
                                                            return (`${topping.item}, `);                                              
                                                        })}
                                                        {numOfToppings === 0 && `No toppings`}
                                                    </React.Fragment>
                                                );
                                            })}
                                        </p>
                                    </div>
                                    <div className="col">
                                        <p className="cartP">
                                            {order.drinks && Object.values(order.drinks).length === 0 && 
                                                <React.Fragment>No drinks</React.Fragment>
                                            }
                                            {order.drinks && Object.values(order.drinks).map((drink, drinkIndex) => {
                                                drinksPrice += (drink.price * drink.amount);
                                                return (
                                                    <React.Fragment key={drinkIndex}>{`${drink.item} x ${drink.amount}`}</React.Fragment>
                                                );
                                            })}                                            
                                        </p>
                                    </div>
                                    {order.pizzaDescription.discountedPrice && calculatePrice(toppingsPrice + drinksPrice, order.pizzaDescription.discountedPrice * order.numberOfPizzas)}
                                    {!order.pizzaDescription.discountedPrice && calculatePrice(toppingsPrice + drinksPrice, order.pizzaDescription.price * order.numberOfPizzas)}
                                </div>
                            );
                        })}       
                        <div className="tf">
                            <div className="row layout-inline">
                                <div className="col col-remove"></div>
                                <div className="col"></div>
                                <div className="col"></div>
                                <div className="col"><p className="cartP">Total</p></div>
                                <div className="col col-total-summary"><p className="cartP">${props.cart.totalPrice}</p></div>
                            </div>
                        </div>         
                    </div>
                    {orderButton()}
                </div>
            </div>
        );
    }

    const calculatePrice = (extra, pizzaPrice) => {
        return (
            <div className="col col-total"><p className="cartP"> ${pizzaPrice + extra}</p></div>
        );
    }

    const orderButton = () => {
        if (Object.keys(props.cart.order).length > 0) {
            return (
                <Link className="ui button orderButton" to="/order/create">Order Now</Link>
            );
        }
        return (
            <p className="cartEmpty">Cart is empty</p>
        );
    }

    return (
        <React.Fragment>
            {cart()}
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return { 
        cart: state.cart
     };
}

export default connect(mapStateToProps, {...Action})(ShoppingCart);