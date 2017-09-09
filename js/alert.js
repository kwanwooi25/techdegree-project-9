/* ==============================================================
 Add 'click' event on close button in alert div
=============================================================== */

var alertClose = document.querySelector('.alert__close');

alertClose.addEventListener('click', function(e) {
  var alertDiv = e.target.parentNode.parentNode;
  alertDiv.classList.add('hidden');
});
