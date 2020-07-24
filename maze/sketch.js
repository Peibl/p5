var filas, columnas;
var ancho = 20;
var grid = [];
var currentp;
var stack = [];
function setup() {
  createCanvas(400, 400);
  filas = floor(width / ancho);
  columnas = floor(width / ancho);
  for (var j = 0; j < filas; j++) {
    for (var i = 0; i < columnas; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  current = grid[0];
}

function draw() {
  background(51);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  current.visited = true;
  current.resaltar();
  var next = current.verificarVecinos();
  if (next) {
    next.visited = true;

    stack.push(current);

    removeWalls(current, next);

    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
}
function index(i, j) {
  if (i < 0 || j < 0 || i > columnas - 1 || j > filas - 1) {
    return -1
  }
  return i + j * columnas;
}

function Cell(fila, columna) {
  this.fila = fila;
  this.columna = columna;
  this.walls = [true, true, true, true];
  this.visited = false;

  this.resaltar = function () {
    var x = this.fila * ancho;
    var y = this.columna * ancho;
    noStroke();
    fill(0, 250, 0, 100);
    rect(x, y, ancho, ancho);
  }

  this.verificarVecinos = function () {
    var vecinos = [];
    var top = grid[index(fila, columna - 1)];
    var right = grid[index(fila + 1, columna)];
    var bottom = grid[index(fila, columna + 1)];
    var left = grid[index(fila - 1, columna)];

    if (top && !top.visited) {
      vecinos.push(top);
    }
    if (right && !right.visited) {
      vecinos.push(right);
    }
    if (bottom && !bottom.visited) {
      vecinos.push(bottom);
    }
    if (left && !left.visited) {
      vecinos.push(left);
    }

    if (vecinos.length > 0) {
      var r = floor(random(0, vecinos.length));

      return vecinos[r];
    } else {
      return undefined;
    }
  }

  this.show = function () {
    var x = this.fila * ancho;
    var y = this.columna * ancho;
    stroke(255);
    if (this.walls[0]) {
      line(x, y, x + ancho, y)
    }
    if (this.walls[1]) {
      line(x + ancho, y, x + ancho, y + ancho)
    }
    if (this.walls[2]) {
      line(x + ancho, y + ancho, x, y + ancho)
    }
    if (this.walls[3]) {
      line(x, y + ancho, x, y)
    }
    if (this.visited) {
      noStroke();
      fill(50, 0, 255, 100);
      rect(x, y, ancho, ancho);
    }

  }
}


function removeWalls(a, b) {
  var x = a.fila - b.fila;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.columna - b.columna;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}