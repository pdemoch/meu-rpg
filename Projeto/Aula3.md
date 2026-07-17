# Aula 03 — Ações Reutilizáveis (Funções)

**Curso:** JavaScript na Prática — Construindo um Jogo de RPG
**Duração:** 60 minutos
**Aula:** 3 de 16

---

## 1. Objetivos da aula

Ao final da aula, o aluno será capaz de:

- Entender o que é uma **função** e por que ela evita repetição de código.
- Criar funções com **parâmetros** e chamá-las com **argumentos**.
- Usar **`return`** para uma função devolver um valor.
- Transformar a ficha e o "poder" do herói em funções reutilizáveis.
- Criar o herói através de uma função `criarHeroi(...)`.

**Entregável da aula:** o `game.js` deixa de ter código solto e repetido e passa a ter **funções** — `mostrarFicha`, `calcularPoder` e `criarHeroi` — prontas para reaproveitar quando os inimigos chegarem.

---

## 2. Onde estamos

Nas aulas 1 e 2 escrevemos as mesmas linhas de `console.log` várias vezes para mostrar a ficha, e repetimos contas na mão. Isso não escala. Hoje aprendemos a **empacotar** um trecho de código com um nome e reutilizá-lo quantas vezes quisermos. É o conceito de **função** — e a ideia de "não se repita".

---

## 3. Preparação (início da aula)

Abrir o `meu-rpg` no VS Code e **sincronizar** com o GitHub (Sync Changes / `git pull`). Trabalhar no `game.js` com o console aberto (F12).

---

## 4. Roteiro minuto a minuto

### ⏱️ 0–5 min — Recap e o problema da repetição
Mostre no código quantas vezes repetimos `console.log` para exibir a ficha. Pergunte: "E se quiséssemos mostrar a ficha de 10 personagens?" Isso motiva a função.

### ⏱️ 5–8 min — Abrir e sincronizar
Abrir o projeto e trazer a última versão do GitHub.

### ⏱️ 8–20 min — A primeira função
Uma função é um bloco de código com nome. Comece simples e evolua para **parâmetro**:

```js
function mostrarFicha(personagem) {
  console.log(`=== ${personagem.nome} ===`);
  console.log(`Classe: ${personagem.classe}`);
  console.log(`Vida: ${personagem.vida}/${personagem.vidaMaxima}`);
  console.log(`Ataque: ${personagem.ataque}`);
  console.log(`Defesa: ${personagem.defesa}`);
  console.log(`Nível: ${personagem.nivel}`);
}

mostrarFicha(heroi);
```

Explique os termos:
- **parâmetro** = `personagem` (o "espaço reservado" na definição).
- **argumento** = `heroi` (o valor real que passamos ao chamar).
- Chamar a função **executa** o bloco. Sem os parênteses `()`, nada acontece.

### ⏱️ 20–32 min — Funções que devolvem um valor (`return`)
Nem toda função só imprime; muitas **calculam e devolvem** um resultado com `return`:

```js
function calcularPoder(personagem) {
  return personagem.ataque * 2 + personagem.defesa + personagem.nivel * 5;
}

let poder = calcularPoder(heroi);
console.log(`Poder de combate: ${poder}`);
```

> **Sobre o "poder":** é uma **estatística cosmética/comparativa** que nós inventamos — um número único para resumir a força do personagem e, mais à frente, comparar herói vs inimigo. **Não** é a fórmula do combate real (essa é mais simples e vem na Aula 06). Os pesos (`×2`, `×5`) são uma decisão de design: dizem o que o jogo valoriza mais.

Ponto-chave: sem `return`, a função devolve `undefined`. Com `return`, o valor pode ser guardado numa variável.

### ⏱️ 32–45 min — Produzindo heróis em série: `criarHeroi`
Em vez de escrever o objeto do herói na mão, uma função pode **construí-lo** e devolvê-lo:

```js
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
    estaVivo: true
  };
}

const heroi = criarHeroi("Aragorn", "Guerreiro");
mostrarFicha(heroi);
```

Este é um **refactor importante**: o objeto literal das aulas 1–2 dá lugar a uma função. Agora criar personagens é uma linha só — o que vai valer ouro quando precisarmos de vários inimigos.

### ⏱️ 45–52 min — Prática guiada
Cada aluno escreve a **própria função** — por exemplo `curar(personagem, quantidade)` que soma vida, ou `resumo(personagem)` que imprime só nome e vida. Testar chamando com o `heroi`.

### ⏱️ 52–58 min — Ponto de save
Commit + push. Mensagem: `Aula 03: funcoes criarHeroi, mostrarFicha e calcularPoder`.

### ⏱️ 58–60 min — Fechamento
Recapitule: função, parâmetro, argumento, `return`, reutilização. Gancho da Aula 04: *"Nossas funções sempre fazem a mesma coisa. E se quiséssemos que o herói reagisse de forma diferente conforme a situação — vivo ou morto, vida cheia ou crítica? Para isso precisamos de **decisões**."*

---

## 5. Código final da aula (adicionado ao game.js)

```js
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
    estaVivo: true
  };
}

function mostrarFicha(personagem) {
  console.log(`=== ${personagem.nome} ===`);
  console.log(`Classe: ${personagem.classe}`);
  console.log(`Vida: ${personagem.vida}/${personagem.vidaMaxima}`);
  console.log(`Ataque: ${personagem.ataque}`);
  console.log(`Defesa: ${personagem.defesa}`);
  console.log(`Nível: ${personagem.nivel}`);
}

function calcularPoder(personagem) {
  return personagem.ataque * 2 + personagem.defesa + personagem.nivel * 5;
}

const heroi = criarHeroi("Aragorn", "Guerreiro");
mostrarFicha(heroi);
console.log(`Poder: ${calcularPoder(heroi)}`);
```

---

## 6. Dever de casa — solução de referência

```js
function curar(personagem, quantidade) {
  personagem.vida += quantidade;
  console.log(`${personagem.nome} curou ${quantidade}. Vida: ${personagem.vida}`);
}

curar(heroi, 20);
```

---

## 7. Erros comuns (fique de olho)

- **Chamar sem parênteses:** `mostrarFicha` (sem `()`) não executa nada. É `mostrarFicha(heroi)`.
- **Esquecer o `return`:** a função calcula, mas devolve `undefined`. O resultado precisa ser retornado.
- **Confundir parâmetro com argumento:** `personagem` é o nome genérico na definição; `heroi` é o valor real na chamada.
- **Escopo:** uma variável criada **dentro** da função não existe fora dela.
- **Definir a função depois de chamar** (em alguns casos) — mantenha as definições no topo do arquivo por organização.

---

## 8. Dever de casa

1. Escrever uma função `curar(personagem, quantidade)` que aumente a vida e imprima o resultado.
2. Criar **dois heróis diferentes** com `criarHeroi(...)` e mostrar a ficha dos dois com `mostrarFicha(...)`.
3. **Ponto de save:** commit `Aula 03: dever de casa - curar e dois herois` e push.

*Extra (opcional):* uma função `resumo(personagem)` que imprime só o nome e a vida atual.

---

## 9. Prévia da Aula 04

Vamos ensinar o código a **tomar decisões** com `if / else`: o herói está vivo? A vida está crítica? E, enfim, resolver aquela pergunta da Aula 02 — impedir que a cura ultrapasse a vida máxima.