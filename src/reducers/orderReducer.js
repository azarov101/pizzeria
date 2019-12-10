import ActionType from '../actions/constants';

export default (state={}, action) => {
    const {type, payload} = action;
    let newState;

    switch (type){
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