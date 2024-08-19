import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/enviar-convite', (req, res) => {
    const { email, nomeDoAmigo } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'seu-email@gmail.com',
            pass: 'sua-senha-de-app',
        },
    });

    const mailOptions = {
        from: 'seu-email@gmail.com',
        to: email,
        subject: 'Convite para participar!',
        text: `Olá ${nomeDoAmigo}, você foi convidado a participar de uma partida!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
        res.status(200).json({ success: true, info });
    });
});

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});
