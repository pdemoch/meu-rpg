# Aula 10 — Personagens com Comportamento (Métodos e `this`)

**Curso:** JavaScript na Prática — Construindo um Jogo de RPG
**Duração:** 60 minutos
**Aula:** 10 de 16

---

## 1. Objetivos da aula

Ao final da aula, o aluno será capaz de:

- Entender o que é um **método** (uma função que vive dentro de um objeto).
- Usar a palavra **`this`** para o objeto se referir a si mesmo.
- Transformar ações "sobre si" (curar, checar vida, mostrar ficha) em métodos.
- Ler código mais limpo: `heroi.curar(20)` em vez de `curar(heroi, 20)`.

**Entregável da aula:** herói e inimigo agora têm **comportamento próprio** — métodos como `heroi.estaVivo()` e `heroi.curar(...)`, deixando o código mais legível.

---

## 2. Onde estamos

O jogo já roda, mas as ações do personagem são funções externas: `curar(heroi, 20)`, `estaVivo(heroi)`. Faz mais sentido dizer que **o herói se cura** e **o herói sabe se está vivo**. Quando uma função pertence a um objeto e age sobre ele, chamamos de **método** — e ela usa `this` para falar de si mesma.

> Vamos manter `atacar(atacante, alvo)` como função separada, porque envolve **dois** personagens (uma interação). Métodos combinam melhor com ações que o personagem faz **sobre si mesmo**.

---

## 3. Preparação (início da aula)

Abrir o `meu-rpg`, **sincronizar** e trabalhar no `game.js` (F12).

---

## 4. Roteiro minuto a minuto

### ⏱️ 0–5 min — Recap e a ideia de método
Contraste `curar(heroi, 20)` com `heroi.curar(20)`. Qual lê melhor? Isso motiva os métodos.

### ⏱️ 5–8 min — Abrir e sincronizar

### ⏱️ 8–18 min — Um método e o `this`
Um método é uma função **dentro** do objeto. Dentro dela, `this` é o próprio objeto:

```js
const guerreiro = {
  nome: "Aragorn",
  vida: 100,
  apresentar() {
    console.log(`Eu sou ${this.nome} e tenho ${this.vida} de vida.`);
  }
};

guerreiro.apresentar();
```

Explique: `this.nome` significa "o `nome` deste objeto aqui". Sem `this`, o método não sabe de quem está falando.

### ⏱️ 18–35 min — Dando métodos ao herói e ao inimigo
Vamos mover `estaVivo`, `curar` e `mostrarFicha` para **dentro** das fábricas. O herói:

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
    estaVivo() {
      return this.vida > 0;
    },
    curar(quantidade) {
      this.vida += quantidade;
      if (this.vida > this.vidaMaxima) {
        this.vida = this.vidaMaxima;
      }
      console.log(`${this.nome} recuperou vida: ${this.vida}/${this.vidaMaxima}`);
    },
    mostrarFicha() {
      console.log(`=== ${this.nome} (Nv.${this.nivel}) ===`);
      console.log(`Vida: ${this.vida}/${this.vidaMaxima} | Ataque: ${this.ataque} | Defesa: ${this.defesa}`);
    }
  };
}
```

Dê ao inimigo os mesmos métodos de "si mesmo" (para o combate funcionar igual nos dois):

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
    estaVivo() {
      return this.vida > 0;
    }
  };
}
```

> **Nota ao professor:** repetimos o método `estaVivo` nas duas fábricas. Existe forma de evitar essa repetição (protótipos/classes), mas isso fica fora do escopo do curso — aqui a clareza vale mais que a economia de linhas.

### ⏱️ 35–45 min — Atualizando a batalha
Agora `batalhar` usa os métodos. Note como fica mais legível:

```js
function batalhar(heroi, inimigo) {
  while (heroi.estaVivo() && inimigo.estaVivo()) {
    atacar(heroi, inimigo);
    if (!inimigo.estaVivo()) break;
    atacar(inimigo, heroi);
  }
  if (heroi.estaVivo()) {
    heroi.xp += inimigo.xpRecompensa;
    heroi.ouro += inimigo.ouroRecompensa;
    console.log(`Vitória! +${inimigo.xpRecompensa} XP, +${inimigo.ouroRecompensa} ouro.`);
    return true;
  }
  return false;
}
```

Teste: `heroi.mostrarFicha();`, `heroi.curar(30);`, `batalhar(heroi, goblin);`.

### ⏱️ 45–52 min — Prática guiada
Cada aluno adiciona **um método próprio** ao herói — por exemplo `descansar()` que cura 25, ou `resumo()` que imprime nome, nível e ouro. Testar com `heroi.metodo()`.

### ⏱️ 52–58 min — Ponto de save
Commit + push. Mensagem: `Aula 10: metodos e this nos personagens`.

### ⏱️ 58–60 min — Fechamento
Recapitule: método, `this`, ação sobre si mesmo, legibilidade. Gancho da Aula 11: *"O herói ganha XP mas ele não faz nada com isso ainda. Na próxima aula, acumular XP suficiente faz o herói **subir de nível** e ficar mais forte."*

---

## 5. Código final da aula

O `game.js` agora tem `criarHeroi` e `criarInimigo` com métodos, e a `batalhar` reescrita usando `.estaVivo()` (bloco acima). A função `atacar(atacante, alvo)` permanece como está.

```js
const heroi = criarHeroi("Aragorn", "Guerreiro");
const goblin = criarInimigo("Goblin", 40, 10, 3);

heroi.mostrarFicha();
heroi.curar(50);
console.log(`Herói vivo? ${heroi.estaVivo()}`);
batalhar(heroi, goblin);
```

---

## 6. Dever de casa — solução de referência

```js
// método extra adicionado dentro de criarHeroi:
descansar() {
  this.curar(25);
  console.log(`${this.nome} descansou.`);
}

// uso:
heroi.descansar();
```

---

## 7. Erros comuns (fique de olho)

- **Esquecer o `this`:** dentro do método, escrever `nome` em vez de `this.nome` dá erro — o método não acha a variável.
- **Chamar o método sem `()`:** `heroi.estaVivo` (sem parênteses) devolve a função, não o resultado.
- **Vírgula entre métodos:** dentro do objeto, cada método/propriedade é separado por vírgula.
- **Mexer no objeto errado:** `this` sempre se refere ao objeto **à esquerda do ponto** na chamada.

---

## 8. Dever de casa

1. Adicionar ao herói um método próprio (ex.: `descansar()` ou `resumo()`).
2. Reescrever ao menos um teste antigo usando os novos métodos (`heroi.curar(...)`, `heroi.estaVivo()`).
3. **Ponto de save:** commit `Aula 10: dever de casa - metodo proprio` e push.

*Extra (opcional):* um método `estaEmPerigo()` que devolve `true` se a vida estiver abaixo de 30% da máxima.

---

## 9. Prévia da Aula 11

**Níveis e experiência.** Vamos criar os métodos `ganharXp(...)` e `subirDeNivel()`: ao juntar XP suficiente, o herói sobe de nível, ganha atributos e recupera a vida. A progressão que dá sentido a continuar descendo.