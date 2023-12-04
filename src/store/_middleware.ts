//_middleware.ts
import { StoreAction } from "src/components/CommonTypesInterfaces";

export const authMiddleware =
	(_storeAPI: object) =>
	(next: (action: StoreAction) => {}) =>
	(action: StoreAction) => {
		// console.log(_storeAPI, next, action);

		if (action.type === "SET_AUTH_ECOMMERCE") {
			return next(action);
		}

		if (action.type === "SET_AUTH_USER") {
			return next(action);
		}

		if (action.type === "SET_CART") {
			return next(action);
		}

		if (action.type === "SET_CENTRI") {
			return next(action);
		}
		if (action.type === "SET_STRIPE_KEYS") {
			return next(action);
		}
		return next(action);
	};

// 	Attualmente, il middleware sembra lasciare passare tutte le azioni incondizionatamente, quindi potrebbe non avere alcun impatto sul comportamento dell'applicazione.

// Di solito, i middleware vengono utilizzati per effettuare operazioni come logging, manipolazione delle azioni o gestione di operazioni asincrone. Nel tuo caso, sembra che il middleware sia configurato per lasciare passare tutte le azioni senza alcuna elaborazione aggiuntiva.

// Se l'applicazione funziona correttamente anche senza il middleware e non hai bisogno di filtrare o manipolare le azioni specifiche, potresti considerare di rimuoverlo. Tuttavia, se in futuro hai esigenze specifiche per gestire alcune azioni in modo diverso, potresti riutilizzare o espandere il middleware in base a tali requisiti.
