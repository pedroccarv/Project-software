import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

// Função para validar e verificar se um email já existe
const emailExists = async (email) => {
    const user = await prisma.user.findUnique({ where: { email } });
    return !!user;
};

// Endpoint para criar um novo usuário
app.post('/usuarios', async (req, res) => {
    const { email, name, age, password } = req.body;

    if (!email || !password || !name || !age) {
        return res.status(400).json({ error: 'Email, nome, idade e senha são obrigatórios' });
    }

    try {
        if (await emailExists(email)) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const usuario = await prisma.user.create({
            data: { email, name, age, password: hashedPassword },
        });
        res.status(201).json(usuario);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});
app.get('/usuarios', async (req, res) => {
    const { name } = req.query;  // Obtém o parâmetro de consulta 'name'
    
    try {
        // Se o parâmetro 'name' for fornecido, filtra os usuários por nome
        const usuarios = await prisma.user.findMany({
            where: {
                name: {
                    contains: name,  // Filtra usando um 'LIKE' (parcial)
                    mode: 'insensitive'  // Ignora maiúsculas/minúsculas
                }
            }
        });
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

// Endpoint para login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    try {
        const usuario = await prisma.user.findUnique({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, usuario.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        res.status(200).json({ id: usuario.id, email: usuario.email, name: usuario.name });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});

// Endpoint para criar uma nova postagem
app.post('/posts', async (req, res) => {
    const { content, image, userId } = req.body;

    if (!content || !userId) {
        return res.status(400).json({ error: 'Conteúdo e usuário são obrigatórios' });
    }

    try {
        const post = await prisma.post.create({
            data: {
                content,
                image,
                user: { connect: { id: userId } },
            },
            include: {
                user: { select: { name: true } }, // Inclui o nome do usuário
            },
        });
        res.status(201).json(post);
    } catch (error) {
        console.error('Erro ao criar postagem:', error);
        res.status(500).json({ error: 'Erro ao criar postagem' });
    }
});

// Endpoint para buscar todas as postagens
app.get('/posts', async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: { user: { select: { name: true } } },
            orderBy: { createdAt: 'desc' },
        });
        res.status(200).json(posts);
    } catch (error) {
        console.error('Erro ao buscar postagens:', error);
        res.status(500).json({ error: 'Erro ao buscar postagens' });
    }
});

// Endpoint para atualizar uma postagem
app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { content, image, userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'userId é obrigatório' });
    }

    try {
        const post = await prisma.post.findUnique({ where: { id } });

        if (!post || post.userId !== userId) {
            return res.status(403).json({ error: 'Você não tem permissão para editar esta postagem' });
        }

        const updatedPost = await prisma.post.update({
            where: { id },
            data: { content, image },
        });

        res.json(updatedPost);
    } catch (error) {
        console.error('Erro ao atualizar a postagem:', error);
        res.status(500).json({ error: 'Erro ao atualizar a postagem' });
    }
});

// Endpoint para excluir uma postagem
app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'userId é obrigatório' });
    }

    try {
        const post = await prisma.post.findUnique({ where: { id } });

        if (!post || post.userId !== userId) {
            return res.status(403).json({ error: 'Você não tem permissão para excluir esta postagem' });
        }

        await prisma.post.delete({ where: { id } });

        res.json({ message: 'Postagem excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir a postagem:', error);
        res.status(500).json({ error: 'Erro ao excluir a postagem' });
    }
});

// Inicializa o servidor
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