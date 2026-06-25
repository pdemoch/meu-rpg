// ==========================================
// main.js - O Ponto de Entrada Único
// ==========================================
const express = require('express');
const cors = require('cors');
const path = require('path');

// Importamos o nosso estoquista (certifique-se de que o caminho aponta para a pasta backend)
const { lerCSV, salvarCSV } = require('./backend/manipuladorCsv');

const app = express();
app.use(cors()); 
app.use(express.json()); 

// ==========================================
// A MÁGICA ACONTECE AQUI:
// Mandamos o Node.js "hospedar" a pasta frontend inteira!
// ==========================================
const pastaFrontend = path.join(__dirname, 'frontend');
app.use(express.static(pastaFrontend));

// ==========================================
// ROTAS DA API (As mesmas de antes)
// ==========================================
app.get('/api/:tabela', (req, res) => {
    res.json(lerCSV(req.params.tabela));
});

app.post('/api/:tabela', (req, res) => {
    const nomeDaTabela = req.params.tabela;
    const dadosNovos = req.body; 
    const lista = lerCSV(nomeDaTabela);
    const novoId = lista.length > 0 ? parseInt(lista[lista.length - 1].id) + 1 : 1;
    
    const itemCriado = { id: novoId, ...dadosNovos };
    lista.push(itemCriado);
    salvarCSV(nomeDaTabela, lista);
    
    res.json({ mensagem: "Criado com sucesso!" });
});

app.put('/api/:tabela/:id', (req, res) => {
    const nomeDaTabela = req.params.tabela;
    const idAlvo = String(req.params.id); 
    const lista = lerCSV(nomeDaTabela);
    const index = lista.findIndex(item => String(item.id) === idAlvo);
    
    if (index !== -1) {
        Object.assign(lista[index], req.body);
        salvarCSV(nomeDaTabela, lista);
        res.json({ mensagem: "Atualizado com sucesso!" });
    } else {
        res.status(404).json({ erro: "ID não encontrado." });
    }
});

app.delete('/api/:tabela/:id', (req, res) => {
    const nomeDaTabela = req.params.tabela;
    const idAlvo = String(req.params.id); 
    let lista = lerCSV(nomeDaTabela);
    
    lista = lista.filter(item => String(item.id) !== idAlvo);
    salvarCSV(nomeDaTabela, lista);
    res.json({ mensagem: "Deletado com sucesso!" });
});

// ==========================================
// LIGANDO O SISTEMA GERAL
// ==========================================
app.listen(3000, () => {
    console.log("=======================================");
    console.log("🚀 SISTEMA RPG ONLINE!");
    console.log("👉 Clique aqui para abrir: http://localhost:3000");
    console.log("=======================================");
});