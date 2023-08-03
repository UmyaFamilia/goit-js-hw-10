import { fetchBreeds, fetchCatByBreed } from '../cat-api';
let array = [];
const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

function makeAList(promise) {
  promise
    .then(data => {
      array = data.map(a => {
        return ` <option value=${a.id}>${a.name}</option>`;
      });
      select.insertAdjacentHTML('beforeend', array.join(''));
    })
    .catch(error => {
      console.log('error while receiving data ' + error);
    });
}

makeAList(fetchBreeds());

select.addEventListener('change', evnt => {
  catInfo.innerHTML = '';
  let string = '';
  let value = evnt.target.value;

  fetchCatByBreed(value).then(a => {
    string = `<img src="${a[0].url}"width=300px alt="${value}" />
      <h2>${a[0].breeds[0].name}</h2>
      <p>${a[0].breeds[0].description}</p>
      <p>${a[0].breeds[0].temperament}</p>`;

    catInfo.insertAdjacentHTML('beforeend', string);
  });
});

// for the text
// let index = evnt.target.selectedIndex;
// let text = evnt.target.options[index].text;
//show this text
// console.log(text);
