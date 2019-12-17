import _ from 'lodash';
import ActionType from '../actions/constants';

export default (state={}, action) => {
    const {type, payload} = action;
    let newState;

    switch (type){
        case ActionType.INITIALIZE_STATE:
            newState = {};
            break;
        case ActionType.GET_ORDER_LIST:
            newState = { ...state, ..._.mapKeys(payload, "id") };
            break;
        case ActionType.GET_ORDER:
            newState = { ...state, [payload.id]: payload };
            break;
        case ActionType.CREATE_ORDER:
            newState = { ...state, [payload.id]: payload };
            break;
        default:
            newState = state;
            break;
    }
    return newState;
}