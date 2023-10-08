// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import {NextApiRequest, NextApiResponse} from "next";
// import products from "./index";
// import {IProduct} from "src/components/product/Product";

// export interface ISnipcartProduct {
//     id: string
//     name: string
//     price: number
//     url: string
//     description: string
//     image: string
// }

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//     const {productId} = req.query;
//     const product: IProduct | undefined = products.find(p => p.id === productId);
//     if (!product) {
//         res.status(404).json({});
//         return ;
//     }
//     const snipcartProduct: ISnipcartProduct = {...product, image: product?.image.src ?? ""}

//     res.status(200).json(snipcartProduct);
// }

import { NextApiRequest, NextApiResponse } from "next";
//import products, { IProduct } from "./index";
import products, { IProduct } from "src/components/product/Product";
export interface ISnipcartProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { productId } = req.query;

  if (!productId) {
    res.status(400).json({ error: "productId non fornito" });
    return;
  }

  // Aggiungi una verifica di tipo per assicurarti che 'products' sia un array di 'IProduct'
  if (!Array.isArray(products)) {
    res.status(500).json({ error: "Errore nella configurazione del server" });
    return;
  }

  const product: IProduct | undefined = products.find(
    (p) => p.id === productId.toString()
  );

  if (!product) {
    res.status(404).json({ error: "Prodotto non trovato" });
    return;
  }

  const snipcartProduct: ISnipcartProduct = { ...product , image: product.imageUrl ?? "" };

  res.status(200).json(snipcartProduct);
}
