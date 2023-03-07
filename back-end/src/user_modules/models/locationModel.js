const msSql = require('mssql')
// const Request = require('tedious').Request
// const TYPES = require('tedious').TYPES;
// const utils = require('../utils/util');

const locationSql = require('../sqlStatements/locationSql');


module.exports = {
	getLocation,
}

async function getLocation(req) {
	try {
		const sql = locationSql.getLocation();
		// let request = new Request(sql, (err) => {
		// 	if (err)
		// 		console.log(err);
		// });

		// // console.log("req.params: ", req.params);

		// request.addParameter('sessionId', TYPES.VarChar, req.params.sessionId);
		// const location = await utils.executeRequestAsync(request);
		// return location[0];

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
				trustServerCertificate: true // change to true for local dev / self-signed certs
			}
		}


		msSql.on('error', err => {
			// ... error handler
		})

		return await msSql.connect(sqlConfig).then(pool => {
				return pool.request()
					.input('sessionId', msSql.VarChar, req.params.sessionId)
					.query(sql)
			}).then(result => {
				return result.recordset[0];
			}).catch(err => {
				console.log(err);
			});
	} catch(e) {
		throw e;
	}
}
