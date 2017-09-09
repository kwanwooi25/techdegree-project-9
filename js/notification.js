/* ==============================================================
 Javascript for Notification
=============================================================== */

var notificationIcon = document.querySelector('.icon__notification');
var notificationList = document.getElementById('notification__list');
var notificationNew = document.querySelector('.notification__new');

/* ==============================================================
 Function to display the number of new notifications
=============================================================== */
function updateNotificationCount() {
  if (notificationList.children.length !== 0) {
    notificationNew.textContent = notificationList.children.length;
  } else {
    notificationNew.style.display = 'none';
    notificationList.style.display = 'none';
  }
}

updateNotificationCount();

/* ==============================================================
 Toggle New Notification List
=============================================================== */
notificationIcon.addEventListener('click', function() {
  if (notificationList.children.length !== 0) {
    if (notificationList.style.display === 'none') {
      notificationList.style.display = 'block';
    } else {
      notificationList.style.display = 'none';
    }
  }
});

/* ==============================================================
 Remove Notification on Remove button click
=============================================================== */
notificationList.addEventListener('click', function(e){
  if (e.target.className === 'notification__remove') {
    e.target.parentNode.remove();
    updateNotificationCount();
  }
});
