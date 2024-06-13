//SetStripeKeysHelper.ts
import { loadStripe } from "@stripe/stripe-js";
import callNodeService from "pages/api/callNodeService";
import eCommerceConf from "eCommerceConf.json";
import { setStripeKeys } from "src/store/actions";
import { Dispatch } from "redux";
import {
	responseCall,
	StripeKeysData,
} from "src/components/CommonTypesInterfaces";

const SetStripeKeysHelper = async (
	dispatch: Dispatch
): Promise<StripeKeysData> => {
	const stripeKeysGetData = {
		PUBLISHABLE_KEY: "NO-KEY",
		STRIPE_SECRET_KEY: "NO-KEY",
		STRIPE_WEBHOOK_SECRET: "NO-KEY",
		STRIPE_PORTALE_CLIENTE_LINK: "NO-URL",
		isGetKeys: false,
	};

	const handleSuccess = (msg_Resp: any) => {
		//success
		if (eCommerceConf.ModalitaSviluppo === true){
		console.log("@@@@@@@@@@@@@ fetchStripeKey handleSuccess: ", msg_Resp);
		}
		try {
			if (
				msg_Resp.messageCli.message.stripeKeys !== null ||
				msg_Resp.messageCli.message.stripeKeys !== undefined
			) {
				stripeKeysGetData.PUBLISHABLE_KEY =
					msg_Resp.messageCli.message.stripeKeys.PUBLISHABLE_KEY;

				stripeKeysGetData.STRIPE_SECRET_KEY =
					msg_Resp.messageCli.message.stripeKeys.STRIPE_SECRET_KEY;

				stripeKeysGetData.STRIPE_WEBHOOK_SECRET =
					msg_Resp.messageCli.message.stripeKeys.STRIPE_WEBHOOK_SECRET;

				stripeKeysGetData.STRIPE_PORTALE_CLIENTE_LINK =
					msg_Resp.messageCli.message.stripeKeys.STRIPE_PORTALE_CLIENTE_LINK;

				stripeKeysGetData.isGetKeys = true;
			}
		} catch (error) {
			//Errore assegnazione Stripe Key
			if (eCommerceConf.ModalitaSviluppo === true){
			console.log("SetStripeKeysHelper.... error: ", error);
			}
		}
	};

	const handleError = (error: any) => {
		if (eCommerceConf.ModalitaSviluppo === true){
		console.log("SetStripeKeysHelper.... error: ", error);
		}
	};

	const obyPostData = {
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
	}

	dispatch(setStripeKeys(stripeKeysGetData));
	return stripeKeysGetData;
};

export default SetStripeKeysHelper;
