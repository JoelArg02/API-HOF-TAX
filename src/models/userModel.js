import pool from '../config/db.js';

class UserModel {
    static async createUser({ name, lastname, email, phone }) {
        const query = `
            INSERT INTO Users (Name, Lastname, Email, Phone)
            VALUES ($1, $2, $3, $4) RETURNING *
        `;
        const values = [name, lastname, email, phone];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async getUserByPhone(phone) {
        const query = `SELECT * FROM Users WHERE Phone = $1`;
        const { rows } = await pool.query(query, [phone]);
        return rows[0];
    }

    static async getUserByEmail(email) {
        const query = `SELECT * FROM Users WHERE Email = $1`;
        const { rows } = await pool.query(query, [email]);
        return rows[0];
    }

    static async getUserById(id) {
        const query = `SELECT * FROM Users WHERE Id = $1`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }

    static async getAllUsers() {
        const query = `SELECT * FROM Users`;
        const { rows } = await pool.query(query);
        return rows;
    }

    static async updateUser(id, { name, lastname, email, phone }) {
        const query = `
            UPDATE Users
            SET Name = $1, Lastname = $2, Email = $3, Phone = $4
            WHERE Id = $5 RETURNING *
        `;
        const values = [name, lastname, email, phone, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async deleteUser(id) {
        const query = `DELETE FROM Users WHERE Id = $1 RETURNING *`;
        const { rows } = await pool.query(query, [id]);

        return rows[0];
    }

    static async updateOtp(Email, otp, expiresAt) {
        const query = `
            UPDATE Users
            SET OtpCode = $1, OtpExpiresAt = $2
            WHERE Email = $3 RETURNING *
        `;
        const values = [otp, expiresAt, Email];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async clearOtp(email) {
        const query = `UPDATE Users SET otpcode = NULL, otpexpiresat = NULL WHERE Email = $1`;
        await pool.query(query, [email]);
    }
}

export default UserModel;
