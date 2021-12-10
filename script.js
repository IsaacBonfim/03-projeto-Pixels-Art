const board = document.getElementById('pixel-board');

for (let i = 0; i < 5; i += 1) {
  const line = document.createElement('div');

  line.style.height = `${40}px`;

  for (let j = 0; j < 5; j += 1) {
    const square = document.createElement('div');

    square.className = 'pixel';

    line.appendChild(square);
  }

  board.appendChild(line);
}
