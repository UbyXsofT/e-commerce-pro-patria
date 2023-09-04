// actions.js
export const setLoading = (isLoading) => ({
  type: "SET_LOADING",
  payload: isLoading,
});

export const setAuthEcommerce = (isAuthenticated) => ({
	type: "SET_AUTH_ECOMMERCE",
	payload: isAuthenticated,
});

export const setAuthUser = (userData) => ({
	type: "SET_AUTH_USER",
	payload: userData,
});
