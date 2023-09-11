import createCache from "@emotion/cache";

const isBrowser = typeof document !== "undefined";

//Sul lato client, crea un meta tag nella parte superiore di <head> e impostalo come InsertionPoint.
//Questo assicura che gli stili MUI vengano caricati per primi.
//Consente agli sviluppatori di sovrascrivere facilmente gli stili MUI con altre soluzioni di stile, come i moduli CSS.
export default function createEmotionCache() {
  let insertionPoint;

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector('meta[name="emotion-insertion-point"]') as HTMLElement;
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({ key: "mui-style", insertionPoint });
}
