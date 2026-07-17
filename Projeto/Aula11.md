# Aula 11 — Níveis e Experiência

**Curso:** JavaScript na Prática — Construindo um Jogo de RPG
**Duração:** 60 minutos
**Aula:** 11 de 16

---

## 1. Objetivos da aula

Ao final da aula, o aluno será capaz de:

- Criar um método `ganharXp(...)` que acumula experiência.
- Implementar `subirDeNivel()` aumentando os atributos.
- Usar um **`while`** para tratar **vários** níveis de uma vez.
- Integrar a progressão ao fluxo de batalha.

**Entregável da aula:** o herói agora **evolui** — vencer batalhas dá XP, e XP suficiente sobe o nível, aumentando vida, ataque e defesa.

---

## 2. Onde estamos

Desde a Aula 09 o herói ganha XP ao vencer, mas esse número não fazia nada. Hoje ele passa a **importar**: acumular XP suficiente faz o herói **subir de nível** e ficar mais forte — a recompensa que dá sentido a continuar descendo a masmorra.

---

## 3. Preparação (início da aula)

Abrir o `meu-rpg`, **sincronizar** e trabalhar no `game.js` (F12). Precisamos do herói com métodos (Aula 10).

---

## 4. Roteiro minuto a minuto

### ⏱️ 0–5 min — Recap e o objetivo
Mostre que `heroi.xp` sobe mas nada acontece. Frase: "hoje o XP vira poder de verdade."

### ⏱️ 5–8 min — Abrir e sincronizar

### ⏱️ 8–18 min — A regra do nível
Defina a regra em palavras antes do código: **para subir do nível N, é preciso `N × 100` de XP.** Ao subir: +20 vida máxima, +5 ataque, +2 defesa, e a vida enche.

### ⏱️ 18–35 min — Os métodos ganharXp e subirDeNivel
Adicione ao herói (dentro de `criarHeroi`):

```js
subirDeNivel() {
  this.xp -= this.nivel * 100;
  this.nivel += 1;
  this.vidaMaxima += 20;
  this.ataque += 5;
  this.defesa += 2;
  this.vida = this.vidaMaxima;
  console.log(`⭐ ${this.nome} subiu para o nível ${this.nivel}!`);
},
ganharXp(quantidade) {
  this.xp += quantidade;
  console.log(`${this.nome} ganhou ${quantidade} XP (total: ${this.xp}).`);
  while (this.xp >= this.nivel * 100) {
    this.subirDeNivel();
  }
}
```

Destaque o **`while`** dentro de `ganharXp`: se o herói ganhar 250 XP de uma vez, ele pode subir **dois níveis** seguidos. O laço continua subindo enquanto sobrar XP suficiente. É o `while` da Aula 07 resolvendo um problema novo.

### ⏱️ 35–45 min — Integrando à batalha
Na `batalhar`, troque a soma manual de XP pela chamada do método (que já cuida do level up):

```js
if (heroi.estaVivo()) {
  heroi.ganharXp(inimigo.xpRecompensa);
  heroi.ouro += inimigo.ouroRecompensa;
  console.log(`Vitória! +${inimigo.ouroRecompensa} ouro.`);
  return true;
}
```

Teste rodando a masmorra e acompanhando o herói subir de nível ao longo dos andares.

### ⏱️ 45–52 min — Prática guiada
Cada aluno testa dando um XP grande de uma vez (`heroi.ganharXp(500)`) e observa os múltiplos level ups. Depois, ajusta a regra (ex.: `N × 80`) e discute como isso muda o ritmo do jogo.

### ⏱️ 52–58 min — Ponto de save
Commit + push. Mensagem: `Aula 11: sistema de XP e niveis`.

### ⏱️ 58–60 min — Fechamento
Recapitule: acumular XP, subir de nível, `while` para vários níveis. Gancho da Aula 12: *"O herói junta ouro, mas não tem onde gastar. Na próxima aula abrimos a **loja**: poções, armas e armaduras."*

---

## 5. Código final da aula

Os métodos `ganharXp` e `subirDeNivel` foram adicionados dentro de `criarHeroi`, e a `batalhar` passou a chamar `heroi.ganharXp(...)` na vitória (blocos acima).

```js
const heroi = criarHeroi("Aragorn", "Guerreiro");
heroi.ganharXp(120);   // sobe para o nível 2
heroi.mostrarFicha();
heroi.ganharXp(500);   // pode subir vários níveis
heroi.mostrarFicha();
```

---

## 6. Dever de casa — solução de referência

```js
const heroi2 = criarHeroi("Boromir", "Guerreiro");
const masmorra = [
  criarInimigo("Rato Gigante", 20, 6, 1),
  criarInimigo("Goblin", 40, 10, 3),
  criarInimigo("Orc", 60, 14, 6)
];
explorarMasmorra(heroi2, masmorra);
heroi2.mostrarFicha();   // conferir nível e atributos após a campanha
```

---

## 7. Erros comuns (fique de olho)

- **Não descontar o XP:** esquecer o `this.xp -= this.nivel * 100` faz o herói subir de nível infinitamente (o `while` nunca para).
- **`if` no lugar de `while`:** com `if`, um XP enorme sobe só **um** nível; com `while`, sobe todos os que couberem.
- **Ordem no subirDeNivel:** aumentar `nivel` antes de calcular o custo do XP muda a conta. Desconte o XP primeiro.
- **Esquecer de encher a vida** ao subir de nível — deixa o herói forte, mas ferido.

---

## 8. Dever de casa

1. Fazer o herói percorrer uma masmorra e mostrar a ficha no fim, conferindo o nível.
2. Testar `ganharXp` com um valor grande e provar os **múltiplos** level ups.
3. **Ponto de save:** commit `Aula 11: dever de casa - progressao` e push.

*Extra (opcional):* fazer o XP necessário crescer mais rápido (ex.: `nivel * nivel * 50`) e comparar o ritmo.

---

## 9. Prévia da Aula 12

A **loja**. Vamos criar uma lista de itens com preço e efeito, uma função `comprar(...)` que checa o ouro, e o uso de poções do inventário. Com isso, o **loop econômico** do jogo fica completo no console.