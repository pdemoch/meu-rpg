# Aula 08 — Listas: Inventário e Andares (Arrays)

**Curso:** JavaScript na Prática — Construindo um Jogo de RPG
**Duração:** 60 minutos
**Aula:** 8 de 16

---

## 1. Objetivos da aula

Ao final da aula, o aluno será capaz de:

- Criar e ler um **array** (lista) e acessar itens por **índice**.
- Usar **`.length`** e **`.push()`**.
- Percorrer uma lista com um laço **`for`**.
- Modelar o **inventário** do herói e a **masmorra** como listas.

**Entregável da aula:** o herói passa a ter um `inventario`, e a masmorra vira uma lista de inimigos (andares) que podemos percorrer.

---

## 2. Onde estamos

Até agora, cada personagem era uma variável separada. Mas a masmorra tem **vários** andares e o herói carrega **vários** itens. Guardar tudo em variáveis soltas não escala — a solução é a **lista (array)**: uma única variável que guarda vários valores em ordem.

---

## 3. Preparação (início da aula)

Abrir o `meu-rpg`, **sincronizar** e trabalhar no `game.js` (F12).

---

## 4. Roteiro minuto a minuto

### ⏱️ 0–5 min — Recap e a ideia de lista
Compare: em vez de `inimigo1`, `inimigo2`, `inimigo3`, uma lista só guarda todos. Frase: "a masmorra é uma pilha de andares — isso é uma lista."

### ⏱️ 5–8 min — Abrir e sincronizar

### ⏱️ 8–20 min — O que é um array
```js
const inventario = ["Poção de Vida", "Espada Velha", "Escudo de Madeira"];

console.log(inventario[0]);        // Poção de Vida (começa no ZERO)
console.log(inventario[2]);        // Escudo de Madeira
console.log(inventario.length);    // 3 (quantos itens tem)

inventario.push("Elmo de Ferro");  // adiciona ao final
console.log(inventario.length);    // 4
```

Ponto-chave para iniciantes: o índice **começa em 0**. O primeiro item é `[0]`, o segundo `[1]`, e assim por diante.

### ⏱️ 20–30 min — O inventário do herói
Vamos dar ao herói um inventário. Atualize `criarHeroi` para o herói já nascer com uma lista vazia:

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
    inventario: [],
    estaVivo: true
  };
}

heroi.inventario.push("Poção de Vida");
heroi.inventario.push("Poção de Vida");
console.log(`Itens no inventário: ${heroi.inventario.length}`);
```

### ⏱️ 30–42 min — A masmorra como lista de andares
Uma lista pode guardar **objetos** — como os nossos inimigos:

```js
const masmorra = [
  criarInimigo("Rato Gigante", 20, 6, 1),
  criarInimigo("Goblin", 40, 10, 3),
  criarInimigo("Esqueleto", 35, 12, 2),
  criarInimigo("Orc", 60, 14, 6)
];

console.log(`A masmorra tem ${masmorra.length} andares.`);
```

Para percorrer a lista, o laço **`for`**:

```js
for (let i = 0; i < masmorra.length; i++) {
  console.log(`Andar ${i + 1}: ${masmorra[i].nome}`);
}
```

Explique cada parte do `for`: começa em `i = 0`, continua **enquanto** `i < length`, e soma 1 a cada volta. Como o índice começa em 0, o "Andar 1" é `masmorra[0]` (por isso `i + 1` no texto).

### ⏱️ 42–50 min — Prática guiada
Cada aluno monta a **própria masmorra** com 4–5 inimigos e imprime a lista de andares com um `for`. Depois, mostra a ficha de um andar específico (ex.: `mostrarFicha(masmorra[2])`).

### ⏱️ 52–58 min — Ponto de save
Commit + push. Mensagem: `Aula 08: arrays - inventario e masmorra`.

### ⏱️ 58–60 min — Fechamento
Recapitule: array, índice a partir de 0, `.length`, `.push`, laço `for`. Gancho da Aula 09: *"Temos a batalha (Aula 07) e a lista de andares (hoje). Na próxima aula juntamos os dois: o herói desce a masmorra andar por andar, e cada vitória rende recompensa."*

---

## 5. Código final da aula (adicionado ao game.js)

```js
const masmorra = [
  criarInimigo("Rato Gigante", 20, 6, 1),
  criarInimigo("Goblin", 40, 10, 3),
  criarInimigo("Esqueleto", 35, 12, 2),
  criarInimigo("Orc", 60, 14, 6)
];

console.log(`A masmorra tem ${masmorra.length} andares.`);

for (let i = 0; i < masmorra.length; i++) {
  console.log(`Andar ${i + 1}: ${masmorra[i].nome} (vida ${masmorra[i].vida})`);
}
```

---

## 6. Dever de casa — solução de referência

```js
const minhaMasmorra = [
  criarInimigo("Morcego", 15, 5, 0),
  criarInimigo("Lobo", 30, 9, 2),
  criarInimigo("Bandido", 45, 11, 4),
  criarInimigo("Troll", 80, 16, 8)
];

for (let i = 0; i < minhaMasmorra.length; i++) {
  console.log(`Andar ${i + 1}: ${minhaMasmorra[i].nome}`);
}
```

---

## 7. Erros comuns (fique de olho)

- **Contar a partir de 1:** o primeiro item é `[0]`, não `[1]`. `lista[1]` é o **segundo**.
- **Estourar o índice:** `masmorra[4]` numa lista de 4 itens (índices 0–3) dá `undefined`.
- **`for` com `<=` no lugar de `<`:** `i <= length` roda uma vez a mais e cai no `undefined`.
- **Esquecer `let i` no `for`** ou não incrementar o `i` (loop infinito).

---

## 8. Dever de casa

1. Criar uma masmorra própria com **pelo menos 4 inimigos** e imprimir todos os andares com um `for`.
2. Adicionar **duas poções** ao inventário do herói e imprimir o total de itens.
3. **Ponto de save:** commit `Aula 08: dever de casa - minha masmorra` e push.

*Extra (opcional):* imprimir apenas o inimigo mais forte da lista (dica: compare `calcularPoder` dentro do laço).

---

## 9. Prévia da Aula 09

Vamos **juntar tudo**: uma função que faz o herói descer a masmorra andar por andar, batalhando em cada um. Cada vitória rende **XP e ouro**, e uma derrota é game over. O primeiro jogo completo no console.