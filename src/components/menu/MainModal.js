import React, {Component} from 'react';
import { Modal, Header, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import _ from 'lodash';

import * as Action from '../../actions';
import ToppingsForm from './forms/ToppingsForm';
import DrinksForm from './forms/DrinksForm';

class MainModal extends Component{
    constructor(props){
        super(props);
        this.subOrderIndex = 0;
        this.state = { 
            pizzaAmount: 1,
            step: 1
        };
    }
    

    NumberOfPizzas = () => {
        return (
            <React.Fragment>
                <Modal.Content>
                <Modal.Description>
                    <Header as='h5' block textAlign='center'>
                        Number of Pizzas: 
                            <input type="number" 
                                style={{marginLeft: "10px"}} 
                                min="1" max="5"
                                value={this.state.pizzaAmount}
                                onChange={(e) => this.setState({pizzaAmount: parseInt(e.target.value)})}   
                            />
                    </Header>          
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button className="ui primary button" onClick={this.HandleButtonClick}>Next</Button>
            </Modal.Actions>
        </React.Fragment>
        );
    }

    addedToCartMessage = () => {
        return (
            <React.Fragment>
                <Modal.Content>
                <Modal.Description>
                    <Header as='h1' block textAlign='center'>
                        <img className="ui image" src="https://p7.hiclipart.com/preview/811/919/777/check-mark-computer-icons-royalty-free-clip-art-blue-check-mark.jpg" alt="added to cart successfully"></img>
                        <br />
                        Added to Cart Successfully
                    </Header>          
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button className="ui primary button" onClick={this.HandleButtonClick}>Finish</Button>
            </Modal.Actions>
        </React.Fragment>
        );
    }

    updateTotalPrice = () => {
        const { numberOfPizzas, pizzaDescription: { discountedPrice, price }, toppings, drinks } = this.props.cart.order[this.subOrderIndex];    

        // update price with old total price
        let totalPrice = this.props.cart.totalPrice;

        // update price by amount of pizzas
        totalPrice += discountedPrice ? (numberOfPizzas * discountedPrice) : (numberOfPizzas * price); 

        // update price by toppings for each pizza
        const toppingsArray = Object.values(toppings);
        for (let i = 0; i < toppingsArray.length; ++i){
            let toppingsObject = Object.values(toppingsArray[i]);
            for (let j = 0; j < toppingsObject.length; ++j){
                totalPrice += toppingsObject[j].price;
            }
        }

        // update price by drinks
        const drinksObject = Object.values(drinks);
        for (let i = 0; i < drinksObject.length; ++i){
            totalPrice += (drinksObject[i].price * drinksObject[i].amount);
        }

        // save updated total price to cart store
        this.props.updateTotalPriceAction(totalPrice);
    }

    onToppingsFormSubmit = (formValues, dispatch) => { 
        let filteredValues = Object.keys(formValues).filter(val => formValues[val]); // take only the checked fields
        filteredValues = this.props.toppings.filter(val => filteredValues.includes(val.item)); // map values to have all toppings info from store
        filteredValues = _.mapValues(filteredValues); // convert array to object
        
        const toppingsIndex = this.props.cart.order[this.subOrderIndex].currentPizza;

        filteredValues = {
            subOrderIndex: this.subOrderIndex,
            itemsIndex: toppingsIndex,
            items: { ...filteredValues }
        };  

        this.props.addToppingsToCartAction(filteredValues);

        filteredValues = {
            subOrderIndex: this.subOrderIndex,
            index: toppingsIndex + 1,
        };  
        this.props.updateCurrentPizzaNumberToCartAction(filteredValues);

        dispatch(reset("ToppingsForm")); // clear form fields 
        this.HandleButtonClick();
    };

    onDrinksFormSubmit = (formValues, dispatch) => { 
        let filteredValues = Object.keys(formValues).filter(val => formValues[val] > 0); // take only the fields that has at least 1 drink
        filteredValues = this.props.drinks.filter(val => filteredValues.includes(val.item)); // map values to have all drinks info from store
        filteredValues.map(val => val.amount = formValues[val.item]); // add order amount for each drink
        filteredValues = _.mapValues(filteredValues); // convert array to object

        filteredValues = {
            subOrderIndex: this.subOrderIndex,
            items: { ...filteredValues }
        };  

        this.props.addDrinksToCartAction(filteredValues);

        dispatch(reset("DrinksForm")); // clear form fields 
        this.HandleButtonClick();
    };

    HandleButtonClick = () => {
        this.subOrderIndex = _.keys(this.props.cart.order).length;

        if (this.state.step === 1){
            this.props.addNumberOfPizzasToCartAction({subOrderIndex: this.subOrderIndex, numberOfPizzas: this.state.pizzaAmount});  
            this.setState({step: this.state.step + 1}); // update state to next step  
        } 
        
        else if (this.state.step === 2){
            const toppingIndex = this.props.cart.order[this.subOrderIndex].currentPizza;

            if (toppingIndex === this.state.pizzaAmount){ // done with all the toppings
                this.setState({step: this.state.step + 1}); // update state to next step 
                
                if (toppingIndex !== 1) // save ACTION call if there is only 1 pizza
                {
                    // reset current pizza number for the drinks step        
                    const values = {
                        subOrderIndex: this.subOrderIndex,
                        index: 1
                    };  
                    this.props.updateCurrentPizzaNumberToCartAction(values); 
                }
   
            }          
        } 
        
        else if (this.state.step === 3){
            this.setState({step: this.state.step + 1}); // update state to next step  
        } 

        else if (this.state.step === 4){
            this.updateTotalPrice();
            this.props.closeModalAction(true);
            this.setState({pizzaAmount: 1, step:  1}); // reset the state of step
        }
    }

    closeModal = () => {
        this.props.closeModalAction();
        this.setState({pizzaAmount: 1, step:  1}); // reset the state of step
    }

    ModalContent = () => {
        switch (this.state.step){
            case 1: 
                return this.NumberOfPizzas();
            case 2: 
                return <ToppingsForm toppings={this.props.toppings} order={this.props.cart.order[this.subOrderIndex]} onToppingsFormSubmit={this.onToppingsFormSubmit} />
            case 3: 
                return <DrinksForm drinks={this.props.drinks} onDrinksFormSubmit={this.onDrinksFormSubmit} />
            case 4:
                return this.addedToCartMessage();
            default:
                return <div>Error Message: step 5 does not exist!</div>
        }
    }

    ShowModal = () => {
        return(
            <Modal 
            size="small"
            open={this.props.cart.isModalOpen}
            onClose={() => this.closeModal()}
            closeIcon>
                <Modal.Header>Order Details</Modal.Header>
                {this.ModalContent()}
            </Modal>
        );
    
    }
    
    render() {
        return (
            <div>
                {this.ShowModal()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    // debugger;
    return { 
        cart: state.cart,
        drinks: state.menu.drinks,
        toppings: state.menu.toppings
     };
}

// const mapDispatchToProps = dispatch => {
//     return {
//         closeModalAction: () => Action.closeModalAction(dispatch),
//         addNumberOfPizzasToCartAction: (number) => Action.addNumberOfPizzasToCartAction(dispatch, number),
//         updateCurrentPizzaNumberToCartAction: (number) => Action.updateCurrentPizzaNumberToCartAction(dispatch, number),
//         addToppingsToCartAction: (item) => Action.addToppingsToCartAction(dispatch, item)
//     }
// }

const formWrapper = connect(mapStateToProps, { ...Action })(MainModal);
export default formWrapper;
// export default reduxForm({
//     form: 'ToppingsForm',
//     form: 'DrinksForm',
// })(formWrapper);
