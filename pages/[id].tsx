import axios from "axios";
import { GetServerSideProps } from "next";
require("dotenv").config();

const Redirect = () => {
	return null;
};

const home = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://shrinkit.vercel.app";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
	const { id } = context.params;
	console.log("[id] from context.params in [id].tsx:", id);

	try {
		const response = await axios.post(`${home}/api/get-short-url`, {
			id,
		});

		const longUrl = response.data.longUrl;
		console.log("longUrl coming into [id].tsx:", longUrl);

		return {
			redirect: {
				destination: longUrl,
				permanent: false,
			},
		};
	} catch (error) {
		console.error(error);
	}

	return { props: {} };
};

export default Redirect;
