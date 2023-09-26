// app/components/Product/Product.js
import Image from "next/image";

// type ProductItemProps = {
// 	id: string;
// 	name: string;
// 	price: number;
// 	description: string;
// 	imageUrl: string;
// };

// export interface IProduct {
// 	id: string
// 	name: string
// 	price: number
// 	url: string
// 	description: string
// 	image: image
// }

// export default function Product({
// 	id,
// 	imageUrl,
// 	name,
// 	description,
// 	price,
// }: ProductItemProps) {
// 	return (
// 		<div key={id}>
// 			<Image
// 				src={imageUrl}
// 				alt={`Image of ${name}`}
// 				height={640}
// 				width={640}
// 			/>
// 			<h3>{name}</h3>
// 			<p>{description}</p>
// 			<span>{`${price}€`}</span>
// 			<div>
// 				<button
// 					className="snipcart-add-item"
// 					data-item-id={id}
// 					data-item-image={imageUrl}
// 					data-item-name={name}
// 					data-item-url="/"
// 					data-item-price={price}
// 				>
// 					Aggiungi al carrello
// 				</button>
// 			</div>
// 		</div>
// 	);
// }

// components/Product.tsx
export interface IProduct {
	id: string;
	name: string;
	description: string;
	price: number;
	imageUrl: string;
}

const Product = (props: IProduct) => {
	return (
		<div>
			<h2>{props.name}</h2>
			<p>{props.description}</p>
			<div>
				<Image
					src={props.imageUrl}
					alt={`Image of ${props.name}`}
					height={640}
					width={640}
				/>
			</div>
			<div className="product__price-button-container">
				<div>${props.price.toFixed(2)}</div>
				<button
					className={`snipcart-add-item`}
					data-item-id={props.id}
					data-item-name={props.name}
					data-item-price={props.price}
					data-item-url="/"
					data-item-image={props.imageUrl}
				>
					Aggiungi al carrello
				</button>
			</div>
		</div>
	);
};

export default Product;
