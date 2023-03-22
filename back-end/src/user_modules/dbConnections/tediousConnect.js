// for enhancements, use https://www.npmjs.com/package/tedious-async#execsqlasync
// Move this to RediousConnection folder.

// Do not use this anymore. To be desolved soon. Use the msSqlConnect instead.
// The issue with tedious is cannot bear 2 retrievals at the same time.

const Connection = require('tedious').Connection
const dotenv = require('dotenv');


var Singleton = (function() {
    var instance;
    dotenv.config();

    async function createInstance() {
        const config = {
            server: process.env.DB_SERVER,
            authentication: {
                type: 'default',
                options: {
                    userName: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                }
            },
            options: {
                database: process.env.DB_DATABASE,
                trustServerCertificate: true,
            },
        };

        if (process.env.DB_INSTANCE !== "")
            config.options.instanceName = process.env.DB_INSTANCE;  // 'SQLEXPRESS2016'

        const connection = new Connection(config);
        connection.connect();
        connection.on('connect', (err) => {
            if (err) {
                console.log(err);
            }
        });

        return connection;
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