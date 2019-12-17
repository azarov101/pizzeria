import React from 'react';
import { Modal, Header, Button, Card } from 'semantic-ui-react';
import { Field, Form, reduxForm } from 'redux-form';

function DrinksForm(props) {
    const {drinks, onDrinksFormSubmit} = props;

    const onSubmit = (formValues, dispatch) => {
        onDrinksFormSubmit(formValues, dispatch);
    }

    const renderFormInput = field => {
        return (
            <div>
                <label>{ field.label }</label>
                <input 
                    { ...field.input }
                    type={field.type}
                    min={field.min}
                    max={field.max}
                    style={{fontSize: "12px", width: "75%"}}
                     />
          </div>
          ); 
    }

    const drinksForm = () => {
        return(
            <Form className="ui form" onSubmit={props.handleSubmit((formValues, dispatch) => onSubmit(formValues, dispatch))}>
                <Modal.Content>
                    <Header as='h4' block textAlign='center'>Choose your drinks</Header>    
                    <Card.Group itemsPerRow={4} textAlign="center" centered > 
                        {drinks && drinks.map((item, index) => {
                            
                            return (
                                <div key={index}>
                                <Card fluid>
                                    <div style={{height: "100px"}}>
                                        <img
                                            alt="drink" 
                                            src={item.image} 
                                            style={{ maxWidth: "100%", maxHeight: "100%", display: "block", margin: "0 auto", objectFit: "cover", height: "200px"}} />
                                    </div>
                                    <Card.Content>
                                        <Card.Header>
                                        <Field 
                                            name={item.item}
                                            label={item.item}
                                            min="0" max="10"
                                            type="number"
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
            {drinksForm()}
        </div>
    );
}

export default reduxForm({
    form: 'DrinksForm',
})(DrinksForm);
