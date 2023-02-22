// for enhancements, use https://www.npmjs.com/package/tedious-async#execsqlasync
// Move this to RediousConnection folder.

const Connection = require('tedious').Connection
const dotenv = require('dotenv');


var Singleton = (function() {
    var instance;
    dotenv.config();

    async function createInstance() {
        const config = {
            // server: 'LAPTOP-OJBCF2RO',
            server: process.env.DB_SERVER,
            authentication: {
                type: 'default',
                options: {
                    userName: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                }
            },
            options: {
                //database: 'RODEO_11182022',
                database: process.env.DB_DATABASE,
                // database: 'WHOLESALE_CPPractice',
                trustServerCertificate: true,
                // instanceName: process.env.DB_INSTANCE,
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










// let conn;

// module.exports = {
//     connectDatabase,
//     dbConnection,
// };

// function connectDatabase() {
//     const config = {
//         server: 'LAPTOP-OJBCF2RO',
//         authentication: {
//             type: 'default',
//             options: {
//                 userName: 'sa',
//                 password: '1234',
//             }
//         },
//         options: {
//             //database: 'RODEO_11182022',
//             database: 'TestGolf_1',
//             // database: 'WHOLESALE_CPPractice',
//             trustServerCertificate: true,
//             //instanceName: 'SQLEXPRESS2016',
//         },
//     };

//     const connection = new Connection(config);

//     connection.connect();
//     //app.locals.dbConnection = connection;

//     connection.on('connect', (err) => {
//         if (err) {
//             console.log(err);
//         }
//     });

//     conn = connection;
// }

// function dbConnection() {
//     return conn;
// }


