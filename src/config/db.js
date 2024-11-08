import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    connectionString: 'postgres://default:Xb3WBhFLyd7U@ep-dry-butterfly-a42czc23-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
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
