/* ==============================================================
 To display 'New Members' & 'Recent Activity' Lists
 1. get data from randomuser API through AJAX request
 2. parse the required data and store them in each variable
 3. generate html string for each ul using template literals
 4. set the html
=============================================================== */

function updateMemberActivityLists(data) {
  var randomUsers = data.results;
  var newMemebersList = document.getElementById('new-members-list');
  var recentActivityList = document.getElementById('recent-activity-list');
  var newMembersHTML = '';
  var recentActivityHTML = '';
  var randomActs = ['posted', 'like', 'commented on'];
  var randomPages = ['KW Dashboard Tips',
                     'the post on KW\'s Facebook',
                     'the photo on KW\'s Instagram'];

  for (var i = 0; i < randomUsers.length; i++) {

    // store required data
    var thumbnail = randomUsers[i].picture.thumbnail;
    var name = randomUsers[i].name.first.capitalize() + ' ' +
              randomUsers[i].name.last.capitalize();
    var email = randomUsers[i].email;
    var registered = randomUsers[i].registered;

    // shortten & rearrange registered date
    var convertedDate = Number(registered.slice(8,10)) + '/' +
                        Number(registered.slice(5, 7)) + '/' +
                        Number(registered.slice(0, 4));

    // generate random activity
    var activity = ' ' +
                  randomActs[Math.floor(Math.random()*randomActs.length)] +
                  ' ' +
                  randomPages[Math.floor(Math.random()*randomPages.length)];

    // generate random activity time
    var activityTime = Math.floor(Math.random()*10);

    // construt html
    newMembersHTML += `
    <li class="new-member">
      <div class="new-member__imageContainer">
        <img class="new-member__image" src="${thumbnail}">
      </div>
      <div class="new-member__info">
        <div class="new-member__nameEmail">
          <p class="new-member__name">${name}</p>
          <a class="new-member__email" href="mailto:${email}">${email}</a>
        </div>
        <div class="new-member__dateContainer">
          <p class="new-member__date">${convertedDate}</p>
        </div>
      </div>
    </li>
    `;
    recentActivityHTML += `
    <li class="recent-activity">
      <div class="recent-activity__imageContainer">
        <img class="recent-activity__image" src="${thumbnail}">
      </div>
      <div class="recent-activity__info">
        <p class="recent-activity__activity">${name}${activity}</p>
        <p class="recent-activity__time">${activityTime} hours ago</a>
      </div>
      <i class="recent-activity__arrow"></i>
    </li>
    `;
  }
  newMemebersList.innerHTML = newMembersHTML;
  recentActivityList.innerHTML = recentActivityHTML;
}

// get 4 random user data
$.ajax({
  url: 'https://randomuser.me/api/?results=4',
  dataType: 'json',
  success: function(data) {
    updateMemberActivityLists(data);
  }
});
