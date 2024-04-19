'use strict';

const url = 'https://random-cat-fact.p.rapidapi.com/';
const catUrl = 'https://api.thecatapi.com/v1/images/search';
const img = document.querySelector('.cat-img');
const catApiKey =
  'live_6cpIxSuSxUHSkNp8aqtO7CWxoJLegIt3GMocBkuozwlKaJp5maCN4MTXBQ0S2D08';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'd858f5a957msh8cdf7e524bb148ap1da477jsn8f9c403a446e',
    'X-RapidAPI-Host': 'random-cat-fact.p.rapidapi.com',
  },
};

function getCatFact() {
  Promise.all([
    fetch(url, options),
    fetch(catUrl),
    {
      headers: {
        'x-api-key': catApiKey,
      },
    },
  ])
    .then(([factRes, imgRes]) => Promise.all([factRes.json(), imgRes.json()]))
    .then(([factData, imgData]) => {
      postCatFact(factData);
      postCatImg(imgData);
    })
    .catch((error) => console.error('Error fetching data:', error));
}

function postCatFact(post) {
  const catFact = document.querySelector('.fact');
  catFact.innerHTML = `${post.fact}`;
}

function postCatImg(imgData) {
  img.src = imgData[0].url;
}

document.querySelector('.btn').addEventListener('click', getCatFact);
