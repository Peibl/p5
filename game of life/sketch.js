var filas, columnas;
var ancho = 20;
var grid = [];
var next = [];
var currentp;
function setup() {
  createCanvas(500, 500);
  background(89);
  filas = floor(width / ancho);
  columnas = floor(width / ancho);
  initGrid();
}

function initGrid() {
  for (var j = 0; j < filas; j++) {
    for (var i = 0; i < columnas; i++) {
      var cell = new Cell(j, i, floor(random(0, 2)));
      grid.push(cell);
    }
  }
}

function draw() {
  background(51);
  frameRate(20);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  calculateNextGrid();
}

function calculateNextGrid() {
  next = grid.map(it => it);
  for (var index = 0; index < next.length; index++) {
    next[index] = grid[index].nextValue();
  }
  grid = next.map(it => it);
}

function index(columna, fila) {
  if (columna < 0 || fila < 0 || columna > columnas - 1 || fila > filas - 1) {
    return -1
  }
  return columna + fila * columnas;
}

function Cell(fila, columna, value) {
  this.fila = fila;
  this.columna = columna;
  this.value = value;
  this.show = function () {
    var x = this.fila * ancho;
    var y = this.columna * ancho;
    noStroke();
    fill(255 * value);
    rect(x, y, ancho, ancho);
  }

  this.nextValue = function () {
    var topLeft = grid[index(columna - 1, fila - 1)];
    var top = grid[index(columna, fila - 1)];
    var topRight = grid[index(columna + 1, fila - 1)];

    var right = grid[index(columna + 1, fila)];
    var left = grid[index(columna - 1, fila)];

    var bottomLeft = grid[index(columna - 1, fila + 1)];
    var bottom = grid[index(columna, fila + 1)];
    var bottomRight = grid[index(columna + 1, fila + 1)];

    var vecinos = 0;
    if (top) {
      vecinos += top.value;
    }
    if (topLeft) {
      vecinos += topLeft.value;

    } if (topRight) {
      vecinos += topRight.value;
    }
    if (right) {
      vecinos += right.value;
    }

    if (left) {
      vecinos += left.value;
    }

    if (bottom) {
      vecinos += bottom.value;
    }

    if (bottomLeft) {
      vecinos += bottomLeft.value;
    }

    if (bottomRight) {
      vecinos += bottomRight.value;
    }
    console.log(vecinos);
    var newValue = 0;
    if (value === 0) {
      if (vecinos === 3) {
        newValue = 1;
      }

    } else {
      if (vecinos === 2 || vecinos === 3) {
        newValue = 1;
      }

    }

    return new Cell(fila, columna, newValue);
  }
}