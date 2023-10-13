import { Dispatch, SetStateAction } from "react";
import { Paesi } from "../account/register/ProvinciePaesi";
import { ComunePaese } from "../CommonTypesInterfaces";

const getComuni = async (
	setComuni: Dispatch<SetStateAction<ComunePaese[]>>
) => {
	try {
		let response = await fetch(
			"https://axqvoqvbfjpaamphztgd.functions.supabase.co/comuni"
		);
		let jsonData = await response.json();
		let ComuniPaesi = jsonData.concat(Paesi);

		// let keyFulData = jsonData.map((comune, idx) => {
		//   let updatedComune = { ...comune, key: idx };
		//   return updatedComune;
		// });

		setComuni(ComuniPaesi);
	} catch (error) {
		console.log(error);
	}
};

export default getComuni;
