import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Redirect } from "react-router-dom";

import "./App.css";

// import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import Header from "./components/header/header.component";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));

const App = ({ checkUserSession, currentUser }) => {
	useEffect(() => checkUserSession(), [checkUserSession]);

	return (
		<div>
			<Header />
			<Switch>
				<Suspense fallback={<div>Loading...</div>}>
					<Route exact path="/" component={HomePage} />
				</Suspense>
				<Route path="/shop" component={ShopPage} />
				<Route path="/checkout" component={CheckoutPage} />
				<Route
					path="/signin"
					render={() =>
						currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
					}
				/>
			</Switch>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
	checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
