// import Product, { IProduct } from "./Product";
// import StaticHomeProducts from "data/products.json";
// interface IProductListProps {
// 	products: IProduct[];
// }

// const ProductList = (props: IProductListProps) => {
// 	return (
// 		<div className="product-list">
// 			{StaticHomeProducts.map((product, index) => (
// 				<Product
// 					{...product}
// 					key={index}
// 				/>
// 			))}
// 		</div>
// 	);
// };

// export default ProductList;

import Product, { IProduct } from "./Product";

interface IProductListProps {
	products: IProduct[];
}

const ProductList = (props: IProductListProps) => {
	return (
		<div className="product-list">
			{props.products.map((product, index) => (
				<Product
					product={product}
					key={index}
				/>
			))}
		</div>
	);
};

export default ProductList;
