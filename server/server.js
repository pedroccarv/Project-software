import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())


app.post('/usuarios', async(req, res) =>{

    await prisma.User.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        }
       })

        res.status(201).json(req.body)
})

app.put('/usuarios/:id', async(req, res) =>{

    await prisma.User.update({  
        where:{
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        }
       })

        res.status(201).json(req.body)
})

app.get('/usuarios', async(req, res) => {
    
    let usuario = []

    if(req.query){
        usuario = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                password: req.query.password
            }
        })
    }else{

    }

    const users = await prisma.user.findMany()

    res.status(200).json(users)
})

app.delete('/usuarios/:id', async (req,res) =>{
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({message: 'Usuario deletado com sucesso!'})
})

app.listen(3000)
/* 
MongoDB
pedro
bo7rhoXRyPmfdQOf
*/