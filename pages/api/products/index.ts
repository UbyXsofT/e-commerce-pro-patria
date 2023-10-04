import { NextApiRequest, NextApiResponse } from "next";
import products from "../../auth/home";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	res.status(200).json(products);
}
