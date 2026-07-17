# Aula 05 — Surge um Inimigo

**Curso:** JavaScript na Prática — Construindo um Jogo de RPG
**Duração:** 60 minutos
**Aula:** 5 de 16

---

## 1. Objetivos da aula

Ao final da aula, o aluno será capaz de:

- Criar um **inimigo** como objeto, no **mesmo formato** do herói.
- Escrever uma função `criarInimigo(...)` que produz inimigos em série.
- **Reaproveitar** as funções `mostrarFicha` e `calcularPoder` para o inimigo.
- **Comparar** dois personagens e decidir quem leva vantagem.

**Entregável da aula:** um Goblin (e outros inimigos) na masmorra, com ficha exibida pela mesma função do herói, e uma comparação de força entre os dois.

---

## 2. Onde estamos

Temos um herói que calcula, cura e sabe seu estado. Mas um RPG precisa de **conflito**. Hoje entra o primeiro inimigo. A grande sacada: se o inimigo tiver o **mesmo formato** do herói, todas as funções que já escrevemos funcionam nele **de graça**. Isso mostra na prática por que padronizamos a estrutura dos personagens lá na Aula 01.

---

## 3. Preparação (início da aula)

Abrir o `meu-rpg`, **sincronizar** com o GitHub e trabalhar no `game.js` com o console (F12). As funções das aulas 3 e 4 já devem estar no arquivo.

---

## 4. Roteiro minuto a minuto

### ⏱️ 0–5 min — Recap e o gancho
Relembre que o herói está pronto, mas sozinho. Frase: *"Toda masmorra tem monstros. Vamos criar o primeiro."*

### ⏱️ 5–8 min — Abrir e sincronizar
Abrir o projeto e trazer a última versão.

### ⏱️ 8–20 min — A função criarInimigo
O inimigo é um objeto com **os mesmos campos** do herói (mais as recompensas que ele dá ao ser derrotado):

```js
function criarInimigo(nome, vida, ataque, defesa) {
  return {
    nome: nome,
    classe: "Monstro",
    vida: vida,
    vidaMaxima: vida,
    ataque: ataque,
    defesa: defesa,
    nivel: 1,
    xpRecompensa: 20,
    ouroRecompensa: 15,
    estaVivo: true
  };
}

const goblin = criarInimigo("Goblin", 40, 10, 3);
```

Explique: `vidaMaxima` recebe o mesmo valor de `vida` (o inimigo começa cheio). As recompensas (`xpRecompensa`, `ouroRecompensa`) ainda não são usadas — entram em cena lá pela Aula 09/11, mas já deixamos previstas.

### ⏱️ 20–30 min — Reaproveitamento (o grande momento)
Sem escrever nada novo, a `mostrarFicha` funciona no inimigo, porque ele tem o mesmo formato:

```js
mostrarFicha(goblin);
mostrarFicha(heroi);
```

Reforce a lição: **código reutilizável** economiza trabalho. Uma função bem feita serve para qualquer personagem com a estrutura certa. `calcularPoder(goblin)` também funciona na hora.

### ⏱️ 30–42 min — Quem leva vantagem?
Comparar os dois usando o que aprendemos na Aula 04:

```js
function compararForca(a, b) {
  let poderA = calcularPoder(a);
  let poderB = calcularPoder(b);
  if (poderA > poderB) {
    console.log(`${a.nome} leva vantagem (${poderA} vs ${poderB}).`);
  } else if (poderB > poderA) {
    console.log(`${b.nome} leva vantagem (${poderB} vs ${poderA}).`);
  } else {
    console.log(`${a.nome} e ${b.nome} estão equilibrados.`);
  }
}

compararForca(heroi, goblin);
```

### ⏱️ 42–50 min — Prática guiada
Cada aluno cria **dois ou três inimigos diferentes** (ex.: Esqueleto, Orc, Rato Gigante) com atributos variados, mostra a ficha de cada um e compara com o herói usando `compararForca`.

### ⏱️ 50–56 min — Ponto de save
Commit + push. Mensagem: `Aula 05: criarInimigo e compararForca`.

### ⏱️ 58–60 min — Fechamento
Recapitule: objeto no mesmo formato, reaproveitamento de funções, comparação entre personagens. Gancho da Aula 06: *"Herói e inimigo estão frente a frente, mas ninguém desferiu um golpe ainda. Na próxima aula, o primeiro ataque de verdade."*

---

## 5. Código final da aula (adicionado ao game.js)

```js
function criarInimigo(nome, vida, ataque, defesa) {
  return {
    nome: nome,
    classe: "Monstro",
    vida: vida,
    vidaMaxima: vida,
    ataque: ataque,
    defesa: defesa,
    nivel: 1,
    xpRecompensa: 20,
    ouroRecompensa: 15,
    estaVivo: true
  };
}

function compararForca(a, b) {
  let poderA = calcularPoder(a);
  let poderB = calcularPoder(b);
  if (poderA > poderB) {
    console.log(`${a.nome} leva vantagem (${poderA} vs ${poderB}).`);
  } else if (poderB > poderA) {
    console.log(`${b.nome} leva vantagem (${poderB} vs ${poderA}).`);
  } else {
    console.log(`${a.nome} e ${b.nome} estão equilibrados.`);
  }
}

const goblin = criarInimigo("Goblin", 40, 10, 3);
mostrarFicha(goblin);
compararForca(heroi, goblin);
```

---

## 6. Dever de casa — solução de referência

```js
const esqueleto = criarInimigo("Esqueleto", 30, 12, 2);
const orc = criarInimigo("Orc", 60, 14, 6);

mostrarFicha(esqueleto);
mostrarFicha(orc);

compararForca(heroi, esqueleto);
compararForca(heroi, orc);
```

---

## 7. Erros comuns (fique de olho)

- **Formato diferente do herói:** esquecer um campo (ex.: `vidaMaxima` ou `nivel`) faz a `mostrarFicha` imprimir `undefined`. O inimigo deve seguir o mesmo molde.
- **Ordem dos argumentos:** em `criarInimigo(nome, vida, ataque, defesa)`, trocar `vida` com `ataque` cria um monstro sem sentido. Atenção à ordem.
- **Esquecer o `return`** dentro de `criarInimigo` — sem ele, a função não devolve o inimigo.
- **Reusar variável de laço/nome já existente** por engano, sobrescrevendo o herói.

---

## 8. Dever de casa

1. Criar **dois inimigos novos** com `criarInimigo(...)`, atributos à sua escolha.
2. Mostrar a ficha dos dois e usar `compararForca` contra o herói.
3. **Ponto de save:** commit `Aula 05: dever de casa - novos inimigos` e push.

*Extra (opcional):* uma função `descreverInimigo(inimigo)` que imprime uma frase de apresentação ("Um Goblin rosnando bloqueia o caminho...").

---

## 9. Prévia da Aula 06

O primeiro **golpe**. Vamos criar a função `atacar(atacante, alvo)`: o dano será `ataque - defesa` (com mínimo de 1), e a vida do alvo cai de verdade. É a peça central do combate — na aula seguinte ela vira uma batalha completa por turnos.