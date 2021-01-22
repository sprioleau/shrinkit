require("dotenv").config();
const mongoose = require("mongoose");

module.exports = () => {
	mongoose
		.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		})
		.then(() => console.log("Database connected"))
		.catch((error) => console.error(error));
};
