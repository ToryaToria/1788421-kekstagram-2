// import {
//   uploadForm, // форма
//   hashtagFiled, // поле для хештегов
//   // commentFiled // поле для комментариев

// } from './upload-photo-form.js';
//==========================

// не больше 5 хештегов
const MAX_HASHTAG_COUNT = 5;

// максимальная длина хештега
const MAX_HASHTAG_SYMBOLS = 20;

// максимальная длина комментария
const MAX_COMMENT_COUNT = 7;

let errMessage = '';

const error = () => errMessage;

// const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const VALID_SYMBOLS = /^[a-zа-яё0-9]{1,19}$/i;

//==========================

const uploadForm = document.querySelector('.img-upload__form');
const hashtagFiled = document.querySelector('.text__hashtags');
const commentFiled = document.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  // errorTextTag: 'p',
  // errorTextClass: 'text-error',
}, false);
// console.log(pristine);

//==========================
const isHashtagsValid = (value) => {
  errMessage = '';

  const inputText = value.toLowerCase().trim();

  // если комментариев нет - true
  if (inputText.length === 0) {
    return true;
  }

  const inputArray = inputText.split(' ');

  // const hashArray = inputText.split(' ');

  const rules = [
  
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: '1. хештег должен начинаеться с #'
    },

    {
      check: inputArray.some((item) => item === '#'),

      // check: inputArray.some((item) => item.length === 1),
      error: '2. хештег не может состоять только из #'
    },

    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: '3. хештеги разделяются пробелами'
    },

    {
      check: inputArray.some((item) => item.length > MAX_HASHTAG_SYMBOLS),
      error: `4. Длина хештега не больше ${MAX_HASHTAG_SYMBOLS} символов`
    },

    {
      //  check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),

      check: inputArray.some((item) => !VALID_SYMBOLS.test(item.slice(1))),
      error: '5. Недопустимые символы после #, можно только цифры и буквы',
    },

    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: '6. хештеги не должны повторяться'
    },

    {
      check: inputArray.length > MAX_HASHTAG_COUNT,
      error: `7. Не больше ${MAX_HASHTAG_COUNT} хештегов`
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errMessage = rule.error;
    }
    return !isInvalid;
  });
};

const isCommentValid = (comment) => {
  if (comment.length === 0) {
    return true;
  }

  return comment.length <= MAX_COMMENT_COUNT;
};

pristine.addValidator(
  hashtagFiled,
  isHashtagsValid,
  error,
  1,
  false);

pristine.addValidator(
  commentFiled,
  isCommentValid,
  `Не больше ${MAX_COMMENT_COUNT} символов`,
  1,
  true
);

//==========================
// +++++ тестовые ф-ции для проверки работает ли пристин
// pristine.addValidator(hashtagFiled, (value) => {
//   const isValid = /\d/.test(value); // true - только цифры!
//   console.log(isValid, value);

//   if (value.length === 0) {
//     console.log("пусто", value);
//     return true
//   }
//   return isValid;
// }, "Вводить только цифры!!!"), 1;

// pristine.addValidator(hashtagFiled, (value) => {
//   const validLingth = 5;
//   return value.length <= validLingth;
// }, "Не больше 5 знаков!", 2);

// +++++
export {
  pristine
};
