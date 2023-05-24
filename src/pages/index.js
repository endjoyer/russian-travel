import "./index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import { langArr } from "../utils/lang.js";

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
const allLang = ["ru", "en"];

const changeURLLanguage = (lang) => {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  history.pushState({}, "", url.toString());
};

const changeLanguage = () => {
  const activeLang = document.querySelector(".header__lang-link_activ");
  let lang = new URL(window.location.href).searchParams.get("lang");
  console.log(lang);
  if (!allLang.includes(lang)) {
    lang = "en";
    changeURLLanguage(lang);
  }
  activeLang.name = lang;
  document.querySelector("title").innerHTML = langArr["lead__title"][lang];
  for (let key in langArr) {
    const elem = document.querySelector(`.lng-${key}`);
    if (elem) {
      elem.innerHTML = langArr[key][lang];
    }
  }
};

const handleLangClick = (event) => {
  event.preventDefault();
  const activeLang = document.querySelector(".header__lang-link_activ");
  if (event.target === activeLang) return;
  activeLang.classList.remove("header__lang-link_activ");
  event.target.classList.add("header__lang-link_activ");
  changeURLLanguage(event.target.id);
  changeLanguage();
};

ruLink.addEventListener("click", handleLangClick);
enLink.addEventListener("click", handleLangClick);
