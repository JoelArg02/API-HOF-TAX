import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.POSTGRES_DB,
});

(async () => {
    try {
        const client = await pool.connect();
        console.log("Conexión exitosa a la base de datos");
        client.release();
    } catch (error) {
        console.error("Error de conexión a la base de datos", error);
    }
})();

export default pool;
