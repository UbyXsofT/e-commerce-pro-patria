//api/callNodeService.js
import axios from "axios";
import eCommerceConf from "../../eCommerceConf.json";
import qs from "qs";

interface tokenlessAccess {
  clienteKey: string;
  userName: string;
  password: string;
  ricordami: boolean;
  accessToken: null;
  refreshToken: null;
}

interface tokenfulAccess {
  clienteKey: string;
  accessToken: string;
  refreshToken: string;
}

interface authEcommerce {
  clienteKey: string;
}

export default async function callNodeService(endPoint: "login" | "access-ecommerce", obyPostData: tokenlessAccess | tokenfulAccess | authEcommerce, token: null) {
  console.log("@@@ callNodeService ...");
  //le risposte ottenute dalla funzione  callNodeService  che chiama il server hanno tutte una struttura JSON di questo tipo:
  // la prima chiave successCli si riferisce allo stato della chiamata effettuata dal client, se ha avutto oppure no esito positivo
  // messageCli conterra eventuale messaggio di errore, oppure la risposta dal server node.js che avrà anche lui la stessa struttura di oggetti success e message qui message conterrà eventuali errori in risposta oppure conterrà l'oggetto respWCF che conterrà la risposta ottenuta al servizio wcf del centro fitness
  //-> "successCli":true,
  //-> "messageCli":{
  //----> "success":true,
  //----> "message":{
  //-------> "respWCF":{
  //---------->	 "KEY1":"VALORE",
  //---------->	 "KEY2":"VALORE2",
  //----------> },
  //------> }
  //-> }
  try {
    let headersData: {} = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    if (token !== null) {
      headersData = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      };
    }

    const postData = qs.stringify(obyPostData);
    const config = {
      method: "post",
      url: `${eCommerceConf.UrlServerNode}/api/${endPoint}`,
      headers: headersData,
      data: postData,
    };

    console.log("callNodeService EndPoint config: ", config);

    return axios
      .request(config)
      .then((response) => {
        console.log("callNodeService then ok: ", response.data);
        if (response.status === 200) {
          return { successCli: true, messageCli: response.data };
        } else {
          return { successCli: false, messageCli: response.data };
        }
      })
      .catch((error) => {
        console.log(error);
        return { successCli: false, messageCli: error.response.data.message ? error.response.data.message : `errore: ${error}` };
      });
  } catch (error) {
    return { successCli: false, messageCli: error };
  }
}
