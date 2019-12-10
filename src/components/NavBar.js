import React from 'react';
import { Menu, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

function NavBar() {
    return(
        <div>
            <Menu stackable fluid widths={4}>
                <Menu.Item>
                    <h2 className="ui center aligned icon"> <Link to="/"><i className=" home icon"></i></Link> </h2>
                </Menu.Item>

                <Menu.Item name="menu">
                    <Link to="/menu">Menu</Link>
                </Menu.Item>

                <Menu.Item name="order" >
                    Order
                </Menu.Item>

                <Menu.Item name="about" >
                    About
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default NavBar;