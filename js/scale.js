const STEP = 25;
const MIN = 25;
const MAX = 100;
const DEFAULT = 100;

const elementUpload = document.querySelector('.img-upload');
const smallerBtn = elementUpload.querySelector('.scale__control--smaller');
const biggerBtn = elementUpload.querySelector('.scale__control--bigger');
const imgPreviw = elementUpload.querySelector('.img-upload__preview img');
const scaleInput = elementUpload.querySelector('.scale__control--value');

//========================

// функция для изменения размеров изображения
const scaleImg = (value) => {
  // в тег <img> записываем свойство transform: scale(значение делить на 100) - scale от 0 до 1.
  imgPreviw.style.transform =`scale(${value / 100})`;

  // в поле записываем значение ползунка
  scaleInput.value = `${value}%`;
};

//функция для клика по кнопке "-"
const onSmallerClick = (value) => {
  // выбирает максимум между значением ползунка и минимальным
  scaleImg(Math.max(parseInt(scaleInput.value, 10) - STEP, MIN));
};

//функция для клика по кнопке "+"
const onBiggerClick = (value) => {
  // выбирает минимум между значением ползунка и максимальным
  scaleImg(Math.min(parseInt(scaleInput.value, 10) + STEP, MAX));
};

//функция для сброса в начальное положение, вызывается при закрытии формы и нажатии на "Оригинал"
const resetScale = () => {
  scaleImg(DEFAULT);
};

smallerBtn.addEventListener('click', onSmallerClick);
biggerBtn.addEventListener('click', onBiggerClick);

export {resetScale};