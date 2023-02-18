const dbConnection = require('../TediousConnection/sqlServerConnect');

module.exports = {
	getColumnTotal, executeRequestAsync, executeOutputParams, isSet,
};

function getColumnTotal(arrayRows, columnName) {
		const sum = arrayRows.reduce((accumulator, object) => {
			return accumulator + object[columnName];
		}, 0);

		return sum;
	};

async function executeRequestAsync(request) {
		return new Promise(async (resolve, reject) => {
			let  result = [];

			request.on('row', (columns) => {
				let entry = {};
				columns.forEach((column) => {
					entry[column.metadata.colName] = column.value;
				})

				result.push(entry);
			});

			request.on('error', (error) => reject(error));

			request.on('requestCompleted', () => resolve(result));

			const dbCon = await dbConnection.getInstance();

			dbCon.execSql(request);
		});
	}

function executeOutputParams(dbConnection, request){
		return new Promise((resolve, reject) => {
			let  result = [];
			let entry = {};

			request.on('returnValue', (paramName, value, metadata) => {
				console.log(paramName + '=', value);
				entry[paramName] = value;
			});
			result.push(entry);

			request.on('error', (error) => reject(error));

			request.on('requestCompleted', () => resolve(result));

			dbConnection.execSql(request)
		});
	}

function isSet(object, property) {
	if (object === undefined || object === null)
		return false;
	if (property === undefined || property === null)
		return false;

	if (object[property] !== undefined && object[property] !== "undefined" && object[property] !== null)
		return true;
	else
		return false;
}