module.exports = {
	apps: [
		{
			name: "ecommerce-byteware",
			script: "node_modules/next/dist/bin/next",
			args: "start",
			env: {
				NODE_ENV: "production",
				PORT: 3000,
				HTTPS: true,
			},
		},
	],
};
