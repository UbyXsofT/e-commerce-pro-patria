// pages/[productId].tsx
import router, { useRouter } from "next/router";
import StepListinoPage from "src/components/listino/StepListinoPage";

const StepListinoPageID: React.FC = () => {
	const router = useRouter();
	const { stepPageId } = router.query;
	console.log("@@@@@@@ ----- ********* StepListinoPageID:", stepPageId);
	return <StepListinoPage stepId={stepPageId} />;
};

export default StepListinoPageID;
