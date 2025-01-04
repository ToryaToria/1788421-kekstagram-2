//ДЗ 9.2 по видео 9#1 ("НЕправильный" вариант)

// секция
const elementUpload = document.querySelector('.img-upload');

// редактируемое изображение
const imgPreview = elementUpload.querySelector('.img-upload__preview img');

// список эффектов
// почему не ul.effects__list
// const effests = elementUpload.querySelector('.effects');

// контейннер для слайдера и инпута - на него вешается 'hidden'
const sliderContainer = elementUpload.querySelector('.img-upload__effect-level');

// слайдер
const slider = sliderContainer.querySelector('.effect-level__slider');

// инпут
const inputSlider = sliderContainer.querySelector('.effect-level__value');
//=========================

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

slider.noUiSlider.on('update', () => {
  inputSlider.value = slider.noUiSlider.get();
});

sliderContainer.classList.add('hidden');

const onEffectChange = (evt) => {
  const effect = evt.target.value;

  if (effect === 'none') {
    sliderContainer.classList.add('hidden');
  } else {
    sliderContainer.classList.remove('hidden');
  }


  switch (effect) {
    case 'none':
      imgPreview.style.filter = 'none';
      break;

    case 'chrome':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
      });
      slider.noUiSlider.on('update', () => {

        // console.log('chrome on'); // отслеживаю накопление событий обработчиков - захламление памяти!!!

        // как сделать чтобы события не накапливались!???

        imgPreview.style.filter = `grayscale(${inputSlider.value})`;
      });
      break;

    case 'sepia':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
      });
      slider.noUiSlider.on('update', () => {
        imgPreview.style.filter = `sepia(${inputSlider.value})`;
      });
      break;

    case 'marvin':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
      });
      slider.noUiSlider.on('update', () => {
        imgPreview.style.filter = `invert(${inputSlider.value})%`;
      });
      break;

    case 'phobos':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1,
      });
      slider.noUiSlider.on('update', () => {
        imgPreview.style.filter = `blur(${inputSlider.value})px`;
      });
      break;

    case 'heat':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1,
      });
      slider.noUiSlider.on('update', () => {
        imgPreview.style.filter = `brightnass(${inputSlider.value})`;
      });
      break;
  }
};

export {onEffectChange};
