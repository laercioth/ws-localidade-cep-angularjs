/*Modulo com injecao de dependencia para a mascara do cep*/
var app = angular.module('cepApp', ['ui.utils.masks']);

/*Controller*/
app.controller('cepsCtrl', function($scope, $http) {

	/*URI WS*/
	var URI_WS = "http://api.postmon.com.br/v1/cep/";

	$scope.init = function(){
		$scope.status = 200;
		$scope.cepInvalido = false;
		$scope.loading = false;
	}
	

	/*Faz a busca e retorna os valores, caso contrario, limpa os campos*/
	$scope.search = function (cep){
		if(cep !== '' && cep !== undefined && cep !== null){
			$scope.loading = true;
			$http.get(URI_WS + cep).then(function(response) {
				$scope.data   = response.data;
				$scope.status = response.status;
				$scope.cepInvalido = false;
				$scope.loading = false;
				console.log($scope.data);
	    	}, function errorCallback(noResponse) {
			$scope.status = noResponse.status;		
				console.log(noResponse)
				$scope.clear();
				$scope.loading = false;
				$scope.cepInvalido = false;
			});
		}else{
			$scope.cepInvalido = true;
			$scope.status = 200;
		}
	}

	/*Limpa os campos*/
	$scope.clear = function (){
		$scope.data = {};
	}
	
	/*inicia a variaveis e seus valores*/
	$scope.init();
});
