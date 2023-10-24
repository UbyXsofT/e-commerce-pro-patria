import React from "react";
import {
	PaymentElement,
	LinkAuthenticationElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import { Button, Paper, Box, Container } from "@mui/material";

//REDUX-STORE
import { useDispatch } from "react-redux"; // Importa useDispatch dal react-redux
import { setLoading } from "src/store/actions";
//*-----*//
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import { AlertMe } from "src/components/layout/alert/AlertMe";

export default function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();
	const [email, setEmail] = React.useState("");
	const [message, setMessage] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(false);
	const { showAlert } = useAlertMe();

	const dispatch = useDispatch(); // Usa il hook useDispatch per ottenere la funzione dispatch dallo store
	React.useEffect(() => {
		dispatch(setLoading(isLoading)); // Utilizza dispatch per inviare l'azione di setLoading
	}, [isLoading]);

	React.useEffect(() => {
		const textAlert = (
			<React.Fragment>
				<h3>
					<strong>{message}</strong>
				</h3>
			</React.Fragment>
		);
		showAlert("filled", "info", "Informazione!", textAlert, true);
	}, [message]);

	React.useEffect(() => {
		if (!stripe) {
			setMessage("dove sono mi vedo");
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case "succeeded":
					setMessage("Pagamento riuscito!");
					break;
				case "processing":
					setMessage("Il tuo pagamento è in elaborazione.");
					break;
				case "requires_payment_method":
					setMessage("Il pagamento non è andato a buon fine, riprova.");
					break;
				default:
					setMessage("Qualcosa è andato storto.");
					break;
			}
		});
	}, [stripe]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			//Stripe.js non è stato ancora caricato.
			//Assicurati di disabilitare l'invio del modulo fino al caricamento di Stripe.js.
			return;
		}

		setLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// Make sure to change this to your payment completion page
				return_url: "http://localhost:3000",
			},
		});

		// This point will only be reached if there is an immediate error when
		// confirming the payment. Otherwise, your customer will be redirected to
		// your `return_url`. For some payment methods like iDEAL, your customer will
		// be redirected to an intermediate site first to authorize the payment, then
		// redirected to the `return_url`.
		if (error.type === "card_error" || error.type === "validation_error") {
			setMessage(error.message);
		} else {
			setMessage("Si è verificato un errore imprevisto.");
		}

		setLoading(false);
	};

	const paymentElementOptions = {
		layout: "tabs",
	};

	return (
		<Container>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="100vh" // Imposta l'altezza al 100% della viewport
			>
				<Paper
					elevation={3}
					style={{
						width: "80vw",
						minWidth: "initial",
						maxWidth: 600,
						padding: 20,
						display: "block",
					}}
				>
					<form
						id="payment-form"
						onSubmit={handleSubmit}
					>
						<LinkAuthenticationElement
							id="link-authentication-element"
							onChange={(e) => {
								setEmail(e.value.email);
							}}
						/>
						<PaymentElement
							id="payment-element"
							options={paymentElementOptions}
						/>
						<Button
							disabled={isLoading || !stripe || !elements}
							id="submit"
							variant="contained"
							style={{ marginTop: 30, width: "100%" }}
						>
							<span id="button-text">
								{isLoading ? (
									<div
										className="spinner"
										id="spinner"
									></div>
								) : (
									"Paga ora"
								)}
							</span>
						</Button>
						{/* Show any error or success messages */}
						{message && <div id="payment-message">{message} </div>}
					</form>
				</Paper>
			</Box>
		</Container>
	);
}
