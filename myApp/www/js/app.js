// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'ngCordova',
  'ionic-datepicker',
  'ui.calendar',
 'starter.services'])
.config(function($httpProvider,ionicDatePickerProvider) {
  // $httpProvider.defaults.headers.common = {};
  // $httpProvider.defaults.headers.post = {};
  // $httpProvider.defaults.headers.put = {};
  // $httpProvider.defaults.headers.patch = {};
  var datePickerObj = {
      inputDate: new Date(),
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(2012, 8, 1),
      to: new Date(2018, 8, 1),
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: [6],
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  $httpProvider.interceptors.push(function() {
    return {
      request: function(req) {
        // Transform **all** $http calls so that requests that go to `/`
        // instead go to a different origin, in this case localhost:3000
        if (req.url.charAt(0) === '/') {
          req.url = 'http://localhost:3000' + req.url;

        }

        return req;
      }
    };
  });
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('register', {
  url: '/register',
  templateUrl: 'templates/register-page.html',
  controller:'RegisterCtrl'
})
//events state and substate
  .state('events',{
    url:'/events',
    abstract:true,
    templateUrl:'templates/events.html',
    controller:'EventsCtrl'
  })

  .state('events.dash',{
    url:'/dash',
    views:{
      'events-dash':{
        templateUrl:'templates/tab-events.html',
        controller:'EventsCtrl'
      }
    }
  })
  .state('events.calendar',{
    url:'/calendar',
    views:{
      'events-calendar':{
        templateUrl:'templates/events-calendar.html',
        controller:'CalendarCtrl'
      }
    }
  })
  .state('events.users',{
    url:'/users',
    views:{
      'events-user':{
        templateUrl:'templates/events-user.html',
        controller:'UserCtrl'
      }
    }
  })
  .state('events.messages',{
    url:'/messages',
    views:{
      'events-message':{
        templateUrl:'templates/events-message.html',
        controller:'MessageCtrl'
      }
    }
  })
  .state('events.account',{
    url:'/account',
    views:{
      'events-account':{
        templateUrl:'templates/events-account.html',
        controller:'AccountCtrl'
      }
    }
  })
//user state and substate
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/events/dash');

});
