// for future use, probably will not use..

var { Pool } = require('pg'); // for Postgres

const CONNECTION_STRING = process.env.DATABASE_URL;
const SSL = process.env.NODE_ENV === 'production'; // not sure what this line is for..

class Database {
    constructor() {
        this._pool = new Pool({
            connectionString: CONNECTION_STRING,
            ssl: SSL
        });

        this._pool.on('error', (err, client) => {
            console.log('unexpected error on idle PostgreSQL client', err);
            process.exit(-1);
        });

    }

    query() {
        

    }

    end() {

    }
}
