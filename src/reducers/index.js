import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import menuReducer from './menuReducer';
import orderReducer from './orderReducer';
import cartReducer from './cartReducer';

export default combineReducers({
    menu: menuReducer,
    order: orderReducer,
    cart: cartReducer,
    form: formReducer
});

