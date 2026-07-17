# Aula 09 — Descendo a Masmorra (Juntando Tudo)

**Curso:** JavaScript na Prática — Construindo um Jogo de RPG
**Duração:** 60 minutos
**Aula:** 9 de 16

---

## 1. Objetivos da aula

Ao final da aula, o aluno será capaz de:

- **Combinar** funções e laços para criar um fluxo de jogo completo.
- Fazer uma função `batalhar` **devolver** o resultado (vitória ou derrota).
- Dar **recompensas** (XP e ouro) ao vencer.
- Percorrer a masmorra andar por andar, parando em caso de derrota.

**Entregável da aula:** o **primeiro jogo completo no console** — o herói desce a masmorra, luta em cada andar, ganha recompensas e chega ao fim (ou perde no caminho).

---

## 2. Onde estamos

Temos as peças: a batalha (Aula 07) e a lista de andares (Aula 08). Hoje elas viram um **jogo**. A ideia: percorrer a masmorra com um `for`, batalhar em cada andar, e usar o **resultado** de cada batalha para decidir se o herói continua descendo ou se é game over.

---

## 3. Preparação (início da aula)

Abrir o `meu-rpg`, **sincronizar** e trabalhar no `game.js` (F12). Precisamos das funções `batalhar`, `criarInimigo`, `curar`, e da lista `masmorra`.

---

## 4. Roteiro minuto a minuto

### ⏱️ 0–5 min — Recap e o objetivo
Mostre que já temos batalha e lista. Frase: "hoje o herói realmente **joga** — desce a masmorra inteira."

### ⏱️ 5–8 min — Abrir e sincronizar

### ⏱️ 8–22 min — batalhar que devolve resultado e recompensa
Vamos ajustar `batalhar` para **retornar** se o herói venceu, e entregar recompensas na vitória:

```js
function batalhar(heroi, inimigo) {
  console.log(`=== ${heroi.nome} VS ${inimigo.nome} ===`);
  while (estaVivo(heroi) && estaVivo(inimigo)) {
    atacar(heroi, inimigo);
    if (!estaVivo(inimigo)) {
      break;
    }
    atacar(inimigo, heroi);
  }
  if (estaVivo(heroi)) {
    heroi.xp += inimigo.xpRecompensa;
    heroi.ouro += inimigo.ouroRecompensa;
    console.log(`Vitória! +${inimigo.xpRecompensa} XP, +${inimigo.ouroRecompensa} ouro.`);
    return true;
  } else {
    console.log(`${heroi.nome} tombou na masmorra.`);
    return false;
  }
}
```

Destaque: o `return true` / `return false` é o que permite quem **chamou** a função saber o que aconteceu e reagir.

### ⏱️ 22–38 min — Descer a masmorra
A função que percorre os andares, usando o resultado de cada batalha:

```js
function explorarMasmorra(heroi, masmorra) {
  for (let i = 0; i < masmorra.length; i++) {
    console.log(`\n===== ANDAR ${i + 1} =====`);
    const venceu = batalhar(heroi, masmorra[i]);
    if (!venceu) {
      console.log("GAME OVER");
      return;
    }
    curar(heroi, 20);
    console.log(`Você descansa e recupera um pouco. Vida: ${heroi.vida}/${heroi.vidaMaxima}`);
  }
  console.log("\nVOCÊ CONQUISTOU A MASMORRA!");
}
```

Explique o `return` dentro do `for`: ao perder, ele **encerra a função inteira**, não só o laço. E a cura entre andares dá fôlego para continuar.

### ⏱️ 38–48 min — Rodando o jogo
```js
const masmorra = [
  criarInimigo("Rato Gigante", 20, 6, 1),
  criarInimigo("Goblin", 40, 10, 3),
  criarInimigo("Esqueleto", 35, 12, 2),
  criarInimigo("Orc", 60, 14, 6)
];

explorarMasmorra(heroi, masmorra);
console.log(`Fim: nível ${heroi.nivel}, XP ${heroi.xp}, ouro ${heroi.ouro}`);
```

Todos rodam a masmorra completa. Peça para ajustarem a dificuldade (inimigos mais fortes) e verem o game over.

### ⏱️ 48–52 min — Prática guiada
Cada aluno equilibra a **própria masmorra** para que seja vencível, mas difícil. Discutir "game design": se o primeiro andar for fortíssimo, ninguém passa.

### ⏱️ 52–58 min — Ponto de save
Commit + push. Mensagem: `Aula 09: explorarMasmorra com recompensas`.

### ⏱️ 58–60 min — Fechamento
Recapitule: `return` controlando o fluxo, recompensas, laço sobre a lista. Gancho da Aula 10: *"O código funciona, mas escrevemos `atacar(heroi, inimigo)`. Não seria mais natural dizer `heroi.atacar(inimigo)`? Na próxima aula, os personagens ganham **métodos** — ações próprias."*

---

## 5. Código final da aula (adicionado ao game.js)

```js
function batalhar(heroi, inimigo) {
  console.log(`=== ${heroi.nome} VS ${inimigo.nome} ===`);
  while (estaVivo(heroi) && estaVivo(inimigo)) {
    atacar(heroi, inimigo);
    if (!estaVivo(inimigo)) {
      break;
    }
    atacar(inimigo, heroi);
  }
  if (estaVivo(heroi)) {
    heroi.xp += inimigo.xpRecompensa;
    heroi.ouro += inimigo.ouroRecompensa;
    console.log(`Vitória! +${inimigo.xpRecompensa} XP, +${inimigo.ouroRecompensa} ouro.`);
    return true;
  } else {
    console.log(`${heroi.nome} tombou na masmorra.`);
    return false;
  }
}

function explorarMasmorra(heroi, masmorra) {
  for (let i = 0; i < masmorra.length; i++) {
    console.log(`\n===== ANDAR ${i + 1} =====`);
    const venceu = batalhar(heroi, masmorra[i]);
    if (!venceu) {
      console.log("GAME OVER");
      return;
    }
    curar(heroi, 20);
  }
  console.log("\nVOCÊ CONQUISTOU A MASMORRA!");
}
```

---

## 6. Dever de casa — solução de referência

```js
const heroi2 = criarHeroi("Gimli", "Guerreiro");
const masmorra2 = [
  criarInimigo("Morcego", 15, 5, 0),
  criarInimigo("Lobo", 30, 9, 2),
  criarInimigo("Bandido", 45, 11, 4)
];

explorarMasmorra(heroi2, masmorra2);
console.log(`Ouro final: ${heroi2.ouro}`);
```

---

## 7. Erros comuns (fique de olho)

- **Não usar o retorno:** chamar `batalhar(...)` sem guardar o resultado impede detectar o game over.
- **`return` vs `break`:** dentro do `for`, `break` só sai do laço; `return` encerra a função. Para game over, queremos `return`.
- **Recompensa na derrota:** dar XP mesmo perdendo — cuidado com a posição do `if (estaVivo(heroi))`.
- **Masmorra impossível:** primeiro andar forte demais frustra. Balanceamento é parte do jogo.

---

## 8. Dever de casa

1. Montar um herói e uma masmorra próprios e rodar `explorarMasmorra`.
2. Ajustar os inimigos até a masmorra ficar **vencível, mas desafiadora**.
3. **Ponto de save:** commit `Aula 09: dever de casa - minha campanha` e push.

*Extra (opcional):* imprimir, ao final, quantos andares o herói conseguiu vencer antes de morrer (se morreu).

---

## 9. Prévia da Aula 10

Os personagens vão ganhar **métodos**: em vez de `atacar(heroi, goblin)`, escreveremos `heroi.atacar(goblin)`. Vamos conhecer a palavra **`this`** e deixar o código mais limpo e mais próximo de como um personagem "se comporta".