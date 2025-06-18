function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
// Variáveis globais
let jardineiro;
let plantas = [];
let temperatura = 10;
let totalArvores = 0;
const META_ARVORES = 100;

class Jardineiro {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocidade = 5;
    this.tamanho = 30;
  }

  atualizar() {
    if (keyIsDown(LEFT_ARROW)) this.x -= this.velocidade;
    if (keyIsDown(RIGHT_ARROW)) this.x += this.velocidade;
    if (keyIsDown(UP_ARROW)) this.y -= this.velocidade;
    if (keyIsDown(DOWN_ARROW)) this.y += this.velocidade;
    
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height - this.tamanho);
  }

  mostrar() {
    fill(50, 205, 50);
    ellipse(this.x, this.y, this.tamanho);
  }
}

class Arvore {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tamanho = 40;
  }

  mostrar() {
    fill(34, 139, 34);
    rect(this.x - 10, this.y - this.tamanho, 20, this.tamanho);
    ellipse(this.x, this.y - this.tamanho, 50, 40);
  }
}

function setup() {
  createCanvas(600, 400);
  jardineiro = new Jardineiro(width / 2, height - 50);
  textAlign(LEFT, TOP);
}

function draw() {
  // Atualiza temperatura
  temperatura += (META_ARVORES - totalArvores) * 0.001;
  
  // Atualiza cor do fundo
  let corFundo = lerpColor(
    color(217, 112, 26),
    color(219, 239, 208),
    map(totalArvores, 0, META_ARVORES, 0, 1)
  );
  background(corFundo);
  
  // Elementos do jogo
  jardineiro.atualizar();
  jardineiro.mostrar();
  plantas.forEach(arvore => arvore.mostrar());
  
  // Interface
  mostrarInformacoes();
  verificarFimDeJogo();
}

function keyPressed() {
  if (key === 'p' && plantas.length < META_ARVORES) {
    plantas.push(new Arvore(jardineiro.x, jardineiro.y));
    totalArvores++;
    temperatura -= 0.5;
  }
}

function mostrarInformacoes() {
  fill(0);
  textSize(16);
  text(`Árvores: ${totalArvores}/${META_ARVORES}`, 20, 20);
  text(`Temperatura: ${temperatura.toFixed(1)}°C`, 20, 40);
  
  // Barra de progresso
  let progresso = map(totalArvores, 0, META_ARVORES, 0, width);
  fill(34, 139, 34);
  rect(0, height - 10, progresso, 10);
}

function verificarFimDeJogo() {
  if (totalArvores >= META_ARVORES) {
    telaFinal("Vitória! Planeta Salvo!");
  } else if (temperatura >= 50) {
    telaFinal("Game Over! Planeta Queimou!");
  }
}

function telaFinal(mensagem) {
  fill(0, 150);
  rect(0, 0, width, height);
  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER);
  text(mensagem, width/2, height/2);
  noLoop();
}
