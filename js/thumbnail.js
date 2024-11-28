// ДЗ-7 генерация фоток по шаблону
// получаю контент шаблона
const thumbnailTemplate = document.querySelector('#picture').content;

const img = thumbnailTemplate.querySelector('.picture__img');
const comm = thumbnailTemplate.querySelector('.picture__comments');
const like = thumbnailTemplate.querySelector('.picture__likes');


// куда вставить все готовые фотки
const container = document.querySelector('.pictures');

// функция генгерации  и заполнения элемента из шаблона
// {деструктуризация - вместо picture}
const createThumbnail = ({ url, description, comments, likes }) => {

  //клонирую шаблон
  const thumbnail = thumbnailTemplate.cloneNode(true);

  // const img = thumbnail.querySelector('.picture__img');
  // const comm = thumbnail.querySelector('.picture__comments');
  // const like = thumbnail.querySelector('.picture__likes');

  // заполняю данными шаблон
  img.src = url;
  img.alt = description;
  comm.textContent = comments.length;
  like.textContent = likes;
  return thumbnail;
};

//генерирую 25 элементов и отрисовываю их все сразу в ДОМ через фрагмент
const generateThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });
  container.append(fragment);
};

export { generateThumbnails };
