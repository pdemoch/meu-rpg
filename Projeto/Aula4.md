# Aula 04 — O Herói Toma Decisões (if / else)

**Curso:** JavaScript na Prática — Construindo um Jogo de RPG
**Duração:** 60 minutos
**Aula:** 4 de 16

---

## 1. Objetivos da aula

Ao final da aula, o aluno será capaz de:

- Usar os **operadores de comparação** (`===`, `!==`, `>`, `<`, `>=`, `<=`).
- Entender **valores booleanos** como resultado de uma comparação.
- Escrever blocos **`if` / `else if` / `else`**.
- Fazer o código **reagir ao estado** do herói (vivo, crítico, saudável).
- Resolver o problema da Aula 02: **impedir que a cura ultrapasse a vida máxima**.

**Entregável da aula:** o herói agora tem estados. Uma função `curar` que respeita o teto de vida e uma função que informa se ele está vivo, crítico ou bem.

---

## 2. Onde estamos

Até agora nossas funções sempre executavam a mesma coisa. Um jogo, porém, precisa **reagir**: se a vida chegou a zero, o herói morreu; se está baixa, é perigo; se a cura passou do máximo, precisa parar no teto. Tudo isso são **decisões** — e é o que o `if` faz.

---

## 3. Preparação (início da aula)

Abrir o `meu-rpg`, **sincronizar** com o GitHub e trabalhar no `game.js` com o console aberto (F12). As funções da Aula 03 já devem estar no arquivo.

---

## 4. Roteiro minuto a minuto

### ⏱️ 0–5 min — Recap e o problema em aberto
Relembre a pergunta da Aula 02: "se a cura passar de 100, o herói fica com 130 sendo o máximo 100?" Hoje resolvemos isso.

### ⏱️ 5–8 min — Abrir e sincronizar
Abrir o projeto e trazer a última versão.

### ⏱️ 8–20 min — Comparações e booleanos
Toda decisão nasce de uma comparação, que resulta em `true` ou `false`:

```js
console.log(10 > 5);     // true
console.log(3 >= 3);     // true
console.log(7 === 7);    // true  (igual)
console.log(7 !== 2);    // true  (diferente)
console.log(2 > 9);      // false
```

Ponto importante: use **`===`** (três iguais) para comparar. O `==` existe, mas tem armadilhas — no curso, o padrão é sempre `===`. E cuidado: `=` (um) **atribui**, `===` (três) **compara**.

### ⏱️ 20–32 min — if / else if / else
A estrutura da decisão:

```js
if (heroi.vida <= 0) {
  console.log(`${heroi.nome} foi derrotado!`);
} else if (heroi.vida < 30) {
  console.log(`${heroi.nome} está em estado crítico!`);
} else {
  console.log(`${heroi.nome} está bem.`);
}
```

Explique a ordem: o código testa de cima para baixo e executa o **primeiro** bloco verdadeiro. Empacote isso numa função reutilizável:

```js
function statusDeVida(personagem) {
  let percentual = (personagem.vida / personagem.vidaMaxima) * 100;
  if (personagem.vida <= 0) {
    console.log(`${personagem.nome} foi derrotado!`);
  } else if (percentual < 30) {
    console.log(`${personagem.nome} está em estado crítico!`);
  } else {
    console.log(`${personagem.nome} está bem.`);
  }
}
```

### ⏱️ 32–43 min — Cura com teto e checagem de vida
Agora **resolvemos o gancho da Aula 02**. A cura soma, mas o `if` impede passar da `vidaMaxima`:

```js
function curar(personagem, quantidade) {
  personagem.vida += quantidade;
  if (personagem.vida > personagem.vidaMaxima) {
    personagem.vida = personagem.vidaMaxima;
  }
  console.log(`${personagem.nome} recuperou vida: ${personagem.vida}/${personagem.vidaMaxima}`);
}
```

E uma função que devolve se o personagem está vivo (um booleano):

```js
function estaVivo(personagem) {
  return personagem.vida > 0;
}

console.log(estaVivo(heroi));   // true
```

Teste: cure o herói além do teto e mostre que ele para em 100.

### ⏱️ 43–52 min — Prática guiada
Cada aluno escreve uma função com decisão — por exemplo `classificarForca(personagem)` que, a partir do `calcularPoder`, imprime "fraco", "mediano" ou "forte" usando `if / else if / else`.

### ⏱️ 52–58 min — Ponto de save
Commit + push. Mensagem: `Aula 04: decisoes - statusDeVida, curar com teto, estaVivo`.

### ⏱️ 58–60 min — Fechamento
Recapitule: comparações, booleanos, `if/else if/else`, `===` vs `=`. Gancho da Aula 05: *"Nosso herói já sabe curar e saber se está vivo. Está na hora de aparecer alguém para enfrentar — na próxima aula surge o primeiro inimigo."*

---

## 5. Código final da aula (adicionado ao game.js)

```js
function statusDeVida(personagem) {
  let percentual = (personagem.vida / personagem.vidaMaxima) * 100;
  if (personagem.vida <= 0) {
    console.log(`${personagem.nome} foi derrotado!`);
  } else if (percentual < 30) {
    console.log(`${personagem.nome} está em estado crítico!`);
  } else {
    console.log(`${personagem.nome} está bem.`);
  }
}

function curar(personagem, quantidade) {
  personagem.vida += quantidade;
  if (personagem.vida > personagem.vidaMaxima) {
    personagem.vida = personagem.vidaMaxima;
  }
  console.log(`${personagem.nome} recuperou vida: ${personagem.vida}/${personagem.vidaMaxima}`);
}

function estaVivo(personagem) {
  return personagem.vida > 0;
}

heroi.vida = 20;
statusDeVida(heroi);     // crítico
curar(heroi, 200);       // não passa de 100
statusDeVida(heroi);     // bem
```

---

## 6. Dever de casa — solução de referência

```js
function classificarForca(personagem) {
  let poder = calcularPoder(personagem);
  if (poder < 40) {
    console.log(`${personagem.nome} é fraco (${poder}).`);
  } else if (poder < 70) {
    console.log(`${personagem.nome} é mediano (${poder}).`);
  } else {
    console.log(`${personagem.nome} é forte (${poder}).`);
  }
}

classificarForca(heroi);
```

---

## 7. Erros comuns (fique de olho)

- **`=` no lugar de `===`:** `if (heroi.vida = 0)` **atribui** zero e quebra a lógica. Comparar é `===` (ou `<=`, `>`, etc.).
- **Esquecer as chaves `{}`** do bloco, ou fechá-las no lugar errado.
- **Ordem do `if` trocada:** se o `else if (percentual < 30)` vier antes do teste de morte, um herói com 0 de vida pode cair no ramo errado. Teste do mais específico/grave para o mais geral.
- **Comparar tipos diferentes:** número com texto (`"0" === 0` é `false`). Mantenha números sem aspas.

---

## 8. Dever de casa

1. Escrever `classificarForca(personagem)` que imprime "fraco", "mediano" ou "forte" com base no `calcularPoder`.
2. Testar `curar` passando um valor enorme e provar que a vida **para na vidaMaxima**.
3. **Ponto de save:** commit `Aula 04: dever de casa - classificarForca` e push.

*Extra (opcional):* uma função `estaEmPerigo(personagem)` que devolve `true` se a vida estiver abaixo de 30%.

---

## 9. Prévia da Aula 05

Surge o primeiro **inimigo**. Vamos criar um objeto no mesmo formato do herói (com uma função `criarInimigo`), reaproveitar a `mostrarFicha` nele e comparar os dois para ver quem leva vantagem.