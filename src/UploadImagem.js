const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static('uploads'));

// Configuração do multer para armazenar as imagens no diretório 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/upload-imagem', upload.single('imagem'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'Nenhuma imagem foi enviada.' });
    }

    res.status(200).json({ success: true, message: 'Imagem enviada com sucesso!', imageUrl: `/uploads/${req.file.filename}` });
});

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});
