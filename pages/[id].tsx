import axios from "axios";
import { GetServerSideProps } from "next";

const Redirect = () => {
	return null;
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
	const { id } = context.params;

	try {
		const response = await axios.post("http://localhost:3000/api/get-short-url", {
			id,
		});

		const longUrl = response.data.longUrl;

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
