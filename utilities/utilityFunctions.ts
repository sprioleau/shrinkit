const isValidUrl = (string: string) => {
	const pattern = new RegExp(
		"^(https?:\\/\\/)?" + // protocol
			"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
			"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
			"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
			"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
			"(\\#[-a-z\\d_]*)?$",
		"i"
	); // fragment locator
	return !!pattern.test(string);
};

const includesProtocol = (url: string) => (url.startsWith("http://") || url.startsWith("https://") ? true : false);

export const cleanUrl = (url: string) => {
	if (!isValidUrl(url.trim())) return null;

	let cleanUrl = url.trim();

	if (!includesProtocol(cleanUrl)) {
		cleanUrl = `http://${cleanUrl}`;
	}

	if (cleanUrl.includes("#")) {
		cleanUrl = cleanUrl.split("#")[0];
	}

	return cleanUrl;
};

// https://apps.timwhitlock.info/emoji/tables/unicode
// https://www.makeuseof.com/top-emojis-explained-cheat-sheet/
const top100Emojis = [
	{ emoji: "😁", utf8: "%F0%9F%98%81" },
	{ emoji: "😂", utf8: "%F0%9F%98%82" },
	{ emoji: "😃", utf8: "%F0%9F%98%83" },
	{ emoji: "😄", utf8: "%F0%9F%98%84" },
	{ emoji: "😅", utf8: "%F0%9F%98%85" },
	{ emoji: "😆", utf8: "%F0%9F%98%86" },
	{ emoji: "😉", utf8: "%F0%9F%98%89" },
	{ emoji: "😊", utf8: "%F0%9F%98%8A" },
	{ emoji: "😋", utf8: "%F0%9F%98%8B" },
	{ emoji: "😌", utf8: "%F0%9F%98%8C" },
	{ emoji: "😍", utf8: "%F0%9F%98%8D" },
	{ emoji: "😏", utf8: "%F0%9F%98%8F" },
	{ emoji: "😒", utf8: "%F0%9F%98%92" },
	{ emoji: "😓", utf8: "%F0%9F%98%93" },
	{ emoji: "😔", utf8: "%F0%9F%98%94" },
	{ emoji: "😘", utf8: "%F0%9F%98%98" },
	{ emoji: "😚", utf8: "%F0%9F%98%9A" },
	{ emoji: "😜", utf8: "%F0%9F%98%9C" },
	{ emoji: "😝", utf8: "%F0%9F%98%9D" },
	{ emoji: "😞", utf8: "%F0%9F%98%9E" },
	{ emoji: "😠", utf8: "%F0%9F%98%A0" },
	{ emoji: "😡", utf8: "%F0%9F%98%A1" },
	{ emoji: "😢", utf8: "%F0%9F%98%A2" },
	{ emoji: "😣", utf8: "%F0%9F%98%A3" },
	{ emoji: "😥", utf8: "%F0%9F%98%A5" },
	{ emoji: "😩", utf8: "%F0%9F%98%A9" },
	{ emoji: "😪", utf8: "%F0%9F%98%AA" },
	{ emoji: "😭", utf8: "%F0%9F%98%AD" },
	{ emoji: "😱", utf8: "%F0%9F%98%B1" },
	{ emoji: "😳", utf8: "%F0%9F%98%B3" },
	{ emoji: "😻", utf8: "%F0%9F%98%BB" },
	{ emoji: "🙈", utf8: "%F0%9F%99%88" },
	{ emoji: "🙋", utf8: "%F0%9F%99%8B" },
	{ emoji: "🙌", utf8: "%F0%9F%99%8C" },
	{ emoji: "🙏", utf8: "%F0%9F%99%8F" },
	{ emoji: "✅", utf8: "%E2%9C%85" },
	{ emoji: "✋", utf8: "%E2%9C%8B" },
	{ emoji: "✨", utf8: "%E2%9C%A8" },
	{ emoji: "❗", utf8: "%E2%9D%97" },
	{ emoji: "⭐", utf8: "%E2%AD%90" },
	{ emoji: "🌈", utf8: "%F0%9F%8C%88" },
	{ emoji: "🌟", utf8: "%F0%9F%8C%9F" },
	{ emoji: "🌷", utf8: "%F0%9F%8C%B7" },
	{ emoji: "🌸", utf8: "%F0%9F%8C%B8" },
	{ emoji: "🌹", utf8: "%F0%9F%8C%B9" },
	{ emoji: "🌺", utf8: "%F0%9F%8C%BA" },
	{ emoji: "🍀", utf8: "%F0%9F%8D%80" },
	{ emoji: "🎉", utf8: "%F0%9F%8E%89" },
	{ emoji: "🎊", utf8: "%F0%9F%8E%8A" },
	{ emoji: "🎶", utf8: "%F0%9F%8E%B6" },
	{ emoji: "🏃", utf8: "%F0%9F%8F%83" },
	{ emoji: "👀", utf8: "%F0%9F%91%80" },
	{ emoji: "👇", utf8: "%F0%9F%91%87" },
	{ emoji: "👉", utf8: "%F0%9F%91%89" },
	{ emoji: "👊", utf8: "%F0%9F%91%8A" },
	{ emoji: "👌", utf8: "%F0%9F%91%8C" },
	{ emoji: "👍", utf8: "%F0%9F%91%8D" },
	{ emoji: "👏", utf8: "%F0%9F%91%8F" },
	{ emoji: "💃", utf8: "%F0%9F%92%83" },
	{ emoji: "💋", utf8: "%F0%9F%92%8B" },
	{ emoji: "💐", utf8: "%F0%9F%92%90" },
	{ emoji: "💔", utf8: "%F0%9F%92%94" },
	{ emoji: "💕", utf8: "%F0%9F%92%95" },
	{ emoji: "💖", utf8: "%F0%9F%92%96" },
	{ emoji: "💘", utf8: "%F0%9F%92%98" },
	{ emoji: "💞", utf8: "%F0%9F%92%9E" },
	{ emoji: "💥", utf8: "%F0%9F%92%A5" },
	{ emoji: "💦", utf8: "%F0%9F%92%A6" },
	{ emoji: "💪", utf8: "%F0%9F%92%AA" },
	{ emoji: "💯", utf8: "%F0%9F%92%AF" },
	{ emoji: "🔥", utf8: "%F0%9F%94%A5" },
	{ emoji: "😀", utf8: "%F0%9F%98%80" },
	{ emoji: "😇", utf8: "%F0%9F%98%87" },
	{ emoji: "😈", utf8: "%F0%9F%98%88" },
	{ emoji: "😎", utf8: "%F0%9F%98%8E" },
	{ emoji: "😑", utf8: "%F0%9F%98%91" },
	{ emoji: "😕", utf8: "%F0%9F%98%95" },
	{ emoji: "😬", utf8: "%F0%9F%98%AC" },
	{ emoji: "😴", utf8: "%F0%9F%98%B4" },
];

export const makeid = (length) => {
	let result = "";
	const characters = top100Emojis.map((key) => key.emoji).join("");
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	console.log("madeId:", result);
	return result;
};

export const randomEmojiString = (length: number) => {
	let emojiString = "";
	let utf8String = "";
	const array = top100Emojis.sort(() => Math.random() - 0.5);

	emojiString = array
		.map(({ emoji }) => emoji)
		.slice(0, length)
		.join("");

	utf8String = array
		.map(({ utf8 }) => utf8)
		.slice(0, length)
		.join("");

	return { emojiString, utf8String };
};
