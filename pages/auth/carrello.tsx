import React from "react";
import { useDispatch } from "react-redux"; // Importa useDispatch dal react-redux
import { setLoading } from "src/store/actions";
//STRIPE LOAD
import { loadStripe } from "@stripe/stripe-js";
//----------
import { Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
//*-----*//
import Layout from "src/components/layout/Layout";
import eCommerceConf from "eCommerceConf.json";
import Image from "next/image";
import { styled } from "@mui/material/styles";
//*-- API---*//
//import esempio from "../api/esempio";
import { useAlertMe } from "src/components/layout/alert/AlertMeContext";
import { AlertMe } from "src/components/layout/alert/AlertMe";
import { responseCall, authStripe } from "src/components/CommonTypesInterfaces";
import callNodeService from "pages/api/callNodeService";

const Carrello = () => {
	const { showAlert } = useAlertMe();
	const theme = useTheme();
	const dispatch = useDispatch(); // Usa il hook useDispatch per ottenere la funzione dispatch dallo store

	const [stripeSecretKey, setStripeSecretKey] = React.useState(null);

	React.useEffect(() => {
		const fetchStripeKey = async () => {
			const handleSuccess = (msg_Resp: any) => {
				//success
				console.log(msg_Resp);

				try {
					if (
						msg_Resp.messageCli.message.stripeKeys !== null ||
						msg_Resp.messageCli.message.stripeKeys !== undefined
					) {
						setStripeSecretKey(
							msg_Resp.messageCli.message.stripeKeys.PUBLISHABLE_KEY
						);
					} else {
						const textAlert = (
							<React.Fragment>
								<h3>
									<strong>Stripe Key non valida!</strong>
								</h3>
							</React.Fragment>
						);
						showAlert(
							"filled",
							"error",
							"ATTENZIONE!",
							textAlert,
							true,
							"/account/login"
						);
					}
				} catch (error) {
					const textAlert = (
						<React.Fragment>
							<h3>
								<strong>"Errore assegnazione Stripe Key"</strong>
							</h3>
						</React.Fragment>
					);
					showAlert("filled", "error", "ATTENZIONE!", textAlert, true);
				}
			};
			const handleError = (error: any) => {
				const textAlert = (
					<React.Fragment>
						<h3>
							<strong>{error}</strong>
						</h3>
					</React.Fragment>
				);
				showAlert("filled", "error", "ATTENZIONE!", textAlert, true);
			};

			dispatch(setLoading(true)); // Utilizza dispatch per inviare l'azione di setLoading

			const obyPostData: authStripe = {
				clienteKey: eCommerceConf.ClienteKey,
			};

			try {
				const respCall: responseCall = await callNodeService(
					"stripe/get-stripe-key",
					obyPostData,
					null
				);
				handleSuccess(respCall);
			} catch (error) {
				handleError(error);
			} finally {
				dispatch(setLoading(false)); // Utilizza dispatch per inviare l'azione di setLoading
			}
		};
		fetchStripeKey();
	}, []);

	const handleCheckout = async () => {
		setLoading(true);

		if (!stripeSecretKey) {
			console.error("Chiave di Stripe non disponibile");
			setLoading(false);
			return;
		}

		try {
			// Assicurati di chiamare `loadStripe` al di fuori del rendering di un componente
			// per evitare di ricreare l'oggetto `Stripe` ad ogni rendering.
			const stripe = await loadStripe(stripeSecretKey);

			if (!stripe) {
				console.error("L'oggetto Stripe è nullo");
				setLoading(false);
				return;
			}

			// Avvia il Checkout di Stripe
			const result = await stripe.redirectToCheckout({
				lineItems: [{ price: "10,200", quantity: 1 }],
				mode: "payment",
				successUrl: "http://localhost:3000/success",
				cancelUrl: "http://localhost:3000/cancel",
			});

			if (result.error) {
				console.error(result.error.message);
				setLoading(false);
			}
		} catch (error) {
			console.error("Errore durante il caricamento di Stripe:", error);
			setLoading(false);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Layout
				title={`Carrello | E-Commerce ${eCommerceConf.NomeEcommerce}`}
				description="This is a E-Commerce carrello page, using React.js Next.js and Material-UI. Powered by Byteware srl."
			>
				<AlertMe />
				<Typography
					variant="h5"
					component="h1"
					gutterBottom
				>
					CARRELLO
				</Typography>

				<div>
					<h1>Il tuo carrello</h1>
					{stripeSecretKey && (
						<button onClick={handleCheckout}>CHECKOUT</button>
					)}
				</div>
			</Layout>
		</ThemeProvider>
	);
};

export default Carrello;
