$('document').ready(function(){
    // arrays
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // variables
    var d = new Date();
    var currentMonth = d.getMonth();
    var currentDay = d.getDate();
    var currentYear = d.getFullYear();
    var nextMonthNum = currentMonth + 1;
    
    if (currentMonth === 11){
        nextMonthNum = 0;
    } else {
        nextMonthNum = currentMonth + 1;
    }

    var currentMText = months[currentMonth];
    var nextMText = months[nextMonthNum];

    // creating the titles
    $('#currentmonth').text(currentMText);
    $('#nextmonth').text(nextMText);

    // get facebook events
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var respsonse = JSON.parse(xhttp.responseText);
            var events = respsonse.event;
            // filter array to get all events currents or greater
            var currentYearArr = events.filter(function(event){
                return event.year >= currentYear;
            });
            // filter array to get current month events
            var currentEventsArr = currentYearArr.filter(function(event){
                return event.month == currentMonth + 1;
            });
            // filter array to get next month events
            var nextEventsArr = currentYearArr.filter(function(event){
                return event.month == nextMonthNum + 1;
            });
            // filter array to get events greater then current day
            var upcomingCurrent = currentEventsArr.filter(function(event){
                return event.day >= currentDay;
            });
            // combine current month events great then current day and next month events for home page
            upcomingEventsArr = upcomingCurrent.concat(nextEventsArr);
            // append current month events to current month secion
            for (var i = 0; i < currentEventsArr.length; i++) {
                var currentEvents = 
                    '<div class="py-3">'+
                        '<h3>' + currentMText + ' ' + currentEventsArr[i].day + ', ' + currentEventsArr[i].year + '</h3>' +
                        '<h4>' + currentEventsArr[i].title + '</h4>' +
                        '<p>' + currentEventsArr[i].description + '</p>' +
                        '<a href="'+currentEventsArr[i].link+'" class="'+currentEventsArr[i].class+'" target="_blank">More Details</a>' + 
                    '</div>';
                $('#currentevents').append(currentEvents);
            }
            // append next month events to next month secion
            for (var i = 0; i < nextEventsArr.length; i++) {
                var nextEvents = 
                    '<div class="py-3">'+
                        '<h3>' + nextMText + ' ' + nextEventsArr[i].day + ', ' + nextEventsArr[i].year+ '</h3>' +
                        '<h4>' + nextEventsArr[i].title + '</h4>' +
                        '<p>' + nextEventsArr[i].description + '</p>' +
                        '<a href="'+nextEventsArr[i].link+'" class="'+nextEventsArr[i].class+'" target="_blank">More Details</a>' + 
                    '</div>';
                $('#nextevents').append(nextEvents);
            }
            // append upcoming events to upcoming event month secion
            for (var i = 0; i < upcomingEventsArr.length; i++) {
                var upcomingEvents = 
                    '<div class="py-3">'+
                        '<h3>' + months[Number(upcomingEventsArr[i].month) - 1]  + ' ' + upcomingEventsArr[i].day + ', ' + upcomingEventsArr[i].year + '</h3>' +
                        '<p>' + upcomingEventsArr[i].title + '</p>' +
                    '</div>'; 
                $('#upcoming').append(upcomingEvents);            
            }
        }
    };
    xhttp.open("GET", "events.json", true);
    xhttp.send();
});