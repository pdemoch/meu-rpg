# Aula 01 — Criando o Herói

**Curso:** JavaScript na Prática — Construindo um Jogo de RPG
**Duração:** 60 minutos
**Aula:** 1 de 16

---

## 1. Objetivos da aula

Ao final da aula, o aluno será capaz de:

- Entender o que é JavaScript e como executá-lo no navegador.
- Criar o projeto no **VS Code** e organizá-lo em arquivos.
- Escrever suas primeiras linhas de código e ver a saída no console.
- Usar **variáveis** e os **tipos básicos** de dados (texto, número, booleano).
- Agrupar dados relacionados dentro de um **objeto**.
- Criar e exibir a "ficha" de um personagem de RPG.
- Salvar o progresso no **GitHub** com o primeiro *commit* (o "ponto de save" do jogo).

**Entregável da aula:** cada aluno termina com o *seu próprio herói* montado em código, com a ficha impressa no console, e o projeto **publicado no seu repositório do GitHub**.

---

## 2. Onde vamos chegar (visão do projeto)

O curso inteiro constrói **um jogo de RPG de texto**, uma aula de cada vez. Mostre isso logo no começo para dar sentido a tudo — o aluno precisa enxergar o destino.

Roteiro geral das 16 aulas (pode ajustar conforme o ritmo da turma):

| Aula | Tema | Conceito de JS |
|------|------|----------------|
| **01** | Criando o herói | variáveis, tipos, objetos |
| 02 | Atributos e cálculos | operadores, números |
| 03 | Ações do herói | funções |
| 04 | O herói está vivo? | if / else |
| 05 | Surge um inimigo | comparações, mais objetos |
| 06 | Sistema de ataque | funções que alteram dados |
| 07 | Combate por turnos | laços (while) |
| 08 | Inventário e inimigos | arrays |
| 09 | Batalha completa | juntando tudo |
| 10 | Herói inteligente | métodos em objetos |
| 11 | Níveis e experiência | lógica de progressão |
| 12 | Loja e moedas | economia do jogo |
| 13 | Mostrando na tela | HTML + DOM |
| 14 | Botões de ação | eventos (clique) |
| 15 | Salvando o jogo | localStorage |
| 16 | Projeto final | revisão e apresentação |

> **Dica de professor:** mantenha esse mapa visível na parede ou no slide inicial de cada aula. Marcar "onde estamos" a cada encontro mantém a turma motivada.

> **Ritual do curso — "Ponto de Save":** toda aula termina com um `commit` + `push` no GitHub. Use a metáfora do RPG: *cada commit é um ponto de save do jogo*. Se algo der errado depois, dá pra voltar a um save anterior. Isso ensina versionamento de forma natural, repetida 16 vezes.

---

## 3. Preparação (antes da aula)

**Ferramentas (já instaladas nas máquinas):** VS Code e Git. Além disso, cada aluno precisa de um **navegador** (Chrome, Edge ou Firefox) e de uma **conta no GitHub**.

**Recomendação forte — resolva a autenticação antes da aula:** o primeiro `push` exige login no GitHub. O caminho mais tranquilo é entrar pela própria interface do VS Code: menu **Contas** (ícone de pessoa no canto inferior esquerdo) → **Sign in to GitHub** → confirmar no navegador. Se todos já estiverem logados quando a aula começar, você economiza uns 10 minutos de dor de cabeça. Se possível, peça para criarem a conta do GitHub como tarefa prévia.

**Estrutura do projeto que vamos montar na aula:**

```
meu-rpg/
├── index.html
└── game.js
```

O `index.html` é só a "casca" que carrega o JavaScript. Todo o código do jogo vive no `game.js`, e a saída aparece no console do navegador (F12). Conteúdo do `index.html`:

```html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <title>Meu RPG</title>
  </head>
  <body>
    <h1>Abra o console (F12) para jogar</h1>
    <script src="game.js"></script>
  </body>
</html>
```

> **Como rodar:** basta abrir o `index.html` no navegador (clique duplo no arquivo) e abrir o console com **F12**. A cada mudança no `game.js`, salve e recarregue a página (F5). *Opcional:* se a extensão **Live Server** estiver instalada, dá para clicar em "Go Live" e a página recarrega sozinha — mas não é obrigatório para a aula 1.

---

## 4. Roteiro minuto a minuto

### ⏱️ 0–5 min — Boas-vindas e o projeto
Apresente o curso: "Nas próximas 16 aulas vamos construir um jogo de RPG do zero, só com JavaScript." Mostre o mapa das aulas. Diga que **hoje criamos o herói e publicamos ele no GitHub**.

### ⏱️ 5–15 min — Montando o projeto (VS Code + GitHub)
Passo a passo, todos juntos ("faça igual a mim"):

1. No **github.com**, clicar em **New repository** → nome `meu-rpg` → marcar **Add a README** → **Create repository**.
2. No **VS Code**: `Ctrl+Shift+P` → **Git: Clone** → colar a URL do repositório → escolher uma pasta. Abrir o projeto clonado.
3. Criar os dois arquivos: `index.html` (colar a casca da seção 3) e `game.js` (vazio por enquanto).
4. Abrir o `index.html` no navegador e o console com **F12**.

> Se a autenticação do GitHub não foi feita antes, é aqui que o VS Code vai pedir login. Por isso vale MUITO resolver isso antes da aula (ver seção 3).

### ⏱️ 15–20 min — Primeira linha de código
Explique em uma frase o que é JavaScript: a linguagem que dá lógica e vida às páginas — e é com ela que faremos o jogo. No `game.js`, todos digitam, salvam e recarregam a página:

```js
console.log("Olá, aventureiro! Bem-vindo ao mundo de JavaScript.");
```

Comemore — eles acabaram de programar. Explique que `console.log(...)` **mostra mensagens** no console (F12).

### ⏱️ 20–32 min — Variáveis e tipos de dados
Nosso herói precisa de informações. Vamos guardá-las em **variáveis**:

```js
let nome = "Aragorn";     // texto (string) — sempre entre aspas
let vida = 100;           // número (number)
let ataque = 15;          // número
let nivel = 1;            // número
let estaVivo = true;      // verdadeiro ou falso (boolean)
```

Pontos a explicar:
- **`let`** cria uma variável que pode mudar de valor depois.
- **`const`** cria uma que **não muda** (constante).
- Três tipos básicos hoje: **string** (texto), **number** (número), **boolean** (`true`/`false`).

Mostre como ver o valor de uma variável:

```js
console.log(nome);
console.log(vida);
console.log(estaVivo);
```

### ⏱️ 32–43 min — Do bagunçado ao organizado: objetos
Provoque a turma: "Temos 5 variáveis soltas só de um herói. E se tivermos 10 heróis?" A resposta é **agrupar** tudo dentro de um único objeto:

```js
const heroi = {
  nome: "Aragorn",
  classe: "Guerreiro",
  vida: 100,
  ataque: 15,
  defesa: 8,
  nivel: 1,
  estaVivo: true
};
```

Explique que um **objeto** guarda vários dados relacionados, cada um com um **nome (propriedade)** e um **valor**. Para acessar cada dado, usamos o ponto:

```js
console.log(heroi.nome);   // Aragorn
console.log(heroi.vida);   // 100
console.log(heroi);        // mostra o herói inteiro
```

Agora montamos a **ficha do herói**:

```js
console.log("=== FICHA DO HERÓI ===");
console.log("Nome: " + heroi.nome);
console.log("Classe: " + heroi.classe);
console.log("Vida: " + heroi.vida);
console.log("Ataque: " + heroi.ataque);
console.log("Nível: " + heroi.nivel);
```

Apresente também uma forma mais elegante de juntar texto e variável, o **template literal** (crase + `${}`):

```js
console.log(`Herói: ${heroi.nome}, o ${heroi.classe} (nível ${heroi.nivel})`);
```

### ⏱️ 43–50 min — Prática guiada: seu próprio herói
Cada aluno recria o objeto com **valores próprios**: nome, classe (Guerreiro, Mago, Arqueiro…) e atributos à escolha. Circule pela sala ajudando. Peça para imprimirem a ficha.

### ⏱️ 50–57 min — Ponto de save: primeiro commit no GitHub
O grande momento. "Vamos salvar nosso jogo pela primeira vez." Pelo painel **Controle do Código-Fonte** do VS Code (ícone de ramificação na barra lateral):

1. Escrever a mensagem do commit: `Aula 01: cria o heroi`.
2. Clicar em **Commit** (o ✓ no topo).
3. Clicar em **Sync Changes** / **Push** para enviar ao GitHub.
4. Abrir o repositório no navegador e ver o `game.js` publicado lá.

Reforce a metáfora: *acabamos de criar nosso primeiro ponto de save.* (Comandos equivalentes de terminal estão no Apêndice, seção 10.)

### ⏱️ 57–60 min — Fechamento
Recapitule: projeto, variável, tipos, objeto, ficha e o primeiro commit. Gancho da próxima aula: *"Nosso herói existe, mas ainda não faz nada. Na próxima aula ele vai começar a calcular dano e força — vamos dar músculos a ele."*

---

## 5. Código final da aula (referência)

```js
console.log("Olá, aventureiro! Bem-vindo ao mundo de JavaScript.");

const heroi = {
  nome: "Aragorn",
  classe: "Guerreiro",
  vida: 100,
  ataque: 15,
  defesa: 8,
  nivel: 1,
  estaVivo: true
};

console.log("=== FICHA DO HERÓI ===");
console.log(`Nome: ${heroi.nome}`);
console.log(`Classe: ${heroi.classe}`);
console.log(`Vida: ${heroi.vida}`);
console.log(`Ataque: ${heroi.ataque}`);
console.log(`Defesa: ${heroi.defesa}`);
console.log(`Nível: ${heroi.nivel}`);
console.log(`Está vivo? ${heroi.estaVivo}`);
```

---

## 6. Dever de casa — solução de referência (o vilão)

```js
const vilao = {
  nome: "Sauron",
  classe: "Senhor das Trevas",
  vida: 200,
  ataque: 30,
  defesa: 20,
  nivel: 10,
  estaVivo: true
};

console.log("=== FICHA DO VILÃO ===");
console.log(`${vilao.nome}, o ${vilao.classe} (nível ${vilao.nivel})`);
console.log(`Vida: ${vilao.vida} | Ataque: ${vilao.ataque} | Defesa: ${vilao.defesa}`);
```

---

## 7. Erros comuns (fique de olho)

- **Esquecer as aspas** em texto: `nome: Aragorn` dá erro; o certo é `"Aragorn"`.
- **Aspas em número:** `vida: "100"` vira texto e atrapalha cálculos nas próximas aulas. Número vai sem aspas.
- **Vírgula entre as propriedades** do objeto — cada linha do objeto termina em vírgula, exceto a última.
- Confundir `=` (atribuir valor) com `==`/`===` (comparar) — isso só aparece de fato na aula 4, mas já vale avisar.
- Chamar a propriedade errada: `heroi.Nome` ≠ `heroi.nome` (JavaScript diferencia maiúsculas de minúsculas).

---

## 8. Dever de casa

1. Criar um **vilão** para o jogo, em um novo objeto chamado `vilao`, com nome, classe e atributos próprios, e imprimir a ficha dele no console. (Referência na seção 6.)
2. **Fazer um novo ponto de save:** commit com a mensagem `Aula 01: dever de casa - cria o vilao` e push para o GitHub.

*Extra (opcional):* adicionar ao herói duas propriedades novas que não usamos em aula — por exemplo `arma` (texto) e `temMagia` (booleano).

---

## 9. Prévia da Aula 02

Vamos usar **operadores matemáticos** para calcular coisas: dano de um ataque, vida restante, força total do herói somando ataque + nível. O herói começa a ganhar comportamento.

---

## 10. Apêndice — Git pelo terminal (opcional)

Na aula 1, o painel **Controle do Código-Fonte** do VS Code (botões de Commit e Sync) é o caminho mais tranquilo para iniciantes. Mas se você preferir ensinar por linha de comando, o **ponto de save** equivale a:

```bash
git add .
git commit -m "Aula 01: cria o heroi"
git push
```

O que cada comando faz, em uma frase:

- `git add .` — separa as mudanças que vão entrar no save.
- `git commit -m "..."` — cria o ponto de save com um nome/descrição.
- `git push` — envia o save para o GitHub (a "nuvem").

Caso opte por **não** criar o repositório pelo site (seção 4) e sim começar local, o primeiro envio precisa conectar o repositório remoto uma única vez:

```bash
git init
git add .
git commit -m "Aula 01: cria o heroi"
git branch -M main
git remote add origin <URL-do-repositorio>
git push -u origin main
```

Da segunda vez em diante, basta o trio `add` → `commit` → `push`.

> **Sugestão:** adicione um arquivo `.gitignore` ao projeto quando o curso avançar (a partir do momento em que aparecerem pastas geradas, como `node_modules`). Na aula 1 ainda não é necessário.