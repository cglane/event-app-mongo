(function(){
"use strict";

angular
  .module('starter')
  .controller('CalendarCtrl', function($scope, ionicDatePicker,$ionicPopup,$compile,$stateParams,MainService) {

    console.log($scope.hello)
    var createNewEvent = function(data){
      MainService.createEventDate(data).success(function(data){
        refreshEvents();
        console.log(data,'data')
      })
    }
    var getEventDates = function(){
    MainService.getEventDates().success(function(eventDates){
      console.log(eventDates)
      eventDates.forEach(function(el){
        if(el.start){
          $scope.events.push(el)
        }
      })
    })
  }
    var refreshEvents = function(){
      MainService.getEventDates().success(function(eventDates){
        console.log(eventDates)
        $scope.events.splice(0,$scope.events.length);
        eventDates.forEach(function(el){
          if(el.start){
            $scope.events.push(el)
          }
          //check if digest is finished then refresh page
          setTimeout(function () {
            $scope.$apply(function(){
              $scope.events = $scope.events;
            })
          }, 10);
        })
      })
    }
  var addDaysHours = function(day,hour){
      var splitDay = moment(day).startOf('day');
      var splitHour = moment(hour).valueOf();
      var newTimeUnix = splitDay._d.valueOf()+ splitHour;
      return new Date(newTimeUnix);
  }
  var endLaterThanStart = function(start,end){

    if(moment(start).valueOf() < moment(end).valueOf()){
      return true;
    }else{
      return false
    }
  }
  var editEventDate = function(object,id){
    MainService.editEventDate(object,id).success(function(el){
      console.log(el,'el');
      refreshEvents();

    })
  }
    // The datepicker is used in the popups and sets the return value to the
    // $scope.data.start and $scope.ediData.start variables
    //code for datepicker within the popup form
    // Triggered on a button click, or some other target
    var ipObj1 = {
      callback: function (val) {  //Mandatory
        $scope.data.start = val;
        $scope.editData.start = val;
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      },
      disabledDates: [            //Optional
        new Date(2016, 2, 16),
        new Date(2015, 3, 16),
        new Date(2015, 4, 16),
        new Date(2015, 5, 16),
        new Date('Wednesday, August 12, 2015'),
        new Date("08-16-2016"),
        new Date(1439676000000)
      ],
      from: new Date(2012, 1, 1), //Optional
      to: new Date(2016, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };

//form popup plugin code
$scope.formPopup = function() {
  $scope.data = {};

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    templateUrl: 'templates/popupForm.html',
    title: 'Enter Wi-Fi Password',
    subTitle: 'Please use normal things',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          console.log($scope.data,'datas')
          //check if empty inputs
          if($scope.data.title && $scope.data.email.bool && $scope.data.textMsg.bool && $scope.data.start){
            createNewEvent($scope.data);
          }else{
            e.preventDefault();
            alert('You need to fill in all fields')
          }
        }
      }
    ]
  });
 };
 $scope.editEventPopup = function(data) {
   $scope.editData = {
     title:data.title,
     start:data.start._d,
     end:data.end._d,
     email:{
       bool:data.email.bool,
       time:data.email.time,
     },
     textMsg:{
       bool:data.textMsg.bool,
       time:data.textMsg.time
     }
   };

   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     templateUrl: 'templates/edit-popup.html',
     title: 'Edit Event',
     subTitle: 'Please use normal things',
     scope: $scope,
     buttons: [
       { text: 'Cancel' },
       {
         text: '<b>Save</b>',
         type: 'button-positive',
         onTap: function(e) {
           var editDataObject = {
             title:$scope.editData.title,
             start:addDaysHours($scope.editData.start,$scope.editData.startTime),
             end:addDaysHours($scope.editData.start,$scope.editData.endTime),
             email:{
               bool:$scope.editData.email.bool,
               time:$scope.editData.email.time,
             },
             textMsg:{
               bool:$scope.editData.textMsg.bool,
               time:$scope.editData.textMsg.time
             }
           };
           console.log(editDataObject,$scope.editData)
           if((endLaterThanStart(editDataObject.start,editDataObject.end))&& editDataObject.title){
             editEventDate(editDataObject,data._id);
           }else{
             e.preventDefault();
             console.log('not ready')
           }
           console.log(editDataObject,'hello')
           //check if empty inputs
            //  e.preventDefault();
            //  alert('You need to fill in all fields')
         }
       }
     ]
   });
  };

//calendar plugin code
    var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  $scope.changeTo = 'English';
  /* event source that pulls from google.com */
  $scope.eventSource = {
          className: 'gcal-event',           // an option!
          currentTimezone: 'America/New York' // an option!
  };
  /* event source that contains custom events on the scope */
  $scope.events = [
    {title:'hello',start:new Date()}

  ];
  getEventDates();

  /* event source that calls a function on every view switch */
  $scope.eventsF = function (start, end, timezone, callback) {
    var s = new Date(start).getTime() / 1000;
    var e = new Date(end).getTime() / 1000;
    var m = new Date(start).getMonth();
    var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
    callback(events);
  };

  $scope.calEventsExt = {
     color: '#f00',
     textColor: 'yellow',
     events: [
        {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
        {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
        {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
      ]
  };
  /* alert on eventClick */
  $scope.alertOnEventClick = function( date, jsEvent, view){
    console.log(date)
    $scope.editEventPopup(date);
  };
  /* alert on Drop */
   $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
     $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
  };
  /* alert on Resize */
  $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
     $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
  };
  /* add and removes an event source of choice */
  $scope.addRemoveEventSource = function(sources,source) {
    var canAdd = 0;
    angular.forEach(sources,function(value, key){
      if(sources[key] === source){
        sources.splice(key,1);
        canAdd = 1;
      }
    });
    if(canAdd === 0){
      sources.push(source);
    }
  };
  /* add custom event*/
  $scope.addEvent = function() {
    $scope.events.push({
      title: 'Open Sesame',
      start: new Date(y, m, 28),
      end: new Date(y, m, 29),
      className: ['openSesame']
    });
  };
  /* remove event */
  $scope.remove = function(index) {
    $scope.events.splice(index,1);
  };
  /* Change View */
  $scope.changeView = function(view,calendar) {
    uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
  };
  /* Change View */
  $scope.renderCalender = function(calendar) {
    if(uiCalendarConfig.calendars[calendar]){
      uiCalendarConfig.calendars[calendar].fullCalendar('render');
    }
  };
   /* Render Tooltip */
  $scope.eventRender = function( event, element, view ) {
      element.attr({'tooltip': event.title,
                   'tooltip-append-to-body': true});
      $compile(element)($scope);
  };
  /* config object */
  $scope.uiConfig = {
    calendar:{
      height: 450,
      editable: true,
      header:{
        left: 'title',
        center: '',
        right: 'today prev,next'
      },
      eventClick: $scope.alertOnEventClick,
      eventDrop: $scope.alertOnDrop,
      eventResize: $scope.alertOnResize,
      eventRender: $scope.eventRender
    }
  };

  $scope.changeLang = function() {
    if($scope.changeTo === 'Hungarian'){
      $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
      $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
      $scope.changeTo= 'English';
    } else {
      $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      $scope.changeTo = 'Hungarian';
    }
  };
  /* event sources array*/
  $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
  $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];

  //   var myDate = new Date();
  //   var momentDate = moment(myDate)
  //   $("#myCalendar-1").ionCalendar({
  //       lang: "en",                     // language
  //       sundayFirst: false,             // first week day
  //       years: "80",                    // years diapason
  //       format: "",           // date format
  //       onClick: function(dates){        // click on day returns date
  //         $("#result-2").html("onClick: " + moment(dates) + 'mydata'+ momentDate);
  //         var newDate = moment(dates)
  //         if(momentDate.startOf('day').isSame(newDate.startOf('day'))){
  //           console.log('got it')
  //         }
  //       }
  //   });
  //
  //   var ipObj1 = {
  //     callback: function (val) {  //Mandatory
  //       console.log('Return value from the datepicker popup is : ' + val, new Date(val));
  //     },
  //     disabledDates: [            //Optional
  //       new Date(2016, 2, 16),
  //       new Date(2015, 3, 16),
  //       new Date(2015, 4, 16),
  //       new Date(2015, 5, 16),
  //       new Date('Wednesday, August 12, 2015'),
  //       new Date("08-16-2016"),
  //       new Date(1439676000000)
  //     ],
  //     from: new Date(2012, 1, 1), //Optional
  //     to: new Date(2017, 10, 30), //Optional
  //     inputDate: new Date(),      //Optional
  //     mondayFirst: true,          //Optional
  //     disableWeekdays: [0],       //Optional
  //     closeOnSelect: false,       //Optional
  //     templateType: 'popup'       //Optional
  //   };
  //
  //   $scope.openDatePicker = function(){
  //     ionicDatePicker.openDatePicker(ipObj1);
  //   };
  })
})();
