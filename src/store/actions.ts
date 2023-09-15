// actions.js
export const setLoading = (isLoading: boolean) => ({
	type: "SET_LOADING",
	payload: isLoading,
});

export const setAuthEcommerce = (isAuthenticated: boolean) => ({
	type: "SET_AUTH_ECOMMERCE",
	payload: isAuthenticated,
});

export const setAuthUser = (userData: any) => ({
	type: "SET_AUTH_USER",
	payload: userData,
});
