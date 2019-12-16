import React from 'react';

import pizzaImage from '../images/pizza1.png'

function Home() {
    return(
    <div>
        <img alt="pizza cover" src={pizzaImage} style={{width: "100%"}} />
        <h1 style={{textAlign: "center"}} >Mitzpe Ramon Pizzeria</h1>
    </div>
    );
}

export default Home;