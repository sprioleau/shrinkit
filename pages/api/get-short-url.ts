import type { NextApiRequest, NextApiResponse } from "next";
require("dotenv").config();
const connectDatabase = require("../../utilities/connectDatabase.ts");
const UrlGroup = require("../../models/UrlGroup.model.tsx");

connectDatabase();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const emojiString = req.body.id;

	try {
		const currentDocument = await UrlGroup.findOne({ emojiString });
		const longUrl = currentDocument.longUrl;
		currentDocument.hits++;
		currentDocument.save();
		res.status(200).json({ longUrl });
	} catch (error) {
		res.status(404).json({ error });
	}
};
