const board = document.getElementById('pixel-board');
const valorBase = document.querySelector('#board-size');
const valorStorage = localStorage.getItem('Board');
const botaoTamanho = document.getElementById('generate-board');
const cores = document.querySelectorAll('.color');
const coresRandom = document.querySelectorAll('.random');
const pixels = document.getElementsByClassName('pixel');

// O código para criar a função que gera as cores aleatórias eu consultei no site abaixo:
// https://www.ti-enxame.com/pt/javascript/gerador-de-cores-aleatorias/967183954/

function geraCores() {
  const aux = '0123456789ABCDEF';
  let cor = '#';

  for (let i = 0; i < 6; i += 1) {
    cor += aux[Math.floor(Math.random() * 16)];
  }

  return `${cor}FF`;
}

function alocaCores() {
  for (let i = 0; i < coresRandom.length; i += 1) {
    const cor = geraCores();

    coresRandom[i].style.backgroundColor = cor;
    coresRandom[i].style.boxShadow = `${-3}px ${-3}px ${3}px ${cor}`;
    coresRandom[i].style.boxShadow += `,${-3}px ${3}px ${3}px ${cor}`;
    coresRandom[i].style.boxShadow += `,${3}px ${-3}px ${3}px ${cor}`;
    coresRandom[i].style.boxShadow += `,${3}px ${3}px ${3}px ${cor}`;
  }
  return coresRandom;
}

window.onload = alocaCores();

function aumentaTamanho() {
  if (valorBase.value === '') {
    window.alert('Board inválido!');
  } else if (valorBase.value >= 0 && valorBase.value < 5) {
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
  let base = 0;

  if (valorStorage === null) {
    base = 5;
  } else {
    valorBase.value = valorStorage;
    base = valorStorage;
  }

  return base;
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
