const express = require('express'); // O Criador do Servidor
const cors = require('cors');       // O Porteiro (Deixa o navegador falar com o Node)
const { lerCSV, salvarCSV } = require('./manipuladorCsv');

const app = express();

// Configurações básicas de segurança e tradução de JSON
app.use(cors()); 
app.use(express.json()); 

// 1. ROTA GET (LER): O frontend pediu para ver o cardápio
app.get('/api/:tabela', (req, res) => {
    const dados = lerCSV(req.params.tabela); // Pede pro estoquista ler
    res.json(dados); // Entrega a bandeja pronta pro frontend
});

// 2. ROTA POST (CRIAR): O frontend mandou um pedido novo
app.post('/api/:tabela', (req, res) => {
    const nomeDaTabela = req.params.tabela;
    const dadosNovos = req.body; // O corpo do pedido (os dados do formulário)
    
    const lista = lerCSV(nomeDaTabela);
    
    // Calcula o próximo ID: Pega o ID do último da fila e soma 1. Se fila vazia, é 1.
    const novoId = lista.length > 0 ? parseInt(lista[lista.length - 1].id) + 1 : 1;
    const itemCriado = { id: novoId, ...dadosNovos }; // Junta o ID com os dados
    
    lista.push(itemCriado); // Coloca na fila
    salvarCSV(nomeDaTabela, lista); // Manda o estoquista gravar no disco
    
    res.json({ mensagem: "Criado com sucesso!" });
});

// 3. ROTA PUT (ATUALIZAR): O frontend quer alterar um pedido existente
app.put('/api/:tabela/:id', (req, res) => {
    const nomeDaTabela = req.params.tabela;
    const idAlvo = String(req.params.id); 
    const dadosAtualizados = req.body;
    
    const lista = lerCSV(nomeDaTabela);
    
    // Procura em qual posição da fila o nosso item está escondido
    const index = lista.findIndex(item => String(item.id) === idAlvo);
    
    if (index !== -1) {
        // Object.assign: Joga os dados novos por cima dos velhos, sem apagar o ID
        Object.assign(lista[index], dadosAtualizados);
        salvarCSV(nomeDaTabela, lista);
        res.json({ mensagem: "Atualizado com sucesso!" });
    } else {
        res.status(404).json({ erro: "ID não encontrado." });
    }
});

// 4. ROTA DELETE (APAGAR): O frontend quer cancelar o pedido
app.delete('/api/:tabela/:id', (req, res) => {
    const nomeDaTabela = req.params.tabela;
    const idAlvo = String(req.params.id); 
    
    let lista = lerCSV(nomeDaTabela);
    
    // A nova lista será todo mundo que NÃO tem o ID que pedimos para apagar
    lista = lista.filter(item => String(item.id) !== idAlvo);
    
    salvarCSV(nomeDaTabela, lista);
    res.json({ mensagem: "Deletado com sucesso!" });
});

// Liga o Gerente para trabalhar na porta 3000
app.listen(3000, () => {
    console.log("🚀 Servidor online e escutando na porta http://localhost:3000");
});