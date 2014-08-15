// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('myMap', ['ionic'])

.controller('MapCtrl', function($scope, $ionicLoading, $compile){
  function initialize(){
    var myLatLng = new google.maps.LatLng(48.8588589,2.3470599);

    var mapOptions = {
      center: myLatLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var contentString = "<div><a ng-click'clicTest()'> Puchale!</div>";
    var compiled = $compile(contentString)($scope);

    var infowindow = new google.maps.InfoWindow({
      content: compiled[0]
    });

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'París!'
    });

    google.maps.event.addListener(marker, 'click', function(){
      infowindow.open(map,marker);
    });

    $scope.map = map;
  }

  google.maps.event.addDomListener(window, 'load', initialize);

  $scope.centerOnMe = function(){
    if(!$scope.map){
      return;
    }

    $scope.loading = $ionicLoading.show({
        content: 'Aquí casual.. buscandote... ',
        showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos){
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function(error){
      alert('Ni modo, estas perdido XD'+ error.message);
    });
  };

  $scope.clickTest = function(){
    alert('Infowindow con ng-click');
  }
});














