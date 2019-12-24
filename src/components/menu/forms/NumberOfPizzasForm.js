import React from 'react';
import { connect } from 'react-redux';
import { Modal, Header, Button } from 'semantic-ui-react';
import { Form, Field, reduxForm, change } from 'redux-form';

import NumberInputField from '../../common/NumberInputField';

class NumberOfPizzasForm extends React.Component {

    onSubmit = (formValues, dispatch) => {
        this.props.onNumberOfPizzasFormSubmit(formValues, dispatch);
    }

    minus = () => {
        const currentVal = this.props.formProps.values.number;
        if (currentVal > 1) {
            this.props.change(this.props.form, "number", currentVal - 1 ); // reset form field value
        }
    }

    plus = () => {
        const currentVal = this.props.formProps.values.number;
        if (currentVal < 5) {
            this.props.change(this.props.form, "number", currentVal + 1 ); // reset form field value
        }
    }

    numberInputField = (formValues) =>{
        if (formValues.input.value === ""){
            debugger;
            this.props.change(this.props.form, formValues.input.name, formValues.min); // default value for the field
        }
        return (
            <NumberInputField name={formValues.name} min={formValues.min} max={formValues.max} formValues={formValues} minus={this.minus} plus={this.plus} />
        );
    };   


    numberOfPizzasForm = () => {
        return(
            <Form className="ui form" onSubmit={this.props.handleSubmit((formValues, dispatch) => this.onSubmit(formValues, dispatch))}>
                <Modal.Content>
                    <Modal.Description>
                        <Header as='h4' textAlign='center' block className="numberOfPizzas">
                            Number of Pizzas: 
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Field 
                                name="number"
                                min={1} max={5}
                                component={this.numberInputField}
                            />                          
                        </Header>          
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions className="modalButton">
                    <Button className="ui primary button">Next</Button>
                </Modal.Actions>
            </Form>
        );
    }

    render(){
        return (
            <div className="ui container">
                {this.numberOfPizzasForm()}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        formProps: state.form[ownProps.form]
    }
}

const formWrapper = connect(mapStateToProps, { change })(NumberOfPizzasForm);

export default reduxForm({
    form: 'NumberOfPizzasForm',
})(formWrapper);
