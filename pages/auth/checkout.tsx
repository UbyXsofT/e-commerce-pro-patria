import React from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "src/components/stripe/CheckoutForm";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import { useSelector } from "react-redux";
import { StoreState } from "src/components/CommonTypesInterfaces";

type CustomTheme = "my-custom-theme"; // Aggiungi il tuo tema personalizzato qui
type Appearance = "stripe" | "night" | "flat" | CustomTheme | undefined;

interface CheckoutProps {
	appearance: { theme: Appearance };
}

const Checkout: React.FC<CheckoutProps> = ({ appearance }) => {
	const [stripePromise, setStripePromise] = React.useState<
		Promise<any> | undefined
	>(undefined);

	const { showAlert } = useAlertMe();
	const stripeKeys = useSelector((state: StoreState) => state.stripeKeys);

	const [clientSecret, setClientSecret] = React.useState("");

	React.useEffect(() => {
		// Crea PaymentIntent non appena la pagina viene caricata
		console.log("@@@@ stripeKeys.isGetKeys: ", stripeKeys.isGetKeys);
		if (stripeKeys.isGetKeys === false) {
			//STRIPE LOAD KEYS ESITO NEGATIVO
			const textAlert = (
				<React.Fragment>
					<h3>
						<strong>
							Siamo spiacenti, ma si è verificato un inconveniente nel
							recuperare la configurazione di Stripe, un elemento essenziale per
							elaborare correttamente i pagamenti dei tuoi prodotti. Per favore,
							chiudi questo messaggio e prova nuovamente ad accedere per
							effettuare un nuovo tentativo. Se il problema persiste, ti
							preghiamo di contattare il nostro servizio di assistenza. Grazie
							per la tua comprensione.
						</strong>
					</h3>
				</React.Fragment>
			);
			showAlert(
				"filled",
				"warning",
				"Recupero configurazione Stripe non riuscito!",
				textAlert,
				true,
				"/account/login"
			);
		} else {
			//STRIPE LOAD KEYS ESITO POSITIVO
			//Assicurati di chiamare loadStripe al di fuori del rendering di un componente per evitare
			//ricrea l'oggetto Stripe ad ogni rendering.
			//Questa è la chiave API pubblicabile di prova.
			const stripe = loadStripe(stripeKeys.PUBLISHABLE_KEY);
			setStripePromise(stripe);
			fetch("/api/checkout_sessions/create-payment-intent", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					items: [{ id: "xl-tshirt" }],
					stripeKeys: stripeKeys,
				}),
			})
				.then((res) => res.json())
				.then((data) => setClientSecret(data.clientSecret));
		}
	}, []);

	const options: StripeElementsOptions = {
		clientSecret: clientSecret || undefined,
		appearance: {
			theme: "stripe", // Assicurati che il valore di theme sia uno dei valori consentiti
		},
	};

	return (
		<div className="App">
			{clientSecret && stripePromise && (
				<Elements
					options={options}
					stripe={stripePromise}
				>
					<CheckoutForm />
				</Elements>
			)}
		</div>
	);
};

export default Checkout;

// import React from "react";
// import { loadStripe,StripeElementsOptions } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

// import CheckoutForm from "src/components/stripe/CheckoutForm";
// import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
// import { useSelector } from "react-redux";
// import { StoreState } from "src/components/CommonTypesInterfaces";

// interface CheckoutProps {
//   clientSecret: string | undefined; // Ora può essere undefined
//   appearance: { theme: string };
// }

// export default function checkout() {
// 	const { showAlert } = useAlertMe();
// 	const stripeKeys = useSelector((state: StoreState) => state.stripeKeys);
// 	const [clientSecret, setClientSecret] = React.useState(undefined);
//   // Assicurati che clientSecret sia inizializzato come undefined o con un valore di default
//   const [stripePromise, setStripePromise] = React.useState<Promise<any> | undefined>(undefined);

// 	const appearance = { theme: "stripe" };
//   const options: StripeElementsOptions = {
//     clientSecret: clientSecret || undefined, // Assegna undefined se clientSecret è undefined
//     appearance,
//   };

//   React.useEffect(() => {
//     if (clientSecret) {
//       const stripe = loadStripe(stripeKeys.PUBLISHABLE_KEY);
//       setStripePromise(stripe);
//     }
//   }, [clientSecret]);

// 	React.useEffect(() => {
// 		// Crea PaymentIntent non appena la pagina viene caricata
// 		console.log("@@@@ stripeKeys.isGetKeys: ", stripeKeys.isGetKeys);
// 		if (stripeKeys.isGetKeys === false) {
// 			//STRIPE LOAD KEYS ESITO NEGATIVO
// 			const textAlert = (
// 				<React.Fragment>
// 					<h3>
// 						<strong>
// 							Siamo spiacenti, ma si è verificato un inconveniente nel
// 							recuperare la configurazione di Stripe, un elemento essenziale per
// 							elaborare correttamente i pagamenti dei tuoi prodotti. Per favore,
// 							chiudi questo messaggio e prova nuovamente ad accedere per
// 							effettuare un nuovo tentativo. Se il problema persiste, ti
// 							preghiamo di contattare il nostro servizio di assistenza. Grazie
// 							per la tua comprensione.
// 						</strong>
// 					</h3>
// 				</React.Fragment>
// 			);
// 			showAlert(
// 				"filled",
// 				"warning",
// 				"Recupero configurazione Stripe non riuscito!",
// 				textAlert,
// 				true,
// 				"/account/login"
// 			);
// 		} else {
// 			//STRIPE LOAD KEYS ESITO POSITIVO
// 			//Assicurati di chiamare loadStripe al di fuori del rendering di un componente per evitare
// 			//ricrea l'oggetto Stripe ad ogni rendering.
// 			//Questa è la chiave API pubblicabile di prova.
// 			const stripePromise = loadStripe(stripeKeys.PUBLISHABLE_KEY);
// 			fetch("/api/checkout_sessions/create-payment-intent", {
// 				method: "POST",
// 				headers: { "Content-Type": "application/json" },
// 				body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
// 			})
// 				.then((res) => res.json())
// 				.then((data) => setClientSecret(data.clientSecret));
// 		}
// 	}, []);

// 	return (
//     <div className="App">
//       {clientSecret && stripePromise && (
//         <Elements options={options} stripe={stripePromise}>
//           <CheckoutForm />
//         </Elements>
//       )}
//     </div>
//   );

// }
