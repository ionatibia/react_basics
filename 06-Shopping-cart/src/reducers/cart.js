export const cartIinitialState = JSON.parse(window.localStorage.getItem('cart')) || [];

const ACTION_TYPES = {
    ADD_TO_CART:'ADD_TO_CART',
    REMOVE_FROM_CART:'REMOVE_FROM_CART',
    CLEAR_CART:'CLEAR_CART'
}

function updateLocalStorage(state) {
    window.localStorage.setItem('cart',JSON.stringify(state))
}

export const cartReducer = (state, action) => {
    const { type: actionType, payload: actionPayload } = action;
    let newState = []
    if(actionType === ACTION_TYPES.ADD_TO_CART){
        const { id } = actionPayload;
        const productInCartIndex = state.findIndex(
            (item) => item.id === id
        );
        if (productInCartIndex >= 0) {
            newState = structuredClone(state);
            newState[productInCartIndex].quantity += 1;
        }else{
            newState = [
                ...state,
                {
                    ...actionPayload,
                    quantity: 1,
                },
            ];
        }
        
    }
    if(actionType === ACTION_TYPES.REMOVE_FROM_CART){
        const { id } = actionPayload;
        newState =  state.filter((item) => item.id !== id);
    }
    if(actionType === ACTION_TYPES.CLEAR_CART){
        newState = []
    }
    updateLocalStorage(newState)
    return newState;
};