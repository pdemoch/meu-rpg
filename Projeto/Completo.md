# Documento de Design — A Masmorra

**Projeto do curso:** JavaScript na Prática (16 aulas de 1h)
**Gênero:** RPG de texto por turnos, rodando no navegador

---

## 1. Conceito

O herói **desce uma masmorra andar por andar**. Cada andar tem um inimigo; a batalha é **por turnos**. Vencendo, o herói ganha **XP e ouro**, **sobe de nível** e pode passar na **loja** entre os andares. No último andar está o **chefe final**. Perdeu, volta ao último save.

Uma frase para os alunos: *"Quão fundo você consegue descer antes de cair?"*

---

## 2. Como é uma partida (estado final, aula 16)

1. A página abre com a **ficha do herói** — ou "Novo Jogo / Continuar" se houver save.
2. Botão **Descer** → aparece o inimigo do andar.
3. Combate: barras de vida do herói e do inimigo + botões **Atacar / Usar poção / Fugir**, com um **log** narrando cada turno.
4. Vitória → XP + ouro; ao cruzar o limite de XP, **sobe de nível** (atributos aumentam).
5. Entre andares → **loja**: gastar ouro em poções, arma ou armadura.
6. Último andar → **chefe**. Vencer = tela de vitória. Perder = game over → carrega o último save.
7. O jogo **salva sozinho** a cada andar (localStorage).

---

## 3. Modelo de dados (decidido agora para evitar refactor depois)

A coluna "aula" indica quando o campo é **introduzido e explicado** — não precisamos usar tudo de uma vez, mas o formato já nasce compatível com o futuro.

### Herói
| Campo | Tipo | Aula | Papel |
|-------|------|------|-------|
| `nome` | string | 01 | identidade |
| `classe` | string | 01 | Guerreiro / Mago / Arqueiro (cosmético + um leve ajuste de atributo) |
| `vida` | number | 01 | vida atual |
| `vidaMaxima` | number | 01 | teto para curar sem estourar |
| `ataque` | number | 01 | poder de dano |
| `defesa` | number | 01 | reduz o dano recebido |
| `nivel` | number | 01 | progressão |
| `xp` | number | 01 (=0) | experiência acumulada |
| `ouro` | number | 01 (=0) | moeda |
| `estaVivo` | boolean | 01 | vivo/morto |
| `inventario` | array | **08** | itens carregados (entra junto com arrays) |

> Na aula 1, `xp`, `ouro` e `vidaMaxima` entram como números simples ("começam em zero / cheio"). O `inventario` só aparece na aula 8, junto com o conceito de array, para não introduzir algo sem explicação.

### Inimigo (mesmo formato do herói, propositalmente)
`nome`, `vida`, `vidaMaxima`, `ataque`, `defesa`, `xpRecompensa`, `ouroRecompensa`.

### Item (loja / inventário)
`nome`, `tipo` (`"consumivel"` | `"arma"` | `"armadura"`), `preco`, `efeito` (quanto cura ou o bônus de atributo).

---

## 4. Sistemas e regras (mantidos simples de propósito)

- **Dano:** `dano = atacante.ataque - alvo.defesa`, com **mínimo de 1**.
- **Combate:** turnos alternados (herói ataca, inimigo revida) até a vida de um chegar a 0.
- **Nível:** limite de XP por nível = `nivel * 100`. Ao subir: `vidaMaxima += 20`, `ataque += 5`, `defesa += 2`, `vida = vidaMaxima`, `nivel++`.
- **Economia:** vitória dá ouro; loja com 3–4 itens (poção, arma melhor, armadura).
- **Masmorra:** uma **lista de andares**; cada andar aponta um inimigo; o último é o chefe (mais forte).
- **Save:** o estado do herói + andar atual em localStorage.

---

## 5. As 16 aulas → o que o jogo faz ao final de cada uma

| Aula | Constrói | Conceito de JS | O jogo, ao final da aula |
|------|----------|----------------|--------------------------|
| 01 | Herói + ficha | variáveis, tipos, objetos | existe um herói com ficha |
| 02 | Cálculos de atributos | operadores, números | calcula força/dano bruto |
| 03 | Ações reutilizáveis | funções | `criarHeroi()`, `mostrarFicha()` |
| 04 | Estados do herói | if / else | reage à vida (crítico/saudável), vivo/morto |
| 05 | Surge o inimigo | comparações, + objetos | herói vs inimigo lado a lado |
| 06 | Golpe | funções que alteram dados | `atacar(a, alvo)` tira vida |
| 07 | Turnos | laços (while) | **1ª batalha jogável** |
| 08 | Inventário + andares | arrays | lista de andares e itens; log de batalha |
| 09 | Batalha fechada | juntando tudo | `batalhar()` com log e recompensas |
| 10 | Herói "inteligente" | métodos em objetos | `heroi.atacar()`, código limpo |
| 11 | Progressão | XP e nível | vence → XP → sobe de nível |
| 12 | Loja | economia | **loop completo funciona no console** |
| 13 | Tela | HTML + DOM | ficha e log aparecem na página |
| 14 | Interação | eventos (clique) | **jogo clicável** (Atacar/Poção/Descer) |
| 15 | Persistência | localStorage | Novo Jogo / Continuar |
| 16 | Chefe + acabamento | revisão | **jogo final + apresentação** |

**Marcos de motivação:** aula 7 já entrega a primeira batalha jogável; aula 12 fecha o loop no console; aula 14 vira clicável; aula 16 é o jogo pronto.

---

## 6. Escopo — o que fica de fora (para caber em 16 aulas)

**Dentro:** um herói, combate 1x1 por turnos, ~8 andares + chefe, loja com poucos itens, níveis, save local, interface de texto/HTML simples.

**Fora (proteção do cronograma):** multiplayer, sprites/animação, som, IA de inimigo complexa, múltiplos mapas, backend/banco de dados. As **classes** (Guerreiro/Mago/Arqueiro) ficam como um leve ajuste de atributo inicial — não viram sistemas de habilidades diferentes.
