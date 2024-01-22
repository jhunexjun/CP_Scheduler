const msSql = require('mssql')
const dotenv = require('dotenv')


var Singleton = (function() {
	var instance;
	dotenv.config();

	const sqlConfig = {
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		server: process.env.DB_SERVER,
		pool: {
			max: 10,
			min: 0,
			idleTimeoutMillis: 30000
		},
		options: {
			encrypt: false, // for azure
			trustServerCertificate: true, // change to true for local dev / self-signed certs
			// useUTC: false,
		}
	}

	if (process.env.DB_INSTANCE !== "")
		sqlConfig.options.instanceName = process.env.DB_INSTANCE;  // 'SQLEXPRESS2016'

	async function createInstance() {
		try {
			return await msSql.connect(sqlConfig)
		} catch(err) {
			console.log(err);
		}
	}

	var getInstance = async () => {
		if (!instance) {
			instance = await createInstance();
		}

		return instance;
	}

	return {
		getInstance,
	};
})();

module.exports = Singleton;