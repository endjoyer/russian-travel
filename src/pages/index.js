import "./index.css";
import PopupWithImage from "../scripts/PopupWithImage.js";
import { langArr } from "../scripts/lang.js";

const popupImg = document.querySelector(".popup");
const picturesPleas = Array.from(document.querySelectorAll(".place__image"));
const picturesGallerys = Array.from(
  document.querySelectorAll(".gallery__image")
);

let pictureIndex = -1;
let pictureFull;

const popupWithImage = new PopupWithImage(popupImg);

popupWithImage.setEventListeners();

picturesPleas.forEach((picture) => {
  picture.addEventListener("click", (event) => {
    event.preventDefault();
    pictureIndex = picturesPleas.indexOf(picture);
    pictureFull = picture.cloneNode();
    const link = pictureFull.src;
    const name = pictureFull.alt;
    popupWithImage.open(name, link);
  });
});

picturesGallerys.forEach((picture) => {
  picture.addEventListener("click", (event) => {
    event.preventDefault();
    pictureIndex = picturesGallerys.indexOf(picture);
    pictureFull = picture.cloneNode();
    const link = pictureFull.src;
    const name = pictureFull.alt;
    popupWithImage.open(name, link);
  });
});

//--------------------Langwitch---------------------------------------
const ruLink = document.querySelector("#ru");
const enLink = document.querySelector("#en");
const allLang = ["en", "ru"];

const changeURLLanguage = () => {
  const activeLang = document.querySelector(".header__lang-link_activ");
  const lang = activeLang.name;
  location.href = `${window.location.pathname}#${lang}`;
};

const changeLanguage = () => {
  const activeLang = document.querySelector(".header__lang-link_activ");
  let hash = window.location.hash.substr(1);
  if (!allLang.includes(hash)) {
    location.href = `${window.location.pathname}#en`;
    location.reload();
  }
  activeLang.name = hash;
  document.querySelector("title").innerHTML = langArr["lead__title"][hash];
  for (let key in langArr) {
    const elem = document.querySelector(`.lng-${key}`);
    if (elem) {
      elem.innerHTML = langArr[key][hash];
    }
  }
};

const handleLangClick = (event) => {
  event.preventDefault();
  const activeLang = document.querySelector(".header__lang-link_activ");
  if (event.target === activeLang) return;
  activeLang.classList.remove("header__lang-link_activ");
  event.target.classList.add("header__lang-link_activ");
  changeURLLanguage();
  changeLanguage();
};

ruLink.addEventListener("click", handleLangClick);
enLink.addEventListener("click", handleLangClick);
