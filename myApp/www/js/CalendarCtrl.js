(function(){
"use strict";

angular
  .module('starter')
  .controller('CalendarCtrl', function($scope,$ionicPopup,$compile,$stateParams,MainService,uiCalendarConfig) {

    var createEventDate = function(data){
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
          el.start = new Date(el.start)
          el.end = new Date(el.end)
          $scope.events.push(el)
        }
      })
    })
  }
  getEventDates();

    var refreshEvents = function(){
      console.log('refreshEvents')
      MainService.getEventDates().success(function(eventDates){
        var newEvents = [];
        $scope.events.splice(0,$scope.events.length);
        eventDates.forEach(function(el){
          if(el.start){
            el.start = new Date(el.start);
            el.end = new Date(el.end)
            $scope.events.push(el)
          }
        })
        //update events and update calendar,ughhh
        setTimeout(function () {
          $scope.$apply(function(){
            $scope.eventSources = [$scope.events];
          })
          $('#my-calendar').fullCalendar('removeEvents')
          $('#my-calendar').fullCalendar('addEventSource',$scope.events)
        }, 10);
      })
    }
  var addDaysHours = function(day,hour){
      var splitDay = moment(day).startOf('day');
      var splitHour = hour.getHours();
      var splitMinutes = hour.getMinutes();
      var addedHours = splitDay.add(splitHour, 'hours');
      var addedMinutes = addedHours.add(splitMinutes,'minutes')
      return addedMinutes;
  }
  var endLaterThanStart = function(start,end){
    if(start && end){
        if(moment(start).valueOf() < moment(end).valueOf()){
          return true;
        }else{
          return false
        }
    }else{
      return false;
    }
  }
  var editEventDate = function(object,id){
    console.log(object,'editEventDate')
    MainService.editEventDate(object,id).success(function(el){
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
  $scope.data = {
    email:{
      bool:true,
    },
    textMsg:{
      bool:true
    }
  };
  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    templateUrl: 'templates/popupForm.html',
    title: 'Create New Events',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if($scope.data.startTime && $scope.data.endTime && (endLaterThanStart($scope.data.startTime,$scope.data.endTime))&& $scope.data.title){
            var dataObject = {
              title:$scope.data.title,
              start:addDaysHours($scope.data.start,$scope.data.startTime),
              end:addDaysHours($scope.data.start,$scope.data.endTime),
              email:{
                bool:$scope.data.email.bool,
                time:$scope.data.email.time,
              },
              textMsg:{
                bool:$scope.data.textMsg.bool,
                time:$scope.data.textMsg.time
              }
            };

            createEventDate(dataObject);
          }else{
            e.preventDefault();
            alert('Almost There')
          }
        }
      }
    ]
  });
 };
 $scope.editEventPopup = function(data) {
   console.log(data,'dataeventPopup')
   $scope.editData = {
     title:data.title,
     start:data.start._d,
     end:data.end._d,
     email:{
       bool:data.email.bool,
       time:parseInt(data.email.time),
     },
     textMsg:{
       bool:data.textMsg.bool,
       time:parseInt(data.textMsg.time)
     }
   };
   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     templateUrl: 'templates/edit-popup.html',
     title: 'Edit Event',
     scope: $scope,
     buttons: [
       { text: 'Cancel' },
       {text:'Delete',
       type:'button-positive',
       onTap:function(e){
         console.log('delete',data)
         MainService.deleteEventDate(data._id).success(function(el){
           console.log(el,'el')
           refreshEvents();
         })
       }

     },
       {
         text: '<b>Save</b>',
         type: 'button-positive',
         onTap: function(e) {
           if($scope.editData.startTime && $scope.editData.endTime && (endLaterThanStart($scope.editData.startTime,$scope.editData.endTime))&& $scope.editData.title){
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
             editEventDate(editDataObject,data._id);
           }else{
             e.preventDefault();
             alert('Almost There')
           }
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
          // currentTimezone: 'America/New York' // an option!
  };
  /* event source that contains custom events on the scope */
  $scope.events = [];


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
     var d = delta._days;
     var dateObject = _.findWhere($scope.events,{_id:event._id});
     if(d >= 0){
       dateObject.start = moment(dateObject.start).add(d,'days').toDate();
       dateObject.end = moment(dateObject.end).add(d,'days').toDate();
     }else{
       dateObject.start = moment(dateObject.start).subtract(-1*d,'days').toDate();
       dateObject.end = moment(dateObject.end).subtract(-1*d,'days').toDate();
     }
     editEventDate(dateObject,event._id);
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
      height: 600,
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
  $scope.eventSources = [$scope.events];
  // $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];

  })
})();
