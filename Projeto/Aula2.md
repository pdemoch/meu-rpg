# Aula 02 — Dando Músculos ao Herói

**Curso:** JavaScript na Prática — Construindo um Jogo de RPG
**Duração:** 60 minutos
**Aula:** 2 de 16

---

## 1. Objetivos da aula

Ao final da aula, o aluno será capaz de:

- Usar os **operadores matemáticos** (`+`, `-`, `*`, `/`, `%`).
- Entender **precedência** e usar **parênteses** para controlar a ordem das contas.
- **Alterar** o valor de uma propriedade de um objeto a partir de um cálculo.
- Usar a **atribuição composta** (`+=`, `-=`).
- Calcular valores derivados do herói: **força total**, **dano** e **percentual de vida**.
- Fazer mais um **ponto de save** no GitHub.

**Entregável da aula:** o herói agora **reage a números** — leva dano, cura e tem uma "força" calculada. Tudo comitado no repositório.

---

## 2. Onde estamos

Na Aula 01 o herói passou a existir como um **objeto** com nome, atributos e a ficha impressa no console. Mas ele era estático: só guardava dados. Hoje ele começa a **fazer contas** — o primeiro passo para lutar. Ainda não há inimigo (ele chega na Aula 05); por enquanto, o mundo age sobre o herói (armadilhas, descanso).

> Lembre a turma do "ponto de save": a aula termina com `commit` + `push`, como sempre.

---

## 3. Preparação (início da aula)

1. Abrir o projeto `meu-rpg` no VS Code.
2. **Sincronizar** antes de começar: quem fez o dever em casa deve ter dado `push`; ao abrir, clicar em **Sync Changes** (ou `git pull`) para trazer a última versão. Bom momento para explicar que sempre começamos a aula sincronizando.
3. Trabalharemos no `game.js`, com o `index.html` aberto no navegador e o console em **F12**.

---

## 4. Roteiro minuto a minuto

### ⏱️ 0–5 min — Boas-vindas e recap
Relembre o herói da aula passada e mostre a ficha rodando. Frase de abertura: *"Nosso herói existe, mas ainda não faz nada. Hoje ele ganha músculos — vai calcular dano e força."*

### ⏱️ 5–10 min — Abrir e sincronizar o projeto
Abrir o `meu-rpg`, sincronizar com o GitHub (seção 3) e conferir se o `game.js` da aula 1 está lá.

### ⏱️ 10–22 min — Operadores matemáticos
No console, todos testam:

```js
console.log(10 + 5);   // 15  soma
console.log(10 - 5);   // 5   subtração
console.log(10 * 5);   // 50  multiplicação
console.log(10 / 5);   // 2   divisão
console.log(7 / 2);    // 3.5 (JS NÃO arredonda sozinho)
console.log(7 % 2);    // 1   resto da divisão (o "sobra")
```

Depois, **precedência** — a conta não é da esquerda para a direita:

```js
console.log(2 + 3 * 4);     // 14  (multiplica primeiro)
console.log((2 + 3) * 4);   // 20  (parênteses mandam)
```

Mensagem-chave: na dúvida, **use parênteses** para deixar a intenção clara.

### ⏱️ 22–35 min — O herói entra na conta
Recupere o objeto `heroi` (ele já existe no `game.js`). Vamos calcular a **força total** — quanto o herói "vale" somando ataque e nível:

```js
let forcaTotal = heroi.ataque + heroi.nivel * 2;
console.log(`Força total do herói: ${forcaTotal}`);
```

Agora o mundo age sobre ele. Uma **armadilha** no chão da masmorra causa dano:

```js
let dano = 25;
heroi.vida = heroi.vida - dano;
console.log(`Armadilha! O herói perdeu ${dano} de vida.`);
console.log(`Vida agora: ${heroi.vida}`);
```

> **Ponto importante para explicar:** `heroi` foi declarado com `const`, mas mudar `heroi.vida` **é permitido**. O `const` tranca o *nome* da variável, não o *conteúdo* do objeto. Podemos alterar as propriedades à vontade.

Apresente o atalho **atribuição composta**:

```js
heroi.vida -= 10;   // exatamente o mesmo que: heroi.vida = heroi.vida - 10
console.log(`Levou outro golpe. Vida: ${heroi.vida}`);
```

### ⏱️ 35–45 min — Curar e medir a vida
O herói descansa e recupera vida com `+=`:

```js
heroi.vida += 30;
console.log(`Depois de descansar, vida: ${heroi.vida}`);
```

E aqui a `vidaMaxima` (que criamos lá na aula 1) mostra sua utilidade: calcular o **percentual de vida**.

```js
let percentual = (heroi.vida / heroi.vidaMaxima) * 100;
console.log(`Vida: ${percentual}% do total`);
```

> **Gancho para a Aula 04:** "E se a cura passar de 100? O herói fica com 130 de vida sendo que o máximo é 100?" Segure a curiosidade — resolver isso precisa de **decisões (if/else)**, que vêm em duas aulas.

### ⏱️ 45–52 min — Prática guiada
Cada aluno cria a **própria fórmula de poder** para o herói e a imprime — por exemplo:

```js
let poder = heroi.ataque * 2 + heroi.defesa + heroi.nivel * 5;
console.log(`Poder de combate: ${poder}`);
```

Depois, simular o herói **levando 3 golpes seguidos** (usando `-=`) e imprimir a vida a cada golpe.

### ⏱️ 52–58 min — Ponto de save
Commit + push das mudanças. Mensagem sugerida: `Aula 02: heroi calcula dano, forca e cura`. (Fluxo detalhado na Aula 01, seções 4 e 10.)

### ⏱️ 58–60 min — Fechamento
Recapitule: operadores, precedência, alterar propriedade, `+=`/`-=`, percentual. Gancho da Aula 03: *"Estamos repetindo as mesmas contas na mão. Na próxima aula vamos ensinar o herói a fazer isso sozinho, com **funções** — blocos de código reutilizáveis."*

---

## 5. Código final da aula (referência)

```js
const heroi = {
  nome: "Aragorn",
  classe: "Guerreiro",
  vida: 100,
  vidaMaxima: 100,
  ataque: 15,
  defesa: 8,
  nivel: 1,
  xp: 0,
  ouro: 0,
  estaVivo: true
};

let forcaTotal = heroi.ataque + heroi.nivel * 2;
console.log(`Força total do herói: ${forcaTotal}`);

let dano = 25;
heroi.vida -= dano;
console.log(`Armadilha! Perdeu ${dano} de vida. Vida: ${heroi.vida}`);

heroi.vida += 30;
console.log(`Descansou. Vida: ${heroi.vida}`);

let percentual = (heroi.vida / heroi.vidaMaxima) * 100;
console.log(`Vida: ${percentual}% do total`);
```

---

## 6. Dever de casa — solução de referência

```js
let poder = heroi.ataque * 2 + heroi.defesa + heroi.nivel * 5;
console.log(`Poder de combate: ${poder}`);

console.log(`Vida inicial: ${heroi.vida}`);
heroi.vida -= 12;
console.log(`Golpe 1! Vida: ${heroi.vida}`);
heroi.vida -= 20;
console.log(`Golpe 2! Vida: ${heroi.vida}`);
heroi.vida -= 8;
console.log(`Golpe 3! Vida: ${heroi.vida}`);
```

---

## 7. Erros comuns (fique de olho)

- **Esperar divisão inteira:** `7 / 2` dá `3.5`, não `3`. JS não arredonda sozinho.
- **Precedência ignorada:** `2 + 3 * 4` é `14`, não `20`. Parênteses resolvem.
- **`=+` em vez de `+=`:** trocar a ordem quebra o atalho. É `+=` e `-=`.
- **Número virou texto:** se por engano a vida for `"100"` (com aspas), `"100" - 5` pode dar resultado estranho ou `NaN`. Números vão **sem aspas**.
- **Confundir `const` com "imutável":** `const heroi` **não** impede mudar `heroi.vida`. O `const` trava o nome da variável, não as propriedades do objeto.

---

## 8. Dever de casa

1. Criar uma fórmula de **poder total** do herói (à escolha) e imprimir o resultado.
2. Simular o herói **perdendo vida em 3 golpes seguidos** com `-=`, imprimindo a vida a cada golpe.
3. **Ponto de save:** commit `Aula 02: dever de casa - poder e golpes` e push.

*Extra (opcional):* calcular e imprimir quantos pontos de vida faltam para o herói chegar à `vidaMaxima`.

---

## 9. Prévia da Aula 03

Vamos parar de repetir contas na mão e criar **funções**: blocos de código com nome que podemos reutilizar. Nasce a `mostrarFicha(personagem)` e a `criarHeroi(...)` — o herói começa a virar algo que dá para produzir em série (útil quando os inimigos chegarem).