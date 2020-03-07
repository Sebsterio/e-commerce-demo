import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey = "pk_test_C1bOWlnZYi0A7g9W0HwdTBmR00mogFMkK4";

	const onToken = token => {
		console.log(token);
		console.log("------ PAYMENT SUCCESFULL ------");
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
