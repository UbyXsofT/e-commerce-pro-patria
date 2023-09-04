export const authMiddleware = (storeAPI) => (next) => (action) => {
	if (action.type === "SET_AUTH_ECOMMERCE") {
		return next(action);
	}

	if (action.type === "SET_AUTH_USER") {
		return next(action);
	}

	return next(action);
};
