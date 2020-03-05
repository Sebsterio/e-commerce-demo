import { createSelector } from "reselect"; // memoized selectors
import { createStore } from "redux";

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
	[selectCart],
	cart => cart.cartItems
);

export const selectCartItemsCount = createStore([selectCartItems], cartItems =>
	cartItems.reduce((acc, item) => acc + item.quantity, 0)
);
