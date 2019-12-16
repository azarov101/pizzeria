import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider, Grid, Segment, Input, Icon, Menu, Table } from 'semantic-ui-react'

import * as Action from '../../actions';

class OrderSearch extends Component{
    componentDidMount(){
        this.props.getOrderListAction();
    }

    searchComponent = () => {
        return (
            <Segment textAlign="center" padded="very">
            <Grid columns={2} relaxed='very'>
                <Grid.Column>
                    <Input
                        icon={<Icon name='search' inverted circular link />}
                        placeholder='Search By Order ID #'
                        fluid focus
                    />
                </Grid.Column>
                <Grid.Column verticalAlign='middle'>
                    <button className="primary ui button"><i className="clipboard list icon"></i>Show all orders</button>
                </Grid.Column>
            </Grid>
        
            <Divider vertical>Or</Divider>
          </Segment>
        );
    }

    tableComponent = () => {
        const { order: orders } = this.props;
        // console.log(orders);

        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Order ID</Table.HeaderCell>
                        <Table.HeaderCell>Order Name</Table.HeaderCell>
                        <Table.HeaderCell>Total Price</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
            
                <Table.Body>
                    {orders && orders.map((order, index) => (
                        <Table.Row key={index}>
                            <Table.Cell>{order.id}</Table.Cell>
                            <Table.Cell>{order.name}</Table.Cell>
                            <Table.Cell>{order.price}$</Table.Cell>
                            <Table.Cell>{order.status}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
          </Table>
        );
    }

    render(){
        if (!this.props.order){
            return (
                <div className="ui active transition visible inverted dimmer">
                    <div className="content"><div className="ui medium text loader">Loading Orders</div></div>
                </div>
            ); 
        }
        return (
            <div>
                <center><h1>Search Your Order</h1></center>
                {this.searchComponent()}
                <br />
                {this.tableComponent()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { order: Object.values(state.order) };
}

export default connect(mapStateToProps, { ...Action })(OrderSearch);