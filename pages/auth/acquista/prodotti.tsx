// pages/auth/acquista/[step].tsx
import { useRouter } from "next/router";
import React from "react";
import StepListinoPage from "src/components/listino/StepListinoPage";

const prodotti: React.FC = () => {
	//const router = useRouter();
	//const { step } = router.query;
	// Decodifica la stringa del parametro dinamico
	//const encodedParams = encodeURIComponent(JSON.stringify(newStepParams));
	//const decodedParams = JSON.parse(
	//	decodeURIComponent(JSON.stringify(step as string))
	//);
	//console.log("StepListinoPageID decodedParams:", decodedParams);
	//const [activeStepPageId, setActiveStepPageId] = React.useState(1);

	// React.useEffect(() => {
	// 	let titlePage = "";

	// 	if (decodedParams?.stepPageId === 0 && activeStepPageId !== 0) {
	// 		setActiveStepPageId(1);
	// 	}

	// 	switch (activeStepPageId) {
	// 		case 1:
	// 			titlePage = "gruppo";
	// 			break;
	// 		case 2:
	// 			titlePage = "sede";
	// 			break;
	// 		case 3:
	// 			titlePage = "aree";
	// 			break;
	// 		case 4:
	// 			titlePage = "abbonamenti";
	// 			break;
	// 		case 5:
	// 			titlePage = "orari";
	// 			break;
	// 		case 6:
	// 			titlePage = "riepilogo";
	// 			break;
	// 		default:
	// 			titlePage = "no-page-desc";
	// 	}

	// 	const newStepParams = {
	// 		stepPageId: activeStepPageId,
	// 		titlePage: titlePage,
	// 	};

	// 	const encodedParams = encodeURIComponent(JSON.stringify(newStepParams));
	// 	router.replace(`/auth/acquista/${encodedParams}`);
	// }, [activeStepPageId, decodedParams.stepPageId]);

	return <StepListinoPage />;
};

export default prodotti;
