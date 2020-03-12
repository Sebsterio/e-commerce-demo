import React from "react";
import StripeCheckout from "react-stripe-checkout";

import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey = "pk_test_C1bOWlnZYi0A7g9W0HwdTBmR00mogFMkK4";

	const onToken = token => {
		axios({
			url: "payment",
			method: "post",
			data: {
				amount: priceForStripe,
				token
			}
		})
			.then(response => {
				alert("Payment succesful");
			})
			.catch(err => {
				console.log("Payment error: ", err);
				alert("Payment error");
			});
	};
	return (
		<StripeCheckout
			label="Pay Now"
			name="E-commerce demo website"
			billingAddress
			shippingAddress
			image="https://svgshare.com/i/CUz.svg"
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel="Pay Now"
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export default StripeCheckoutButton;
