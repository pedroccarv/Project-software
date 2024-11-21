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
const verifyAdmin = async (req, res, next) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'ID do usuário é obrigatório' });
    }

    try {
        const usuario = await prisma.user.findUnique({ where: { id: userId } });

        if (!usuario || !usuario.isAdmin) {
            return res.status(403).json({ error: 'Acesso negado: usuário não é administrador' });
        }

        next(); // Se o usuário for admin, prossiga para a próxima função
    } catch (error) {
        console.error('Erro ao verificar administrador:', error);
        res.status(500).json({ error: 'Erro ao verificar administrador' });
    }
};

// Endpoint protegido para administradores
app.get('/admin/dashboard', verifyAdmin, async (req, res) => {
    try {
        // Código para retornar dados administrativos
        res.status(200).json({ message: 'Bem-vindo à página administrativa!' });
    } catch (error) {
        console.error('Erro ao buscar dados administrativos:', error);
        res.status(500).json({ error: 'Erro ao buscar dados administrativos' });
    }
});
// Endpoint para criar um novo usuário
app.post('/usuarios', async (req, res) => {
    const { email, name, age, password, isAdmin  } = req.body;

    if (!email || !password || !name || !age) {
        return res.status(400).json({ error: 'Email, nome, idade e senha são obrigatórios' });
    }

    try {
        if (await emailExists(email)) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const usuario = await prisma.user.create({
            data: { email, name, age, password: hashedPassword, isAdmin: isAdmin || false },
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

        res.status(200).json({ id: usuario.id, email: usuario.email, name: usuario.name, isAdmin: usuario.isAdmin });
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
app.get('/usuarios/:id', async (req, res) => {
    const { id } = req.params;

    // Verifica se o ID é um número
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    try {
        const usuario = await prisma.user.findUnique({ where: { id: parseInt(id) } });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
});
app.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, email } = req.body;

    try {
        const usuario = await prisma.user.findUnique({ where: { id } });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { name, age, email },
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
});

// Endpoint to create a new court
app.post('/admin/cadastro-quadra', verifyAdmin, async (req, res) => {
    const { name, location, photos, availableDays, openingTime, closingTime, numCourts } = req.body;
    console.log('Dados recebidos no backend:', req.body);
    console.log('Dados recebidos no backend:', { name, location, photos, availableDays, openingTime, closingTime, numCourts });
  
    if (!numCourts || numCourts < 1) {
      return res.status(400).json({ error: 'Número de quadras deve ser maior que zero.' });
    }
  
    // Verificar se todos os campos são fornecidos e estão no formato correto
    if (!name || !location || !Array.isArray(photos) || photos.length === 0 || !Array.isArray(availableDays) || availableDays.length === 0 || !openingTime || !closingTime || !numCourts || isNaN(numCourts) || numCourts <= 0) {
      console.log('Erro na validação dos dados recebidos');
      return res.status(400).json({ error: 'Todos os campos são obrigatórios e devem estar no formato correto' });
    }
  
    try {
      // Criar o local com o número de quadras
      const courtLocation = await prisma.quadra.create({
        data: {
          name,              // Nome do local
          location,          // Localização (endereço, etc)
          imageUrl: photos[0],  // Usando a primeira foto como `imageUrl` principal
          photos,            // Todas as fotos
          diasSemana: availableDays, // Dias disponíveis para uso
          openingTime,       // Hora de abertura
          closingTime,       // Hora de fechamento
          numCourts          // Usando numCourts aqui, conforme o seu modelo
        }
      });
  
      // Agora, criar as quadras (individualmente) com base no número de quadras informadas
      const createdCourts = [];
      for (let i = 0; i < numCourts; i++) {
        const court = await prisma.quadra.create({
          data: {
            name: `${name} - Quadra ${i + 1}`, // Nome da quadra com número sequencial
            location,
            imageUrl: photos[0], // Usando a primeira foto como `imageUrl` principal
            photos,
            diasSemana: availableDays,
            openingTime,
            closingTime,
            numCourts, // Cada quadra individualmente recebe "1" como número de quadras
              // Associa a quadra ao local
          }
        });
        createdCourts.push(court);
      }
  
      res.status(201).json({ message: `${createdCourts.length} quadras criadas com sucesso`, createdCourts });
    } catch (error) {
      console.error('Erro ao criar quadra:', error);
      res.status(500).json({ error: 'Erro ao criar quadra' });
    }
  });
  
// Endpoint para agendar uma quadra
app.post('/schedule', async (req, res) => {
    const { userId, courtId, dayOfWeek, startTime, endTime } = req.body;
 
    if (!userId || !courtId || !dayOfWeek || !startTime || !endTime) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
 
    const parsedStartTime = parseInt(startTime, 10);
    const parsedEndTime = parseInt(endTime, 10);
 
    if (isNaN(parsedStartTime) || isNaN(parsedEndTime)) {
        return res.status(400).json({ error: 'Os horários devem ser números válidos (ex: 9, 10, 11)' });
    }
 
    try {
        // Verifica se já existe um agendamento no horário desejado
        const existingSchedule = await prisma.agendamento.findFirst({
            where: {
                quadraId: courtId,
                diaSemana: dayOfWeek,
                OR: [
                    {
                        horarioInicio: {
                            lt: parsedEndTime,
                        },
                        horarioFim: {
                            gt: parsedStartTime,
                        },
                    },
                ],
            },
        });
        console.log({
            courtId,
            dayOfWeek,
            parsedStartTime,
            parsedEndTime,
          });
        if (existingSchedule) {
            return res.status(400).json({ error: 'Quadra não disponível para o horário selecionado' });
        }
 
        const agendamento = await prisma.agendamento.create({
            data: {
                userId,
                quadraId: courtId,
                diaSemana: dayOfWeek,
                horarioInicio: parsedStartTime,
                horarioFim: parsedEndTime,
            },
        });
        console.log('Agendamentos existentes:', existingSchedule);
        res.status(201).json(agendamento);
    } catch (error) {
        console.error('Erro ao agendar quadra:', error);
        res.status(500).json({ error: 'Erro ao agendar quadra' });
    }
 });

app.get('/quadras', async (req, res) => {
    try {
      const courts = await prisma.quadra.findMany({
        include: {
          horarios: true, // Incluir apenas a relação 'horarios', pois 'diasSemana' já faz parte do modelo como campo escalar
        },
      });
      res.status(200).json(courts);
    } catch (error) {
      console.error('Erro ao buscar quadras:', error);
      res.status(500).json({ error: 'Erro ao buscar quadras' });
    }
  });
  

// Endpoint para buscar detalhes de uma quadra
app.get('/quadras/:id', async (req, res) => {
    const { id } = req.params;

    // Verificar se o ID foi fornecido
    if (!id) {
        return res.status(400).json({ error: 'ID da quadra não fornecido' });
    }

    try {
        // Buscar a quadra pelo ID fornecido
        const quadra = await prisma.quadra.findUnique({
            where: { id: id }, // O ID é passado diretamente, sem parseInt
            include: { horarios: true },
        });

        if (!quadra) {
            return res.status(404).json({ error: 'Quadra não encontrada' });
        }

        res.status(200).json(quadra);
    } catch (error) {
        console.error('Erro ao buscar detalhes da quadra:', error);
        res.status(500).json({ error: 'Erro ao buscar detalhes da quadra' });
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