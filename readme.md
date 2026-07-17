# ⚔️ A Masmorra

Um RPG de texto por turnos feito em **JavaScript puro**, construído do zero ao longo de um curso de 16 aulas. O herói desce uma masmorra andar por andar, enfrenta inimigos em combate por turnos, sobe de nível, compra itens na loja e encara o chefe final — com o progresso salvo no navegador.

Este repositório é construído **uma aula por vez**. Cada aula termina com um commit (um "ponto de save"), então o histórico do Git conta a história inteira do projeto, do primeiro `console.log` ao jogo completo.

---

## ▶️ Como rodar

Não precisa instalar nada além de um navegador.

1. Garanta que `index.html` e `game.js` estão **na mesma pasta**.
2. Dê um clique duplo em `index.html` para abrir no navegador.
3. Se algo não funcionar, abra o console com **F12** para ver mensagens de erro.

> Dica: no VS Code, a extensão **Live Server** ("Go Live") recarrega a página sozinha a cada alteração.

---

## 🎮 Como jogar

- **Novo Jogo** — começa uma nova partida (você escolhe o nome do herói).
- **Próximo Andar** — desce um andar; um novo inimigo aparece.
- **Atacar** — executa um turno de combate (você golpeia, o inimigo revida).
- **Usar Poção** — consome uma poção do inventário para recuperar vida.
- **Loja** — gaste ouro em poções, armas e armaduras entre as batalhas.

Vença cada andar para ganhar **XP** e **ouro**. Junte XP para **subir de nível** e ficar mais forte. O progresso é salvo automaticamente a cada andar vencido — feche e reabra que o jogo continua de onde parou.

---

## 📁 Estrutura do projeto

```
meu-rpg/
├── index.html   # a página: ficha, inimigo, botões, log e o visual (CSS)
├── game.js      # toda a lógica do jogo
└── README.md    # este arquivo
```

---

## 🧠 Conceitos de JavaScript por aula

| Aula | Tema | Conceito |
|------|------|----------|
| 01 | Criando o herói | variáveis, tipos, objetos |
| 02 | Dando músculos ao herói | operadores e cálculos |
| 03 | Ações reutilizáveis | funções (`return`, parâmetros) |
| 04 | O herói toma decisões | `if / else`, comparações |
| 05 | Surge um inimigo | objetos e comparação de dados |
| 06 | O primeiro golpe | funções que alteram dados |
| 07 | A primeira batalha | laço `while` |
| 08 | Inventário e andares | arrays e laço `for` |
| 09 | Descendo a masmorra | juntando tudo, `return` no fluxo |
| 10 | Personagens com comportamento | métodos e `this` |
| 11 | Níveis e experiência | progressão (XP) |
| 12 | A loja e a economia | arrays de objetos, ouro |
| 13 | Saindo do console | DOM (`getElementById`, `innerHTML`) |
| 14 | Botões e cliques | eventos (`addEventListener`) |
| 15 | Salvando o progresso | `localStorage`, `JSON` |
| 16 | O chefe final | integração e apresentação |

**Marcos:** a Aula 07 já entrega a primeira batalha jogável; a Aula 12 fecha o jogo no console; a Aula 14 o torna clicável; a Aula 16 é o jogo final.

---

## 💾 O ritual do "ponto de save"

Toda aula termina com um commit e um push — o "ponto de save" do projeto:

```bash
git add .
git commit -m "Aula XX: descrição do que foi feito"
git push
```

Assim como no jogo, cada commit é um ponto ao qual você pode voltar se algo der errado.

---

## 🚀 Depois do curso

Ideias para continuar evoluindo o jogo:

- **Visual:** barras animadas, ícones, sons.
- **Conteúdo:** habilidades por classe (Mago, Arqueiro), mais itens e andares.
- **Código:** funções de array (`map`, `filter`, `find`) e classes (`class`).
- **Publicar:** hospedar no GitHub Pages e compartilhar o link.

---

*Projeto educacional — JavaScript na Prática.*