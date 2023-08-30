// LoadingWrapper.js
import React from "react";
import { connect } from "react-redux";
import { setLoading } from "../../store/actions";

const LoadingWrapper = ({ children, setLoading, visualizzaLoading }) => {
	React.useEffect(() => {
		setLoading(visualizzaLoading);
	}, [visualizzaLoading, setLoading]);

	return <>{children}</>;
};

const mapDispatchToProps = {
	setLoading,
};

export default connect(null, mapDispatchToProps)(LoadingWrapper);
