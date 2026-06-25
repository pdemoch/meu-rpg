// fs (File System) é o módulo nativo do Node para mexer no disco rígido.
const fs = require('fs');
// path ajuda a montar caminhos de pastas (evita erros entre Windows e Mac).
const path = require('path');

// Caminho absoluto para a pasta onde os dados ficarão salvos.
const pastaBanco = path.join(__dirname, '..', 'banco_de_dados');

// FUNÇÃO DE SEGURANÇA: Garante que a pasta 'banco_de_dados' exista. 
// Se não existir, o Node cria ela na hora.
if (!fs.existsSync(pastaBanco)) {
    fs.mkdirSync(pastaBanco);
}

function pegarCaminho(tabela) {
    // Monta o endereço final. Exemplo: /meu-rpg-web/banco_de_dados/personagens.csv
    return path.join(pastaBanco, `${tabela}.csv`);
}

// ==========================================
// MÁQUINA DE LER ARQUIVO (READ)
// ==========================================
function lerCSV(tabela) {
    const caminho = pegarCaminho(tabela);
    
    // Se o arquivo não existir ou estiver vazio, devolvemos uma lista vazia sem dar erro.
    if (!fs.existsSync(caminho)) return [];

    const textoCru = fs.readFileSync(caminho, 'utf-8').trim();
    if (!textoCru) return [];

    // Corta o textão toda vez que o usuário pulou uma linha ('\n')
    const linhas = textoCru.split('\n');
    
    // A primeira linha SEMPRE será os nomes das colunas (Ex: id,nome,classe)
    const cabecalhos = linhas[0].split(',');

    // Pega o resto das linhas e transforma de volta em objetos JavaScript
    const dados = linhas.slice(1).map(linha => {
        const valores = linha.split(',');
        const objeto = {};
        
        // Relaciona a coluna com o valor. Ex: objeto["nome"] = "Galdor"
        cabecalhos.forEach((cabecalho, index) => {
            objeto[cabecalho] = valores[index];
        });
        
        return objeto;
    });

    return dados;
}

// ==========================================
// MÁQUINA DE ESCREVER ARQUIVO (WRITE)
// ==========================================
function salvarCSV(tabela, dados) {
    const caminho = pegarCaminho(tabela);
    
    // Se mandarem salvar uma lista vazia, apenas zera o arquivo.
    if (dados.length === 0) {
        fs.writeFileSync(caminho, '', 'utf-8'); 
        return;
    }

    // MÁGICA DOS CABEÇALHOS: Pega os nomes das propriedades do primeiro objeto
    // e junta com vírgulas. Assim o CSV "adivinha" as colunas sozinho!
    const cabecalhos = Object.keys(dados[0]).join(',');
    
    // Transforma cada objeto de volta em uma linha de texto com vírgulas
    const linhasTexto = dados.map(item => Object.values(item).join(','));

    // Junta o cabeçalho no topo, e as linhas embaixo, separando por quebra de linha ('\n')
    const conteudoFinal = [cabecalhos, ...linhasTexto].join('\n');
    
    // Escreve o texto final no disco rígido do computador.
    fs.writeFileSync(caminho, conteudoFinal, 'utf-8');
}

// Exporta as máquinas para o Gerente (server.js) poder usá-las.
module.exports = { lerCSV, salvarCSV };