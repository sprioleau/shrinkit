import type { NextApiRequest, NextApiResponse } from "next";
import { UrlGroupType } from "../../types/types";
const { nanoid } = require("nanoid");
const connectDatabase = require("../../utilities/connectDatabase.ts");
const UrlGroup = require("../../models/UrlGroup.model.tsx");

const { cleanUrl, randomEmojiString } = require("../../utilities/utilityFunctions.ts");

// Connect database
connectDatabase();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	let longUrl = cleanUrl(req.body.longUrl);
	console.log("longUrl from user input in index.tsx (in create-urls.ts):", longUrl);
	const shortId = nanoid(6);

	if (!longUrl) {
		res.status(200).json({ shortId: "", error: { message: "Sorry, that is not a valid URL" } });
		res.end();
	} else {
		const { emojiString } = randomEmojiString(3);
		const urlGroupsList = await UrlGroup.find();
		console.log("urlGroupsList from database (in create-urls.ts):", urlGroupsList);
		const isExistingUrlGroup = urlGroupsList.find((urlGroup: UrlGroupType) => urlGroup.longUrl === longUrl);

		if (!isExistingUrlGroup) {
			await UrlGroup.create([{ longUrl, shortId, emojiString }], (error: {}) => {
				if (error) console.error(error);
				console.log("Entry added successfully");
			});

			res.status(200).json({ shortId, emojiString, urlGroupsList });
		} else {
			res.status(200).json({
				error: { message: "Sorry, that item already exists" },
			});
		}
	}
};
