// keys.js
let stripeKeys = {
	PUBLISHABLE_KEY: null,
	STRIPE_SECRET_KEY: null,
	STRIPE_WEBHOOK_SECRET: null,
	isGetKeys: false,
};

export const setStripeKeys = (keys) => {
	stripeKeys = keys;
};

export const getStripeKeys = () => {
	return stripeKeys;
};
