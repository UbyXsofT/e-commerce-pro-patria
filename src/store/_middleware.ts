import { StoreAction } from "src/components/CommonTypesInterfaces";

export const authMiddleware = (_storeAPI: object) => (next: (action: StoreAction) => {}) => (action: StoreAction) => {
  // console.log(_storeAPI, next, action);

  if (action.type === "SET_AUTH_ECOMMERCE") {
    return next(action);
  }

  if (action.type === "SET_AUTH_USER") {
    return next(action);
  }

  return next(action);
};
