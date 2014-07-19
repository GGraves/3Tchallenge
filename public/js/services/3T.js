angular.module( '3T', []).factory( 'TFactory', function()
{
    return function()
    {
        var xBetter = Math.floor( ( Math.random()*2)) ? true : false;
        var board = [ 
                        [ { position : 0, player : ''}, { position : 3, player : ''}, { position : 6, player : ''}],
                        [ { position : 1, player : ''}, { position : 4, player : ''}, { position : 7, player : ''}],
                        [ { position : 2, player : ''}, { position : 5, player : ''}, { position : 8, player : ''}],
                        [ { position : 0, player : ''}, { position : 1, player : ''}, { position : 2, player : ''}],
                        [ { position : 3, player : ''}, { position : 4, player : ''}, { position : 5, player : ''}],
                        [ { position : 6, player : ''}, { position : 7, player : ''}, { position : 8, player : ''}],
                        [ { position : 0, player : ''}, { position : 4, player : ''}, { position : 8, player : ''}],
                        [ { position : 6, player : ''}, { position : 4, player : ''}, { position : 2, player : ''}]
                    ]

 
        $(".TTT").append(   "<div class=\"posi\">" +
                                "<table>" +
                                    "<tr>" +
                                        "<td>" + board[ 0][ 0].position + "</td>" +
                                        "<td>" + board[ 1][ 0].position + "</td>" +
                                        "<td>" + board[ 2][ 0].position + "</td>" +
                                    "</tr>" +
                                    "<tr>" +
                                        "<td>" + board[ 0][ 1].position + "</td>" +
                                        "<td>" + board[ 1][ 1].position + "</td>" +
                                        "<td>" + board[ 2][ 1].position + "</td>" +
                                    "</tr>" +
                                    "<tr>" +
                                        "<td>" + board[ 0][ 2].position + "</td>" +
                                        "<td>" + board[ 1][ 2].position + "</td>" +
                                        "<td>" + board[ 2][ 2].position + "</td>" +
                                    "</tr>" +
                                "</table>" +
                            "</div>");



    }; 

    /*
    return {

        test methods

        one : function()
        {
            $window.alert( "one");        
        },
        two : function()
        {
            $window.alert( "two");        
        },
        three : function()
        {
            $window.alert( "three");        
        }
    };
    */
});
