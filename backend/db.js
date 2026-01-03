const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new pg.Pool({
    host: process.env.HOST,
    port: process.env.DBPORT,
    user : process.env.USER,
    database : process.env.NAME,
    password : process.env.PASSWORD,
    idleTimeoutMillis : 1000,
    maxLifetimeSeconds : 3000
});

module.exports = {
    query : async function(query, values){
        let connection = null;
        try {
            const connection = await pool.connect();
            return await connection.query(query, values);
        } catch (error) {
            console.log( 'database error :-',error)
            throw error;
        }
    }
}