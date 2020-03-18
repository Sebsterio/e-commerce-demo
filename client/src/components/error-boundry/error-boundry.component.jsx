import React from "react";

import {
	ErrorImageOverlay,
	ErrorImageContainer,
	ErrorImageText
} from "./error-boundary.styles";

class ErrorBoundry extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasErrored: false };
	}

	static getDerivedStateFromError(error) {
		return { hasErrored: true };
	}

	componentDidCatch(error, info) {
		console.log(error);
	}

	render() {
		if (this.state.hasErrored)
			return (
				<ErrorImageOverlay>
					<ErrorImageContainer imageUrl="https://i.imgur.com/qIufhof.png" />
					<ErrorImageText>Something went wrong...</ErrorImageText>
				</ErrorImageOverlay>
			);

		return this.props.children;
	}
}

export default ErrorBoundry;
