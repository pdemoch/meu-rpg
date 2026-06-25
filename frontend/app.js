// Onde fica o nosso Gerente?
const SERVIDOR = 'http://localhost:3000/api';

// Variáveis para o sistema lembrar onde o usuário está clicando
let nomeTabelaAtual = '';
let idQueEstaSendoEditado = null; 

// O "Mapa" de perguntas. O sistema olha pra cá para saber o que perguntar no formulário.
const mapaDeCampos = {
    usuarios: ["username", "email"],
    personagens: ["nome", "raca", "classe"],
    magias: ["nome", "tipo", "dano", "custoMana"],
    criaturas: ["nome", "hpMax", "xpFornecida"]
};

// ==========================================
// 1. ABRIR PAINEL E DESENHAR TABELA (READ)
// ==========================================
async function abrirPainel(tabelaEscolhida) {
    nomeTabelaAtual = tabelaEscolhida;
    resetarTela();
    
    document.getElementById('tituloCategoria').innerText = `Tabela Ativa: ${tabelaEscolhida.toUpperCase()}`;
    document.getElementById('painelCrud').style.display = 'block';
    
    construirInputsDoFormulario();

    // GARÇOM! Traga os dados dessa tabela lá do servidor.
    const resposta = await fetch(`${SERVIDOR}/${nomeTabelaAtual}`);
    const dadosRecebidos = await resposta.json();

    desenharTabelaNoHTML(dadosRecebidos);
}

// Constrói o HTML da tabela usando os dados que vieram do servidor
function desenharTabelaNoHTML(dados) {
    const thead = document.getElementById('cabecalhoDaTabela');
    const tbody = document.getElementById('corpoDaTabela');
    thead.innerHTML = '';
    tbody.innerHTML = '';

    // Se o CSV está vazio ou não existe...
    if (dados.length === 0) {
        tbody.innerHTML = '<tr><td style="text-align: center;">Vazio. Crie o primeiro item!</td></tr>';
        return;
    }

    // CABEÇALHOS: Pega os nomes das propriedades (id, nome, raca) e transforma em colunas
    const colunas = Object.keys(dados[0]);
    let ths = '<tr>';
    colunas.forEach(col => ths += `<th>${col.toUpperCase()}</th>`);
    ths += `<th>AÇÕES</th></tr>`;
    thead.innerHTML = ths;

    // LINHAS: Desenha os dados e pendura os botões de Editar e Apagar passando o ID
    dados.forEach(item => {
        let tr = '<tr>';
        colunas.forEach(col => tr += `<td>${item[col]}</td>`);
        
        tr += `<td>
            <button onclick="clicouEmEditar('${item.id}')" style="background:#3498db; color:white;">✏️</button>
            <button onclick="clicouEmApagar('${item.id}')" style="background:#e74c3c; color:white;">🗑️</button>
        </td>`;
        tr += '</tr>';
        tbody.innerHTML += tr;
    });
}

// ==========================================
// 2. LÓGICA DO FORMULÁRIO (CREATE & UPDATE)
// ==========================================

// Cria as caixinhas de texto corretas dependendo do mapaDeCampos
function construirInputsDoFormulario() {
    const container = document.getElementById('caixasDeTexto');
    container.innerHTML = ''; 
    
    const camposParaCriar = mapaDeCampos[nomeTabelaAtual];
    
    camposParaCriar.forEach(campo => {
        container.innerHTML += `
            <div class="campo">
                <label>${campo}: </label>
                <input type="text" id="input_${campo}" required>
            </div>
        `;
    });
}

// O que acontece quando o botão SALVAR é clicado?
document.getElementById('formularioDeDados').addEventListener('submit', async function(evento) {
    evento.preventDefault(); // Impede a página de piscar/recarregar
    
    // Captura o que o usuário digitou e monta um pacote (Objeto)
    const pacoteDeDados = {};
    const campos = mapaDeCampos[nomeTabelaAtual];
    campos.forEach(campo => {
        pacoteDeDados[campo] = document.getElementById(`input_${campo}`).value;
    });

    if (idQueEstaSendoEditado === null) {
        // MODO CRIAR (POST)
        await fetch(`${SERVIDOR}/${nomeTabelaAtual}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pacoteDeDados) // Transforma o pacote em texto para viajar pela rede
        });
    } else {
        // MODO EDITAR (PUT)
        await fetch(`${SERVIDOR}/${nomeTabelaAtual}/${idQueEstaSendoEditado}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pacoteDeDados)
        });
    }

    resetarTela();
    abrirPainel(nomeTabelaAtual); // Atualiza a tabela pra mostrar o resultado
});

// Pega os dados da linha clicada e joga de volta pra dentro do formulário
async function clicouEmEditar(id) {
    idQueEstaSendoEditado = id;
    document.getElementById('tituloAcao').innerText = `✏️ Editando ID: ${id}`;
    document.getElementById('btnCancelarEdicao').style.display = 'inline-block';
    
    // Busca a lista para pegar os dados antigos do cara
    const resposta = await fetch(`${SERVIDOR}/${nomeTabelaAtual}`);
    const dados = await resposta.json();
    const itemEncontrado = dados.find(i => String(i.id) === String(id));

    // Preenche as caixinhas
    const campos = mapaDeCampos[nomeTabelaAtual];
    campos.forEach(campo => {
        document.getElementById(`input_${campo}`).value = itemEncontrado[campo];
    });
}

// Limpa variáveis e esvazia caixas de texto
function resetarTela() {
    idQueEstaSendoEditado = null;
    document.getElementById('formularioDeDados').reset();
    document.getElementById('tituloAcao').innerText = "Cadastrar Novo";
    document.getElementById('btnCancelarEdicao').style.display = 'none';
}

// ==========================================
// 3. APAGAR DADOS (DELETE)
// ==========================================
async function clicouEmApagar(id) {
    // Janela de segurança do navegador
    if(confirm(`Atenção: O ID ${id} será apagado permanentemente. Continuar?`)) {
        // Envia o pedido DELETE passando o ID na URL
        await fetch(`${SERVIDOR}/${nomeTabelaAtual}/${id}`, { method: 'DELETE' });
        
        // Se eu apagar o cara que eu estava editando sem querer, limpa a tela de edição.
        if (idQueEstaSendoEditado === String(id)) resetarTela();
        
        abrirPainel(nomeTabelaAtual); // Recarrega a tabela
    }
}