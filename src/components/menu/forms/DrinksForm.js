import React from 'react';
import { connect } from 'react-redux';
import { Field, change, Form, reduxForm } from 'redux-form';
import { Modal, Header, Button, Card } from 'semantic-ui-react';

import NumberInputField from '../../common/NumberInputField';

class DrinksForm extends React.Component{
    constructor(props){
        super(props);
        this.min = 0;
        this.max = 10;
    }

    onSubmit = (formValues, dispatch) => {
        this.props.onDrinksFormSubmit(formValues, dispatch);
    }

    minus = (name) => {
        const currentVal = this.props.formProps.values[name];
        if (currentVal > this.min) {
            this.props.change(this.props.form, name, currentVal - 1 ); // decrease value by 1
        }
    }

    plus = (name) => {
        const currentVal = this.props.formProps.values[name];
        if (currentVal < this.max) {
            this.props.change(this.props.form, name, currentVal + 1 ); // increase value by 1
        }
    }

    numberInputField = (formValues) =>{
        if (formValues.input.value === ""){
            this.props.change(this.props.form, formValues.input.name, parseInt(formValues.min)); // default value for the field is 0
        }
        return (
            <React.Fragment>
                <label className="drinkLabel">{formValues.label}</label>
                <NumberInputField name={formValues.input.name} min={formValues.min} max={formValues.max} formValues={formValues} minus={this.minus} plus={this.plus} />
            </React.Fragment>
        );
    };  

    drinksForm = () => {
        const { drinks } = this.props;
        return(
            <Form className="ui form" onSubmit={this.props.handleSubmit((formValues, dispatch) => this.onSubmit(formValues, dispatch))}>
                <Modal.Content>
                    <Header as='h3' block textAlign='center'>Choose your drinks</Header>    
                    <div className="ui doubling stackable centered four column grid cardGroup">
                        {drinks && drinks.map((item, index) => {
                            return (
                                <div className="column" key={index}>
                                    <Card fluid key={index}>
                                        <img
                                            className="drinkImage"
                                            alt="drink" 
                                            src={item.image} 
                                        />
                                        <Card.Content className="centerText">
                                            <Card.Header>
                                            <Field 
                                                name={item.item}
                                                label={item.item}
                                                min={this.min} max={this.max}
                                                component={this.numberInputField}
                                            />   
                                            </Card.Header>
                                        </Card.Content>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>  
                </Modal.Content>
                <Modal.Actions className="modalButton">
                    <Button className="ui primary button">Next</Button>
                </Modal.Actions>
            </Form>
        );

    }
    render(){
        return(
            <div className="ui container">
                {this.drinksForm()}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { formProps: state.form[ownProps.form]}
}

const formWrapper = connect(mapStateToProps, {change})(DrinksForm);

export default reduxForm({
    form: 'DrinksForm',
})(formWrapper);
