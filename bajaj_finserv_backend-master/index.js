const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;

//cors setting
app.use(
	cors({
		origin: ["http://localhost:3000", "https://bajaj-finserv-flax.vercel.app"],
		methods: ["GET", "POST"],
		credentials: true,
	})
);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST endpoint
app.post("/bfhl", (req, res) => {
	const { data } = req.body;
	if (!Array.isArray(data)) {
		return res.status(400).json({
			is_success: false,
			user_id: "john_doe_17091999",
			email: "john@xyz.com",
			roll_number: "ABCD123",
			numbers: [],
			alphabets: [],
			highest_alphabet: [],
		});
	}

	const numbers = [];
	const alphabets = [];

	data.forEach((item) => {
		if (/^\d+$/.test(item)) {
			numbers.push(item);
		} else if (/^[a-zA-Z]$/.test(item)) {
			alphabets.push(item);
		}
	});

	const highestAlphabet = alphabets.length
		? [alphabets.reduce((a, b) => (a > b ? a : b))]
		: [];

	res.json({
		is_success: true,
		user_id: "john_doe_17091999",
		email: "john@xyz.com",
		roll_number: "ABCD123",
		numbers,
		alphabets,
		highest_alphabet: highestAlphabet,
	});
});

app.get("/bfhl", (req, res) => {
	res.json({
		operation_code: 1,
	});
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
