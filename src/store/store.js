//store.js
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

// Definisci il riduttore per gestire lo stato di isLoading
const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return action.payload;
    default:
      return state;
  }
};

// Crea il tuo store Redux utilizzando configureStore
const makeStore = () =>
  configureStore({
    reducer: {
      loading: loadingReducer,
      // Aggiungi eventuali altri riduttori qui
    },
  });

// Crea il wrapper per Next.js utilizzando createWrapper
export const wrapper = createWrapper(makeStore);
