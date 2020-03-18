import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Redirect } from "react-router-dom";

import Header from "./components/header/header.component";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundry from "./components/error-boundry/error-boundry.component";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";

import "./App.css";

// lazy imports
const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const CheckoutPage = lazy(() =>
	import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);
const SignInAndSignUpPage = lazy(() =>
	import("./pages/checkout/checkout.component")
);

// Component
const App = ({ checkUserSession, currentUser }) => {
	useEffect(() => {
		checkUserSession();
	}, [checkUserSession]);
	return (
		<div>
			<Header />
			<Switch>
				<ErrorBoundry>
					<Suspense fallback={<Spinner />}>
						<Route exact path="/" component={HomePage} />
						<Route path="/shop" component={ShopPage} />
						<Route path="/checkout" component={CheckoutPage} />
						<Route
							path="/signin"
							render={() =>
								currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
							}
						/>
					</Suspense>
				</ErrorBoundry>
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
