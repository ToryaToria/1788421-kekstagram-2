const effects = [
  {
    name: "none",
    effect: {
      style: "111",
      unit: "XXX",
    },
    sliderOptions: {
      min: 0,
      max: 100,
      step: 1,
    },
  },

  {
    name: "chrome",
    effect: {
      style: "greyscale",
      unit: "XXX",
    },
    sliderOptions: {
      min: 0,
      max: 1,
      step: 0.1,
    },
  },

  {
    name: "sepia",
    effect: {
      style: "sepia",
      unit: "XXX",
    },
    sliderOptions: {
      min: 0,
      max: 1,
      step: 0.1,
    },
  },

  {
    name: "marvin",
    effect: {
      style: "invert",
      unit: "%",
    },
    sliderOptions: {
      min: 0,
      max: 100,
      step: 1,
    },
  },

  {
    name: "heat",
    effect: {
      style: "brightnass",
      unit: "XXX",
    },
    sliderOptions: {
      min: 1,
      max: 3,
      step: 0.1,
    },
  },

  {
    name: "phobos",
    effect: {
      style: "blur",
      unit: "px",
    },
    sliderOptions: {
      min: 0,
      max: 3,
      step: 0.1,
    },
  },

  {
    name: "heat",
    effect: {
      style: "brightnass",
      unit: "XXX",
    },
    sliderOptions: {
      min: 1,
      max: 3,
      step: 0.1,
    },
  },
];

//=========================
const elementUpload = document.querySelector(".img-upload");
const imgPreview = elementUpload.querySelector(".img-upload__preview img");

// почему не ul.effects__list
const effests = elementUpload.querySelector(".effects");

const sliderContainer = elementUpload.querySelector(
  ".img-upload__effect-level"
);
const slider = sliderContainer.querySelector(".effect-level__slider");
const inputSlider = sliderContainer.querySelector(".effect-level__value");

//=========================
// или можно без name???
let chosenEffect = effects[0].name;
console.log(chosenEffect);

//=========================

// функция
const isDefault = () => {
  chosenEffect === "none";
};

// функция добавления css-свойства в <img>
const setImgStyle = () => {
  if (isDefault()) {
    imgPreview.stile.filter = null;
    return;
  }

  // const {value} = inputSlider; // проверить будуе ли работать?
  const value = inputSlider.value;

  // const {stile, unit} = effects[chosenEffect].effect;
  const st = chosenEffect.name;
  const un = chosenEffect.unit;

  console.log(un);
  // imgPreview.stile.filter = `${st}(${un})`;
};

// ф-ция присваевания значению поля значению из слайдера
const onSliderUpdate = () => {
  inputSlider.value = slider.noUiSlider.get();
  setImgStyle();
};

const showSlider = () => {
  sliderContainer.classList.remove("hidden");
};

const hideSlider = () => {
  sliderContainer.classList.add("hidden");
};

// создание слайдера
const createSlider = ({ min, max, step }) => {
  noUiSlider.create(slider, {
    range: {
      min: min,
      max: max,
    },

    step: step,
    start: max,
    connect: "lower",

    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    },
  });

  slider.noUiSlider.on("update", onSliderUpdate);
  hideSlider();
};

const updateSlider = ({ min, max, step }) => {
  slider.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max, // зачем? можно без него?
  });
};

const setSlider = () => {
  if (isDefault()) {
    hideSlider();
  } else {
    updateSlider(chosenEffect.sliderOptions);
    showSlider();
  }
};

const setEffect = (effect) => {
  chosenEffect = effects.filter((elem) => elem.name === effect);
  setSlider();
  setImgStyle();
};

const onEffectsChange = (evt) => {
  setEffect(evt.target.value);
  console.log(evt.target.value);
};

const resetEffect = () => {
  setEffect(effects[0].name);
};

const initEffect = () => {
  createSlider(chosenEffect.sliderOptions);
  effests.addEventListener("change", onEffectsChange);
};

initEffect();

export { initEffect, resetEffect };
