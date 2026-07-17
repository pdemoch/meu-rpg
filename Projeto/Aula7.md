# Aula 07 — A Primeira Batalha (while)

**Curso:** JavaScript na Prática — Construindo um Jogo de RPG
**Duração:** 60 minutos
**Aula:** 7 de 16

---

## 1. Objetivos da aula

Ao final da aula, o aluno será capaz de:

- Entender o que é um **laço** e por que ele repete código.
- Escrever um laço **`while`** com uma condição de parada.
- Combinar condições com o operador **`&&`** (E lógico).
- Usar **`break`** para interromper o laço.
- Montar uma batalha que roda **sozinha**, turno após turno, até alguém cair.

**Entregável da aula:** a função `batalhar(heroi, inimigo)` — a **primeira parte jogável** do jogo. Um comando e a luta acontece inteira.

---

## 2. Onde estamos

Na Aula 06 trocamos golpes chamando `atacar` na mão, um a um. É cansativo e não serve para um jogo. Hoje entra o **laço**: dizemos "continue atacando **enquanto** os dois estiverem vivos", e o computador repete sozinho. Este é o marco em que o jogo começa a acontecer.

---

## 3. Preparação (início da aula)

Abrir o `meu-rpg`, **sincronizar** com o GitHub e trabalhar no `game.js` (console em F12). As funções `atacar` e `estaVivo` das aulas anteriores já devem estar no arquivo.

---

## 4. Roteiro minuto a minuto

### ⏱️ 0–5 min — Recap e o problema
Mostre o código da Aula 06 com vários `atacar` repetidos. Pergunte: "e se a luta durasse 30 turnos, íamos escrever 30 linhas?" Isso motiva o laço.

### ⏱️ 5–8 min — Abrir e sincronizar
Abrir o projeto e trazer a última versão.

### ⏱️ 8–20 min — O laço while
Um `while` repete um bloco **enquanto** a condição for verdadeira:

```js
let contador = 1;
while (contador <= 3) {
  console.log(`Repetição número ${contador}`);
  contador += 1;
}
```

Ponto crucial: **a condição precisa deixar de ser verdadeira em algum momento**, senão o laço roda para sempre (loop infinito). Aqui, `contador` cresce até passar de 3.

### ⏱️ 20–35 min — A batalha por turnos
Queremos repetir os golpes **enquanto os dois estiverem vivos**. O `&&` significa "E" — as duas condições precisam ser verdadeiras:

```js
function batalhar(heroi, inimigo) {
  console.log(`=== ${heroi.nome} VS ${inimigo.nome} ===`);
  let turno = 1;
  while (estaVivo(heroi) && estaVivo(inimigo)) {
    console.log(`--- Turno ${turno} ---`);
    atacar(heroi, inimigo);
    if (!estaVivo(inimigo)) {
      break;
    }
    atacar(inimigo, heroi);
    turno += 1;
  }
  if (estaVivo(heroi)) {
    console.log(`${heroi.nome} venceu a batalha!`);
  } else {
    console.log(`${heroi.nome} foi derrotado...`);
  }
}
```

Explique o `break`: se o inimigo morre no golpe do herói, **paramos ali** — não faz sentido o morto revidar.

> **Conexão bonita com a Aula 06:** lembram do "dano mínimo de 1"? É ele que **garante que essa luta termina**. Sem o mínimo, dois personagens muito defensivos poderiam nunca se ferir, e o `while` rodaria para sempre. Regras de design e segurança do código andam juntas.

### ⏱️ 35–45 min — Rodando a batalha
```js
const goblin = criarInimigo("Goblin", 40, 10, 3);
batalhar(heroi, goblin);
```

Todos rodam e leem o combate inteiro no console. Peça para experimentarem inimigos mais fortes e verem o herói perder.

### ⏱️ 45–52 min — Prática guiada
Cada aluno cria um inimigo à sua escolha e roda `batalhar`. Depois, curam o herói (`curar`) entre duas batalhas seguidas e observam a diferença.

### ⏱️ 52–58 min — Ponto de save
Commit + push. Mensagem: `Aula 07: batalha por turnos com while`.

### ⏱️ 58–60 min — Fechamento
Recapitule: `while`, condição de parada, `&&`, `break`, loop infinito. Gancho da Aula 08: *"O herói só enfrenta um inimigo por vez e não carrega nada. Para termos vários andares e um inventário, precisamos de **listas** — os arrays."*

---

## 5. Código final da aula (adicionado ao game.js)

```js
function batalhar(heroi, inimigo) {
  console.log(`=== ${heroi.nome} VS ${inimigo.nome} ===`);
  let turno = 1;
  while (estaVivo(heroi) && estaVivo(inimigo)) {
    console.log(`--- Turno ${turno} ---`);
    atacar(heroi, inimigo);
    if (!estaVivo(inimigo)) {
      break;
    }
    atacar(inimigo, heroi);
    turno += 1;
  }
  if (estaVivo(heroi)) {
    console.log(`${heroi.nome} venceu a batalha!`);
  } else {
    console.log(`${heroi.nome} foi derrotado...`);
  }
}

const goblin = criarInimigo("Goblin", 40, 10, 3);
batalhar(heroi, goblin);
```

---

## 6. Dever de casa — solução de referência

```js
const heroi2 = criarHeroi("Legolas", "Arqueiro");
const orc = criarInimigo("Orc", 60, 14, 6);

batalhar(heroi2, orc);
curar(heroi2, 40);
const rato = criarInimigo("Rato Gigante", 20, 6, 1);
batalhar(heroi2, rato);
```

---

## 7. Erros comuns (fique de olho)

- **Loop infinito:** esquecer de atualizar a condição (o `turno += 1`, ou a vida não cair) trava o navegador. Se travar, feche a aba. Lembre que o dano mínimo de 1 protege a batalha.
- **`&` no lugar de `&&`:** o operador "E" lógico é **duplo** (`&&`).
- **Esquecer o `break`:** o inimigo morto ainda revida, deixando o herói com vida negativa antes do teste final.
- **Condição invertida:** `while (!estaVivo(...))` faria a luta só rodar quando alguém já está morto.

---

## 8. Dever de casa

1. Criar um herói e um inimigo à sua escolha e rodar uma batalha completa.
2. Encadear **duas batalhas** com uma `curar` no meio, e observar o resultado.
3. **Ponto de save:** commit `Aula 07: dever de casa - batalhas encadeadas` e push.

*Extra (opcional):* imprimir, ao final, em quantos turnos a batalha terminou.

---

## 9. Prévia da Aula 08

Vamos conhecer os **arrays** (listas): o herói ganha um **inventário**, e a masmorra vira uma **lista de inimigos** — cada posição, um andar. É a base para o jogo ter progressão de andares.