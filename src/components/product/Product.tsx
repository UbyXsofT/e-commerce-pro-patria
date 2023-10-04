// app/components/Product/Product.js
import Image from "next/image";
import styles from "styles/Product.module.scss";
//interfaccia prodotto nostro ecommerce
// type ProductItemProps = {
// 	id: string;
// 	name: string;
// 	price: number;
// 	description: string;
// 	imageUrl: string;
// };
interface ProductItemProps {
	product: IProduct;
}
//interfaccia prodotto snipcart
export interface IProduct {
	id: string;
	name: string;
	price: number;
	description: string;
	imageUrl: string;
}

// export default function Product({
// 	id,
// 	imageUrl,
// 	name,
// 	description,
// 	price,
// }: ProductItemProps) {

const Product = (props: ProductItemProps) => {
	return (
		<div
			key={props.product.id}
			className={styles.product}
		>
			<h2 className={styles.product__title}>{props.product.name}</h2>
			<p className={styles.product__description}>{props.product.description}</p>
			<div className={styles.product__image}>
				<Image
					src={props.product.imageUrl}
					alt={`Image of ${props.product.name}`}
					height={640}
					width={640}
				/>
			</div>
			<div className="product__price-button-container">
				<div className={styles.product__price}>
					${props.product.price.toFixed(2)}
				</div>
				<button
					className={`snipcart-add-item ${styles.product__button}`}
					data-item-id={props.product.id}
					data-item-name={props.product.name}
					data-item-price={props.product.price}
					data-item-url="/"
					data-item-image={props.product.imageUrl}
				>
					Aggiungi al carrello
				</button>
			</div>
		</div>
	);
};

// return (
// 	<div key={id}>
// 		<Image
// 			src={imageUrl}
// 			alt={`Image of ${name}`}
// 			height={640}
// 			width={640}
// 		/>
// 		<h3>{name}</h3>
// 		<p>{description}</p>
// 		<span>{`${price}€`}</span>
// 		<div>
// 			<button
// 				className="snipcart-add-item"
// 				data-item-id={id}
// 				data-item-image={imageUrl}
// 				data-item-name={name}
// 				data-item-url="/"
// 				data-item-price={price}
// 			>
// 				Aggiungi al carrello
// 			</button>
// 		</div>
// 	</div>
// );

export default Product;
