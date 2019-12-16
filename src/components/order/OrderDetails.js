import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Action from '../../actions';


class OrderDetails extends Component {

    componentDidMount(){
        // this.props.getOrderListAction();
        this.props.getOrderAction(this.props.match.params.id);
    }

    orderContent = (orderItems) => {
        return(
            <React.Fragment>
                <div role="listitem" className="item">
                    <div className="content">
                        <h2 className="header">{orderItems.pizzaDescription.item}</h2>
                    </div>
                </div>
                <br />
                <div className="ui grid"> 
                    <div role="list" className="six wide column ui list">  
                        <div role="listitem" className="item">
                            <i aria-hidden="true" className="marker icon"></i>
                            <div className="content">
                                <h4 className="header" style={{color: "#4183C4"}}>Price</h4>
                                <div className="description">
                                    {orderItems.pizzaDescription.discountedPrice && 
                                    <div>Discounted Price: 
                                        &nbsp; &nbsp;
                                    <span style={{textDecoration: "line-through"}}> {orderItems.pizzaDescription.price} </span> &nbsp; => &nbsp; {orderItems.pizzaDescription.discountedPrice}$ </div> }
                                    {!orderItems.pizzaDescription.discountedPrice && orderItems.pizzaDescription.price + `$`}
                                </div>
                            </div>
                        </div>
                        
                        <div role="listitem" className="item">
                            <i aria-hidden="true" className="marker icon"></i>
                            <div className="content">
                                <h4 className="header" style={{color: "#4183C4"}}>Amount</h4>
                                <div className="description">
                                    {orderItems.numberOfPizzas}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="six wide column">
                        <div role="list" className="ui list">
                            <div role="listitem" className="item">
                                <i aria-hidden="true" className="marker icon"></i>
                                <div className="content">
                                    <h4 className="header" style={{color: "#4183C4"}}>Toppings</h4>
                                    <div className="description">
                                        {Object.values(orderItems.toppings).map((toppings, pizzaIndex) => { 
                                            let numOfToppings = Object.values(toppings).length;
                                            return (
                                                <li key={pizzaIndex}>{orderItems.numberOfPizzas > 1 && "Pizza #" + (pizzaIndex + 1) + ": "}
                                                    {Object.values(toppings).map((topping, toppingIndex) => {
                                                        if (toppingIndex === numOfToppings-1){
                                                            return (topping.item);
                                                        } 
                                                        return (`${topping.item}, `);                                              
                                                    })}
                                                    {numOfToppings === 0 && `No toppings`}
                                                </li>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="four wide column">
                        <div role="list" className="ui list">
                            <div role="listitem" className="item">
                                <i aria-hidden="true" className="marker icon"></i>
                                <div className="content">
                                    <h4 className="header" style={{color: "#4183C4"}}>Drinks</h4>
                                    <div className="description">
                                        {Object.values(orderItems.drinks).length === 0 && 
                                            <li>No drinks</li>
                                        }
                                        {Object.values(orderItems.drinks).map((drink, drinkIndex) => (
                                            <li  key={drinkIndex}>{`${drink.item} x ${drink.amount}`}</li>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    orderInformation = () => {
        const { id, name, price, status, location, notes } = this.props.order;

        return (
            <div role="list" className="ui divided middle aligned list">
                <div role="listitem" className="item">
                    <i className="key icon"></i>
                    <div className="content"><b>Order ID: </b>#{id}</div>
                </div>
                <div role="listitem" className="item">
                    <i className="user circle icon"></i>
                    <div className="content"><b>Order Name: </b>{name}</div>
                </div>
                <div role="listitem" className="item">
                    <i className="money bill alternate icon"></i>
                    <div className="content"><b>Price: </b>{price}$</div>
                </div>
                <div role="listitem" className="item">
                    <i className="bell icon"></i>
                    <div className="content"><b>Status: </b>{status}</div>
                </div>
                <div role="listitem" className="item">
                    <i className="shipping fast icon"></i>
                    <div className="content"><b>Delivery Location: </b>{location}</div>
                </div>
                {notes && 
                <div role="listitem" className="item">
                    <i className="info circle icon"></i>
                    <div className="content">
                        <div className="header">Order Notes:</div>
                        <div className="description">{notes}</div>
                    </div>
                </div>
                }
            </div>         
        );
    }

    showOrderDetails = () => {
        const { items } = this.props.order;
        return (
            <React.Fragment>
                <br />
                <center><h1>THANK YOU!</h1></center>
                <br />

                {this.orderInformation()}
                
                <h4>Order Details</h4>
                <div className="ui grid">
                    {Object.values(items).map((orderItems, index) => (
                        <div className="row ui very padded segment" key={index}>
                            <div className="four wide column">
                                <img alt="pizza" src={orderItems.pizzaDescription.image} className="ui image" />
                            </div>
                            <div className="twelve wide column">
                                {this.orderContent(orderItems)}
                            </div>
                        </div>
                    ))}
                </div>
            </React.Fragment>
        );
    }

    render(){
        if (!this.props.order){
            return (
                <div>Loading</div>
            );
        }
        return (
            <div>
                {this.showOrderDetails()}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { order: state.order[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { ...Action })(OrderDetails);