const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new pg.Pool({
    host: '192.168.0.43',
    port: 5432,
    user : 'postgres',
    database : 'odoo_2026',
    password : 'shree',
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