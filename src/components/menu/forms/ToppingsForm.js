import React from 'react';
import { Modal, Header, Button, Card } from 'semantic-ui-react';
import { Field, Form, reduxForm } from 'redux-form';

function ToppingsForm(props) {
    const {toppings, order, onToppingsFormSubmit} = props;

    const onSubmit = (formValues, dispatch) => {
        onToppingsFormSubmit(formValues, dispatch);
    }

    const renderFormInput = field => {
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

    const toppingsForm = () => {
        return(
            <Form className="ui form" onSubmit={props.handleSubmit((formValues, dispatch) => onSubmit(formValues, dispatch))}>
                <Modal.Content>
                    <Header as='h4' block textAlign='center'>
                        {order && 
                            ((order.numberOfPizzas === 1 && `Choose toppings for the pizza`) ||
                            (order.numberOfPizzas > 1 && `Choose toppings for Pizza #${order.currentPizza}`))
                        }
                    </Header>    
                    <Card.Group itemsPerRow={4} textAlign="center" centered > 
                        {toppings && toppings.map((item, index) => {
                            
                            return (
                                <div className="column" key={index}>
                                <Card fluid>
                                    <div style={{height: "100px"}}>
                                        <img 
                                            src={item.image} 
                                            alt="topping" 
                                            style={{ maxWidth: "100%", maxHeight: "100%", display: "block", margin: "0 auto", objectFit: "cover", height: "200px"}}
                                        />
                                    </div>
                                    <Card.Content>
                                        <Card.Header>
                                        <Field 
                                            name={item.item}
                                            label={item.item}
                                            type="checkbox"
                                            component={renderFormInput}
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

    return(
        <div className="ui container">
            {toppingsForm()}
        </div>
    );
}

export default reduxForm({
    form: 'ToppingsForm',
})(ToppingsForm);
