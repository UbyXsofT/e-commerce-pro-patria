// LoadingWrapper.js
import React from "react";
import { connect } from "react-redux";
import { setLoading } from "../../store/actions";

type LoadingWrapperProps = {
	children: React.JSX.Element[] | React.JSX.Element;
	setLoading: (isLoading: boolean) => {
		type: string;
		payload: boolean;
	};
	showLoader: boolean;
};

const LoadingWrapper = ({
	children,
	setLoading,
	showLoader,
}: LoadingWrapperProps) => {
	React.useEffect(() => {
		setLoading(showLoader);
	}, [showLoader, setLoading]);

	return <>{children}</>;
};

const mapDispatchToProps = {
	setLoading,
};

export default connect(null, mapDispatchToProps)(LoadingWrapper);
