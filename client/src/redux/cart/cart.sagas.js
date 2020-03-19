import { takeLatest, all, call, put, select } from "redux-saga/effects";

import userActionTypes from "../user/user.types";
import { selectCurrentUser } from "../user/user.selectors";
import cartActionTypes from "./cart.types";
import { clearCart, setCart } from "./cart.actions";
import { selectCartItems } from "./cart.selectors";

import { getUserCartRef } from "../../firebase/firebase.utils";

// ----------------------- handlers -----------------------

export function* clearCartOnSignOut() {
	yield put(clearCart());
}

export function* checkExternalCart({ payload: user }) {
	const cartRef = yield getUserCartRef(user.id);
	const cartSnapshot = yield cartRef.get();
	yield put(setCart(cartSnapshot.data().cartItems));
}

export function* updateExternalCart() {
	const currentUser = yield select(selectCurrentUser);
	if (currentUser) {
		try {
			const cartRef = yield getUserCartRef(currentUser.id);
			const cartItems = yield select(selectCartItems);
			cartRef.update({ cartItems });
		} catch (error) {
			console.log(error);
		}
	}
}

// ----------------------- listeners -----------------------

export function* onSignOutSuccess() {
	yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onUserSignIn() {
	yield takeLatest(userActionTypes.SIGN_IN_SUCCESS, checkExternalCart);
}

export function* onCartChange() {
	yield takeLatest(
		[
			cartActionTypes.ADD_ITEM,
			cartActionTypes.REMOVE_ITEM,
			cartActionTypes.CLEAR_ITEM_FROM_CART
		],
		updateExternalCart
	);
}

// ---------------------------------------------------------

export function* cartSagas() {
	yield all([call(onSignOutSuccess), call(onUserSignIn), call(onCartChange)]);
}
