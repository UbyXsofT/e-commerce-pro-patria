//api/callNodeService.js
import axios from "axios";
import eCommerceConf from "../../eCommerceConf.json";
import qs from "qs";
import {
	authEcommerce,
	resetPsw,
	responseCall,
	tokenfulAccess,
	tokenlessAccess,
} from "src/components/CommonTypesInterfaces";

export default async function callNodeService(
	endPoint: "login" | "access-ecommerce" | "recupero-credenziali",
	obyPostData: tokenlessAccess | tokenfulAccess | authEcommerce | resetPsw,
	token: null
): Promise<responseCall> {
	console.log("@@@ callNodeService ...");

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
				return {
					successCli: false,
					messageCli: error.response.data.message
						? error.response.data.message
						: `errore: ${error}`,
				};
			});
	} catch (error) {
		return { successCli: false, messageCli: error };
	}
}
