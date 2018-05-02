const Clinet = require('mysql-pro');
const config = require('../common/config');

var client = new Clinet({
	mysql: {
		host: config.localServer,
		post: 3306,
		database: config.databaseName,
		user: config.databaseUser,
		password: config.databasePassword
	}
});

module.exports = client;