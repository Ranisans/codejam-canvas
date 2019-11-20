const canvasSize = 512;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const dataPath =
  "https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/";

canvas.width = canvasSize;
canvas.height = canvasSize;

const calculateSquareSize = squareRowCount => {
  return Math.round(canvasSize / squareRowCount);
};

const rgbaToHex = rgbArray => {
  const toHex = element => {
    const hex = element.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  return (
    toHex(rgbArray[0]) + toHex(rgbArray[1]) + toHex(rgbArray[2])
    //  + toHex(rgbArray[3] || 255)
    // uncomment if need transparently
  );
};

const fetchFile = fileName => {
  return fetch(dataPath + fileName)
    .then(response => {
      if (!response.ok) {
        throw Error;
      } else {
        return response.json();
      }
    })
    .catch(() => {
      alert("Load file error!");
      return "error";
    });
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const fillCanvas = (squareInRow, data) => {
  if (data === "error") return;
  const squareSize = calculateSquareSize(squareInRow);

  clearCanvas();

  let colorHandler;
  if (typeof data[0][0] !== "string") {
    colorHandler = rgbaToHex;
  } else {
    colorHandler = elem => elem;
  }

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      ctx.fillStyle = "#" + colorHandler(data[i][j]);
      ctx.fillRect(j * squareSize, i * squareSize, squareSize, squareSize);
    }
  }
};

document.querySelector(".change_data").addEventListener("click", (e) => {
  const { size } = e.target.dataset;
  let squareInRow;
  let fileName;
  if (size === '4') {
    squareInRow = 4;
    fileName = '4x4';
  } else if (size === '32') {
    squareInRow = 32;
    fileName = '32x32';
  } else if (size === '256') {
    clearCanvas();
    const baseImage = new Image();
    baseImage.src = dataPath + "image.png";
    baseImage.onload = () => {
      ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    };
    return;
  } else { return; }

  fetchFile(`${fileName}.json`).then(data => {
    fillCanvas(squareInRow, data);
  });
});
