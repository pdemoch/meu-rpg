# Aula 15 — Salvando o Progresso (localStorage)

**Curso:** JavaScript na Prática — Construindo um Jogo de RPG
**Duração:** 60 minutos
**Aula:** 15 de 16

---

## 1. Objetivos da aula

Ao final da aula, o aluno será capaz de:

- Guardar dados no navegador com **`localStorage`**.
- Converter objetos em texto com **`JSON.stringify`** e de volta com **`JSON.parse`**.
- Entender por que os **métodos se perdem** ao salvar, e como **reconstruir** o herói.
- Criar as opções **"Novo Jogo"** e **"Continuar"**.

**Entregável da aula:** o progresso do herói **sobrevive** ao fechar a aba — o jogador pode continuar de onde parou.

---

## 2. Onde estamos

O jogo está jogável (Aula 14), mas efêmero: recarregou, perdeu tudo. Hoje aprendemos a **salvar** no próprio navegador. Isso traz um conceito importante: só conseguimos guardar **dados** (números, textos, listas), não **comportamento** (os métodos). Vamos ver como lidar com isso.

---

## 3. Preparação (início da aula)

Abrir o `meu-rpg`, **sincronizar** e trabalhar no `game.js` (F12).

---

## 4. Roteiro minuto a minuto

### ⏱️ 0–5 min — Recap e o objetivo
Mostre que recarregar a página zera o jogo. Frase: "hoje o jogo passa a ter memória."

### ⏱️ 5–8 min — Abrir e sincronizar

### ⏱️ 8–18 min — localStorage e JSON
O `localStorage` guarda **texto** por chave. Como o herói é um objeto, primeiro o convertemos em texto com `JSON.stringify`:

```js
localStorage.setItem("teste", "olá");
console.log(localStorage.getItem("teste"));   // olá

const dados = { nome: "Aragorn", nivel: 3 };
const texto = JSON.stringify(dados);
console.log(texto);                 // {"nome":"Aragorn","nivel":3}
const devolta = JSON.parse(texto);  // vira objeto de novo
console.log(devolta.nome);          // Aragorn
```

### ⏱️ 18–30 min — Salvar o jogo
```js
function salvarJogo(heroi, andarAtual) {
  const estado = {
    heroi: heroi,
    andarAtual: andarAtual
  };
  localStorage.setItem("masmorra-save", JSON.stringify(estado));
  escreverLog("Progresso salvo.");
}
```

Chame `salvarJogo(heroi, andarAtual)` ao vencer cada andar (na função do botão "Próximo Andar"). Cada andar vira um ponto de save **dentro do jogo** — a mesma ideia dos commits, agora para o jogador.

### ⏱️ 30–45 min — Carregar e o problema dos métodos
Aqui está a lição importante. `JSON.stringify` guarda só os **dados** — os métodos (`atacar`, `curar`, `ganharXp`) somem. Ao carregar, precisamos **reconstruir** o herói: criar um herói novo (que tem os métodos) e copiar os dados salvos para dentro dele.

```js
function reconstruirHeroi(dados) {
  const heroi = criarHeroi(dados.nome, dados.classe);
  heroi.vida = dados.vida;
  heroi.vidaMaxima = dados.vidaMaxima;
  heroi.ataque = dados.ataque;
  heroi.defesa = dados.defesa;
  heroi.nivel = dados.nivel;
  heroi.xp = dados.xp;
  heroi.ouro = dados.ouro;
  heroi.inventario = dados.inventario;
  return heroi;
}

function carregarJogo() {
  const texto = localStorage.getItem("masmorra-save");
  if (texto === null) {
    return null;   // não há save
  }
  const estado = JSON.parse(texto);
  return {
    heroi: reconstruirHeroi(estado.heroi),
    andarAtual: estado.andarAtual
  };
}
```

Explique com calma: **dados** a gente salva; **comportamento** a gente reconstrói. É por isso que a fábrica `criarHeroi` continua sendo útil.

### ⏱️ 45–52 min — Novo Jogo / Continuar
Ao iniciar, decidir com base na existência de um save:

```js
const salvo = carregarJogo();
let andarAtual;
if (salvo === null) {
  heroi = criarHeroi("Aragorn", "Guerreiro");
  andarAtual = 0;
  escreverLog("Novo jogo iniciado!");
} else {
  heroi = salvo.heroi;
  andarAtual = salvo.andarAtual;
  escreverLog("Bem-vindo de volta!");
}
renderFicha(heroi);
```

(Opcional: ligar isso a dois botões "Novo Jogo" e "Continuar" no HTML.)

### ⏱️ 52–58 min — Ponto de save
Commit + push. Mensagem: `Aula 15: salvar e carregar com localStorage`.

### ⏱️ 58–60 min — Fechamento
Recapitule: `localStorage`, `JSON.stringify`/`parse`, dados vs comportamento, reconstrução. Gancho da Aula 16: *"Falta o grande final. Na última aula: o **chefe da masmorra**, os retoques finais e a apresentação do seu jogo."*

---

## 5. Código final da aula (adicionado ao game.js)

```js
function salvarJogo(heroi, andarAtual) {
  const estado = { heroi: heroi, andarAtual: andarAtual };
  localStorage.setItem("masmorra-save", JSON.stringify(estado));
}

function reconstruirHeroi(dados) {
  const heroi = criarHeroi(dados.nome, dados.classe);
  heroi.vida = dados.vida;
  heroi.vidaMaxima = dados.vidaMaxima;
  heroi.ataque = dados.ataque;
  heroi.defesa = dados.defesa;
  heroi.nivel = dados.nivel;
  heroi.xp = dados.xp;
  heroi.ouro = dados.ouro;
  heroi.inventario = dados.inventario;
  return heroi;
}

function carregarJogo() {
  const texto = localStorage.getItem("masmorra-save");
  if (texto === null) {
    return null;
  }
  const estado = JSON.parse(texto);
  return { heroi: reconstruirHeroi(estado.heroi), andarAtual: estado.andarAtual };
}
```

---

## 6. Dever de casa — solução de referência

```js
// apagar o save (útil para um botão "Novo Jogo"):
function apagarSave() {
  localStorage.removeItem("masmorra-save");
  escreverLog("Save apagado. Comece um novo jogo.");
}
```

---

## 7. Erros comuns (fique de olho)

- **Salvar sem `JSON.stringify`:** o `localStorage` guarda texto; um objeto direto vira `"[object Object]"` (inútil).
- **Carregar sem `JSON.parse`:** você recebe texto, não um objeto — `dados.nome` dá `undefined`.
- **Esperar que os métodos voltem:** eles não voltam pelo `JSON.parse`. Por isso a `reconstruirHeroi`.
- **Não tratar o `null`:** ao carregar pela primeira vez (sem save), `getItem` devolve `null`. Sempre teste.

---

## 8. Dever de casa

1. Fazer o jogo **salvar** ao vencer um andar e **carregar** ao abrir a página.
2. Provar que, após recarregar, o herói continua com o nível, ouro e itens de antes.
3. **Ponto de save:** commit `Aula 15: dever de casa - continuar jogo` e push.

*Extra (opcional):* um botão "Novo Jogo" que apaga o save e recomeça.

---

## 9. Prévia da Aula 16

O **grande final**: enfrentar o **chefe da masmorra** (um inimigo bem mais forte), dar os retoques finais no visual e no equilíbrio, e **apresentar** o jogo que cada aluno construiu ao longo das 16 aulas.