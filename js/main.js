const sum  = (arr) => {
  return arr.reduce((prev, current, i, arr) => {
    const sarr = new Array();
    prev.forEach((obj, i) => {
      sarr.push(obj + current[i]);
    });
    return sarr
  }).reduce((prev, current, i, arr) => {
    return prev + current;
  });
}

const sentinelEdge = (pointer, range) => {
  if(pointer >= range) return 0;
  else if(pointer < 0) return range - 1;
  return pointer;
};

const sliceField = (field, i, j) => {
  return [-1, 0, 1].map(di => {
    return [-1, 0, 1].map(dj => {
      return field[sentinelEdge(i + di, field.length)][sentinelEdge(j + dj, field.length)];
    });
  });
};

const stepLife = (field) => {
  return field.map((row, i) => {
    return row.map((cell, j) =>{
      const data = sliceField(field, i, j);
      if(cell) {
        if(sum(data) > 4 || sum(data) < 3) return false;
        else return true;
      } else {
        if(sum(data) === 3) return true;
        else return false;
      }
    });
  });
};

const generateLife = (scale) => {
  return Array.from({length: scale}, () => {
    return Array.from({length: scale}, () => Math.random() > 0.8 ? true: false)
  })
};

const generateUniverse = () => {
  return [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
};

const draw = (life, ctx) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const xPixel = ctx.canvas.width / life.length;
  const yPixel = ctx.canvas.height / life[0].length
  life.forEach((row, x) => {
    row.forEach((cell, y) => {
      if(cell) ctx.fillRect(x * xPixel, y * yPixel, xPixel, yPixel);
    });
  });
};

const loop = (life, ctx) => {
  draw(life, ctx);
  setTimeout(() => {loop(stepLife(life), ctx);}, 0);
};

addEventListener('DOMContentLoaded', () => {
  const displaySize = 600
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');

  loop(generateLife(300), ctx);
  //loop(generateUniverse(), ctx);
});
