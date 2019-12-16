import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import * as Action from '../../actions';
import MainModal from './MainModal';

class Menu extends Component {
    constructor(props){
        super(props);
        this.subOrderIndex = 0;
    }

    componentDidMount(){
        this.props.getMenuAction();
        this.props.initializeOrderStateAction();
    }

    pizzaClickHandler = item => {
        this.subOrderIndex = _.keys(this.props.cart.order).length + 1;
        item = { subOrderIndex: this.subOrderIndex, pizzaDescription: item };
        this.props.addPizzaToCartAction(item);
        this.props.openModalAction();
    }

    PizzaMenu = () => (
        <div className="ui four column grid">
            {this.props.menu && this.props.menu.map((item, index) => {
                return(
                    <div className="column col-sm-12" key={index}>
                        <Card onClick={() => this.pizzaClickHandler(item)}>
                            <div style={{height: "200px"}}>
                                <img 
                                    src={item.image}
                                    alt="pizza"
                                    style={{ maxWidth: "100%", maxHeight: "100%", display: "block", margin: "0 auto", objectFit: "cover", height: "200px"}}
                                />
                            </div>
                            <Card.Content>
                                <Card.Header>{item.item}</Card.Header>
                                {item.discountedPrice && 
                                    <Card.Meta>
                                        <span className='description'>DISCOUNT: {(item.price-item.discountedPrice) * 100 / item.price}%</span>
                                    </Card.Meta>
                                }
                                <Card.Description>
                                    Some Description about the Pizza, the origin of the ingredients, what topping does it include
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                            </Card.Content>
                        </Card>
                    </div>
                    
                );
            })}
        </div>
    )

    orderButton = () => {
        if (Object.keys(this.props.cart.order).length > 0) {
            return (
                <div>
                    <br/>
                    <Link className="ui fluid primary button" to="/order/create">Order Now</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h2 className="ui center aligned icon header">
                    <i className="circular utensils icon"></i>
                    Choose Your Pizza
                </h2>
                {this.PizzaMenu()}
                <MainModal />
                {this.orderButton()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    // debugger;
    return { 
        menu: state.menu.pizzas,
        cart: state.cart
     };
}

// const mapDispatchToProps = dispatch => {
//     return {
//         openModalAction: () => Action.openModalAction(),
//         getMenuAction: () => Action.getMenuAction(dispatch),
//         addPizzaToCartAction: (item) => Action.addPizzaToCartAction(dispatch, item)
//     }
// }


export default connect(mapStateToProps, { ...Action })(Menu);