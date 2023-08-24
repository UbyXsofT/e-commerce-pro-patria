// /api/login.js
import axios from "axios";
import eCommerceConf from "../../eCommerceConf.json";
import qs from "qs";
//import { setLoading } from "../../src/store/actions";

export default async function callNodeService(endPoint, obyPostData, token) {
	console.log("@@@ callNodeService ...");

	try {
		let headersData = {
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
				//setLoading(false);
				console.log("callNodeService then ok: ", JSON.stringify(response.data));
				if (response.status === 200) {
					return { success: true, message: JSON.stringify(response.data) };
				} else {
					return { success: false, message: JSON.stringify(response.data) };
				}
			})
			.catch((error) => {
				console.log(error);
				//setLoading(false);
				return { success: false, message: error.response.data.message ? error.response.data.message : `errore: ${error}` };
			});
	} catch (error) {
		//setLoading(false);
		return { success: false, message: error };
	}
}
