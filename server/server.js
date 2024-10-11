import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';  // Importando bcrypt para hashear a senha

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

app.post('/usuarios', async (req, res) => {
    const { email, name, age, password } = req.body;

    // Verifica se a senha foi fornecida
    if (!password) {
        return res.status(400).json({ error: 'Senha é obrigatória' });
    }

    try {
        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        const usuario = await prisma.user.create({
            data: {
                email,
                name,
                age,
                password: hashedPassword,  // Salvando a senha hasheada
            },
        });
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

app.put('/usuarios/:id', async (req, res) => {
    const { email, name, age, password } = req.body;

    try {
        let updateData = { email, name, age };

        // Se a senha for enviada na requisição, hashear antes de atualizar
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        const usuario = await prisma.user.update({
            where: {
                id: Number(req.params.id), // Certifique-se de que o ID é um número
            },
            data: updateData,  // Atualizando os dados
        });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
});

app.get('/usuarios', async (req, res) => {
    try {
        const filter = {};
        if (req.query.name) filter.name = req.query.name;
        if (req.query.email) filter.email = req.query.email;
        if (req.query.age) filter.age = req.query.age; 

        const usuarios = await prisma.user.findMany({
            where: filter,
        });

        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    try {
        await prisma.user.delete({
            where: {
                id: Number(req.params.id), // Certifique-se de que o ID é um número
            },
        });
        res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});


/* 
MongoDB
pedro
bo7rhoXRyPmfdQOf
node --watch server.js
npx prisma generate
npx prisma studio
npx prisma db pull --force
se der pau usar esses comandos
npx prisma generate
npx prisma db push
*/