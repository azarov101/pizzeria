import ActionType from '../actions/constants';

const initialState = {
    isModalOpen: false,
    totalPrice: 0,
    order: { }
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    let newState;
    let index, updatedOrder; // helper variables

    switch (type) {
        case ActionType.INITIALIZE_STATE:
            newState = initialState;
            break;

        case ActionType.OPEN_MODAL:
            newState = {...state, ...payload};
            break;

        case ActionType.CLOSE_MODAL:
            if (payload.orderFinished) {
                newState = {...state, isModalOpen: payload.isModalOpen};
            } else {
                if (state.totalPrice !== 0){ // clear current order only
                    updatedOrder = { ...state.order };
                    delete updatedOrder[Object.keys(updatedOrder).length];
                    updatedOrder = { ...state, order: { ...updatedOrder }, isModalOpen: payload.isModalOpen }
                    newState = { ...state, ...updatedOrder }
                } else {
                    newState = initialState;
                }
            }
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
            updatedOrder = {[payload.itemsIndex]: payload.items }; // add the index of the toppings
            updatedOrder = { ...state.order[index].toppings , ...updatedOrder }; // add those toppings to state
            updatedOrder = { ...state.order[index] , toppings: updatedOrder }; // update toppings slice
            newState = {...state, order: { ...state.order, [index]: updatedOrder}};
            break;

        case ActionType.ADD_DRINKS_TO_CART:
            index = payload.subOrderIndex;
            updatedOrder = Object.keys(payload.items).length > 0 ? { drinks: payload.items } : { drinks: {} };
            updatedOrder = { ...state.order[index] , ...updatedOrder }; // add to drinks slice
            newState = {...state, order: { ...state.order, [index]: updatedOrder}};
            break;

        case ActionType.UPDATE_TOTAL_PRICE:
            newState = {...state, totalPrice: payload};
            break;
            
        default:
            newState = state;
            break;
    }
    return newState;
}