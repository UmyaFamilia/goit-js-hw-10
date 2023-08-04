import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loadingMessage = document.querySelector('.loder-wrapper');
const wrongMessage = document.querySelector('.error');
select.classList.add('hidden');
wrongMessage.classList.add('hidden');
let array = [];

console.log(select);
function makeAList(promise) {
  promise
    .then(data => {
      select.classList.remove('hidden');
      loadingMessage.classList.add('hidden');
      array = data.map(a => {
        return ` <option value=${a.id}>${a.name}</option>`;
      });
      select.insertAdjacentHTML('beforeend', array.join(''));
      new SlimSelect({
        select: '#single',
      });
    })
    .catch(error => {
      console.log('error while receiving data ' + error);
      loadingMessage.classList.add('hidden');
      wrongMessage.classList.remove('hidden');
    });
}

makeAList(fetchBreeds());

select.addEventListener('change', evnt => {
  loadingMessage.classList.remove('hidden');
  catInfo.innerHTML = '';
  let string = '';
  let value = evnt.target.value;

  fetchCatByBreed(value)
    .then(a => {
      loadingMessage.classList.add('hidden');
      string = `<img src="${a[0].url}"width=300px alt="${value}" />
      <h2>${a[0].breeds[0].name}</h2>
      <p>${a[0].breeds[0].description}</p>
      <p>${a[0].breeds[0].temperament}</p>`;

      catInfo.insertAdjacentHTML('beforeend', string);
    })
    .catch(() => {
      wrongMessage.classList.remove('hidden');
      loadingMessage.classList.add('hidden');
    });
});

// for the text
// let index = evnt.target.selectedIndex;
// let text = evnt.target.options[index].text;
//show this text
// console.log(text);
