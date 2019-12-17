// import _ from 'lodash';
import ActionType from '../actions/constants';

const initialState = {
    city: []
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    let newState;

    switch (type) {
        case ActionType.GET_CITY_LIST:
            newState = { ...state, city: payload };
            break;
        default:
            newState = state;
            break;
    }
    return newState;
}