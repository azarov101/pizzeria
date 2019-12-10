import ActionType from '../actions/constants';

const initialState = {
    isModalOpen: false,
    totalPrice: 0,
    order: { 
        // { 
        //     numberOfPizzas: 0,
        //     currentPizza: 0,
        //     drinks: [ ],
        //     pizzaDescription: { },
        //     toppings: [ ]
        // }, 
    }
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    let newState;
    let index, updatedOrder; // helper variables

    switch (type) {
        case ActionType.OPEN_MODAL:
            newState = {...state, ...payload};
            break;

        case ActionType.CLOSE_MODAL:
            newState = initialState;
            break;

        case ActionType.ADD_PIZZA_TO_CART:
            index = payload.subOrderIndex;
            delete payload.subOrderIndex; // remove unnecessary props from payload
            updatedOrder = state.order[index] ? { ...state.order[index], ...payload } : { ...payload };
            newState = {...state, order: { ...state.order, [index]: updatedOrder}};
            break;

        case ActionType.ADD_NUMBER_OF_PIZZAS_TO_CART:
            index = payload.subOrderIndex;
            delete payload.subOrderIndex; // remove unnecessary props from payload
            updatedOrder = { ...state.order[index] , ...payload };
            newState = {...state, order: { ...state.order, [index]: updatedOrder}};
            break;

        case ActionType.UPDATE_CURRENT_PIZZA_NUMBER_TO_CART:
            index = payload.subOrderIndex;
            updatedOrder = { ...state.order[index] , currentPizza: payload.currentPizza };
            newState = {...state, order: { ...state.order, [index]: updatedOrder}};
            break;

        case ActionType.ADD_TOPPINGS_TO_CART:
            index = payload.subOrderIndex;
            updatedOrder = {[payload.toppingIndex]: payload.toppings }; // add the index of the toppings
            updatedOrder = { ...state.order[index].toppings , ...updatedOrder }; // add those toppings to state
            updatedOrder = { ...state.order[index] , toppings: updatedOrder }; // update toppings slice
            newState = {...state, order: { ...state.order, [index]: updatedOrder}};
            break;
            
        default:
            newState = state;
            break;
    }
    return newState;
}