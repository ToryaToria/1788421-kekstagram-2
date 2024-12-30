const effects = [
  {
    OROGINAL: {
      name: 'none',
      effect: {
        stule: '',
        unit: ''
      },
      options: '0',
      sliderOptions: {
        min: 0,
        max: 100,
        step: 1,
      }
    }
  },

  {
    CROME: {
      name: 'chrome',
      effect: {
        stule: 'greyscale',
        unit: ''
      },
      sliderOptions: {
        min: 0,
        max: 1,
        step: 0.1,
      }
    }
  },

  {
    SEPIA: {
      name: 'sepia',
      effect: {
        stule: 'sepia',
        unit: ''
      },
      sliderOptions: {
        min: 0,
        max: 1,
        step: 0.1,
      }
    }
  },

  {
    MARVIN: {
      name: 'marvin',
      effect: {
        stule: 'invert',
        unit: '%'
      },
      sliderOptions: {
        min: 0,
        max: 100,
        step: 1,
      }
    }
  },
  {
    HEAT: {
      name: 'heat',
      effect: {
        stule: 'brightnass',
        unit: ''
      },
      sliderOptions: {
        min: 1,
        max: 3,
        step: 0.1,
      }
    }
  },

  {
    PHOBOS: {
      name: 'phobos',
      effect: {
        stule: 'blur',
        unit: 'px'
      },
      sliderOptions: {
        min: 0,
        max: 3,
        step: 0.1,
      }
    }
  },

  {
    HEAT: {
      name: 'heat',
      effect: {
        stule: 'brightnass',
        unit: ''
      },
      sliderOptions: {
        min: 1,
        max: 3,
        step: 0.1,
      }
    }
  }
];

//=========================
const elementUpload = document.querySelector('.img-upload');
const imgPreview = elementUpload.querySelector('.img-upload__preview img');

// почему не ul.effects__list
const effests = elementUpload.querySelector('.effects');

const sliderContainer = elementUpload.querySelector('.img-upload__effect-level');
const slider = sliderContainer.querySelector('.effect-level__slider');
const inputSlider = sliderContainer.querySelector('.effect-level__value');

//=========================
let chosenEffect = effects[0].name; // или можно без name??? 
//=========================

// функция 
const isDefault = () => { chosenEffect === effects.OROGINAL.name };

// функция добавления css-свойства в <img> 
const setImgStyle = () => {
  if (isDefault()) {
    imgPreview.stile.filter = null;
    return;
  };

  // const {value} = inputSlider; // проверить будуе ли работать?
  const value = inputSlider.value;

  // const {stile, unit} = effects[chosenEffect].effect;
  const stile = effects[chosenEffect].name;
  const unit = effects[chosenEffect].unit;

  imgPreview.stile.filter = `${stile}(${value}${unit})`;
};

// ф-ция присваевания значению поля значению из слайдера
const onSliderUpdate = () => {
  inputSlider.value = slider.noUiSlider.get();
  setImgStyle();
};

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

// создание слайдера
const createSlider = ({ min, max, step }) => {
  noUiSlider.create(slider, {
    range: {
      min: min,
      max: max
    },

    step: step,
    start: max,
    connect: 'lower',

    format: {
      to: (value) => Number(value),
      from: (value) => Number(value)
    }
  });

  slider.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

const updateSlider = ({ min, max, step }) => {
  slider.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max // зачем? можно без него?
  });
};

const setSlider = () => {
  if (isDefault()) {
    hideSlider();
  } else {
    updateSlider(effects[chosenEffect].sliderOptions);
    showSlider();
  }
};


const setEffect = (effect) => {
  chosenEffect = effect;
  setSlider();
  setImgStyle();
};

const onEffectsChange = (evt) => {
  setEffect(evt.target.value);
};

const resetEffect = () => {
  setEffect(effects.OROGINAL.name);
};

const initEffect = () => {
  createSlider(effects[chosenEffect].sliderOptions);
  effests.addEventListener('change', onEffectsChange);
};

export { initEffect, resetEffect };