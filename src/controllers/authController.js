import crypto from 'crypto';
import pool from '../config/db.js';
import transporter from '../config/mailer.js';
import UserModel from '../models/userModel.js';

function generarOtp() {
    return crypto.randomInt(100000, 1000000).toString();
}

export const sendOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Correo electrónico es requerido' });
    }

    const otp = generarOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    try {
        const user = await UserModel.updateOtp(email, otp, expiresAt);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await transporter.sendMail({
            from: 'hof-tax@joelarguello.me',
            to: email,
            subject: 'Tu código de verificación',
            text: `Tu código de verificación es: ${otp}`
        });

        res.status(200).json({ message: 'OTP enviado correctamente', user: user.name });
    } catch (error) {
        res.status(500).json({ message: 'Error al enviar OTP' });
    }
};

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Correo electrónico y OTP son requeridos' });
    }

    try {
        const query = `
            SELECT otpcode, otpexpiresat
            FROM Users
            WHERE Email = $1
        `;
        const { rows } = await pool.query(query, [email]);
        console.log(rows);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const user = await UserModel.getUserByEmail(email);

        const { otpcode, otpexpiresat } = rows[0];
        const ahora = new Date();

        if (!otpcode || !otpexpiresat) {
            console.error("Error: otpcode o otpexpiresat están undefined");
            return res.status(500).json({ message: 'Error al verificar OTP: Datos incompletos en la base de datos' });
        }

        if (otp.toString() !== otpcode.toString()) {
            return res.status(400).json({ message: 'OTP incorrecto' });
        } else if (ahora >= new Date(otpexpiresat)) {
            return res.status(400).json({ message: 'OTP expirado' });
        } else {

            const user = await UserModel.getUserByEmail(email);

            return res.status(200).json({
                message: 'OTP verificado correctamente',
                user
            });
        }

    } catch (error) {
        console.error('Error al verificar OTP:', error);
        res.status(500).json({ message: 'Error al verificar OTP' });
    }
};

export const verifyOtpAndRegister = async (req, res) => {
    const { email, otp, name, lastname, phone } = req.body;

    if (!email || !otp || !name || !lastname || !phone) {
        return res.status(400).json({ message: 'Datos incompletos' });
    }

    try {

        const query = `SELECT otpcode, otpexpiresat FROM Users WHERE Email = $1`;
        const { rows } = await pool.query(query, [email]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const { otpcode, otpexpiresat } = rows[0];
        const ahora = new Date();

        if (!otpcode || !otpexpiresat) {
            return res.status(500).json({ message: 'Error: Datos de OTP incompletos en la base de datos' });
        }

        if (otp.toString() !== otpcode.toString()) {
            return res.status(400).json({ message: 'OTP incorrecto' });
        } else if (ahora >= new Date(otpexpiresat)) {
            return res.status(400).json({ message: 'OTP expirado' });
        }

        const newUser = await UserModel.createUser(name, lastname, email, phone);

        if (!newUser) {
            return res.status(500).json({ message: 'Error al registrar usuario' });
        }

        await UserModel.clearOtp(email);

        res.status(200).json({ message: 'Usuario registrado correctamente', user: newUser });
    } catch (error) {
        console.error('Error al verificar OTP y registrar usuario:', error);
        res.status(500).json({ message: 'Error al verificar OTP y registrar usuario' });
    }
};
