const board = document.getElementById('pixel-board');
const valorBase = document.querySelector('#board-size');
const valorStorage = localStorage.getItem('Board');
const botaoTamanho = document.getElementById('generate-board');

function aumentaTamanho() {
  if (valorBase.value === '') {
    window.alert('Board inválido!');
  } else if (valorBase.value >= 1 && valorBase.value < 5) {
    localStorage.setItem('Board', 5);
  } else if (valorBase.value > 50) {
    localStorage.setItem('Board', 50);
  } else {
    localStorage.setItem('Board', valorBase.value);
  }

  window.location.reload();
}

botaoTamanho.addEventListener('click', aumentaTamanho);

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

const cores = document.querySelectorAll('.color');
const pixels = document.getElementsByClassName('pixel');

function corInicial() {
  const corIni = document.getElementsByClassName('selected');

  sessionStorage.setItem('Background', corIni[0].style.backgroundColor);
}

window.onload = corInicial;

function selecaoDeCores(evento) {
  const cor = evento.target;

  for (let i = 0; i < cores.length; i += 1) {
    cores[i].classList.remove('selected');
  }

  cor.classList.add('selected');
  sessionStorage.setItem('Background', evento.target.style.backgroundColor);
}

for (let i = 0; i < cores.length; i += 1) {
  cores[i].addEventListener('click', selecaoDeCores);
}

function colorir(evento) {
  const pix = evento.target;

  pix.style.backgroundColor = sessionStorage.getItem('Background');
}

for (let i = 0; i < pixels.length; i += 1) {
  pixels[i].addEventListener('click', colorir);
}

// ^ Configuração do botão para recarregar as configurações padrão.
const botao = document.getElementById('clear-board');

function limpaStorage() {
  sessionStorage.clear();

  window.location.reload();
}

botao.addEventListener('click', limpaStorage);
