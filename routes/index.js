const express = require("express");
const router = express.Router();
const { saveSequency, getAllSequences, getAllSequences2 } = require("../service/index");

router.get("/", async (req, res) => {
	const sequences = await getAllSequences();
	res.render("index", { sequences });
});

router.get("/data", async (req, res) => {
	const sequences = await getAllSequences();
	res.send(sequences);
});

router.get("/Conocenos", async (req, res) => {
	res.render("Conocenos");
});

router.get("/proteinas", async (req, res) => {
	const sequences = await getAllSequences2();
	res.render("proteinas", { sequences });
});

router.post("/", async (req, res) => {
	saveSequency(req, res);
});

module.exports = router;
