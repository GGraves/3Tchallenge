angular.module( 'home', []).controller( 'HomeController', function( $scope, TFactory)
{

    $scope.$on( '$viewContentLoaded', function()
    {
        $scope.runSimulation = function()
        {
            TFactory();
        };
    });

    /*
    premptive factory method testing

    $scope.$on( '$viewContentLoaded',
    function()
    {
        TFactory.one();
        TFactory.two();
        TFactory.three();
    });
    */
});
