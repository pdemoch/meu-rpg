# Aula 06 — O Primeiro Golpe

**Curso:** JavaScript na Prática — Construindo um Jogo de RPG
**Duração:** 60 minutos
**Aula:** 6 de 16

---

## 1. Objetivos da aula

Ao final da aula, o aluno será capaz de:

- Escrever uma função que **altera os dados de outro objeto** (efeito colateral).
- Implementar a fórmula de dano do combate: `ataque - defesa`, com **mínimo de 1**.
- Impedir que a vida fique **negativa** (trava em 0).
- Combinar o ataque com a checagem de **morte** feita na Aula 04.

**Entregável da aula:** a função `atacar(atacante, alvo)` — o coração do combate. O herói já pode golpear o Goblin e vice-versa, com o dano refletindo na vida.

---

## 2. Onde estamos

Herói e inimigo estão frente a frente (Aula 05), mas ninguém se feriu ainda. Hoje construímos o **golpe**: uma função que recebe quem ataca e quem apanha, calcula o dano e **reduz a vida do alvo**. É a peça mais importante do jogo — na próxima aula ela vira uma batalha automática por turnos.

---

## 3. Preparação (início da aula)

Abrir o `meu-rpg`, **sincronizar** com o GitHub e trabalhar no `game.js` com o console (F12). Todas as funções das aulas 3–5 já devem estar no arquivo (incluindo `criarHeroi`, `criarInimigo`, `estaVivo`).

---

## 4. Roteiro minuto a minuto

### ⏱️ 0–5 min — Recap e o objetivo
Relembre o confronto montado na Aula 05. Frase: *"Chega de só comparar fichas. Hoje alguém apanha."*

### ⏱️ 5–8 min — Abrir e sincronizar
Abrir o projeto e trazer a última versão.

### ⏱️ 8–22 min — A fórmula do dano e a função atacar
Primeiro, o raciocínio: o dano é o **ataque de quem golpeia menos a defesa de quem recebe**. Mas isso pode dar zero ou negativo se a defesa for alta — por isso um **mínimo de 1** (todo golpe machuca um pouquinho).

```js
function atacar(atacante, alvo) {
  let dano = atacante.ataque - alvo.defesa;
  if (dano < 1) {
    dano = 1;
  }
  alvo.vida -= dano;
  if (alvo.vida < 0) {
    alvo.vida = 0;
  }
  console.log(`${atacante.nome} causou ${dano} de dano em ${alvo.nome}.`);
  console.log(`${alvo.nome}: ${alvo.vida}/${alvo.vidaMaxima} de vida.`);
}
```

Destaque os dois `if` (Aula 04 em ação): um garante o dano mínimo, o outro impede vida negativa. E o conceito novo: a função **modifica o alvo** — `alvo.vida` muda de verdade lá fora.

### ⏱️ 22–32 min — Trocando golpes
Aplique com o herói e o goblin:

```js
const goblin = criarInimigo("Goblin", 40, 10, 3);

atacar(heroi, goblin);   // herói golpeia
atacar(goblin, heroi);   // goblin revida
atacar(heroi, goblin);   // herói de novo
```

Peça para acompanharem a vida do goblin caindo a cada golpe no console.

### ⏱️ 32–43 min — Juntando com a morte
Depois de cada golpe, dá para verificar se o alvo caiu, reaproveitando o `estaVivo` da Aula 04:

```js
function atacarEVerificar(atacante, alvo) {
  atacar(atacante, alvo);
  if (!estaVivo(alvo)) {
    alvo.estaVivo = false;
    console.log(`${alvo.nome} foi derrotado! ${atacante.nome} venceu o duelo.`);
  }
}
```

Explique o `!` (negação): `!estaVivo(alvo)` significa "NÃO está vivo". Teste golpeando o goblin até ele cair.

### ⏱️ 43–52 min — Prática guiada
Cada aluno faz o herói e um inimigo **trocarem golpes na mão** (chamando `atacar` alternadamente) até um dos dois chegar a 0 de vida. Isso deixa clara a repetição — que será automatizada com laços na Aula 07.

### ⏱️ 52–58 min — Ponto de save
Commit + push. Mensagem: `Aula 06: funcao atacar e verificacao de derrota`.

### ⏱️ 58–60 min — Fechamento
Recapitule: função que altera outro objeto, dano mínimo, trava em 0, negação `!`. Gancho da Aula 07: *"Ficou cansativo chamar `atacar` na mão, um golpe de cada vez. Na próxima aula, um **laço** faz os dois trocarem golpes sozinhos até o fim — a primeira batalha jogável do jogo."*

---

## 5. Código final da aula (adicionado ao game.js)

```js
function atacar(atacante, alvo) {
  let dano = atacante.ataque - alvo.defesa;
  if (dano < 1) {
    dano = 1;
  }
  alvo.vida -= dano;
  if (alvo.vida < 0) {
    alvo.vida = 0;
  }
  console.log(`${atacante.nome} causou ${dano} de dano em ${alvo.nome}.`);
  console.log(`${alvo.nome}: ${alvo.vida}/${alvo.vidaMaxima} de vida.`);
}

function atacarEVerificar(atacante, alvo) {
  atacar(atacante, alvo);
  if (!estaVivo(alvo)) {
    alvo.estaVivo = false;
    console.log(`${alvo.nome} foi derrotado! ${atacante.nome} venceu o duelo.`);
  }
}

const goblin = criarInimigo("Goblin", 40, 10, 3);
atacar(heroi, goblin);
atacar(goblin, heroi);
atacarEVerificar(heroi, goblin);
```

---

## 6. Dever de casa — solução de referência

```js
const orc = criarInimigo("Orc", 50, 14, 6);

atacar(heroi, orc);
atacar(orc, heroi);
atacar(heroi, orc);
atacar(orc, heroi);

console.log(`Herói: ${heroi.vida}/${heroi.vidaMaxima}`);
console.log(`Orc: ${orc.vida}/${orc.vidaMaxima}`);
```

---

## 7. Erros comuns (fique de olho)

- **Dano negativo:** sem o `if (dano < 1)`, uma defesa maior que o ataque faz o alvo **ganhar** vida. O mínimo de 1 resolve.
- **Só calcular, sem aplicar:** esquecer o `alvo.vida -= dano` calcula o dano mas nada muda. É preciso **atribuir** de volta.
- **Vida negativa:** sem a trava em 0, aparecem números como `-7/40`. O segundo `if` impede.
- **Trocar atacante e alvo:** `atacar(goblin, heroi)` faz o goblin bater; a ordem dos argumentos importa.

---

## 8. Dever de casa

1. Fazer o herói e um inimigo **trocarem 4 golpes** (dois de cada) com `atacar`, e imprimir a vida final dos dois.
2. Usar `atacarEVerificar` para provar a mensagem de derrota quando um deles cai.
3. **Ponto de save:** commit `Aula 06: dever de casa - troca de golpes` e push.

*Extra (opcional):* adicionar um golpe crítico simples — se o dano for maior que 10, imprimir "Golpe crítico!".

---

## 9. Prévia da Aula 07

A primeira **batalha jogável**. Vamos usar um **laço `while`** para o herói e o inimigo trocarem golpes automaticamente, turno após turno, até um deles cair — sem chamar `atacar` na mão. O jogo começa a acontecer sozinho.