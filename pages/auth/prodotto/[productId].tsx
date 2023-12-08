// pages/[productId].tsx
import router, { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Prodotto, StoreState } from "src/components/CommonTypesInterfaces";
import ProductPage from "src/components/product/ProductPage";

const ProductID: React.FC = () => {
	const router = useRouter();
	const { productId } = router.query;

	// Decodifica l'URL e effettua il parsing del JSON per ottenere l'oggetto Prodotto
	// const prodotto: Prodotto = JSON.parse(decodeURIComponent(product as string));

	//console.log("@@@@@@@@@@@@@ prodotto: ", productId);
	return <ProductPage productId={productId as string} />;
};

export default ProductID;
