const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

app.get('/alunos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const aluno = await prisma.aluno.findUnique({
            where: { id: parseInt(id) },
        });
        if (aluno) {
            res.status(200).json(aluno);
        } else {
            res.status(404).json({ error: 'Aluno não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter aluno'});
    }
})

app.put('/alunos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, matricula } = req.body;
    try {
        const aluno = await prisma.aluno.update({
            where: { id: parseInt(id) },
            data: { nome, email, matricula },
        });
        res.status(200).json(aluno);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar aluno' });
    }
});

app.delete('/alunos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.aluno.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch(error) {
        res.status(500).json({ error: 'Erro ao deletar aluno'});
    }
});

app.post('/alunos', async (req, res) => {
    const { nome, email, matricula } = req.body;
    try {
        const aluno = await prisma.aluno.create({
            data: {
                nome,
                email,
                matricula,
            },
        });
        res.status(201).json(aluno);
    } catch (error) {
        res.status(500).json({  error: 'Erro ao criar aluno'});
    }
});

app.get('/alunos' , async (req, res) => {
    try {
        const alunos = await prisma.aluno.findMany();
        res.status(200).json(alunos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter alunos'});
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});