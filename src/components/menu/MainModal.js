import React, {Component} from 'react';
import { Modal, Header, Button, Table, Image, Checkbox, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Field, Form, reduxForm, reset } from 'redux-form';
import _ from 'lodash';

import * as Action from '../../actions';

class MainModal extends Component{
    constructor(props){
        super(props);
        this.subOrderIndex = 0;
        this.state = { 
            pizzaAmount: 1,
            step: 1
        };
    }

    RenderFormInput = field => {
        return (
            <div className="ui slider checkbox">
                <input 
                    { ...field.input }
                    type={field.type} 
                     />
                    <label>{ field.label }</label>
          </div>
          ); 
      }

    ChooseItemsForm = (items, stepStr) => {
        const { numberOfPizzas, currentPizza } = this.props.cart.order[this.subOrderIndex];

        return (
            <Form className="ui form" onSubmit={this.props.handleSubmit((formValues, dispatch) => this.OnFormSubmit(formValues, dispatch, stepStr))}>
            <Modal.Content>
                <Header as='h4' block textAlign='center'>
                    {this.props.cart.order[this.subOrderIndex] && 
                        ((numberOfPizzas === 1 && `Choose ${stepStr} for the pizza`) ||
                        (numberOfPizzas > 1 && `Choose ${stepStr} for Pizza #${currentPizza}`))
                    }
                </Header>    
                <Card.Group itemsPerRow={4} textAlign="center" centered > 
                    {items && items.map((item, index) => {
                        
                        return (
                            <div className="column" key={index}>
                            <Card fluid>
                                <div style={{height: "100px"}}>
                                    <img src={item.image} style={{ maxWidth: "100%", maxHeight: "100%", display: "block", margin: "0 auto", objectFit: "cover", height: "200px"}} />
                                </div>
                                <Card.Content>
                                    <Card.Header>
                                    <Field 
                                        name={item.item}
                                        label={item.item}
                                        type="checkbox"
                                        component={this.RenderFormInput}
                                    />   
                                    </Card.Header>
                                </Card.Content>
                            </Card>
                        </div>
                        );
                    })}
                </Card.Group>  
            </Modal.Content>
            <Modal.Actions style={{margin: "25px 12px 12px",  float: "right"}}>
                <Button className="ui primary button">Next</Button>
            </Modal.Actions>
        </Form>
        );
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
                                onChange={(e) => this.setState({pizzaAmount: e.target.value})}   
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

    OnFormSubmit = (formValues, dispatch, stepStr) => { 
        debugger;
        let filteredValues = Object.keys(formValues).filter(val => formValues[val]); // take only the checked fields

        filteredValues = this.props.toppings.filter(val => filteredValues.includes(val.item)); // map values to have all info from store
        const toppingIndex = this.props.cart.order[this.subOrderIndex].currentPizza;

        filteredValues = _.mapValues(filteredValues); // convert array to object

        filteredValues = {
            subOrderIndex: this.subOrderIndex,
            toppingIndex: toppingIndex,
            toppings: { ...filteredValues }
        };  

        if (stepStr == "toppings"){
            this.props.addToppingsToCartAction(filteredValues);
        } else { // drinks
            // this.props.addToppingsToCartAction(filteredValues);
        }

        filteredValues = {
            subOrderIndex: this.subOrderIndex,
            index: toppingIndex + 1,
        };  
        this.props.updateCurrentPizzaNumberToCartAction(filteredValues);

        dispatch(reset("ItemsForm")); // clear form fields 
        this.HandleButtonClick();
    };

    HandleButtonClick = () => {
        this.subOrderIndex = _.keys(this.props.cart.order).length;

        if (this.state.step === 1){
            this.props.addNumberOfPizzasToCartAction({subOrderIndex: this.subOrderIndex, numberOfPizzas: this.state.pizzaAmount});  
            this.setState({step: this.state.step + 1}); // update state to next step  
        } 
        
        else if (this.state.step === 2){
            debugger;
            const toppingIndex = this.props.cart.order[this.subOrderIndex].currentPizza;

            if (toppingIndex == this.state.pizzaAmount){ // done with all the toppings
                this.setState({step: this.state.step + 1}); // update state to next step 
                
                if (toppingIndex != 1) // save ACTION call if there is only 1 pizza
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
            console.log("STEP 3");
        } 
        else if (this.state.step === 4){
            
        }
    }

    ModalContent = () => {
        switch (this.state.step){
            case 1: 
                return this.NumberOfPizzas();
            case 2: 
                return this.ChooseItemsForm(this.props.toppings, "toppings");
            case 3: 
            return this.ChooseItemsForm(this.props.drinks, "drinks");
        }
    }

    ShowModal = () => {
        return(
            <Modal 
            size="small"
            open={this.props.cart.isModalOpen}
            onClose={() => this.props.closeModalAction()}
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
export default reduxForm({
    form: 'ItemsForm'
})(formWrapper);
