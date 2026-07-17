# Aula 16 — O Chefe Final e a Apresentação

**Curso:** JavaScript na Prática — Construindo um Jogo de RPG
**Duração:** 60 minutos
**Aula:** 16 de 16

---

## 1. Objetivos da aula

Ao final da aula, o aluno será capaz de:

- Adicionar um **chefe** como andar final da masmorra.
- Criar uma **tela de vitória** e de game over.
- Dar **retoques finais** (equilíbrio e visual simples).
- **Apresentar** o próprio jogo, explicando o código que construiu.

**Entregável da aula:** o jogo **finalizado** — com começo, meio, chefe e fim — publicado no GitHub, pronto para mostrar.

---

## 2. Onde estamos

Ao longo de 15 aulas construímos herói, combate, masmorra, níveis, loja, tela, cliques e save. Hoje amarramos tudo com um **grande final** e celebramos: cada aluno tem um jogo funcional feito por ele mesmo. Esta aula é mais de **integração e fechamento** do que de conceitos novos.

---

## 3. Preparação (início da aula)

Abrir o `meu-rpg`, **sincronizar** e ter o jogo das aulas anteriores rodando na página.

---

## 4. Roteiro minuto a minuto

### ⏱️ 0–5 min — Recap do caminho
Passe rápido pelo mapa das 16 aulas e mostre o quanto o jogo evoluiu desde o `console.log("Olá")` da Aula 01. Reconhecimento importa.

### ⏱️ 5–8 min — Abrir e sincronizar

### ⏱️ 8–20 min — O chefe da masmorra
O chefe é um inimigo, só que bem mais forte, colocado como **último andar**:

```js
const chefe = criarInimigo("Senhor da Masmorra", 150, 20, 10);
chefe.nome = "☠ Senhor da Masmorra";
chefe.xpRecompensa = 200;
chefe.ouroRecompensa = 300;

const masmorra = [
  criarInimigo("Rato Gigante", 20, 6, 1),
  criarInimigo("Goblin", 40, 10, 3),
  criarInimigo("Esqueleto", 35, 12, 2),
  criarInimigo("Orc", 60, 14, 6),
  chefe
];
```

Discussão de design: o chefe deve ser vencível **se** o jogador usou a loja e subiu de nível — recompensando quem jogou bem.

### ⏱️ 20–32 min — Tela de vitória e de derrota
Detectar o fim do jogo e mostrar a mensagem certa:

```js
function verificarFimDeJogo(heroi, andarAtual, totalAndares) {
  if (!heroi.estaVivo()) {
    escreverLog("💀 GAME OVER — a masmorra venceu desta vez.");
    document.getElementById("btnAtacar").disabled = true;
    return true;
  }
  if (andarAtual >= totalAndares) {
    escreverLog("🏆 VITÓRIA! Você derrotou o Senhor da Masmorra!");
    return true;
  }
  return false;
}
```

Chame essa verificação depois de cada turno/andar.

### ⏱️ 32–40 min — Recomeçar de verdade (Novo Jogo)
Um botão "Novo Jogo" precisa reiniciar **tudo** — e aqui mora uma armadilha clássica. A lista `masmorra` é criada uma vez, e os inimigos dentro dela são **objetos**. Durante a partida, o dano é aplicado nesses objetos e a vida deles vai a zero. Se o "Novo Jogo" só reiniciar o herói e o andar, os inimigos **continuam mortos** da partida anterior — e o jogador atravessa os andares sem lutar.

A solução: transformar a criação da masmorra numa **função** e chamá-la de novo ao recomeçar.

```js
function criarMasmorra() {
  return [
    criarInimigo("Rato Gigante", 20, 6, 1),
    criarInimigo("Goblin", 40, 10, 3),
    criarInimigo("Esqueleto", 35, 12, 2),
    criarInimigo("Orc", 60, 14, 6),
    criarChefe()
  ];
}

let masmorra = criarMasmorra();   // substitui o "const masmorra = [...]" da Aula 08

function habilitarBotoes(ativo) {
  document.getElementById("btnAtacar").disabled = !ativo;
  document.getElementById("btnPocao").disabled = !ativo;
  document.getElementById("btnDescer").disabled = !ativo;
}

function novoJogo() {
  localStorage.removeItem("masmorra-save");
  heroi = criarHeroi("Aragorn", "Guerreiro");
  andarAtual = 0;
  inimigoAtual = null;
  masmorra = criarMasmorra();     // <- recria os inimigos com vida cheia
  habilitarBotoes(true);
  document.getElementById("log").innerHTML = "";
  renderTudo();
}
```

> **A lição por trás do bug:** objetos são **compartilhados por referência**. Reiniciar as variáveis do jogo não "desfaz" o dano guardado dentro dos objetos inimigos — é preciso criar objetos **novos**. Esse é um dos conceitos mais importantes de todo o curso, e vale destacá-lo bem.

### ⏱️ 40–46 min — Retoques finais
Sugestões de polimento (cada aluno escolhe uma ou duas):

- Um **`<style>`** simples no `index.html`: cor de fundo, fonte, barra de vida proporcional (largura em % da vida).
- Mensagem de boas-vindas com o nome do herói.
- Chamar `habilitarBotoes(false)` ao vencer ou perder, travando as ações no fim.
- Equilibrar os inimigos para o jogo ser justo.

### ⏱️ 46–54 min — Apresentações
Cada aluno (ou dupla) mostra o jogo rodando e explica **uma parte do código** que achou interessante. Roteiro rápido para eles seguirem:

1. Mostrar o jogo funcionando (uma batalha, uma compra, o chefe).
2. Abrir o `game.js` e explicar **uma** função à escolha.
3. Dizer o que mais gostaria de adicionar no futuro.

### ⏱️ 54–58 min — Ponto de save final
O último commit do curso. Mensagem sugerida: `Aula 16: chefe final e jogo completo`. Peça para conferirem o repositório no GitHub — está tudo lá, aula por aula, do primeiro commit ao último.

### ⏱️ 58–60 min — Encerramento
Recapitule a jornada e aponte caminhos: aprender mais sobre CSS para deixar o jogo bonito, funções de array (`map`, `filter`), ou começar um projeto próprio. O importante: eles construíram algo real, do zero.

---

## 5. Código final da aula (adicionado ao game.js)

```js
const chefe = criarInimigo("☠ Senhor da Masmorra", 150, 20, 10);
chefe.xpRecompensa = 200;
chefe.ouroRecompensa = 300;

function verificarFimDeJogo(heroi, andarAtual, totalAndares) {
  if (!heroi.estaVivo()) {
    escreverLog("💀 GAME OVER — a masmorra venceu desta vez.");
    document.getElementById("btnAtacar").disabled = true;
    return true;
  }
  if (andarAtual >= totalAndares) {
    escreverLog("🏆 VITÓRIA! Você derrotou o Senhor da Masmorra!");
    return true;
  }
  return false;
}
```

---

## 6. Checklist do jogo pronto

Ao final do curso, o jogo de cada aluno deve:

- [ ] Criar um herói com atributos (Aulas 1–3).
- [ ] Ter combate por turnos com dano calculado (Aulas 6–7).
- [ ] Descer uma masmorra de vários andares (Aulas 8–9).
- [ ] Dar XP e subir de nível (Aula 11).
- [ ] Ter loja e uso de itens (Aula 12).
- [ ] Mostrar tudo na tela, jogável por clique (Aulas 13–14).
- [ ] Salvar e continuar o progresso (Aula 15).
- [ ] Ter um chefe final e telas de vitória/derrota (Aula 16).

---

## 7. Erros comuns (fique de olho)

- **Chefe impossível ou fácil demais:** teste vencendo e perdendo; ajuste os números.
- **Esquecer de incluir o chefe na lista** `masmorra` — ele nunca aparece.
- **Fim de jogo não detectado:** sem chamar `verificarFimDeJogo`, o jogador continua clicando num jogo já encerrado.
- **Save antigo incompatível:** se a estrutura do herói mudou, um save velho pode dar erro — um botão "Novo Jogo" que limpa o save resolve.

---

## 8. Depois do curso (sugestões)

Para quem quiser continuar evoluindo o jogo:

1. **Visual:** aprender CSS para barras de vida, ícones e animações simples.
2. **Mais conteúdo:** habilidades por classe (Mago lança magia, Arqueiro acerta à distância), mais itens, mais andares.
3. **Código:** conhecer `map`, `filter` e `find` para trabalhar com listas de forma mais elegante; depois, classes (`class`) para não repetir métodos.
4. **Publicar:** hospedar o jogo (ex.: GitHub Pages) e compartilhar o link.

---

## Parabéns

De um `console.log("Olá")` na Aula 01 a um RPG completo com combate, progressão, loja, interface e save — tudo versionado no GitHub, commit a commit. Cada aluno tem, no fim, um projeto real no portfólio e a base para construir o que quiser em seguida.