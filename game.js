// =====================================================
//  A MASMORRA - jogo completo (aulas 1 a 16)
// =====================================================

// ===== PERSONAGENS =====
function criarHeroi(nome, classe) {
  return {
    nome: nome,
    classe: classe,
    vida: 100,
    vidaMaxima: 100,
    ataque: 15,
    defesa: 8,
    nivel: 1,
    xp: 0,
    ouro: 0,
    inventario: [],
    estaVivo() {
      return this.vida > 0;
    },
    curar(quantidade) {
      this.vida += quantidade;
      if (this.vida > this.vidaMaxima) {
        this.vida = this.vidaMaxima;
      }
      escreverLog(`${this.nome} recuperou vida: ${this.vida}/${this.vidaMaxima}`);
    },
    ganharXp(quantidade) {
      this.xp += quantidade;
      escreverLog(`${this.nome} ganhou ${quantidade} XP.`);
      while (this.xp >= this.nivel * 100) {
        this.subirDeNivel();
      }
    },
    subirDeNivel() {
      this.xp -= this.nivel * 100;
      this.nivel += 1;
      this.vidaMaxima += 20;
      this.ataque += 5;
      this.defesa += 2;
      this.vida = this.vidaMaxima;
      escreverLog(`⭐ ${this.nome} subiu para o nível ${this.nivel}!`);
    }
  };
}

function criarInimigo(nome, vida, ataque, defesa) {
  return {
    nome: nome,
    classe: "Monstro",
    vida: vida,
    vidaMaxima: vida,
    ataque: ataque,
    defesa: defesa,
    nivel: 1,
    xpRecompensa: 20,
    ouroRecompensa: 15,
    estaVivo() {
      return this.vida > 0;
    }
  };
}

function criarChefe() {
  const chefe = criarInimigo("☠ Senhor da Masmorra", 150, 20, 10);
  chefe.xpRecompensa = 200;
  chefe.ouroRecompensa = 300;
  return chefe;
}

// ===== COMBATE =====
function atacar(atacante, alvo) {
  let dano = atacante.ataque - alvo.defesa;
  if (dano < 1) {
    dano = 1;
  }
  alvo.vida -= dano;
  if (alvo.vida < 0) {
    alvo.vida = 0;
  }
  escreverLog(`${atacante.nome} causou ${dano} de dano em ${alvo.nome}.`);
}

// ===== LOJA =====
const loja = [
  { nome: "Poção de Vida",     tipo: "consumivel", preco: 30, efeito: 50 },
  { nome: "Espada Afiada",     tipo: "arma",       preco: 80, efeito: 10 },
  { nome: "Armadura de Couro", tipo: "armadura",   preco: 70, efeito: 5 }
];

function comprar(heroi, item) {
  if (heroi.ouro < item.preco) {
    escreverLog(`Ouro insuficiente para ${item.nome}.`);
    return;
  }
  heroi.ouro -= item.preco;
  if (item.tipo === "arma") {
    heroi.ataque += item.efeito;
  } else if (item.tipo === "armadura") {
    heroi.defesa += item.efeito;
  } else {
    heroi.inventario.push(item);
  }
  escreverLog(`${heroi.nome} comprou ${item.nome}. Ouro restante: ${heroi.ouro}`);
  renderTudo();
}

function usarPocao(heroi) {
  for (let i = 0; i < heroi.inventario.length; i++) {
    if (heroi.inventario[i].tipo === "consumivel") {
      heroi.curar(heroi.inventario[i].efeito);
      heroi.inventario.splice(i, 1);
      renderTudo();
      return;
    }
  }
  escreverLog("Você não tem poções!");
}

// ===== ESTADO DO JOGO =====
let heroi;
let andarAtual = 0;
let inimigoAtual = null;

const masmorra = [
  criarInimigo("Rato Gigante", 20, 6, 1),
  criarInimigo("Goblin", 40, 10, 3),
  criarInimigo("Esqueleto", 35, 12, 2),
  criarInimigo("Orc", 60, 14, 6),
  criarChefe()
];

// ===== INTERFACE (DOM) =====
function escreverLog(mensagem) {
  const caixa = document.getElementById("log");
  caixa.innerHTML += `<p>${mensagem}</p>`;
  caixa.scrollTop = caixa.scrollHeight;
}

function barraDeVida(atual, maximo) {
  let pct = (atual / maximo) * 100;
  if (pct < 0) {
    pct = 0;
  }
  return `<div class="barra"><div class="barra-cheia" style="width:${pct}%"></div></div>`;
}

function renderFicha() {
  const caixa = document.getElementById("ficha");
  caixa.innerHTML = `
    <h2>${heroi.nome} — ${heroi.classe} (Nv.${heroi.nivel})</h2>
    ${barraDeVida(heroi.vida, heroi.vidaMaxima)}
    <p>Vida: ${heroi.vida}/${heroi.vidaMaxima}</p>
    <p>⚔️ ${heroi.ataque} &nbsp; 🛡️ ${heroi.defesa}</p>
    <p>💰 ${heroi.ouro} &nbsp; ✨ ${heroi.xp} XP (próximo nível: ${heroi.nivel * 100}) &nbsp; 🎒 ${heroi.inventario.length}</p>
  `;
}

function renderInimigo() {
  const caixa = document.getElementById("inimigo");
  if (inimigoAtual === null || !inimigoAtual.estaVivo()) {
    caixa.innerHTML = `<p class="vazio">Nenhum inimigo à vista. Desça para o próximo andar.</p>`;
    return;
  }
  caixa.innerHTML = `
    <h3>${inimigoAtual.nome}</h3>
    ${barraDeVida(inimigoAtual.vida, inimigoAtual.vidaMaxima)}
    <p>Vida: ${inimigoAtual.vida}/${inimigoAtual.vidaMaxima}</p>
  `;
}

function renderLoja() {
  const caixa = document.getElementById("loja");
  let html = "<h3>Loja</h3>";
  for (let i = 0; i < loja.length; i++) {
    html += `<button class="item" onclick="comprar(heroi, loja[${i}])">${loja[i].nome} — ${loja[i].preco}💰</button>`;
  }
  caixa.innerHTML = html;
}

function renderTudo() {
  renderFicha();
  renderInimigo();
  renderLoja();
}

function habilitarBotoes(ativo) {
  document.getElementById("btnAtacar").disabled = !ativo;
  document.getElementById("btnPocao").disabled = !ativo;
  document.getElementById("btnDescer").disabled = !ativo;
}

// ===== AÇÕES DO JOGO =====
function descer() {
  if (inimigoAtual !== null && inimigoAtual.estaVivo()) {
    escreverLog("Termine a batalha atual antes de descer!");
    return;
  }
  if (andarAtual >= masmorra.length) {
    escreverLog("🏆 Você já conquistou toda a masmorra!");
    return;
  }
  inimigoAtual = masmorra[andarAtual];
  andarAtual += 1;
  escreverLog(`===== Andar ${andarAtual}: surge ${inimigoAtual.nome}! =====`);
  renderTudo();
}

function atacarTurno() {
  if (!heroi.estaVivo()) {
    escreverLog("Seu herói está derrotado. Comece um novo jogo.");
    return;
  }
  if (inimigoAtual === null || !inimigoAtual.estaVivo()) {
    escreverLog("Não há inimigo. Desça para o próximo andar.");
    return;
  }

  atacar(heroi, inimigoAtual);

  if (!inimigoAtual.estaVivo()) {
    escreverLog(`✔ ${inimigoAtual.nome} foi derrotado!`);
    heroi.ganharXp(inimigoAtual.xpRecompensa);
    heroi.ouro += inimigoAtual.ouroRecompensa;
    escreverLog(`+${inimigoAtual.ouroRecompensa} ouro.`);
    salvarJogo();
    renderTudo();
    if (andarAtual >= masmorra.length) {
      escreverLog("🏆 VITÓRIA! Você derrotou o Senhor da Masmorra e conquistou tudo!");
      habilitarBotoes(false);
    }
    return;
  }

  atacar(inimigoAtual, heroi);
  renderTudo();

  if (!heroi.estaVivo()) {
    escreverLog("💀 GAME OVER — a masmorra venceu desta vez.");
    habilitarBotoes(false);
  }
}

// ===== SAVE / LOAD =====
function salvarJogo() {
  const estado = { heroi: heroi, andarAtual: andarAtual };
  localStorage.setItem("masmorra-save", JSON.stringify(estado));
}

function reconstruirHeroi(dados) {
  const h = criarHeroi(dados.nome, dados.classe);
  h.vida = dados.vida;
  h.vidaMaxima = dados.vidaMaxima;
  h.ataque = dados.ataque;
  h.defesa = dados.defesa;
  h.nivel = dados.nivel;
  h.xp = dados.xp;
  h.ouro = dados.ouro;
  h.inventario = dados.inventario;
  return h;
}

function carregarJogo() {
  const texto = localStorage.getItem("masmorra-save");
  if (texto === null) {
    return null;
  }
  const estado = JSON.parse(texto);
  return { heroi: reconstruirHeroi(estado.heroi), andarAtual: estado.andarAtual };
}

function novoJogo() {
  localStorage.removeItem("masmorra-save");
  let nome = prompt("Nome do seu herói:", "Aragorn");
  if (!nome) {
    nome = "Aragorn";
  }
  heroi = criarHeroi(nome, "Guerreiro");
  andarAtual = 0;
  inimigoAtual = null;
  habilitarBotoes(true);
  document.getElementById("log").innerHTML = "";
  escreverLog(`Bem-vindo, ${heroi.nome}! Desça para o primeiro andar.`);
  renderTudo();
}

// ===== INICIALIZAÇÃO =====
function iniciar() {
  const salvo = carregarJogo();
  if (salvo === null) {
    heroi = criarHeroi("Aragorn", "Guerreiro");
    andarAtual = 0;
    escreverLog("Bem-vindo à Masmorra! Desça para o primeiro andar. (Use 'Novo Jogo' para escolher seu nome.)");
  } else {
    heroi = salvo.heroi;
    andarAtual = salvo.andarAtual;
    escreverLog("Bem-vindo de volta! Seu progresso foi carregado.");
  }
  renderTudo();
}

document.getElementById("btnAtacar").addEventListener("click", atacarTurno);
document.getElementById("btnPocao").addEventListener("click", function () {
  usarPocao(heroi);
});
document.getElementById("btnDescer").addEventListener("click", descer);
document.getElementById("btnNovo").addEventListener("click", novoJogo);

iniciar();