import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, Form, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import DropdownList from 'react-widgets/lib/DropdownList'
import 'react-widgets/dist/css/react-widgets.css'

import * as Action from '../../actions';
import deliveryImage from '../../images/delivery.png';

class OrderCreate extends Component {

    componentDidMount(){
        this.props.getCityAction();
    }

    onSubmit = formValues => {
        debugger;
        const items = {...this.props.cart.order};
        const order = {
            name: formValues.fullName,
            location: `${formValues.city}, ${formValues.street} ${formValues.number}`,
            notes: formValues.notes,
            status: "Delivered",
            items: items
        };
        this.props.createOrderAction(order);
    }

    renderFormInput = field => {
        return (
            <React.Fragment>
                <label>{ field.label }</label>
                <div className={field.className}>
                    <input 
                        { ...field.input }
                        autoComplete="off"
                        type={field.type} 
                        placeholder={field.placeholder}
                        />
                </div>
          </React.Fragment>
          ); 
    }

    renderDropdownList  = field => {
        return (
            <React.Fragment>
                <label>{ field.label }</label>
                    <DropdownList  
                        { ...field.input }
                        placeholder={field.placeholder}
                        data={field.data}
                        />
          </React.Fragment>
          );
    }

    renderFormTextArea = field => {
        return (
            <React.Fragment>
                <label>{ field.label }</label>
                <div className={field.className}>
                    <textarea 
                        { ...field.input }
                        autoComplete="off"
                        placeholder={field.placeholder}
                        rows={field.rows}
                    />
                </div>
          </React.Fragment>
        ); 
    }

    showForm = () => {
        return (
            <React.Fragment>
                <div style={{margin: "0 auto", textAlign: "center"}}>                
                    <img  src={deliveryImage} style={{width: "50%"}} />
                </div>
                <h1 style={{textAlign: "center"}}>Enter Your Details</h1>
                <br />
                <Form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="fields">
                        <div className="four wide field">
                            <Field 
                                name="fullName"
                                label="Full Name"
                                placeholder="Full Name"
                                className="ui input"
                                type="input"
                                component={this.renderFormInput}
                            />   
                        </div>
                        <div className="four wide field">
                            <Field 
                                name="city"
                                label="City"
                                placeholder="City"
                                data={this.props.city}
                                component={this.renderDropdownList}
                            />   
                        </div>
                        <div className="four wide field">
                            <Field 
                                name="street"
                                label="Street"
                                placeholder="Street"
                                className="ui input"
                                type="input"
                                component={this.renderFormInput}
                            />   
                        </div>
                        <div className="four wide field">
                            <Field 
                                name="number"
                                label="Number"
                                placeholder="Number"
                                className="ui input"
                                type="input"
                                component={this.renderFormInput}
                            />   
                        </div>
                    </div>

                    <div className="field">
                        <Field 
                            name="notes"
                            label="Notes"
                            placeholder="Enter notes for the order..."
                            rows="3"
                            component={this.renderFormTextArea}
                        />
                    </div>
                    <Button fluid className="ui primary button">Submit</Button>
                </Form>
            </React.Fragment>
        );
    }

    render(){
        const { order ,totalPrice } = this.props.cart;

        // no orders in cart
        if (Object.keys(order).length === 0) {
            return <h1>There are no orders it cart!</h1>
        }
        
        // loading cities
        if (this.props.city.length == 0) {
            return (
                <div className="ui active transition visible inverted dimmer">
                    <div className="content"><div class="ui medium text loader">Loading Cities</div></div>
                </div>
            );
        }

        // there is an order - redirect to order page
        if (Object.values(this.props.order).length === 1){
            return (
                <div className="ui active transition visible inverted dimmer">
                    <div className="content"><div class="ui medium text loader">Order was completed successfully - Redirect to order page</div></div>
                    {this.props.history.push(`/order/${Object.keys(this.props.order)}`)}
                </div>
            );
        }

        return(
            <div> { this.showForm() } </div>
        );
    }
}

const mapStateToProps = state => {
    return ({
        cart: state.cart,
        city: state.location.city,
        order: state.order
    });
}

const formWrapper =  connect(mapStateToProps, {...Action})(OrderCreate); 

export default reduxForm({
    form: 'OrderForm'
})(formWrapper);