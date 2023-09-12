import callNodeService from "pages/api/callNodeService";
import eCommerceConf from "eCommerceConf.json";
import { setAuthEcommerce } from "./actions";
import { Dispatch } from "redux";

interface AuthEcommerHelperReturn {
  result: boolean;
  error?: string;
}

const AuthEcommerceHelper = async (dispatch: Dispatch): Promise<AuthEcommerHelperReturn> => {
  try {
    const respCall = await callNodeService("access-ecommerce", { clienteKey: eCommerceConf.ClienteKey }, null);
    if (respCall.successCli) {
      // Aggiorna lo stato dell'autorizzazione dell'ecommerce usando l'azione setAuthEcommerce
      dispatch(setAuthEcommerce(true));
      return { result: true };
    } else {
      // Aggiorna lo stato dell'autorizzazione dell'ecommerce usando l'azione setAuthEcommerce
      dispatch(setAuthEcommerce(false));
      return { result: false };
    }
  } catch (error) {
    // Aggiorna lo stato dell'autorizzazione dell'ecommerce usando l'azione setAuthEcommerce
    dispatch(setAuthEcommerce(false));
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;

    return { result: false, error: message };
  }
};

export default AuthEcommerceHelper;
