const effects = [
  {
    name: 'none',
    effect: {
      style: '',
      unit: '',
    },
    sliderOptions: {
      min: 0,
      max: 1,
      step: 0.1,
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
//======================

//8
const isDefault = () => chosenEffect.name === 'none';

//++++++++++++++++++++++++++++ самая сложная ф-ция!
//5
const setImgStyle = () => {
  if (isDefault()) {
    imgPreview.style.filter = null;
    return;
  }

  const st = chosenEffect.effect.style;
  const un = chosenEffect.effect.unit;
  const value = inputSlider.value;

  imgPreview.style.filter = `${st}(${value}${un})`;
};
//++++++++++++++++++++++++++++
// 3
// отслеживание изменений значения ползуека
const onSliderUpdate = () => {
  inputSlider.value = slider.noUiSlider.get();
 
  setImgStyle();
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
//7
const setSlider = () => {
  //8-isDefault
  if (isDefault()) {
    sliderContainer.classList.add('hidden');
  } else {

    // 9-updateSlider
    updateSlider(chosenEffect.sliderOptions);
    sliderContainer.classList.remove('hidden');

  }
};

//++++++++++++++++++++++++++++
 
// 2
const onEffectsChange = (evt) => {
 
  const effect = evt.target.value;
  chosenEffect = effects.find((elem) => elem.name === effect);

   setSlider();
  setImgStyle();
};
//++++++++++++++++++++++++++++

// инициализация слайдера
const initEffect = () => {
  sliderContainer.classList.add('hidden');
 
noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1,
  },

  step: 0.1,
  start: 1,
  connect: 'lower',

  format: {
    to: (value) => Number(value),
    from: (value) => Number(value),
  },
});

// 3-onSliderUpdate
slider.noUiSlider.on('update', onSliderUpdate);

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
