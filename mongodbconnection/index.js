const mongoose = require('mongoose');

const uri = "mongodb+srv://ThiagoCaballero:Friv1234@biosin.hjta1np.mongodb.net/?retryWrites=true&w=majority";

function connect() {
	mongoose
		.connect(uri)
		.then(() => {
			console.log('Connected to the database ');
		})
		.catch((err) => {
			console.error(`Error connecting to the database. n${err}`);
		});
}

module.exports = {
	connect,
	mongoose,
	db: mongoose.connection.db
};

