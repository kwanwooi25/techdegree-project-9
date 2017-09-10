/* ======================================================
 TRAFFIC CHART - HOURLY / DAILY / WEEKLY / MONTHLY
====================================================== */

var chartTrafficList = document.querySelector('.chart-traffic-list');
var chartTrafficListSelect = document.querySelector('.chart-traffic-list-select');

var hourlyLabels = ['0:00-1:00', '1:00-2:00', '2:00-3:00',
                    '3:00-4:00', '4:00-5:00', '5:00-6:00',
                    '6:00-7:00', '7:00-8:00', '8:00-9:00',
                    '9:00-10:00'];
var hourlyData = [ 10, 5, 0, 3, 5, 15, 20, 10, 12, 40 ];
var dailyLabels = ['Oct 20', 'Oct 21', 'Oct 22', 'Oct 23',
                   'Oct 24', 'Oct 25', 'Oct 26', 'Oct 27',
                   'Oct 28', 'Oct 29'];
var dailyData = [ 100, 150, 120, 200, 180, 100, 90, 150, 200, 140];
var weeklyLabels = ['Sep 3-9', 'Sep 10-16', 'Sep 17-23',
                    'Sep 24 - Oct 1', 'Oct 2-8', 'Oct 9-15',
                    'Oct 16-22', 'Oct 23-29'];
var weeklyData = [ 700, 500, 600, 800, 950, 500, 300, 1100 ];
var monthlyLabels = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr',
                     'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
var monthlyData = [ 3000, 2800, 2400, 3200, 4500, 4300,
                    3400, 4900, 3200, 2500, 2800, 4000];


function updateChart(labels, data) {
  var trafficCtx = document.getElementById('chart-traffic');
  var chartTraffic = new Chart(trafficCtx, {
    type : 'line',
    data : {
      labels   : labels,
      datasets : [{
        data            : data,
        borderColor     : '#6187BF',
        backgroundColor : 'rgba(152, 189, 255, .2)'
      }]
    },
    options : {
      legend : { display : false },
      elements : { line : { tension : 0 } },
      responsive : true,
      layout : {
        padding : {
          left   : 30,
          right  : 30,
          top    : 30,
          bottom : 30
        }
      }
    }
  });
};

updateChart(weeklyLabels, weeklyData);

// event listener for select menu (for small screens)
chartTrafficListSelect.addEventListener('change', function(e) {
  if (e.target.value === 'chart-hourly') {
    updateChart(hourlyLabels, hourlyData);
  } else if (e.target.value === 'chart-daily') {
    updateChart(dailyLabels, dailyData);
  } else if (e.target.value === 'chart-weekly') {
    updateChart(weeklyLabels, weeklyData);
  } else if (e.target.value === 'chart-monthly') {
    updateChart(monthlyLabels, monthlyData);
  }
});

// event listener for list items (for larger screens)
chartTrafficList.addEventListener('click', function(e) {
  var chartTrafficLists = document.querySelectorAll('.chart-traffic-list li a');

  if  (e.target.id === 'chart-hourly'
    || e.target.id === 'chart-daily'
    || e.target.id === 'chart-weekly'
    || e.target.id === 'chart-monthly') {
    for (i = 0 ; i < chartTrafficLists.length ; i++) {
      chartTrafficLists[i].removeAttribute('active');
    }
  }
  e.target.setAttribute('active','');

  if (e.target.id === 'chart-hourly') {
    updateChart(hourlyLabels, hourlyData);
  } else if (e.target.id === 'chart-daily') {
    updateChart(dailyLabels, dailyData);
  } else if (e.target.id === 'chart-weekly') {
    updateChart(weeklyLabels, weeklyData);
  } else if (e.target.id === 'chart-monthly') {
    updateChart(monthlyLabels, monthlyData);
  }
});


/* ======================================================
 DAILY TRAFFIC CHART
====================================================== */

var dailyTrafficCtx = document.getElementById('chart-dailytraffic');

var chartDailyTraffic = new Chart(dailyTrafficCtx, {
  type : 'bar',
  data : {
    labels   : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets : [{
      data                 : [50, 5, 10, 20, 15, 40, 80],
      backgroundColor      : '#6187BF',
      hoverBackgroundColor : 'rgba(98, 135, 191, .9)'
    }]
  },
  options : {
    legend : { display : false },
    scales : {
      xAxes : [{
        barThickness : 25
      }]
    },
    layout : {
      padding : {
        left   : 20,
        right  : 20,
        top    : 20,
        bottom : 20
      }
    }
  }
});


/* ======================================================
 MOBILE USERS CHART
====================================================== */

var mobileUsersCtx = document.getElementById('chart-mobileusers');

var chartMobileUsers = new Chart(mobileUsersCtx, {
  type : 'doughnut',
  data : {
    labels : ['Desktop', 'Phone', 'Tablet'],
    datasets : [{
      data : [60, 30, 10],
      backgroundColor : ['#6187BF', '#7EC98D', '#71B7BE'],
      hoverBackgroundColor : ['rgba(98, 135, 191, .9)',
                              'rgba(126, 201, 141, .9)',
                              'rgba(113, 183, 190, .9)']
    }]
  },
  options : {
    legend : {
      position : 'right'
    },
    layout : {
      padding : {
        left   : 20,
        right  : 20,
        top    : 20,
        bottom : 20
      }
    }
  }
});
