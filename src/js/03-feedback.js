import throttle from 'lodash.throttle';
const inputEmail = document.querySelector('input[type="email"]');
const areaMsg = document.querySelector('textarea[name="message"]');
const form = document.querySelector('.feedback-form');
const LOCAL_KEY = 'feedback-form-state';
let dataStorage;
if (!localStorage.getItem(LOCAL_KEY)) {
  dataStorage = {};
} else {
  dataStorage = JSON.parse(localStorage.getItem(LOCAL_KEY));
}
setInputValueFromStorage();
form.addEventListener('input', throttle(storeData, 500));
form.addEventListener('submit', clearData);
function storeData(evt) {
  dataStorage[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(dataStorage));
}
function setInputValueFromStorage() {
  const inputArray = localStorage.getItem(LOCAL_KEY);
  if (inputArray) {
    const storage = JSON.parse(inputArray);
    areaMsg.value = storage.message || '';
    inputEmail.value = storage.email || '';
  }
}
function clearData(evt) {
  evt.preventDefault();
  const clearDataStorage = localStorage.getItem(LOCAL_KEY);
  const clearDataStorageJSON = JSON.parse(clearDataStorage);
  if (areaMsg.value === '' || inputEmail.value === '') {
    alert('Input required!');
    return;
  } else {
    console.log(clearDataStorageJSON);
  }

  localStorage.removeItem(LOCAL_KEY);
  form.reset();
  delete dataStorage.email;
  delete dataStorage.message;
}
