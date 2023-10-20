import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";
checkout test - with error
//Assicurati di chiamare loadStripe al di fuori del rendering di un componente per evitare
//ricrea l'oggetto Stripe ad ogni rendering.
//Questa è la chiave API pubblicabile di prova.
const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function App() {
	const [clientSecret, setClientSecret] = React.useState("");

	React.useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		fetch("/api/create-payment-intent", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, []);

	const appearance = {
		theme: "stripe",
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<div className="App">
			{clientSecret && (
				<Elements
					options={options}
					stripe={stripePromise}
				>
					<CheckoutForm />
				</Elements>
			)}
		</div>
	);
}
