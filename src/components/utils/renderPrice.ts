import { number } from "prop-types";
import React from "react";

const renderPrice = (price: any): string => {
	//console.log("renderPrice: ", price);

	if (typeof price === "number") {
		return price.toFixed(2).toString().replace(".", ",");
	} else {
		const convPrice = Number(price);
		return convPrice.toFixed(2).toString().replace(".", ",");
	}
};

export default renderPrice;
