const secuenciaBTN = document.getElementById("Generacion-secuencias");
const SecuenciaNotas = document.getElementById("Secuencias-de-notas");
const sequenceEJS = document.getElementById("sequences-list");

function generateRandomLetters(length) {
	const characters = "TAGC";
	let result = "TAC";
	let finResult = ["ACT", "ATT", "ATC"];
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters.charAt(randomIndex);
	}
	const randomFinIndex = Math.floor(Math.random() * finResult.length);
	result += finResult[randomFinIndex];
	return result;
}

document.addEventListener("DOMContentLoaded", function () {
	const letterSequence = generateRandomLetters(12);
	SecuenciaNotas.textContent = letterSequence;
	sendPostRequest("/", { sequency: letterSequence });
});

secuenciaBTN.addEventListener("click", function () {
	const letterSequence = generateRandomLetters(12);
	SecuenciaNotas.textContent = letterSequence;
	sendPostRequest("/", { sequency: letterSequence });
	updatePage();
});

function sendPostRequest(url = "", body = {}) {
	fetch(url, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
}

async function updatePage() {
	const response = await fetch("/data", {
		method: "GET",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
	}).then((response) => response.json());

	const sequences = response.data;

	console.log(sequences);

	const sequenceEJS = document.getElementById("sequences-list");
	sequenceEJS.innerHTML = "";
	sequences.forEach((item) => {
		const tr = document.createElement("tr");
		const td = document.createElement("td");
		td.textContent = item.sequency;
		tr.appendChild(td);
		sequenceEJS.appendChild(tr);
	});

	const sequenceEJS2 = document.getElementById("sequences-list-table");
	sequenceEJS2.innerHTML = "";
	sequences.forEach((item) => {
		const tr = document.createElement("tr");
		const tdS = document.createElement("td");
		const tdT = document.createElement("td");
		const tdP = document.createElement("td");
		tdS.textContent = item.sequencyI;
		tdT.textContent = item.ARN;
		tdP.textContent = item.proteins;

		tr.appendChild(tdS);
		tr.appendChild(tdT);
		tr.appendChild(tdP);

		sequenceEJS2.appendChild(tr);
	});
}

//tooltip
