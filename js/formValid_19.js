const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_COUNT = 140;

const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const uploadForm = document.querySelector('.img-upload__form');
const hashtagFiled = document.querySelector('.text__hashtags');
const commentFiled = document.querySelector('.text__description');


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
},
false
);

const normalaizeTags = (tags) => tags.trim().split(' ');

const hasValidTags = (value) => {
  if (value.length === 0) {
    return true;
  }
  return normalaizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));
};

const hasValidCount = (value) => normalaizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (value) => {
  const low = normalaizeTags(value).map((tag) => tag.toLowerCase());
  return low.length === new Set(low).size;
};

pristine.addValidator(
  hashtagFiled,
  hasValidTags,
  'Неправильный #хештег. (1. Начинается с #, 2. Только буквы и цифры, 3. Не больше 20 символов)',
  1
);

pristine.addValidator(
  hashtagFiled,
  hasUniqueTags,
  'Хештеги не должны повторяться',
  2
);

pristine.addValidator(
  hashtagFiled,
  hasValidCount,
  'Не больше 5 хештегов',
  3
);

const isCommentValid = (comment) => {
  if (comment.length === 0) {
    return true;
  }
  return comment.length <= MAX_COMMENT_COUNT;
};

pristine.addValidator(
  commentFiled,
  isCommentValid,
  `Не больше ${MAX_COMMENT_COUNT} символов`
);

export {
  pristine
};
