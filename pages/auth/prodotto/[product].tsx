// pages/[productId].tsx
import router, { useRouter } from "next/router";
import { Prodotto } from "src/components/CommonTypesInterfaces";
import ProductPage from "src/components/product/ProductPage";

const Product: React.FC = () => {
	const router = useRouter();
	const { product } = router.query;

	// Decodifica l'URL e effettua il parsing del JSON per ottenere l'oggetto Prodotto
	const prodotto: Prodotto = JSON.parse(decodeURIComponent(product as string));

	console.log("@@@@@@@@@@@@@ prodotto: ", prodotto);
	return <ProductPage prodotto={prodotto} />;
};

export default Product;
