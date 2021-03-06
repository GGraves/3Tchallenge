angular.module( '3T', []).factory( 'TFactory', function()
{
    return function()
    {
        var xBetter         = true;
        var winSets         = [ 
                                [ { position : 0, player : ''}, { position : 3, player : ''}, { position : 6, player : ''}],
                                [ { position : 1, player : ''}, { position : 4, player : ''}, { position : 7, player : ''}],
                                [ { position : 2, player : ''}, { position : 5, player : ''}, { position : 8, player : ''}],
                                [ { position : 0, player : ''}, { position : 1, player : ''}, { position : 2, player : ''}],
                                [ { position : 3, player : ''}, { position : 4, player : ''}, { position : 5, player : ''}],
                                [ { position : 6, player : ''}, { position : 7, player : ''}, { position : 8, player : ''}],
                                [ { position : 0, player : ''}, { position : 4, player : ''}, { position : 8, player : ''}],
                                [ { position : 6, player : ''}, { position : 4, player : ''}, { position : 2, player : ''}]
                              ];
        var board           = [
                                { player : ''}, { player : ''}, { player : ''},
                                { player : ''}, { player : ''}, { player : ''},
                                { player : ''}, { player : ''}, { player : ''}
                              ];
        var completedMoves  = [];
        var validMoves      = [];
        var winner          = "";
        var player          = '';
        var action          = '';
        var xWin            = 0;
        var oWin            = 0;
        var startTime       = 0;
        var totalTime       = 0;
        
        function simulation( callBack)       
        {
            setVars( function()
            { 
                generateBoard( function()
                {
                    totalTime = totalTime + ((new Date().getTime()) - startTime);
                    draw( function()
                    {
                        callBack()
                    });
                });
            });
        };

        function untilWin()
        {
            if( xWin == 0 && oWin == 0)
            {
                $( "button").prop( "disabled", true);
                if( ( ".time").length)
                {
                    $( ".time").fadeOut( 'slow', function()
                    {
                        $( ".time").remove();
                        if( ( ".posi").length)
                        {   
                            $( ".posi").fadeOut( 'slow', function()
                            {
                                $( ".posi").remove(); 
                            });
                        }
                    });
                }
            }
            if( xWin == 10)
            {
                $( "button").prop( "disabled", false);
                timeStamp();
            }
            else if( oWin == 10)
            {
                $( "button").prop( "disabled", false);
                timeStamp();
            }
            else
            {   
                startTime = new Date().getTime();
                simulation( function()
                {
                    untilWin();
                });
            }
        }
        
        function timeStamp()
        {
            $( "<div class=\"time btn-align\">" + 
                    "<h2> The simulation took " +
                    + totalTime +
                    " seconds to run, excluding jQuery animations." +
                "</div>"
            ).hide().appendTo( ".ftr").fadeIn( 'slow');
        }

        function setVars( callBack)
        {
            xBetter         = Math.floor( ( Math.random() * 2))? true: false;
            winner          = "Draw";   
            winSets         = [ 
                                [ { position : 0, player : ''}, { position : 3, player : ''}, { position : 6, player : ''}],
                                [ { position : 1, player : ''}, { position : 4, player : ''}, { position : 7, player : ''}],
                                [ { position : 2, player : ''}, { position : 5, player : ''}, { position : 8, player : ''}],
                                [ { position : 0, player : ''}, { position : 1, player : ''}, { position : 2, player : ''}],
                                [ { position : 3, player : ''}, { position : 4, player : ''}, { position : 5, player : ''}],
                                [ { position : 6, player : ''}, { position : 7, player : ''}, { position : 8, player : ''}],
                                [ { position : 0, player : ''}, { position : 4, player : ''}, { position : 8, player : ''}],
                                [ { position : 6, player : ''}, { position : 4, player : ''}, { position : 2, player : ''}]
                              ];
            board           = [
                                { player : ''}, { player : ''}, { player : ''},
                                { player : ''}, { player : ''}, { player : ''},
                                { player : ''}, { player : ''}, { player : ''}
                              ];
            completedMoves  = [];
            validMoves      = [];
            generateMoves( function()
            {
                callBack();
            });
        }

        function generateMoves( callBack)
        {
            var array       = [ 0, 1, 2, 3, 4, 5, 6, 7, 8];
            var randomArray = Math.floor( ( Math.random() * 72));
            var shift       = randomArray % 8;
            for( var i = 0; i < ( Math.ceil( randomArray / 8) - 1); i++)
            {
                array.push( array[0]);
                array.shift();
            }
            
            if( shift)
            {
                array.splice( shift + 1, 0, array[0]);
                array.shift();
            }
            else
            {
                array.push( array[0]);
                array.shift();
            }
            validMoves = array;
            callBack();
        };

        function generateBoard( callBack)
        {
            playerMove( false, function()
            {
                callBack();
            });
        };

        function playerMove( finished, callBack)
        {
            if( !finished)
            {
                player = completedMoves.length % 2? 'O': 'X';
                action = ( completedMoves.length % 2 && xBetter) || ( !completedMoves.length % 2 && !xBetter)? 'BAD': 'GOOD';
            }

            if( finished == true)
            {
                if( completedMoves.length != 9) 
                {
                    if( player == 'X')
                        xWin++;
                    else
                        oWin++;
                }
                callBack();
            }
            else if( action == 'BAD' && ( Math.floor( Math.random() * 2)))
            {
                opponentWin( function( block)
                {
                    if( block)
                    {
                        board[ block-1].player = player;
                        completedMoves.push( block - 1);
                        setRandom( validMoves.indexOf( block - 1), function()
                        {
                            validMoves.splice( validMoves.indexOf( block - 1), 1);
                            if( validMoves.length)
                                playerMove( false, callBack);
                            else
                                playerMove( true, callBack);
                        });
                    }
                    else
                    {
                        board[ validMoves[ 0]].player = player;
                        completedMoves.push( validMoves[ 0]);
                        setRandom( -1, function()
                        {
                            validMoves.shift();
                            if( validMoves.length)
                                playerMove( false, callBack);
                            else
                                playerMove( true, callBack);
                        });
                    }
                });
            }
            else 
            {
                winningMove( function( win)
                {   
                    if( win)
                    {
                        board[ win - 1].player = player;
                        winner = player + " Wins!";
                        validMoves = [];
                        playerMove( true, callBack);
                    }
                    else
                    {
                        opponentWin( function( block)
                        {
                            if( block)
                            {
                                board[ block - 1].player = player;
                                completedMoves.push( block - 1);
                                setRandom( validMoves.indexOf( block - 1), function()
                                {
                                    validMoves.splice( validMoves.indexOf( block - 1), 1);
                                    if( validMoves.length)
                                        playerMove( false, callBack);
                                    else
                                        playerMove( true, callBack);
                                });
                            }
                            else
                            {
                                progressSet( function( space)
                                {
                                    if( space)
                                    {
                                        board[ space - 1].player = player;
                                        completedMoves.push( space - 1);
                                        setRandom( validMoves.indexOf( space - 1), function()
                                        {
                                            validMoves.splice( validMoves.indexOf( space - 1), 1);
                                            if( validMoves.length)
                                                playerMove( false, callBack);
                                            else
                                                playerMove( true, callBack);
                                        });
                                    }
                                    else
                                    {
                                        board[ validMoves[ 0]].player = player;
                                        completedMoves.push( validMoves[ 0]);
                                        setRandom( -1, function()
                                        {
                                            validMoves.shift();
                                            if( validMoves.length)
                                                playerMove( false, callBack);
                                            else
                                                playerMove( true, callBack);
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        };

        function setRandom( index, callBack)
        {
            for( var i = 0; i < winSets.length; i++) 
            {
                for( var j = 0; j < winSets[ i].length; j++)
                {
                    if( winSets[ i][ j].position == ( index == -1? validMoves[ 0]: validMoves[ index]))
                        winSets[ i][ j].player = player;
                } 
            }
            callBack();
        };

        function winningMove( callBack)
        {
            var winnables = [];
            for( var i = 0; i < winSets.length; i++) 
            {
                var winnable = [];
                var playerFilled = 0;
                for( var j = 0; j < winSets[ i].length; j++)
                {
                    if( winSets[ i][ j].player == player || winSets[ i][ j].player == '')
                    {
                        if( winSets[ i][ j].player == player)
                            playerFilled++; 
                        winnable.push( winSets[ i][ j].position);    
                    }
                } 
                if( playerFilled == 2 && winnable.length == 3)
                    winnables.push( winnable);     
            }
            if( winnables.length)
            {
                var randomWinnable = winnables[ Math.floor( Math.random() * winnables.length)]
                for( var i = 0; i < randomWinnable.length; i++)
                {
                    if( validMoves.indexOf( randomWinnable[ i]) >= 0)
                        callBack( randomWinnable[ i] + 1);
                } 
            }
            else
            {
                callBack( 0); 
            }
        };
        
        function opponentWin( callBack)
        {
            var winnables   = [];
            var opponent    = '';
            if( player == 'X')
                opponent = 'O';
            else
                opponent = 'X';
            for( var i = 0; i < winSets.length; i++) 
            {
                var winnable        = [];
                var opponentFilled  = 0;
                for( var j = 0; j < winSets[ i].length; j++)
                {
                    if( winSets[ i][ j].player == opponent || winSets[ i][ j].player == '')
                    {
                        if( winSets[ i][ j].player == opponent)
                            opponentFilled++; 
                        winnable.push( winSets[ i][ j].position);    
                    }
                } 
                if( opponentFilled == 2 && winnable.length == 3)
                    winnables.push( winnable);     
            }
            if( winnables.length)
            { 
                var randomWinnable = winnables[ Math.floor( Math.random() * winnables.length)]
                for( var i = 0; i < randomWinnable.length; i++)
                {
                    if( validMoves.indexOf( randomWinnable[ i]) >= 0)
                        callBack( randomWinnable[ i] + 1);
                } 
            }
            else
                callBack( 0); 
        };
        
        function progressSet( callBack)
        {
            var fillables = [];
            for( var i = 0; i < winSets.length; i++) 
            {
                var fillable        = [];
                var playerFilled    = 0;

                for( var j = 0; j < winSets[ i].length; j++)
                {
                    if( winSets[ i][ j].player == player || winSets[ i][ j].player == '')
                    {
                        if( winSets[ i][ j].player == player)
                            playerFilled++;
                        fillable.push( winSets[ i][ j].position);    
                    }
                } 
                if( playerFilled == 1 && fillable.length == 3)
                    fillables.push( fillable);     
            }
            if( fillables.length)
            {
                var randomFillable = fillables[ Math.floor( Math.random() * fillables.length)]
                for( var i = 0; i < randomFillable.length; i++)
                {
                    if( validMoves.indexOf( randomFillable[i]) >= 0)
                        callBack( randomFillable[i]+1);
                } 
            }
            else
                callBack( 0); 
        };
        
        function draw( callBack)
        {
            $( "<div class=\"phase\">" + 
                    "<table>" +
                        "<tr>" +
                            "<td class=\"lrgtd\">" + board[ 0].player + "</td>" +
                            "<td class=\"lrgtd\">" + board[ 1].player + "</td>" +
                            "<td class=\"lrgtd\">" + board[ 2].player + "</td>" +
                        "</tr>" +
                        "<tr>" +
                            "<td class=\"lrgtd\">" + board[ 3].player + "</td>" +
                            "<td class=\"lrgtd\">" + board[ 4].player + "</td>" +
                            "<td class=\"lrgtd\">" + board[ 5].player + "</td>" +
                        "</tr>" +
                        "<tr>" +
                            "<td class=\"lrgtd\">" + board[ 6].player + "</td>" +
                            "<td class=\"lrgtd\">" + board[ 7].player + "</td>" +
                            "<td class=\"lrgtd\">" + board[ 8].player + "</td>" +
                        "</tr>" +
                    "</table>" +
                "</div>"
            ).hide().appendTo( ".large-ttt").fadeIn( 'slow', function()
            {
                $( ".phase").fadeOut( 'slow', function()
                {
                    $( "<div class=\"posi\">" +
                            "<table>" +
                                "<tr>" +
                                    "<td class=\"smltd\">" + board[ 0].player + "</td>" +
                                    "<td class=\"smltd\">" + board[ 1].player + "</td>" +
                                    "<td class=\"smltd\">" + board[ 2].player + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td class=\"smltd\">" + board[ 3].player + "</td>" +
                                    "<td class=\"smltd\">" + board[ 4].player + "</td>" +
                                    "<td class=\"smltd\">" + board[ 5].player + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td class=\"smltd\">" + board[ 6].player + "</td>" +
                                    "<td class=\"smltd\">" + board[ 7].player + "</td>" +
                                    "<td class=\"smltd\">" + board[ 8].player + "</td>" +
                                "</tr>" +
                            "</table>" +
                            "<h4>" + winner + "</h4>" +
                        "</div>"
                    ).hide().appendTo( ".small-ttt").fadeIn( 'slow', function()
                    {
                        $( ".phase").remove();
                        callBack();
                    });
                });
            });
        }; 

        
        untilWin();
    }
});
