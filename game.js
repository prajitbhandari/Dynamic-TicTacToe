
   	var current_player="X";
    var opponent_player="O";
    var counter=1;
    var gameplay=true;

  
   window.onload = function()
    {
        var btn = document.getElementById('btn-submit');
        var reset = document.getElementById('game-reset');
        
        if(btn){
           
            btn.addEventListener('click',function(e){ 
               e.preventDefault();    
               return validateForm();
                
            });

        if(reset){
            reset.addEventListener('click',function(){
                window.location.reload(true);
            });
        }

        }
    } 

    
      

   
    
    
    function validateForm() {
        var a = document.forms["input-form"]["myInput"].value;
        if (a == "") {
            alert("Name must be filled out");
            document.forms["input-form"]["myInput"].focus(); 
            return false;
        }else {
            var numbers = /^[0-9]+$/;
            if(!a.match(numbers))
            {
                alert('Enter Numeric Values Only'); 
                document.forms["input-form"]["myInput"].focus(); 
                return false;
            }else{

                var num=parseInt(a);   
                var board=[];
                for(let i=0;i<num;i++){
                    board.push(["",""]);
                }

                document.getElementById('game-reset').style.visibility="visible";
                document.getElementById('result').innerHTML="";
                document.getElementById('player-info').innerHTML="You are Player:"+"X";
                document.getElementById('player-turn').innerHTML="Player Turn:" +"X";
                setCurrentPlayer("X");
                setCounter(0);

                var table = document.getElementById('grid-table');
                table.innerHTML="";
                for (let i = 0; i <num;i++) {
                    let row = document.createElement("tr");	
                    for(let j=0;j<num;j++){
                        var cell=document.createElement("td");
                        cell.setAttribute("data-x",i);
                        cell.setAttribute("data-y",j);
                        cell.setAttribute("class","gameClick");
                        cell.addEventListener("click",function(event){
                            gameCheck(event,num,board);
                        });
                        row.appendChild(cell);
                    }
                    table.appendChild(row);
                }
                return false;
            }
        }
    }
        
    function setCurrentPlayer(cp){
        current_player=cp;

    }

    function getCurrentPlayer(){
        return current_player;
    } 

    function setCounter(count){
        counter=count+1;;

    }

    function getCounter(){
        return counter;
    }

    function setGamePlay(gp){
        gameplay=gp;

    }
    function getGamePlay(){
        return gameplay;
    }

    function gameCheck(event,num,board){
        var c = event.target;
        if(c.innerHTML!=""){
            return false;
        }

        if(getCurrentPlayer()=="X"){
            c.innerHTML=getCurrentPlayer();
            setCurrentPlayer("O");
            document.getElementById('player-turn').innerHTML="Then =>"+"Player"+ " "+getCurrentPlayer(); +" "+ "Turn";

        }else if(getCurrentPlayer()=="O"){
            c.innerHTML=getCurrentPlayer();
            setCurrentPlayer("X");
            document.getElementById('player-turn').innerHTML="Next =>"+"Player"+ " "+ getCurrentPlayer(); +" "+ "Turn";
        }

        let xPos=c.getAttribute("data-x");
        let yPos=c.getAttribute("data-y");

        let xCor=parseInt(xPos);
        let yCor=parseInt(yPos);


        board[xCor][yCor]= c.innerHTML;
        var counterFunc=getCounter();
        if(getGamePlay()==true){
        leftDiagonal(board,num);
        rightDiagonal(board,num);
        checkRow(board,num);
        checkColumn(board,num);
        checkDraw(board,counterFunc,num);
        setCounter(counterFunc);
        }

    }

    function leftDiagonal(board,num){
        let lcount=1;
        for(let i=0;i<num-1;i++){
            for(let j=0;j<num-1;j++){

                if(i==j){
                    if((board[i][j]==board[i+1][j+1])){
                        lcount=lcount+1;
                        if(lcount==num){
                            result(board[i][j],board,num);
                            return true;
                            setGamePlay(false);
                            break;
                        }	
                    }
                }		
                
            }												
        }

    }

    function rightDiagonal(board,num){
        let rcount=1;
        for(let i=0;i<num-1;i++){
            for(let j=0;j<num;j++){

                if(i+j==num-1){
                    if(board[i][j]!=""){
                        if((board[i][j]==board[i+1][j-1])){
                            rcount=rcount+1;
                            if(rcount==num){
                                result(board[i][j],board,num);
                                return true;
                                setGamePlay(false);
                                break;
                            }	
                        }
                    }
                }		
                
            }
        }
    }

    function checkRow(board,num){
        let xcount=1;
        let ycount=1;
        for(let i=0;i<num;i++){
            for(let j=0;j<num-1;j++){
                if((board[i][j]=="X" && board[i][j+1]=="X")){      
                    xcount=xcount+1;
                    console.log("Vlue of xrowcount is"+xcount);
                    if(xcount==num){
                        console.log("X le jito");
                        result(board[i][j],board,num);
                        return true;
                        setGamePlay(false);
                        break;
                    }
                }else if((board[i][j]=="O" && board[i][j+1]=="O")){  

                    ycount=ycount+1;
                    console.log("Vlue of yrowcount is"+ycount);
                    if(ycount==num){
                        console.log("O le jito");
                        result(board[i][j],board,num);
                        return true;
                        setGamePlay(false);
                        break;
                    }
                }

            }
            xcount=1;
            ycount=1;

        }
    }

    function checkColumn(board,num){
        let xcount=1;
        let ycount=1;
        for(let i=0;i<num-1;i++){	
            for(let j=0;j<num-1;j++){
                if((board[j][i]=="X" && board[j+1][i]=="X")){    
                    xcount=xcount+1;
                    console.log("Vlue of xcoulmncount is"+xcount);
                    if(xcount==num){
                        result(board[j][i],board,num);
                        return true;
                        setGamePlay(false);
                        break;
                    }
                }
                else if((board[j][i]=="O" && board[j+1][i]=="O")){  
                    ycount=ycount+1;
                    console.log("Value of ycolumncount is"+ycount);
                    if(ycount==num){
                        result(board[j][i],board,num);
                        return true;
                        setGamePlay(false);
                        break;
                    }																								
                }
            }
            xcount=1;
            ycount=1;												

        }

    }


    function checkDraw(board,getCounter,num){
        if(getCounter==num*num){
            if(leftDiagonal(board,num)!=true || rightDiagonal(board,num)!=true || 
                checkRow(board,num)!=true ||checkColumn(board,num)!=true){
                alert("Game is Tied");
                var p=document.getElementsByClassName('gameClick');
                for (var x=0;x<p.length;x++){
                p[x].innerHTML= "";
            }
                for(let i=0;i<num;i++){
                    board.pop();
                }
                setGamePlay(false);

            }
        }

    }

    function result(player,board,num)
    {
        document.getElementById('result').innerHTML= 'Player'+ " "+ player +" " +'wins';
        var p=document.getElementsByClassName('gameClick');
        for (var x=0;x<p.length;x++){
            p[x].innerHTML= "";
        }
        document.getElementById('player-turn').innerHTML="";
        for(let i=0;i<num;i++){
            board.pop(); 	
        }
    }
    


