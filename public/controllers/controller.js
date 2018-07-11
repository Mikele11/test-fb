var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("I am in controller");

var refresh = function() {
  $http.get('/myelekenchat').success(function(response) {
	  console.log(response);
    $scope.myelekenchat = response;
    $scope.myelekenchat.mesage = "";
  });
};

refresh();

$scope.addContact = function() {
  if ($('.form-control.name').val()==''){
		alert('Enter name');
	}else{
		var d1 = new Date();
		var d1Year = d1.getFullYear();
		var d1Month = d1.getMonth();
		var d1Day = d1.getDate();
		var d2;

		d1Month=d1Month+1;
		if (d1Month<10){
			d2=d1Day+'.'+'0'+d1Month+'.'+d1Year;
		}else{
			d2=d1Day+'.'+d1Month+'.'+d1Year;
		};

		$scope.contact.registr=d2;
		$scope.contact.name=$('.form-control.name').val();
		if ($('#picrscr').val()==''){
			$scope.contact.avatar='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXPg-87YPJhgdeqQoAlUdgF60k6yi61LlpDtSXSqjWMVa9xbWVXQ';
		}else{
			$scope.contact.avatar=$('#picrscr').val();
		}
		$http.post('/myelekenchat', $scope.contact).success(function(response) {
			refresh();
		});
  };
};

	$scope.remove = function(id) {
		$http.delete('/myelekenchat/' + id).success(function(response) {
			refresh();
		});
	};

}]);
