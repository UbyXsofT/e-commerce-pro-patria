import { Dispatch } from "redux";
import CookieManager from "src/components/cookie/CookieManager";
import eCommerceConf from "eCommerceConf.json";
import callNodeService from "pages/api/callNodeService";
import { setAuthUser } from "./actions";
import { AuthUser } from "src/components/CommonTypesInterfaces";

const networkError = `/blockPage?titolo=CONVALIDA ECOMMERCE&descrizione=${eCommerceConf.MsgErrConvEcommerce}&desc_azione=${eCommerceConf.MsgChkAgainConvEcommerce}&redirectTo=/`;

interface AuthUserHelperReturn {
  result: boolean;
  route?: string;
  error?: string;
  response: AuthUser | null;
}

const AuthUserHelper = async (dispatch: Dispatch, isAuthEcommerce: boolean): Promise<AuthUserHelperReturn> => {
  let answer: AuthUserHelperReturn = {
    result: false,
    response: null,
  };

  if (isAuthEcommerce === true) {
    const accessToken = CookieManager.getCookie("accessToken");
    const refreshToken = CookieManager.getCookie("refreshToken");

    if (accessToken || refreshToken) {
      //TODO prima di mandarlo nella home, nel caso di un accesso per un utente che possiede un token salvato
      //bisogna simulare un login passando i token alla chiamata login
      console.log("FORZO LA VERIFICA DEL TOKEN CON CHIAMATA AL SERVER PER EFFETTUARE UN LOGIN");
      const fetchData = async (): Promise<AuthUserHelperReturn> => {
        //setVisLoader(true);
        const obyPostData = {
          clienteKey: eCommerceConf.ClienteKey,
          userName: null,
          password: null,
          ricordami: null,
          accessToken: accessToken,
          refreshToken: refreshToken,
        };

        try {
          const respCall = await callNodeService("login", obyPostData, null);
          console.log("respCall: ", respCall);
          const msg_Resp = respCall.messageCli.message;

          if (respCall.successCli) {
            if (msg_Resp && msg_Resp.respWCF && msg_Resp.accessToken) {
              //****** TOKENS
              // Salva il accessToken di accesso come cookie o nello stato dell'applicazione
              CookieManager.setCookie("accessToken", msg_Resp.accessToken);
              if (msg_Resp.refreshToken) {
                // Salva il refreshToken di accesso come cookie o nello stato dell'applicazione
                CookieManager.setCookie("refreshToken", msg_Resp.refreshToken); //la scadenza del token viene impostata lato server, la validità è gestita sempre lato server
              } else {
                //rimuovo l'eventuale refreshToken
                CookieManager.removeCookie("refreshToken");
              }
              //****** UTENTE
              // Aggiorna lo stato dell'OGGETTO utente
              try {
                console.log("Aggiorna Redux AuthUser:", msg_Resp.respWCF);
                dispatch(setAuthUser(msg_Resp.respWCF));
                //Router.push("/auth/home");
                return {
                  result: true,
                  route: "/auth/home",
                  response: msg_Resp.respWCF,
                };
              } catch (error) {
                console.log("Aggiorna Redux AuthUser:", error);
                return {
                  result: false,
                  error: error as string,
                  response: null,
                };
              }
            } else {
              console.log("msg_Resp: ", msg_Resp);
              //   setRouterToPush("/account/login");
              return {
                result: false,
                route: "/account/login",
                response: null,
              };
              //Router.push("/account/login");
            }
          } else {
            console.log("CLI Failed");

            return {
              result: false,
              route: "/account/login",
              response: null,
            };
            // setRouterToPush("/account/login");
            //Router.push("/account/login");
          }
        } catch (error) {
          //setVisLoader(false);
          console.error("Errore nella chiamata:", error);
          return {
            result: false,
            error: error as string,
            response: null,
          };
        }
      };

      let newAnswer = await fetchData();

      answer = newAnswer;
    } else {
      console.log("No Tokens");

      answer = {
        result: false,
        route: "/account/login",
        response: null,
      };
      //   setRouterToPush("/account/login");
      //Router.push("/account/login");
    }
  } else {
    // setRouterToPush(networkError);
    console.log("No Auth Ecommerce");

    answer = {
      result: false,
      route: networkError,
      error: "Network Error",
      response: null,
    };
  }

  console.log(answer);

  return answer;
};

export default AuthUserHelper;
