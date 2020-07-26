var filas, columnas;
var ancho = 10;
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
    var vecinos = calcularVecinos();
    var newValue = determinarNuevoValorCell(vecinos);
    return new Cell(fila, columna, newValue);
  }

  function determinarNuevoValorCell(vecinos) {
    var newValue = 0;
    if (value === 0) {
      if (vecinos === 3) {
        newValue = 1;
      }

    }
    else {
      if (vecinos === 2 || vecinos === 3) {
        newValue = 1;
      }

    }
    return newValue;
  }

  function calcularVecinos() {
    var values = [];
    values.push(tryGetGridValueFor(columna - 1, fila - 1));
    values.push(tryGetGridValueFor(columna, fila - 1));
    values.push(tryGetGridValueFor(columna + 1, fila - 1));

    values.push(tryGetGridValueFor(columna + 1, fila));
    values.push(tryGetGridValueFor(columna - 1, fila));

    values.push(tryGetGridValueFor(columna - 1, fila + 1));
    values.push(tryGetGridValueFor(columna, fila + 1));
    values.push(tryGetGridValueFor(columna + 1, fila - 1));
    // console.log(values)
    return values.reduce((a, b) => a + b, 0);
  }

  function tryGetGridValueFor(columna, fila) {
    var cell = grid[index(columna, fila)];
    if (cell) {
      return cell.value
    }
    return 0;
  }
}