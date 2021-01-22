import type { NextApiRequest, NextApiResponse } from "next";
const connectDatabase = require("../../utilities/connectDatabase.ts");
const UrlGroup = require("../../models/UrlGroup.model.tsx");

connectDatabase();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const emojiString = req.body.id;
	console.log("emojiString from [id].tsx (in get-short-url.ts):", emojiString);

	try {
		const currentDocument = await UrlGroup.findOne({ emojiString });
		const longUrl = currentDocument.longUrl;
		currentDocument.hits++;
		console.log("currentDocument in get-short-urls.ts:", currentDocument);
		currentDocument.save();
		res.status(200).json({ longUrl });
	} catch (error) {
		res.status(404).json({ error });
	}
};
