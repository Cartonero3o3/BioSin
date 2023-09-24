const { mongoose, db } = require('../mongodbconnection/index');

async function saveSequency(req, res) {
	try {
		const AdnDB = mongoose.connection.db;
		const body = req.body;
		const collections = await AdnDB.collection('sequency');
		const result = await collections.insertOne({ sequency: body.sequency });
		res.send(result);
	} catch (error) {
		console.log(error);
	}
}

const codonTable = {
	AUG: 'Methionine',
	UUU: 'Phenylalanine',
	UUC: 'Phenylalanine',
	UUA: 'Leucine',
	UUG: 'Leucine',
	UCU: 'Serine',
	UCC: 'Serine',
	UCA: 'Serine',
	UCG: 'Serine',
	UAU: 'Tyrosine',
	UAC: 'Tyrosine',
	UGU: 'Cysteine',
	UGC: 'Cysteine',
	UGG: 'Tryptophan',
	UAA: 'Stop',
	UAG: 'Stop',
	UGA: 'Stop',
	CUU: 'Leucine',
	CUC: 'Leucine',
	CUA: 'Leucine',
	CUG: 'Leucine',
	CCU: 'Proline',
	CCC: 'Proline',
	CCA: 'Proline',
	CCG: 'Proline',
	CAU: 'Histidine',
	CAC: 'Histidine',
	CAA: 'Glutamine',
	CAG: 'Glutamine',
	CGU: 'Arginine',
	CGC: 'Arginine',
	CGA: 'Arginine',
	CGG: 'Arginine',
	// Third Position U
	AUU: 'Isoleucine',
	AUC: 'Isoleucine',
	AUA: 'Isoleucine',
	AUC: 'Isoleucine',
	ACU: 'Threonine',
	ACC: 'Threonine',
	ACA: 'Threonine',
	ACG: 'Threonine',
	AAU: 'Asparagine',
	AAC: 'Asparagine',
	AAA: 'Lysine',
	AAG: 'Lysine',
	AGU: 'Serine',
	AGC: 'Serine',
	AGA: 'Arginine',
	AGG: 'Arginine',
	// Second Position C
	CUU: 'Leucine',
	CUC: 'Leucine',
	CUA: 'Leucine',
	CUG: 'Leucine',
	CCU: 'Proline',
	CCC: 'Proline',
	CCA: 'Proline',
	CCG: 'Proline',
	CAU: 'Histidine',
	CAC: 'Histidine',
	CAA: 'Glutamine',
	CAG: 'Glutamine',
	CGU: 'Arginine',
	CGC: 'Arginine',
	CGA: 'Arginine',
	CGG: 'Arginine',
	// Third Position C
	UCU: 'Serine',
	UCC: 'Serine',
	UCA: 'Serine',
	UCG: 'Serine',
	UAU: 'Tyrosine',
	UAC: 'Tyrosine',
	UGU: 'Cysteine',
	UGC: 'Cysteine',
	UGA: 'Stop',
	UGG: 'Tryptophan',
	CCU: 'Proline',
	CCC: 'Proline',
	CCA: 'Proline',
	CCG: 'Proline',
	CAU: 'Histidine',
	CAC: 'Histidine',
	CAA: 'Glutamine',
	CAG: 'Glutamine',
	// Second Position A
	AUU: 'Isoleucine',
	AUC: 'Isoleucine',
	AUA: 'Isoleucine',
	AUG: 'Methionine',
	ACU: 'Threonine',
	ACC: 'Threonine',
	ACA: 'Threonine',
	ACG: 'Threonine',
	AAU: 'Asparagine',
	AAC: 'Asparagine',
	AAA: 'Lysine',
	AAG: 'Lysine',
	AGU: 'Serine',
	AGC: 'Serine',
	AGA: 'Arginine',
	AGG: 'Arginine',
	// Third Position A
	UUU: 'Phenylalanine',
	UUC: 'Phenylalanine',
	UUA: 'Leucine',
	UUG: 'Leucine',
	UCU: 'Serine',
	UCC: 'Serine',
	UCA: 'Serine',
	UCG: 'Serine',
	UAU: 'Tyrosine',
	UAC: 'Tyrosine',
	UGU: 'Cysteine',
	UGC: 'Cysteine',
	UGA: 'Stop',
	UGG: 'Tryptophan',
	CCU: 'Proline',
	CCC: 'Proline',
	CCA: 'Proline',
	CCG: 'Proline',
	// Second Position G
	GUU: 'Valine',
	GUC: 'Valine',
	GUA: 'Valine',
	GUG: 'Valine',
	GCU: 'Alanine',
	GCC: 'Alanine',
	GCA: 'Alanine',
	GCG: 'Alanine',
	GAU: 'Aspartic Acid',
	GAC: 'Aspartic Acid',
	GAA: 'Glutamic Acid',
	GAG: 'Glutamic Acid',
	GGU: 'Glycine',
	GGC: 'Glycine',
	GGA: 'Glycine',
	GGG: 'Glycine',
};

function transformSequenceToArn(letterSequence) {
	let ARN = '';
	for (let i = 0; i < letterSequence.length; i++) {
		switch (letterSequence[i]) {
			case 'A':
				ARN += 'U';
				break;
			case 'C':
				ARN += 'G';
				break;
			case 'T':
				ARN += 'A';
				break;
			case 'G':
				ARN += 'C';
				break;
			default:
				break;
		}
	}
	return ARN;
}

function transformSequence(letterSequence) {
	let ADN = '';
	for (let i = 0; i < letterSequence.length; i++) {
		switch (letterSequence[i]) {
			case 'A':
				ADN += 'T';
				break;
			case 'C':
				ADN += 'G';
				break;
			case 'T':
				ADN += 'A';
				break;
			case 'G':
				ADN += 'C';
				break;
			default:
				break;
		}
	}
	return ADN;
}

function getProteinsFromRNA(Arn) {
	const proteins = [];
	for (let i = 0; i < Arn.length; i += 3) {
		const codon = Arn.substr(i, 3);
		if (codonTable.hasOwnProperty(codon)) {
			proteins.push(codonTable[codon]);
		} else {
			proteins.push('No existe');
		}
	}

	const cut = proteins.map((item) => item.substr(0, 4)); // corta los strings a 3 caracteres
	const unique = cut.filter((item) => item !== 'Stop');
	unique.push('Stop');
	return unique;
}

async function getAllSequences() {
	try {
		const AdnDB = mongoose.connection.db;
		if (!AdnDB)
			return {
				data: [],
			};

		const collections = await AdnDB.collection('sequency');
		const sequences = await collections.find({}).sort({ _id: -1 }).limit(10).toArray();
		return {
			data: sequences.map((item) => ({
				sequency: item.sequency,
				ARN: transformSequenceToArn(item.sequency),
				proteins: getProteinsFromRNA(transformSequenceToArn(item.sequency)),
				sequencyI: transformSequence(item.sequency),
			})),
		};
	} catch (error) {
		console.log(error);
		return {
			data: [],
		};
	}
}

async function getAllSequences2() {
	try {
		const AdnDB = mongoose.connection.db;
		if (!AdnDB)
			return {
				data: [],
			};

		const collections = await AdnDB.collection('sequency');
		const sequences = await collections.find({}).sort({ _id: -1 }).limit(1).toArray();
		return {
			data: sequences.map((item) => ({
				sequency: item.sequency,
				ARN: transformSequenceToArn(item.sequency),
				proteins: getProteinsFromRNA(transformSequenceToArn(item.sequency)),
				sequencyI: transformSequence(item.sequency),
			})),
		};
	} catch (error) {
		console.log(error);
		return {
			data: [],
		};
	}
}

module.exports = {
	saveSequency,
	getAllSequences,
	getAllSequences2,
};
