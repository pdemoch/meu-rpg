# Aula 13 — Saindo do Console (DOM)

**Curso:** JavaScript na Prática — Construindo um Jogo de RPG
**Duração:** 60 minutos
**Aula:** 13 de 16

---

## 1. Objetivos da aula

Ao final da aula, o aluno será capaz de:

- Entender o que é o **DOM** (a página vista como objetos que o JS controla).
- Selecionar elementos com **`document.getElementById`**.
- Alterar o conteúdo da página com **`innerHTML`** / **`textContent`**.
- Mostrar a **ficha do herói** e um **log** de mensagens na tela.

**Entregável da aula:** o jogo deixa de falar só no console (F12) e passa a **exibir a ficha e as mensagens na própria página**.

---

## 2. Onde estamos

O jogo está completo, mas escondido no console. Ninguém joga apertando F12. Hoje aprendemos a **escrever na página**: o HTML tem "caixas" (elementos com `id`), e o JavaScript coloca conteúdo dentro delas. É a ponte entre a lógica que já temos e uma interface de verdade.

---

## 3. Preparação (início da aula)

Abrir o `meu-rpg`, **sincronizar** e trabalhar no `game.js` e agora também no `index.html` (F12 continua útil para ver erros).

---

## 4. Roteiro minuto a minuto

### ⏱️ 0–5 min — Recap e a ideia de DOM
Explique: a página é uma árvore de elementos, e o JavaScript pode ler e mudar cada um. Frase: "vamos parar de falar no console e escrever na tela."

### ⏱️ 5–8 min — Abrir e sincronizar

### ⏱️ 8–18 min — Preparar o HTML com "caixas"
Atualize o `index.html` para ter lugares onde o JS vai escrever:

```html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <title>A Masmorra</title>
  </head>
  <body>
    <h1>A Masmorra</h1>
    <div id="ficha"></div>
    <div id="inimigo"></div>
    <div id="log"></div>
    <script src="game.js"></script>
  </body>
</html>
```

Explique o **`id`**: é o "nome" pelo qual o JavaScript encontra cada caixa.

### ⏱️ 18–32 min — Escrevendo na página
Selecionar um elemento e mudar seu conteúdo:

```js
function renderFicha(heroi) {
  const caixa = document.getElementById("ficha");
  caixa.innerHTML = `
    <h2>${heroi.nome} — Nível ${heroi.nivel}</h2>
    <p>Vida: ${heroi.vida}/${heroi.vidaMaxima}</p>
    <p>Ataque: ${heroi.ataque} | Defesa: ${heroi.defesa}</p>
    <p>Ouro: ${heroi.ouro} | XP: ${heroi.xp}</p>
  `;
}

renderFicha(heroi);
```

Explique: `getElementById("ficha")` acha a caixa; `innerHTML` **substitui** o conteúdo dela pelo HTML que montamos com template literal.

Faça o mesmo para o inimigo, tratando o caso de não haver nenhum:

```js
function renderInimigo(inimigo) {
  const caixa = document.getElementById("inimigo");
  if (inimigo === undefined || !inimigo.estaVivo()) {
    caixa.innerHTML = "<p>Nenhum inimigo à vista.</p>";
    return;
  }
  caixa.innerHTML = `
    <h3>${inimigo.nome}</h3>
    <p>Vida: ${inimigo.vida}/${inimigo.vidaMaxima}</p>
  `;
}
```

Para não esquecer de atualizar as duas caixas juntas, crie um ajudante que chama tudo:

```js
function renderTudo(heroi, inimigo) {
  renderFicha(heroi);
  renderInimigo(inimigo);
}
```

> A partir de agora, sempre que algo mudar (vida, ouro, nível), chamamos `renderTudo(...)` em vez de atualizar cada caixa na mão.

### ⏱️ 32–45 min — O log de mensagens na tela
Em vez de `console.log`, vamos **acrescentar** mensagens numa caixa. Note o `+=` (não apagar o que já tem):

```js
function escreverLog(mensagem) {
  const caixa = document.getElementById("log");
  caixa.innerHTML += `<p>${mensagem}</p>`;
}

function limparLog() {
  document.getElementById("log").innerHTML = "";
}
```

Agora dá para trocar os `console.log` do combate por `escreverLog(...)`. Faça isso na função `atacar` como exemplo, e mostre a batalha aparecendo na página.

> **Dica:** mantenha a lógica (batalha, XP, loja) intacta; só troque a **saída** de `console.log` para `escreverLog`. Separar "regras do jogo" de "como mostrar" é uma boa prática.

### ⏱️ 45–52 min — Prática guiada
Cada aluno cria uma caixa nova no HTML (ex.: `<div id="inventario">`) e uma função `renderInventario(heroi)` que lista os itens com um `for`.

### ⏱️ 52–58 min — Ponto de save
Commit + push. Mensagem: `Aula 13: DOM - ficha e log na tela`.

### ⏱️ 58–60 min — Fechamento
Recapitule: DOM, `getElementById`, `innerHTML`, `+=` no log. Gancho da Aula 14: *"A tela mostra as coisas, mas ainda rodamos tudo no código. Na próxima aula, **botões**: o jogador clica em Atacar, e o jogo responde."*

---

## 5. Código final da aula

`index.html` com as caixas `ficha` e `log` (bloco acima). No `game.js`:

```js
function renderFicha(heroi) {
  const caixa = document.getElementById("ficha");
  caixa.innerHTML = `
    <h2>${heroi.nome} — Nível ${heroi.nivel}</h2>
    <p>Vida: ${heroi.vida}/${heroi.vidaMaxima}</p>
    <p>Ataque: ${heroi.ataque} | Defesa: ${heroi.defesa}</p>
    <p>Ouro: ${heroi.ouro} | XP: ${heroi.xp}</p>
  `;
}

function escreverLog(mensagem) {
  document.getElementById("log").innerHTML += `<p>${mensagem}</p>`;
}

function limparLog() {
  document.getElementById("log").innerHTML = "";
}

renderFicha(heroi);
escreverLog("Você entra na masmorra...");
```

---

## 6. Dever de casa — solução de referência

```html
<div id="inventario"></div>
```

```js
function renderInventario(heroi) {
  let html = "<h3>Inventário</h3>";
  for (let i = 0; i < heroi.inventario.length; i++) {
    html += `<p>- ${heroi.inventario[i].nome}</p>`;
  }
  document.getElementById("inventario").innerHTML = html;
}

renderInventario(heroi);
```

---

## 7. Erros comuns (fique de olho)

- **`id` que não existe:** `getElementById("Ficha")` (maiúscula) não acha `id="ficha"`. Diferencia maiúsculas.
- **Script antes do HTML:** se o `<script>` rodar antes das caixas existirem, `getElementById` devolve `null`. Mantê-lo no fim do `<body>` (como no nosso HTML) resolve.
- **`=` no lugar de `+=` no log:** com `=`, cada mensagem apaga a anterior.
- **Esquecer de chamar `renderFicha` de novo** depois de mudar a vida — a tela não atualiza sozinha.

---

## 8. Dever de casa

1. Criar uma caixa de **inventário** no HTML e uma função que a preencha.
2. Trocar os `console.log` de pelo menos uma função do jogo por `escreverLog`.
3. **Ponto de save:** commit `Aula 13: dever de casa - inventario na tela` e push.

*Extra (opcional):* adicionar um `style` simples no `index.html` (cores, fonte) para o jogo ficar com mais cara de jogo.

---

## 9. Prévia da Aula 14

**Botões e cliques.** Vamos usar `addEventListener` para ligar botões (Atacar, Usar Poção, Descer) às funções do jogo. Cada clique executa um turno e atualiza a tela — o jogo finalmente fica **jogável com o mouse**.