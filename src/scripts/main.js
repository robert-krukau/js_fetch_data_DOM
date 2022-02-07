'use strict';

const BASE_URL
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones';
const url = `${BASE_URL}.json`;

const body = document.querySelector('body');
const listOfPhones = document.createElement('ul');
const description = document.createElement('div');
const title = document.createElement('h2');
const titleDescr = document.createElement('h2');

listOfPhones.className = 'list';
description.className = 'list';

title.innerHTML = 'Phones List:';
titleDescr.innerHTML = 'Description:';

body.insertAdjacentElement('afterbegin', listOfPhones);
body.insertAdjacentElement('beforeend', description);
listOfPhones.insertAdjacentElement('afterbegin', title);
description.insertAdjacentElement('afterbegin', titleDescr);

const getPhones = () => {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          throw new Error(`${response.status} - ${response.statusText}`);
        }, 5000);
      }

      return response.json();
    });
};

const getPhonesDetails = (phones) => {
  listOfPhones.addEventListener('click', (e) => {
    const findDiv = body.querySelector('.details');
    const findImg = body.querySelector('.image');

    if (findDiv && findImg) {
      findDiv.remove();
      findImg.remove();
    }

    if (e.target.closest('li')) {
      const createDetails = document.createElement('p');
      const image = document.createElement('img');

      createDetails.classList.add('details');
      image.classList.add('image');

      const details = phones
        .filter(item => e.target.innerText === item.name);

      const phoneImgUrl
        = `https://mate-academy.github.io/phone-catalogue-static/`
        + `${details[0].imageUrl}`;

      createDetails.innerText = details[0].snippet;
      image.src = phoneImgUrl;
      image.alt = 'Phone image';
      description.append(createDetails);
      description.append(image);
    }
  });
};

const createList = (phones) => {
  phones.forEach(item => {
    listOfPhones.insertAdjacentHTML('beforeend', `
    <li class="list__item">${item.name}</li>
    `);
  });

  return phones;
};

getPhones()
  .then(phones => createList(phones))
  .then((item) => getPhonesDetails(item))
  .catch();
