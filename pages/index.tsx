import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import { UrlGroupType } from "../types/types";

const Home = () => {
	const [longUrl, setLongUrl] = useState<string>("");
	const [shortId, setShortId] = useState<string>("");
	const [emojiString, setEmojiString] = useState<string>("");
	const [urlGroupsList, setUrlGroupsList] = useState<[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");

	const home = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";

	useEffect(() => {
		setLongUrl("");
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => setLongUrl(e.target.value);

	const getShortUrl = async () => {
		setLoading(true);

		await axios
			.post("/api/create-url", { longUrl })
			.then((res) => {
				console.log("res.data coming into index.tsx:", res.data);
				if (!res.data.shortId) {
					setErrorMessage(res.data.error.message);
					setLoading(false);
				} else {
					setShortId(res.data.shortId);
					setEmojiString(res.data.emojiString);
					setUrlGroupsList(res.data.urlGroupsList);
					setLoading(false);
				}
			})
			.catch((error) => console.error({ message: "From index.tsx", error }));
	};

	return (
		<>
			<Head>
				<title>Shrink those URLs</title>
				<link rel="icon" href="/shrink.png" />
			</Head>

			<main>
				<h1>🎁 Shrink those URLs</h1>
				<form>
					<input id="input" placeholder="enter URL to be shorten" onChange={handleChange} />
					<button type="submit" className="btn" onClick={getShortUrl} disabled={loading || longUrl.length === 0}>
						Shrink
					</button>
				</form>
				{errorMessage && <p>{errorMessage}</p>}
				{emojiString && shortId && (
					<>
						<p className="short-url" style={{ display: "block" }}>
							{`${home}/${emojiString}`}
						</p>
						<a href={`${home}/${emojiString}`}>{`${home}/${emojiString}`}</a>
					</>
				)}
				{urlGroupsList && urlGroupsList.length > 0 && (
					<table className="url-groups-list">
						<tr>
							<th>Long Url</th>
							<th>Emoji Code</th>
							<th>Hits</th>
						</tr>
						{urlGroupsList.map(({ longUrl, emojiString, hits }: UrlGroupType) => (
							<tr className="url-groups-list__item">
								<td>{longUrl.replace("http://", "")}</td>
								<td>{emojiString}</td>
								<td>{hits}</td>
							</tr>
						))}
					</table>
				)}
			</main>
		</>
	);
};

export default Home;
