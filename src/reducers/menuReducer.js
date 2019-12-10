import _ from 'lodash';
import ActionType from '../actions/constants';

const initialState = {
    drinks: [],
    pizzas: [],
    toppings: []
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    let newState;

    switch (type) {
        case ActionType.GET_MENU_LIST:
            newState = {...state, ...payload};
            break;
        default:
            newState = state;
            break;
    }
    return newState;
}