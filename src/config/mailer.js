import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
        user: 'hof-tax@joelarguello.me',
        pass: 'Pcjoel2019@'
    }
});

export default transporter;
