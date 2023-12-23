// pages/[productId].tsx
import router, { useRouter } from "next/router";
import StepStorePage from "src/components/store/StepStorePage";

const StepStorePageID: React.FC = () => {
	const router = useRouter();
	const { stepPageId } = router.query;
	console.log("@@@@@@@ ----- ********* StepStorePageID:", stepPageId);
	return <StepStorePage stepId={stepPageId} />;
};

export default StepStorePageID;
