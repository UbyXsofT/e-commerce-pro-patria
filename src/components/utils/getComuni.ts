import { Dispatch, SetStateAction } from "react";
import { Comuni, Paesi } from "../account/register/ProvinciePaesi";
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
		setComuni(ComuniPaesi);
	} catch (error) {
		let comuni = Comuni;
		let ComuniPaesi: ComunePaese[] = comuni.concat(Paesi);
		setComuni(ComuniPaesi);
	}
};

export default getComuni;
