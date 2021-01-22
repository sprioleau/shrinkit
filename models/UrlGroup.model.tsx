const mongoose = require("mongoose");
const Schema = mongoose.Schema;

delete mongoose.connection.models["UrlGroup"];

const UrlGroupSchema = new Schema({
	shortId: {
		type: String,
		required: true,
	},
	longUrl: {
		type: String,
		required: true,
	},
	hits: {
		type: Number,
		required: true,
		default: 0,
	},
	emojiString: {
		type: String,
		required: false,
	},
});

module.exports = mongoose.model("UrlGroup", UrlGroupSchema);
