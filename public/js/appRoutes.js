angular.module( 'appRoutes', []).config( [ '$routeProvider', '$locationProvider', function( $routeProvider, $locationProvider) 
{
    $routeProvider
    .when( '/', 
    {
	    templateUrl:    'views/home.html',
		controller:     'HomeController',
    })
    .otherwise(
    {
        templateUrl:    'views/404.html',
        controller:     '404Controller'
    });        
	
    $locationProvider.html5Mode( true);
}]);
