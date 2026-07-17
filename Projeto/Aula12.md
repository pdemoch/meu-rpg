# Aula 12 — A Loja e a Economia

**Curso:** JavaScript na Prática — Construindo um Jogo de RPG
**Duração:** 60 minutos
**Aula:** 12 de 16

---

## 1. Objetivos da aula

Ao final da aula, o aluno será capaz de:

- Modelar itens como **objetos** dentro de uma **lista** (a loja).
- Escrever `comprar(...)` com checagem de **ouro** e aplicação do efeito.
- Guardar e **usar** poções do inventário.
- Fechar o **loop econômico**: lutar → ganhar ouro → comprar → ficar mais forte.

**Entregável da aula:** uma loja funcional. O herói gasta ouro em poções, armas e armaduras — e o jogo tem um ciclo completo no console.

---

## 2. Onde estamos

O herói acumula ouro (Aula 09) e evolui por nível (Aula 11), mas o ouro não tem utilidade. Hoje abrimos a **loja**: um jeito de transformar ouro em poder. Isso fecha o círculo do jogo — cada vitória vira recurso, cada recurso vira vantagem na próxima batalha.

---

## 3. Preparação (início da aula)

Abrir o `meu-rpg`, **sincronizar** e trabalhar no `game.js` (F12). Precisamos do herói com `inventario`, `ouro` e o método `curar`.

---

## 4. Roteiro minuto a minuto

### ⏱️ 0–5 min — Recap e o objetivo
Mostre `heroi.ouro` crescendo sem uso. Frase: "hoje o ouro compra vantagem."

### ⏱️ 5–8 min — Abrir e sincronizar

### ⏱️ 8–20 min — A loja como lista de itens
Cada item é um objeto com nome, tipo, preço e efeito:

```js
const loja = [
  { nome: "Poção de Vida",      tipo: "consumivel", preco: 30, efeito: 50 },
  { nome: "Espada Afiada",      tipo: "arma",       preco: 80, efeito: 10 },
  { nome: "Armadura de Couro",  tipo: "armadura",   preco: 70, efeito: 5 }
];

for (let i = 0; i < loja.length; i++) {
  console.log(`${i + 1}. ${loja[i].nome} - ${loja[i].preco} ouro`);
}
```

### ⏱️ 20–35 min — A função comprar
Ela precisa checar o ouro e aplicar o efeito conforme o **tipo** do item (Aula 04 em ação):

```js
function comprar(heroi, item) {
  if (heroi.ouro < item.preco) {
    console.log(`Ouro insuficiente para ${item.nome}.`);
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
  console.log(`${heroi.nome} comprou ${item.nome}. Ouro restante: ${heroi.ouro}`);
}
```

Explique: armas e armaduras aplicam o bônus na hora; consumíveis vão para o inventário, para usar depois.

### ⏱️ 35–45 min — Usar uma poção
Procurar uma poção no inventário e consumi-la:

```js
function usarPocao(heroi) {
  for (let i = 0; i < heroi.inventario.length; i++) {
    if (heroi.inventario[i].tipo === "consumivel") {
      heroi.curar(heroi.inventario[i].efeito);
      heroi.inventario.splice(i, 1);
      return;
    }
  }
  console.log("Você não tem poções!");
}
```

Explique o `splice(i, 1)`: remove **1 item** na posição `i` — a poção é consumida. O `return` para na primeira poção encontrada.

### ⏱️ 45–52 min — Prática guiada
Cada aluno dá ouro ao herói (`heroi.ouro = 200`), compra itens da loja, usa uma poção e confere a ficha antes e depois. Discutir: vale mais comprar ataque ou defesa?

### ⏱️ 52–58 min — Ponto de save
Commit + push. Mensagem: `Aula 12: loja, comprar e usar pocao`.

### ⏱️ 58–60 min — Fechamento
Recapitule: lista de objetos, checagem de ouro, tipos de item, `splice`. Frase de virada: *"O jogo está completo... no console. Da próxima aula em diante, ele ganha uma **tela** — vamos mostrar tudo na página, não mais no F12."*

---

## 5. Código final da aula (adicionado ao game.js)

```js
const loja = [
  { nome: "Poção de Vida",      tipo: "consumivel", preco: 30, efeito: 50 },
  { nome: "Espada Afiada",      tipo: "arma",       preco: 80, efeito: 10 },
  { nome: "Armadura de Couro",  tipo: "armadura",   preco: 70, efeito: 5 }
];

function comprar(heroi, item) {
  if (heroi.ouro < item.preco) {
    console.log(`Ouro insuficiente para ${item.nome}.`);
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
  console.log(`${heroi.nome} comprou ${item.nome}. Ouro restante: ${heroi.ouro}`);
}

function usarPocao(heroi) {
  for (let i = 0; i < heroi.inventario.length; i++) {
    if (heroi.inventario[i].tipo === "consumivel") {
      heroi.curar(heroi.inventario[i].efeito);
      heroi.inventario.splice(i, 1);
      return;
    }
  }
  console.log("Você não tem poções!");
}
```

---

## 6. Dever de casa — solução de referência

```js
heroi.ouro = 200;
comprar(heroi, loja[1]);   // Espada Afiada (+ataque)
comprar(heroi, loja[0]);   // Poção de Vida (vai pro inventário)
heroi.vida = 40;
usarPocao(heroi);          // cura 50 (respeitando o teto)
heroi.mostrarFicha();
```

---

## 7. Erros comuns (fique de olho)

- **Comprar sem checar o ouro:** sem o primeiro `if`, o herói fica com ouro negativo.
- **Esquecer de descontar o preço** depois de aplicar o efeito.
- **Comparar tipo com `=`:** é `item.tipo === "arma"` (comparação), não `=` (atribuição).
- **`splice` vs `slice`:** `splice` altera a lista (remove); `slice` só copia um pedaço. Queremos `splice`.

---

## 8. Dever de casa

1. Adicionar **um item novo** à loja e comprá-lo.
2. Simular o ciclo completo: ganhar ouro numa batalha, comprar algo e enfrentar o próximo inimigo mais forte.
3. **Ponto de save:** commit `Aula 12: dever de casa - economia completa` e push.

*Extra (opcional):* impedir comprar duas vezes a mesma arma (ou fazer a segunda custar mais).

---

## 9. Prévia da Aula 13

Hora de sair do console. Vamos usar o **DOM**: `document.getElementById` e `innerHTML` para mostrar a ficha do herói e o log da batalha **na própria página**. O jogo começa a ter cara de jogo.