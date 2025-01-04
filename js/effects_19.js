// ДЗ 9-2 по видео модуля 9 №19
const effects = [
  {
    name: 'none',
    effect: {
      style: '',
      unit: '',
    },
    sliderOptions: {
      min: 0,
      max: 100,
      step: 1,
    },
  },

  {
    name: 'chrome',
    effect: {
      style: 'grayscale',
      unit: ' ',
    },
    sliderOptions: {
      min: 0,
      max: 1,
      step: 0.1,
    },
  },

  {
    name: 'sepia',
    effect: {
      style: 'sepia',
      unit: ' ',
    },
    sliderOptions: {
      min: 0,
      max: 1,
      step: 0.1,
    },
  },

  {
    name: 'marvin',
    effect: {
      style: 'invert',
      unit: '%',
    },
    sliderOptions: {
      min: 0,
      max: 100,
      step: 1,
    },
  },

  {
    name: 'phobos',
    effect: {
      style: 'blur',
      unit: 'px',
    },
    sliderOptions: {
      min: 0,
      max: 3,
      step: 0.1,
    },
  },

  {
    name: 'heat',
    effect: {
      style: 'brightness',
      unit: ' ',
    },
    sliderOptions: {
      min: 1,
      max: 3,
      step: 0.1,
    },
  },
];
//=========================
// секция
const elementUpload = document.querySelector('.img-upload');

// редактируемое изображение
const imgPreview = elementUpload.querySelector('.img-upload__preview img');

// список эффектов
// почему не ul.effects__list
const effests = elementUpload.querySelector('.effects');

// контейннер для слайдера и инпута - на него вешается 'hidden'
const sliderContainer = elementUpload.querySelector('.img-upload__effect-level');

// слайдер
const slider = sliderContainer.querySelector('.effect-level__slider');

// инпут
const inputSlider = sliderContainer.querySelector('.effect-level__value');
//=========================
// выбранный эффект, поумолчанию - 'none' - Оригинал
let chosenEffect = effects[0];

// console.log(chosenEffect);
// console.log(chosenEffect.name);

//======================

//8
const isDefault = () => chosenEffect.name === 'none';

//++++++++++++++++++++++++++++ самая сложная ф-ция!
//5
const setImgStyle = () => {
  if (isDefault()) {
    // console.log('5-setImgStyle, if, ');
    imgPreview.style.filter = null;
    return;
  }

  // console.log('5-setImgStyle, НЕ if');

  const st = chosenEffect.effect.style;
  const un = chosenEffect.effect.unit;
  const value = inputSlider.value;

  // console.log(chosenEffect.effect.unit);
  // console.log(st);
  // console.log(un);
  // console.log(value);

  imgPreview.style.filter = `${st}(${value}${un})`;
};
//++++++++++++++++++++++++++++
// 3
// отслеживание изменений значения ползуека
const onSliderUpdate = () => {
  inputSlider.value = slider.noUiSlider.get();
  // console.log(inputSlider.value);

  //5-setImgStyle
  setImgStyle();
};

//++++++++++++++++++++++++++++

//4 - скрыть
const hideSlider = () => {
  sliderContainer.classList.add('hidden');

  // удаление слайдера - ??? НАДО?
  // slider.noUiSlider.destroy;
};
//++++++++++++++++++++++++++++

// 9
const updateSlider = ({ min, max, step }) => {
  slider.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max, // зачем? можно без него?
  });
};
//++++++++++++++++++++++++++++

//10 - показать
const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

//++++++++++++++++++++++++++++
//7
const setSlider = () => {
  //8-isDefault
  if (isDefault()) {

    // console.log('Оригинал - 7-setSlider');
    hideSlider();
  } else {

    // 9-updateSlider
    updateSlider(chosenEffect.sliderOptions);
    showSlider();
  }
};

//++++++++++++++++++++++++++++
// 6
const setEffect = (effect) => {
  // chosenEffect = effects.filter((elem) => elem.name === effect); // chosenEffect- элемент массива, не получается из него взять объект
  chosenEffect = effects.find((elem) => elem.name === effect);

  // console.log('6-setEffect');
  // console.log(chosenEffect);
  // console.log(chosenEffect.name);

  //7-setSlider
  setSlider();
  setImgStyle();
};

//++++++++++++++++++++++++++++

// 1
const createSlider = ({ min, max, step }) => {
  noUiSlider.create(slider, {
    range: {
      min: min,
      max: max,
    },

    step: step,
    start: max,
    connect: 'lower',

    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    },
  });

  // 3-onSliderUpdate
  slider.noUiSlider.on('update', onSliderUpdate);

  //4-hideSlider
  // на стр "Оригинал" слайдер не виден
  hideSlider();
};

// 2-onEffectsChange
const onEffectsChange = (evt) => {
  // 6-setEffect
  setEffect(evt.target.value);
  // console.log(evt.target.value);
};
//++++++++++++++++++++++++++++

// инициализация слайдера
const initEffect = () => {
  //создать слайдер с начальными установками
  // 1-createSlider
  // console.log(chosenEffect.sliderOptions);
  createSlider(chosenEffect.sliderOptions);

  // 2-onEffectsChange
  // выбор эффекта
  effests.addEventListener('change', onEffectsChange);
};

//++++++++++++++++++++++++++++
const resetEffect = () => {
  // setEffect(effects[0]);
  effests.removeEventListener('change', onEffectsChange);

  // slider.noUiSlider.off(); - // как правильно задать параметр для off
  slider.noUiSlider.destroy();
  // alert('ok');
};
//++++++++++++++++++++++++++++


export {
  initEffect,
  resetEffect
};
