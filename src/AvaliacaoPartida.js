const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let avaliacoes = []; // Array para armazenar as avaliações (em um cenário real, usaria um banco de dados)

app.post('/avaliar-partida', (req, res) => {
    const { rating } = req.body;

    if (rating >= 1 && rating <= 5) {
        avaliacoes.push(rating); // Armazena a avaliação
        res.status(200).json({ success: true, message: 'Avaliação enviada com sucesso!' });
    } else {
        res.status(400).json({ success: false, message: 'Avaliação inválida. Escolha um valor entre 1 e 5.' });
    }
});

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});
