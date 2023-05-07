// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';

// Change code below this line
const gallery = document.querySelector('.gallery');

const imageList = galleryItems
  .map(({ preview, original, description }) => {
    return ` <li class="gallery__item">
  <a class="gallery__link"
   href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
 </li>`;
  })
  .join('');

gallery.insertAdjacentHTML('afterbegin', imageList);

gallery.addEventListener('click', onImageClick);

function onImageClick(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  event.preventDefault();
  const onCloseModal = event => {
    const ESC_KEY = 'Escape';

    if (event.code === ESC_KEY) {
      instance.close();
    }
  };

  const instance = basicLightbox.create(
    `<img src = "${event.target.dataset.source}" width ="800"
        height = "600">`,
    {
      onShow: instance => {
        window.removeEventListener('keydown', onCloseModal);
      },
    }
  );
  instance.show();
}
console.log(galleryItems);
