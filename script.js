const board = document.getElementById('pixel-board');

const valorBase = document.querySelector('#base');

function ampliaTabela(evento) {
  localStorage.setItem('valorBase.value', evento.target.value);

  window.location.reload();
}

const valorStorage = localStorage.getItem('valorBase.value');

function inicializaBase() {
  if (valorStorage !== null) {
    valorBase.value = valorStorage;
  }

  return valorBase.value;
}

function criaTabela() {
  const base = inicializaBase();

  for (let i = 0; i < base; i += 1) {
    const line = document.createElement('div');

    line.style.height = `${40}px`;

    for (let j = 0; j < base; j += 1) {
      const square = document.createElement('div');

      square.className = 'pixel';

      line.appendChild(square);
    }

    board.appendChild(line);
  }
  return null;
}

window.onload = criaTabela();

valorBase.addEventListener('click', ampliaTabela);
valorBase.addEventListener('keyup', ampliaTabela);
