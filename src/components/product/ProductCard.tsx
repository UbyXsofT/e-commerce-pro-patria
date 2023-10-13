import axios from "axios";
import Link from "next/link";
import { ReactElement } from "react";

const ProductCard = (props: {
	id: number;
	titolo: string;
	descrizione: string;
	prezzo: number;
}) => {
	// // POST request
	// const handleSubscription = async (e) => {
	// 	e.preventDefault();
	// 	const { data } = await axios.post(
	// 		"/api/payment",
	// 		{
	// 			priceId: price.id,
	// 		},
	// 		{
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 		}
	// 	);
	// 	window.location.assign(data);
	// };

	return (
		<div className="border-gray-100 shadow-2xl border-4 text-center mt-10 max-w-[1040px]">
			<div>
				<div className="bg-gray-100 h-28 items-center font-bold">
					<h4 className="text-3xl">TITOLO</h4>
					<p>1.099,80</p>
					<h3>Abbonamento tutto incluso</h3>
				</div>
				<div>
					<div className="flex flex-col items-center justify-center pt-4">
						<h1 className="text-5xl font-bold">
							{props.prezzo.toLocaleString("it-IT", {
								style: "currency",
								currency: "EUR",
							})}
						</h1>
						<h3>Aggiungi una prova di €.05</h3>
					</div>
					<ul className="flex justify-center">
						<li className="text-xl font-bold">€ 12.00</li>
					</ul>
					<button
						className="mt-8 flex w-full justify-center rounded-md border border-transparent bg-[#f1592a] py-2 px-4 text-sm font-medium text-white shadow-sm"
						//onClick={}
					>
						Aggiungi al carrello
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
