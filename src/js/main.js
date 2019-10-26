const canvasSize = 512;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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
    // uncomment if need transpareny
  );
};

const fetchFile = fileName => {
  return fetch("/src/data/" + fileName)
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

const fillCanvas = (squareInRow, data) => {
  const squareSize = calculateSquareSize(squareInRow);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let colorHandler;
  if (typeof data[0][0] !== "string") colorHandler = rgbaToHex;
  else colorHandler = elem => elem;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      ctx.fillStyle = "#" + colorHandler(data[i][j]);
      ctx.fillRect(j * squareSize, i * squareSize, squareSize, squareSize);
    }
  }
};

document.querySelector(".element4x4").addEventListener("click", () => {
  const squareInRow = 4;
  fetchFile("4x4.json").then(data => {
    fillCanvas(squareInRow, data);
  });
});

document.querySelector(".element32x32").addEventListener("click", () => {
  const squareInRow = 32;
  fetchFile("32x32.json").then(data => {
    fillCanvas(squareInRow, data);
  });
});
