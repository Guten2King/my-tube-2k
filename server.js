const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar o diretório de armazenamento
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Inicializar o upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 }, // 100MB de limite
}).single('videoFile');

// Rota para upload de vídeos
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err) {
            res.send('Erro ao enviar o vídeo.');
        } else {
            res.send('Vídeo enviado com sucesso!');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
