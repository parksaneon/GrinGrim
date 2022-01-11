import regenerato from 'regenerator-runtime';

const $canvas = document.querySelector('.my-canvas');

const convertToBlob = base64 => {
  const decodImg = atob(base64.split(',')[1]);
  const array = [];
  for (let i = 0; i < decodImg.length; i++) {
    array.push(decodImg.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {
    type: 'image/png'
  });
};

const uploadCanvas = async () => {
  const image = $canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
  const file = convertToBlob(image);
  const fileName = 'canvas' + new Date().getTime() + '.png';
  const formData = new FormData();
  formData.append('file', file, fileName);
  await fetch('http://localhost:8000/upload', {
    method: 'POST',
    body: formData,
    processData: false,
    contentType: false
  });
};

document.querySelector('.save').addEventListener('click', uploadCanvas);
