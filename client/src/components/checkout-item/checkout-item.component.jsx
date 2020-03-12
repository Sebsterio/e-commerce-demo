import React from "react";
import { connect } from "react-redux";

import "./checkout-item.styles.scss";

import {
	addItem,
	removeItem,
	clearItemFromCart
} from "./../../redux/cart/cart.actions";

const CheckoutItem = ({ cartItem, addItem, removeItem, clearItem }) => {
	const { name, imageUrl, quantity, price } = cartItem;
	return (
		<div className="checkout-item">
			<div className="image-container">
				<img src={imageUrl} alt="item image" />
			</div>
			<span className="name">{name}</span>
			<span className="quantity">
				<span className="arrow" onClick={() => removeItem(cartItem)}>
					&#10094;
				</span>
				<span className="value">{quantity}</span>
				<span className="arrow" onClick={() => addItem(cartItem)}>
					&#10095;
				</span>
			</span>
			<span className="price">{price}</span>
			<div className="remove-button" onClick={() => clearItem(cartItem)}>
				&#10005;
			</div>
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	addItem: cartItem => dispatch(addItem(cartItem)),
	removeItem: cartItem => dispatch(removeItem(cartItem)),
	clearItem: cartItem => dispatch(clearItemFromCart(cartItem))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
