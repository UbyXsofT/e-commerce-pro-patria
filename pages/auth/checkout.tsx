//checkout.tsx
import React from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "src/components/stripe/CheckoutForm";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import { useDispatch } from "react-redux";
import { StoreState } from "src/components/CommonTypesInterfaces";
import SetStripeKeysHelper from "src/store/SetStripeKeysHelper";

type CustomTheme = "my-custom-theme"; // Aggiungi il tuo tema personalizzato qui
type Appearance = "stripe" | "night" | "flat" | CustomTheme | undefined;

interface CheckoutProps {
	appearance: { theme: Appearance };
}

const Checkout: React.FC<CheckoutProps> = () => {
	const [stripePromise, setStripePromise] = React.useState<
		Promise<any> | undefined
	>(undefined);

	const { showAlert } = useAlertMe();
	//const stripeKeys = useSelector((state: StoreState) => state.stripeKeys);
	const dispatch = useDispatch(); // Ottieni il dispatcher dal Redux store
	const [clientSecret, setClientSecret] = React.useState("");

	const textAlert = (
		<React.Fragment>
			<h3>
				<strong>
					Siamo spiacenti, ma si è verificato un inconveniente nel recuperare la
					configurazione di Stripe, un elemento essenziale per elaborare
					correttamente i pagamenti dei tuoi prodotti. Per favore, chiudi questo
					messaggio e prova nuovamente ad accedere per effettuare un nuovo
					tentativo. Se il problema persiste, ti preghiamo di contattare il
					nostro servizio di assistenza. Grazie per la tua comprensione.
				</strong>
			</h3>
		</React.Fragment>
	);

	React.useEffect(() => {
		const getStripeKeys = async () => {
			const keys = await SetStripeKeysHelper(dispatch);
			try {
				//setStripeKeys(keys);
				console.log("@@@@@@@ --------------> keys: ", keys);
				console.log("STRIPE INIT - LOAD KEYS: ", keys.isGetKeys);
				// Crea PaymentIntent non appena la pagina viene caricata
				if (keys.isGetKeys === false) {
					showAlert(
						"filled",
						"warning",
						"Recupero configurazione Stripe non riuscito!",
						textAlert,
						true,
						"/"
					);
				} else {
					//STRIPE LOAD KEYS ESITO POSITIVO
					//Assicurati di chiamare loadStripe al di fuori del rendering di un componente per evitare
					//ricrea l'oggetto Stripe ad ogni rendering.
					//Questa è la chiave API pubblicabile di prova.
					const stripe = loadStripe(keys.PUBLISHABLE_KEY);
					setStripePromise(stripe);
					fetch("/api/checkout_sessions/create-payment-intent", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							items: [{ id: "xl-tshirt" }],
							stripeKeys: keys,
						}),
					})
						.then((res) => res.json())
						.then((data) => {
							setClientSecret(data.clientSecret);
						});
				}
			} catch (error) {
				//STRIPE LOAD KEYS ESITO NEGATIVO
				showAlert(
					"filled",
					"warning",
					"Recupero configurazione Stripe non riuscito!",
					textAlert,
					true,
					"/"
				);
			}
		};

		getStripeKeys();
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
