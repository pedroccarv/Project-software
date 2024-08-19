const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

app.post('/api/send-email', (req, res) => {
  const { email, subject, message } = req.body;

  // Configuração do transporte do Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail', // ou qualquer outro serviço de e-mail
    auth: {
      user: 'seu-email@gmail.com',
      pass: 'sua-senha',
    },
  });

  const mailOptions = {
    from: 'seu-email@gmail.com',
    to: email,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Erro ao enviar o e-mail');
    }
    res.status(200).send('E-mail enviado com sucesso');
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
