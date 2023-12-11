import React from "react";

const renderPrice = (price: number): string => {
	return price?.toFixed(2).toString().replace(".", ",");
};

export default renderPrice;
