angular.module( '3T', []).factory( 'TFactory', function()
{
    return function()
    {
        var xBetter =  true;
        var winSets =   [ 
                            [ { position : 0, player : ''}, { position : 3, player : ''}, { position : 6, player : ''}],
                            [ { position : 1, player : ''}, { position : 4, player : ''}, { position : 7, player : ''}],
                            [ { position : 2, player : ''}, { position : 5, player : ''}, { position : 8, player : ''}],
                            [ { position : 0, player : ''}, { position : 1, player : ''}, { position : 2, player : ''}],
                            [ { position : 3, player : ''}, { position : 4, player : ''}, { position : 5, player : ''}],
                            [ { position : 6, player : ''}, { position : 7, player : ''}, { position : 8, player : ''}],
                            [ { position : 0, player : ''}, { position : 4, player : ''}, { position : 8, player : ''}],
                            [ { position : 6, player : ''}, { position : 4, player : ''}, { position : 2, player : ''}]
                        ];
            
        var board = [
                        { player : ''}, { player : ''}, { player : ''},
                        { player : ''}, { player : ''}, { player : ''},
                        { player : ''}, { player : ''}, { player : ''}
                    ];
 
        var completedMoves = [];
        var player = '';
        var action = '';
        var validMoves = [];
        //var xBetter = Math.floor( ( Math.random()*2)) ? true : false;
        
        

        function simulation()       
        {


            //CALL SET VARS FUNCTION()
    
            generateBoard( function()
            {
                draw();
            });
        };

/*    
        generateMoves()
        {
            var array = [ 0, 1, 2, 3, 4, 5, 6, 7, 8];
            var randomArray = Math.floor( ( Math.random()*72));
            var shift = randomArray%8;
            
            for( var i = 0; i < ( Math.ceil( randomArray / 8) - 1); i++)
            {
                array.push( array[0]);
                array.shift();
            }
            
            if( shift)
            {
                array.splice( shift+1, 0, array[0]);
                array.shift();
            }
            else
            {
                array.push( array[0]);
                array.shift();
            }
        };
      
*/
 
        function generateBoard( callBack)
        {
            var notDone = true;
            while( notDone)
            {
                player = completedMoves.length%2 ? 'O' : 'X';
                action = ( completedMoves.length%2 && xBetter) || ( !completedMoves.length%2 && !xBetter) ? 'BAD' : 'GOOD';
                
                playerMove( function( complete)
                {
                    if( complete)
                        notDone = false; 
                });
            }
            callBack();
        };

        function playerMove( callBack)
        {
            if( action == 'BAD' && ( Math.floor( Math.random()*3)))
            {
                board[ validMoves[ 0]].player = player;
                completedMoves.push( validMoves[ 0]);
                setRandom( function()
                {
                    validMoves.shift();
                    if( validMoves.length)
                        callBack( false);
                    else
                        callBack( true);
                });
            }
            else 
            {
                winningMove( function( win)
                {   
                    if( win)
                    {
                        board[ win-1].player = player;
                        callBack( true);
                    }
                    else
                    {
                        opponentWin( function( block)
                        {
                            if( block)
                            {
                                board[ block-1].player = player;
                                completedMoves.push( block-1);
                                validMoves.splice( validMoves.indexOf( block-1), 1);
                                if( validMoves.length)
                                    callBack( false);
                                else
                                    callBack( true);
                            }
                            else
                            {
                                progressSet( function( space)
                                {
                                    if( space)
                                    {
                                        board[ space-1].player = player;
                                        completedMoves.push( space-1);
                                        validMoves.splice( validMoves.indexOf( space-1), 1);
                                        if( validMoves.length)
                                            callBack( false);
                                        else
                                            callBack( true);
                                    }
                                    else
                                    {
                                        board[ validMoves[ 0]].player = player;
                                        completedMoves.push( validMoves[ 0]);
                                        setRandom( function()
                                        {
                                            validMoves.shift();
                                            if( validMoves.length)
                                                callBack( false);
                                            else
                                                callBack( true);
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        };

        function setRandom( callBack)
        {
            for( var i = 0; i < winSets.length; i++) 
            {
                for( var j = 0; j < winSets[i].length; j++)
                {
                    if( winSets[i][j].postion == validMoves[0])
                    {
                        winSets[i][j].player = player;
                    }
                } 
            }
        };

        function winningMove( callBack)
        {
            var winnables = [];

            for( var i = 0; i < winSets.length; i++) 
            {
                var winnable = [];
                var playerFilled = 0;

                for( var j = 0; j < winSets[i].length; j++)
                {
                    
                    if( winSets[i][j].player == player || winSets[i][j].player == '')
                    {
                        if( winSets[i][j].player == player)
                            playerFilled++; 
                        winnable.push( winSets[i][j].position);    
                    }
                } 

                if( playerFilled == 2 && winnable.length == 3)
                    winnables.push( winnable);     
            }
                
            if( winnables.length)
            {
                for( var i = 0; i < winnables[ Math.floor( Math.random() * winnables.length)].length; i++)
                {
                    if( validMoves.indexOf( winnables[ randomWin][i]))
                        callBack( validMoves.indexOf( winnables[ randomWin][i]+1));
                } 
            }
            else
            {
                callBack( 0); 
            }
        };
        
        function opponentWin( callBack)
        {
            var winnables = [];
            var opponent = '';
            
            
            if( player = 'X')
                opponent = 'O';
            else
                opponent = 'X';
                

            for( var i = 0; i < winSets.length; i++) 
            {
                var winnable = [];
                var opponentFilled = 0;

                for( var j = 0; j < winSets[i].length; j++)
                {
                    
                    if( winSets[i][j].player == opponent || winSets[i][j].player == '')
                    {
                        if( winSets[i][j].player == opponent)
                            opponentFilled++; 
                        winnable.push( winSets[i][j].position);    
                    }
                } 

                if( opponentFilled == 2 && winnable.length == 3)
                    winnables.push( winnable);     
            }
                
            var randomWin = Math.floor( Math.random() * winnables.length);
            if( winnables.length)
            {
                for( var i = 0; i < winnables[ Math.floor( Math.random() * winnables.length)].length; i++)
                {
                    if( validMoves.indexOf( winnables[ randomWin][i]))
                        callBack( validMoves.indexOf( winnables[ randomWin][i]+1));
                } 
            }
            else
            {
                callBack( 0); 
            }
        };
        
        function progressSet( callBack)
        {
            var fillables = [];
           
            for( var i = 0; i < winSets.length; i++) 
            {
                var fillable = [];
                var playerFilled = 0;

                for( var j = 0; j < winSets[i].length; j++)
                {
                    if( winSets[i][j].player == player || winSets[i][j].player == '')
                    {
                        if( winSets[i][j].player == player)
                            playerFilled++;
                        fillable.push( winSets[i][j].position);    
                    }
                } 

                if( playerFilled == 1 && fillable.length == 3)
                    fillables.push( fillable);     
            }
                
            if( fillables.length)
            {
                for( var i = 0; i < fillables[ Math.floor( Math.random() * winnables.length)].length; i++)
                {
                    if( validMoves.indexOf( fillables[ randomSet][i]))
                        callBack( validMoves.indexOf( fillables[ randomSet][i]+1));
                } 
            }
            else
            {
                callBack( 0); 
            }
        };
        
        function draw()
        {
            $( "button").prop( "disabled", true);
            $( "<div class=\"phase\">" + 
                    "<table>" +
                        "<tr>" +
                            "<td class=\"lrgtd\">" + board[ 0].position + "</td>" +
                            "<td class=\"lrgtd\">" + board[ 1].position + "</td>" +
                            "<td class=\"lrgtd\">" + board[ 2].position + "</td>" +
                        "</tr>" +
                        "<tr>" +
                            "<td class=\"lrgtd\">" + board[ 3].position + "</td>" +
                            "<td class=\"lrgtd\">" + board[ 4].position + "</td>" +
                            "<td class=\"lrgtd\">" + board[ 5].position + "</td>" +
                        "</tr>" +
                        "<tr>" +
                            "<td class=\"lrgtd\">" + board[ 6].position + "</td>" +
                            "<td class=\"lrgtd\">" + board[ 7].position + "</td>" +
                            "<td class=\"lrgtd\">" + board[ 8].position + "</td>" +
                        "</tr>" +
                    "</table>" +
                    "<h4>? Wins</h4>" +
                "</div>"
            ).hide().appendTo( ".large-ttt").fadeIn( 'slow', function()
            {
                $( ".phase").fadeOut( 'slow', function()
                {
                    $( "<div class=\"posi\">" +
                            "<table>" +
                                "<tr>" +
                                    "<td class=\"smltd\">" + board[ 0].position + "</td>" +
                                    "<td class=\"smltd\">" + board[ 1].position + "</td>" +
                                    "<td class=\"smltd\">" + board[ 2].position + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td class=\"smltd\">" + board[ 3].position + "</td>" +
                                    "<td class=\"smltd\">" + board[ 4].position + "</td>" +
                                    "<td class=\"smltd\">" + board[ 5].position + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td class=\"smltd\">" + board[ 6].position + "</td>" +
                                    "<td class=\"smltd\">" + board[ 7].position + "</td>" +
                                    "<td class=\"smltd\">" + board[ 8].position + "</td>" +
                                "</tr>" +
                            "</table>" +
                            "<h4>? Wins</h4>" +
                        "</div>"
                    ).hide().appendTo( ".small-ttt").fadeIn( 'slow', function()
                    {
                        $( ".phase").remove();
                        $( "button").prop( "disabled", false);
                    });
                });
            });
        }; 
    }
});
