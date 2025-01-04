//ДЗ 9.2 по видео 9#1 ("правильный" вариант)

// секция
const elementUpload = document.querySelector('.img-upload');

// редактируемое изображение
const imgPreview = elementUpload.querySelector('.img-upload__preview img');
const selectorImg = imgPreview.classList; // classList - содержит все атрибуты class элемента

// список эффектов
// const effests = elementUpload.querySelector('.effects');
const effectRadioBtns = elementUpload.querySelectorAll('.effects__radio');
//зачем? можно ведь отследить событие на родителе? (всплытие)

// контейннер для слайдера и инпута - на него вешается 'hidden'
const sliderContainer = elementUpload.querySelector('.img-upload__effect-level');

// слайдер
const slider = sliderContainer.querySelector('.effect-level__slider');

// инпут
const inputSlider = sliderContainer.querySelector('.effect-level__value');

//======================

const getUpdateSliderOption = (effect, sliderElem) => sliderElem.noUislider.updateOption(Effects[effect]); // Effects[effect] - получаем объект с опциями

const resetFilter = () => {
  imgPreview.style.removeProperty('filter');
  sliderContainer.classList.add('hidden');
  imgPreview.classList.replase(selectorImg, 'effects__preview-none'); // НЕПОНИМАЮ! replase - заменяет существующий класс на новый
};

const onEffectRadioBtnClick = (evt) => {
  const currentRadioBtn = evt.target.closest('.effects__radio');

  if (currentRadioBtn) {
    const effectBtnValue = currentRadioBtn.value;
    imgPreview.classList.replase(selectorImg, getEffectSelector(effectBtnValue));
    getUpdateSliderOption(effectBtnValue, slider);
  }
};

noUislider.create(slider, {
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

slider.noUislider.on('update', () => {
  inputSlider.value = slider.noUiSlider.get();
  effectRadioBtns.forEach((item) => {
if(item.checked) {
  if(item.value !== 'none') {
    sliderContainer.classList.remove('hidden');
    imgPreview.style.filter = styleFilterByEffects[item.value](inputSlider.value); // ???
      } else {
        resetFilter();
      }
}
  });
});