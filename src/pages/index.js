import './index.css';
import PopupWithImage from '../scripts/PopupWithImage.js';
import { langArr } from '../scripts/lang.js';
import { event } from 'jquery';

const popupImg = document.querySelector('.popup');
const picturesPleas = Array.from(document.querySelectorAll('.place__image'));
const picturesGallerys = Array.from(
  document.querySelectorAll('.gallery__image')
);

let pictureIndex = -1;
let pictureFull;

const popupWithImage = new PopupWithImage(popupImg);

popupWithImage.setEventListeners();

for (const picture of picturesPleas) {
  picture.addEventListener('click', (event) => {
    event.preventDefault();
    pictureIndex = picturesPleas.indexOf(picture);
    pictureFull = picturesPleas[pictureIndex].cloneNode();
    const link = pictureFull.src;
    const name = pictureFull.alt;
    popupWithImage.open(name, link);
  });
}

//it'll do just fine )
for (const picture of picturesGallerys) {
  picture.addEventListener('click', (event) => {
    event.preventDefault();
    pictureIndex = picturesGallerys.indexOf(picture);
    pictureFull = picturesGallerys[pictureIndex].cloneNode();
    const link = pictureFull.src;
    const name = pictureFull.alt;
    popupWithImage.open(name, link);
  });
}

//--------------------Langwitch---------------------------------------
const ruLink = document.querySelector('#ru');
const enLink = document.querySelector('#en');
const allLang = ['en', 'ru'];

ruLink.addEventListener('click', function (event) {
  event.preventDefault();
  if (enLink.classList.contains('header__lang-link_activ')) {
    enLink.classList.remove('header__lang-link_activ');
  }
  ruLink.classList.add('header__lang-link_activ');
  changeURLLanguage();
  changeLanguage();
});

enLink.addEventListener('click', function (event) {
  event.preventDefault();
  if (ruLink.classList.contains('header__lang-link_activ')) {
    ruLink.classList.remove('header__lang-link_activ');
  }
  enLink.classList.add('header__lang-link_activ');
  changeURLLanguage();
  changeLanguage();
});

function changeURLLanguage() {
  let activeLang = document.querySelector('.header__lang-link_activ');
  let lang = activeLang.name;
  location.href = window.location.pathname + '#' + lang;
}

function changeLanguage() {
  let activeLang = document.querySelector('.header__lang-link_activ');
  let hash = window.location.hash;
  hash = hash.substr(1);
  if (!allLang.includes(hash)) {
    location.href = window.location.pathname + '#en';
    location.reload();
  }
  activeLang.name = hash;
  document.querySelector('title').innerHTML = langArr['lead__title'][hash];
  for (let key in langArr) {
    let elem = document.querySelector('.lng-' + key);
    if (elem) {
      elem.innerHTML = langArr[key][hash];
    }
  }
}
