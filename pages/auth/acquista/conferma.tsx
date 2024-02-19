// pages/auth/acquista/conferma.tsx
import { useRouter } from "next/router";
import React from "react";
import ConfermaAbbPage from "src/components/listino/ConfermaAbbPage";

const conferma: React.FC = () => {
	const router = useRouter();
	const itemsCard = router.query.itemsCard
		? JSON.parse(router.query.itemsCard as string)
		: null;

	return <ConfermaAbbPage itemsCard={itemsCard} />;
};

export default conferma;
