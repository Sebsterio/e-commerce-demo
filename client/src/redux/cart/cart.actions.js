import cartActionTypes from "./cart.types";

export const toggleCartHidden = () => ({
	type: cartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
	type: cartActionTypes.ADD_ITEM,
	payload: item
});

export const removeItem = item => ({
	type: cartActionTypes.REMOVE_ITEM,
	payload: item
});

export const clearItemFromCart = item => ({
	type: cartActionTypes.CLEAR_ITEM_FROM_CART,
	payload: item
});

export const clearCart = () => ({
	type: cartActionTypes.CLEAR_CART
});

// export const updateExternalCart = () => ({
// 	type: cartActionTypes.UPDATE_EXTERNAL_CART
// });

export const setCart = cartItems => ({
	type: cartActionTypes.SET_CART,
	payload: cartItems
});
