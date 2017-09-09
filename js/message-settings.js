/* ==============================================================
 Javascript for Message User Widget & Settings Widget
 - Autocomplete user name
 - When 'SEND' button clicked,
   1. Validation Check
   2. Show modal success message
   - When 'OK' button on modal clicked,
     1. Hide modal message
     2. Reset input values
- When 'SAVE' button clicked,
   1. Save current settings in the brower local storage
   2. Show modal success message
   - When 'OK' button on modal clicked,
     Hide modal message
=============================================================== */

/* ==============================================================
 VARIABLES
=============================================================== */

// for autocomplete user name
var datalist = document.getElementById('user__list');
var userList = [];

// for form validation
var form = document.getElementById('form__messageUser');
var errorMessage = document.getElementById('errorMessage');
var inputUser = document.getElementById('user__name');
var inputMessage = document.getElementById('user__message');
var btnSend = document.getElementById('user__submit');

// for settings Save
var emailNotification = document.getElementById('settings__emailNotification');
var profileToPublic = document.getElementById('settings__profileToPublic');
var timeZone = document.getElementById('settings__timeZone');
var btnSave = document.getElementById('btn__save');
var btnCancel = document.getElementById('btn__cancel');

// for success message
var modal = document.getElementById('modal');
var modalMessage = document.getElementById('modal__messageUser');
var modalSettings = document.getElementById('modal__saveSettings');
var modalClose = document.getElementById('modal__close');
var modalUserName = document.getElementById('user__name__modal');
var modalUserMessage = document.getElementById('user__message__modal');

/* ==============================================================
 Function to update autocomplete list
 1. get data from randomuser API through AJAX request
 2. parse names and store them in 'userList' array
 3. construct & set the HTML
=============================================================== */
function updateUserList(data) {
  var randomUsers = data.results;
  var datalistHTML = '';

  for (var i = 0; i < randomUsers.length; i++) {
    var name = randomUsers[i].name.first.capitalize() + ' '
              + randomUsers[i].name.last.capitalize();

    userList.push(name);
    datalistHTML += `
      <option class="user__list__item" index="${i}" value="${userList[i]}">
    `;
  }
  datalist.innerHTML = datalistHTML;
}

// get 20 random user data
$.ajax({
  url: 'https://randomuser.me/api/?results=20',
  dataType: 'json',
  success: function(data) {
    updateUserList(data);
  }
});

/* ==============================================================
 Function to check if the user exist
=============================================================== */
function userExist(user_name) {
  for (var i = 0; i < userList.length; i++) {
    if (inputUser.value.toLowerCase() === userList[i].toLowerCase()) {
      return true;
    }
  }
  return false;
}

/* ==============================================================
 Function to check validation for sending message
 1. check if inputs are empty
 2. check if user name is exist in the array
=============================================================== */
function checkValidation() {
  var valid = true;

  // Check user name
  if (inputUser.value === '') {
    inputUser.placeholder = "You must input user's name!"
    inputUser.classList.add('invalid');
    valid = false;
  } else if (!userExist(inputUser.value)) {
    inputUser.placeholder = `User doesn't exist: ${inputUser.value}`;
    inputUser.value = '';
    inputUser.classList.add('invalid');
    valid = false;
  }

  // Check message
  if (inputMessage.value === '') {
    inputMessage.placeholder = "Oops! Message is empty!"
    inputMessage.classList.add('invalid');
    valid = false;
  }

  return valid;
}

/* ==============================================================
 Remove invalid class on focus on inputs
=============================================================== */
inputUser.onfocus = function() { this.classList.remove('invalid'); }
inputMessage.onfocus = function() { this.classList.remove('invalid'); }

/* ==============================================================
 On 'SEND' button click,
 Show modal message
=============================================================== */
btnSend.addEventListener('click', function(e) {
  e.preventDefault();
  if (checkValidation()) {
    modal.style.display = 'block';
    modalMessage.style.display = 'block';
    modalSettings.style.display = 'none';
    modalUserName.textContent = 'To: ' + inputUser.value;
    modalUserMessage.textContent = inputMessage.value;
  }
});

/* ==============================================================
 On 'SAVE' button click,
 - Show modal message
 - Save settings on local storage
=============================================================== */

btnSave.addEventListener('click', function(e) {
  e.preventDefault();
  modal.style.display = 'block';
  modalMessage.style.display = 'none';
  modalSettings.style.display = 'block';

  localStorage.setItem('emailNotification', emailNotification.checked);
  localStorage.setItem('profileToPublic', profileToPublic.checked);
  localStorage.setItem('timeZone', timeZone.selectedIndex);
});

/* ==============================================================
 Retrieve the saved settings on local storage
=============================================================== */

if (JSON.parse(localStorage.getItem('emailNotification'))) {
  emailNotification.checked = true;
} else {
  emailNotification.checked = false;
}

if (JSON.parse(localStorage.getItem('profileToPublic'))) {
  profileToPublic.checked = true;
} else {
  profileToPublic.checked = false;
}

timeZone.selectedIndex = localStorage.getItem('timeZone');

/* ==============================================================
 Hide modal message on 'OK' button click
  - if the modal was for Message User Widget,
    reset input values
  - if the modal was for Settings Widget,
    do nothing
=============================================================== */
modalClose.addEventListener('click', function() {
  if (modalSettings.style.display === 'none') {
    inputUser.value = '';
    inputMessage.value = '';
  }
  modal.style.display = 'none';
});
