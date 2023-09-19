const express = require("express");
const router = express.Router();
const { saveSequency, getAllSequences } = require("../service/index");

router.get("/", async (req, res) => {
	const sequences = await getAllSequences();
	console.log(sequences)
	res.render("index.ejs", { sequences });
});

router.get("/data", async (req, res) => {
	const sequences = await getAllSequences();
	res.send(sequences);
});

router.get("/Conocenos", async (req, res) => {
	res.render("Conocenos.ejs");
});

router.get("/proteinas", async (req, res) => {
	const sequences = await getAllSequences();
	res.render("proteinas.ejs", { sequences });
});

router.post("/", async (req, res) => {
	saveSequency(req, res);
});

module.exports = router;
