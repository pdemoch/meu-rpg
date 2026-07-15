console.log("Olá, aventureiro! Bem-vindo ao mundo de JavaScript.");

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

console.log("=== FICHA DO HERÓI ===");
console.log(`Nome: ${heroi.nome}`);
console.log(`Classe: ${heroi.classe}`);
console.log(`Vida: ${heroi.vida}`);
console.log(`Ataque: ${heroi.ataque}`);
console.log(`Defesa: ${heroi.defesa}`);
console.log(`Nível: ${heroi.nivel}`);
console.log(`Está vivo? ${heroi.estaVivo}`);