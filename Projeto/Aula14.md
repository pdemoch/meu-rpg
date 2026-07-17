# Aula 14 — Botões e Cliques (Eventos)

**Curso:** JavaScript na Prática — Construindo um Jogo de RPG
**Duração:** 60 minutos
**Aula:** 14 de 16

---

## 1. Objetivos da aula

Ao final da aula, o aluno será capaz de:

- Entender o que é um **evento** (uma reação a algo do usuário).
- Ligar um botão a uma função com **`addEventListener`**.
- Transformar o combate automático em combate **por clique** (um turno por vez).
- Atualizar a tela a cada ação do jogador.

**Entregável da aula:** o jogo fica **jogável com o mouse** — botões de Atacar, Usar Poção e Descer que o jogador controla.

---

## 2. Onde estamos

A tela já mostra a ficha e o log (Aula 13), mas quem age é o código. Um jogo de verdade responde ao **jogador**. Hoje entram os **eventos**: o jogador clica em "Atacar" e o jogo executa **um** turno. Isso muda um pouco a estrutura — em vez de um `while` que resolve a luta inteira, cada clique é um passo.

---

## 3. Preparação (início da aula)

Abrir o `meu-rpg`, **sincronizar** e trabalhar no `index.html` e no `game.js` (F12 para erros).

---

## 4. Roteiro minuto a minuto

### ⏱️ 0–5 min — Recap e a virada
Explique a mudança: até agora a batalha rodava sozinha (`while`); agora o jogador dá um golpe por clique. Frase: "o jogo passa a esperar por você."

### ⏱️ 5–8 min — Abrir e sincronizar

### ⏱️ 8–16 min — Botões no HTML
Adicione os botões ao `index.html`:

```html
<div id="ficha"></div>
<div id="acoes">
  <button id="btnAtacar">Atacar</button>
  <button id="btnPocao">Usar Poção</button>
  <button id="btnDescer">Próximo Andar</button>
</div>
<div id="log"></div>
<script src="game.js"></script>
```

### ⏱️ 16–28 min — O primeiro clique
Ligar um botão a uma função com `addEventListener`:

```js
document.getElementById("btnAtacar").addEventListener("click", function () {
  escreverLog("Você clicou em Atacar!");
});
```

Explique as partes: o elemento, o tipo de evento (`"click"`) e a função que roda **quando** o clique acontece. Todos testam e veem a mensagem aparecer a cada clique.

### ⏱️ 28–45 min — Um turno por clique
Agora o combate de verdade. Guardamos o inimigo atual e, a cada clique em Atacar, ocorre um turno completo (herói bate, inimigo revida) e a tela atualiza:

```js
let inimigoAtual = criarInimigo("Goblin", 40, 10, 3);

function atacarTurno() {
  if (!inimigoAtual.estaVivo()) {
    escreverLog("Não há inimigo. Desça para o próximo andar.");
    return;
  }
  atacar(heroi, inimigoAtual);
  if (!inimigoAtual.estaVivo()) {
    escreverLog(`${inimigoAtual.nome} foi derrotado!`);
    heroi.ganharXp(inimigoAtual.xpRecompensa);
    heroi.ouro += inimigoAtual.ouroRecompensa;
  } else {
    atacar(inimigoAtual, heroi);
  }
  renderTudo(heroi, inimigoAtual);
  if (!heroi.estaVivo()) {
    escreverLog("GAME OVER");
  }
}

document.getElementById("btnAtacar").addEventListener("click", atacarTurno);
document.getElementById("btnPocao").addEventListener("click", function () {
  usarPocao(heroi);
  renderTudo(heroi, inimigoAtual);
});
```

> **Ponto importante:** as mensagens do combate (`atacar`, etc.) devem usar `escreverLog` em vez de `console.log`, para aparecerem na tela. Reaproveitamos toda a lógica — só mudamos **quem dispara** e **onde aparece**.

### ⏱️ 45–52 min — Prática guiada
Cada aluno liga o botão **Próximo Andar** a uma função que troca `inimigoAtual` pelo próximo da masmorra e atualiza a tela. (Dica: guardar o índice do andar numa variável.)

### ⏱️ 52–58 min — Ponto de save
Commit + push. Mensagem: `Aula 14: eventos - jogo jogavel por clique`.

### ⏱️ 58–60 min — Fechamento
Recapitule: evento, `addEventListener`, um turno por clique, re-render. Gancho da Aula 15: *"O jogo funciona, mas fecha a aba e perde tudo. Na próxima aula, aprendemos a **salvar o progresso** no navegador."*

---

## 5. Código final da aula

`index.html` com os botões `btnAtacar`, `btnPocao`, `btnDescer` (bloco acima). No `game.js`, a função `atacarTurno` e os `addEventListener` (blocos acima). Lembrete: trocar os `console.log` do combate por `escreverLog`.

---

## 6. Dever de casa — solução de referência

```js
let andarAtual = 0;
const masmorra = [
  criarInimigo("Rato Gigante", 20, 6, 1),
  criarInimigo("Goblin", 40, 10, 3),
  criarInimigo("Orc", 60, 14, 6)
];

document.getElementById("btnDescer").addEventListener("click", function () {
  if (andarAtual < masmorra.length) {
    inimigoAtual = masmorra[andarAtual];
    escreverLog(`Andar ${andarAtual + 1}: surge ${inimigoAtual.nome}!`);
    andarAtual += 1;
    renderFicha(heroi);
  } else {
    escreverLog("Você chegou ao fim da masmorra!");
  }
});
```

---

## 7. Erros comuns (fique de olho)

- **Passar a função com `()`:** `addEventListener("click", turnoDeAtaque())` executa na hora. O certo é sem parênteses: `turnoDeAtaque` (passamos a função, não o resultado).
- **`id` do botão errado** — o `getElementById` devolve `null` e o clique não faz nada.
- **Esquecer o re-render:** mudar a vida sem chamar `renderFicha` deixa a tela desatualizada.
- **Manter `console.log` no combate** — as mensagens ficam escondidas no F12 em vez da tela.

---

## 8. Dever de casa

1. Ligar o botão **Próximo Andar** para avançar na masmorra.
2. Garantir que **todas** as mensagens de combate apareçam no log da tela.
3. **Ponto de save:** commit `Aula 14: dever de casa - botao descer` e push.

*Extra (opcional):* desabilitar o botão Atacar quando o herói morrer (`document.getElementById("btnAtacar").disabled = true`).

---

## 9. Prévia da Aula 15

**Salvando o jogo.** Vamos usar o `localStorage` para guardar o progresso no navegador, com `JSON.stringify` e `JSON.parse`, e criar as opções "Novo Jogo" e "Continuar".