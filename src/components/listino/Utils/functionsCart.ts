import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import {
	ActualProduct,
	Cart,
	CartProdotto,
	StoreState,
	AuthUser,
} from "src/components/CommonTypesInterfaces";
import { setCart } from "src/store/actions";

export const numeroSenzaDecimale = (numberString: string): number => {
	let numeroSenzaDecimale: number = Number(
		numberString.toString().replace(".", "")
	);
	return numeroSenzaDecimale;
};

export const importoInCentesimi = (importo: number): number => {
	let importoInCentesimi: number = importo * 100;
	return importoInCentesimi;
};

export const removeFromCart = (
	prodotto: ActualProduct,
	cart: Cart,
	dispatch: Dispatch
): void => {
	const user = cart.at(0);
	console.log("removeFromCart");
	let filteredCart = null;

	if (user) {
		filteredCart = user.cart.filter((inCartProdotto) => {
			if (inCartProdotto?.codice !== prodotto?.codice) {
				return inCartProdotto;
			}
		});
	} else {
		return;
	}

	dispatch(setCart([{ userId: user.userId, cart: filteredCart }]));
};

export const addToCart = (
	prodotto: ActualProduct,
	cart: Cart,
	dispatch: Dispatch,
	authUser: AuthUser | null
): void => {
	const configurableProdotto: CartProdotto = {
		...prodotto,
	};

	let user = cart.at(0);
	console.log("addToCart");
	user
		? dispatch(
				setCart([
					{
						userId: authUser?.USERID ?? "null",
						cart: [...user.cart, configurableProdotto],
					},
				])
		  )
		: dispatch(
				setCart([
					{
						userId: authUser?.USERID ?? "null",
						cart: [configurableProdotto],
					},
				])
		  );
};

export const isInCart = (
	prodotto: ActualProduct,
	cart: Cart,
	dispatch: Dispatch
): boolean => {
	let user = cart.at(0);

	if (!user) {
		return false;
	}

	let filteredCart = user.cart.filter((inCartProdotto) => {
		// console.log(
		// 	"^^^^^^^^^^^^^^^^^^^^^^^^ isInCart filteredCart inCartProdotto:",
		// 	inCartProdotto
		// );
		if (inCartProdotto?.codice === prodotto?.codice) {
			return inCartProdotto;
		}
	});

	if (filteredCart.length > 0) {
		return true;
	} else {
		return false;
	}
};

export const clearCart = (cart: Cart, dispatch: Dispatch): Cart => {
	const user = cart.at(0);
	console.log("clearCart");
	if (user) {
		console.log("@@@ - OK: clearCart");
		dispatch(setCart([{ userId: user.userId, cart: [] }]));
		return [{ userId: user.userId, cart: [] }];
	} else {
		return [{ userId: "null", cart: [] }];
	}
};
