import { setStripeKeys, getStripeKeys } from "./keys";

const calculateOrderAmount = (items) => {
	//Sostituisci questa costante con un calcolo dell'importo dell'ordine
	//Calcola il totale dell'ordine sul server da prevenire
	//persone che manipolano direttamente l'importo sul cliente
	return 1400;
};

export default async function handler(req, res) {
	try {
		console.log(req.body);
		const { items, stripeKeys } = req.body;
		console.log(stripeKeys.STRIPE_SECRET_KEY);
		// Imposta le chiavi nel modulo
		setStripeKeys(stripeKeys);
		// Puoi anche ottenere le chiavi se necessario
		const currentKeys = getStripeKeys();
		console.log("@@@@ --- > currentKeys: ", currentKeys);
		//Questa è la chiave API segreta di prova.
		const stripe = require("stripe")(currentKeys.STRIPE_SECRET_KEY);
		//Crea un PaymentIntent con l'importo dell'ordine e la valuta
		const paymentIntent = await stripe.paymentIntents.create({
			amount: calculateOrderAmount(items),
			currency: "eur",
			//Nell'ultima versione dell'API, specificare il parametro `automatic_payment_methods` è facoltativo poiché Stripe ne abilita la funzionalità per impostazione predefinita.
			automatic_payment_methods: {
				enabled: true,
			},
		});

		res.send({
			clientSecret: paymentIntent.client_secret,
		});
	} catch (error) {
		console.error("Errore interno del server:", error);
		res
			.status(500)
			.json({ error: "Errore interno del server", details: error.message });
	}
}
