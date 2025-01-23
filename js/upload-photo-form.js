import { pristine } from './form-valid';
import { resetScale } from './scale';
import { SubmitBtnText } from './constants';
import {
  resetEffect
} from './effects';


const uploadForm = document.querySelector('.img-upload__form');
const bodyElement = document.querySelector('body');
const overlay = document.querySelector('.img-upload__overlay');
const cancelBtn = document.querySelector('.img-upload__cancel');
const imgFiled = document.querySelector('#upload-file');
const hashtagFiled = document.querySelector('.text__hashtags');
const commentFiled = document.querySelector('.text__description');
const submitBtn = document.querySelector('.img-upload__submit');

const toggleSubmitBtn = (isDisabled) => {
  submitBtn.disabled = isDisabled;
  submitBtn.textContent = isDisabled ? SubmitBtnText.SUBMITTING : SubmitBtnText.IDLE;
};

const setOnFormSubmit = (callback) => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      toggleSubmitBtn(true);
      await callback(new FormData(uploadForm));
      toggleSubmitBtn();
    }
  });
};

const isTextFiledFocused = () => document.activeElement === hashtagFiled || document.activeElement === commentFiled;

const isErrorMessageShown = () => document.querySelector('.error');


const hideModal = () => {
  uploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffect();
  overlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFiledFocused() && !isErrorMessageShown()) {
    evt.preventDefault();
    hideModal();
  }
}

const showModal = () => {
  overlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  pristine.validate();
  document.addEventListener('keydown', onDocumentKeydown);
};

imgFiled.addEventListener('change', showModal);
cancelBtn.addEventListener('click', hideModal);
submitBtn.addEventListener('click', setOnFormSubmit);

export {
  setOnFormSubmit,
  hideModal
};
