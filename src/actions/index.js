import api from '../apis/pizza';
import ActionType from './constants';

// **************************** Server & Store Actions **************************** //
// GET List of all item in menu
export const getMenuAction = () => async dispatch => {
    const response = await api.get("/menu");

    dispatch({ type: ActionType.GET_MENU_LIST, payload: response.data });
};

// GET Order by id
export const getOrderAction = id => async dispatch => {
    const response = await api.get(`/order/${id}`);

    dispatch({ type: ActionType.GET_ORDER, payload: response.data });
};

// POST new Order
export const createOrderAction = formValues => async dispatch => {
    const response = await api.post('/order', formValues);

    dispatch({ type: ActionType.CREATE_ORDER, payload: response.data });
};


// **************************** Store Actions **************************** //
// cart
export const openModalAction = () => dispatch => {
    const action = {type: ActionType.OPEN_MODAL, payload: { isModalOpen: true }};   
    dispatch(action);
}
export const closeModalAction = () => dispatch => {
    const payload = { isModalOpen: false };
    const action = {type: ActionType.CLOSE_MODAL, payload };   
    dispatch(action);
}

export const addPizzaToCartAction = item => dispatch => {
    const action = {type: ActionType.ADD_PIZZA_TO_CART, payload: item };   
    dispatch(action);
}

export const addNumberOfPizzasToCartAction = item => dispatch => {
    const payload = { ...item, currentPizza: 1 };
    const action = { type: ActionType.ADD_NUMBER_OF_PIZZAS_TO_CART, payload };   
    dispatch(action);
}

export const updateCurrentPizzaNumberToCartAction = item => dispatch => {
    const payload = { subOrderIndex: item.subOrderIndex ,currentPizza: item.index};
    const action = { type: ActionType.UPDATE_CURRENT_PIZZA_NUMBER_TO_CART, payload };   
    dispatch(action);
}

export const addToppingsToCartAction = item => dispatch => {
    const action = { type: ActionType.ADD_TOPPINGS_TO_CART, payload: item };   
    dispatch(action);
}