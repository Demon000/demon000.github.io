var toggle = 0, highscore = 0, score = 0, moves = 0, minutes = 0, seconds = 0, games =0, gamescore = 0, alertBox = 1;
var swap = [1,0], squares = [0,0,0,0,0,0,0,0,0,0];
function toggleMenu()
{
	toggle = swap[toggle];
	if(toggle == 0)
		{
			document.getElementById('panel').style['transform'] = 'translateX(-' + document.getElementById('panel').offsetWidth + 'px)';
			$("#shadow").fadeToggle();
		}
	else
		{
			document.getElementById('panel').style['transform'] = 'translateX(0px)';
			$("#shadow").fadeToggle();	
		}
}
function colorOne(id)
{
	squares[id] = swap[squares[id]];
}
function color(id)
{
	colorOne(id);
    if(id != 3 && id != 6 && id != 9)
        colorOne(id + 1);
    if(id != 1 && id != 4 && id != 7)
        colorOne(id - 1);
    if(id != 7 && id != 8 && id != 9)
        colorOne(id + 3);
    if(id != 1 && id != 2 && id != 3)
        colorOne(id - 3);
    moves++;
    if(moves > 15)
    {
    	if(alertBox == 1)
    		alert("You Lost!")
    	else
    	{
    		document.getElementById('bodyid').className = 'colorbase';
        	setTimeout(function(){ document.getElementById('bodyid').className = 'colorbackground'; }, 300);
    	}
    	prepareGame();
    }
    else
    {
    	document.getElementById('moves').innerHTML = moves;
    	update();
    }
}
function update()
{
	for (var i = 1; i <= 9; i++) 
	{
		if(squares[i] == 0)
			document.getElementById(i).className = 'colorbase';
		else
			document.getElementById(i).className = 'colorsecondary';
	}
	var end=1;
	for (var i = 1; i <= 9; i++) 
		if(squares[i] != squares[i-1] && i != 1)
			end = 0;
	if(end == 1)
		startNew();
}
function randomUpdate()
{
	for (var i = 1; i <= 9; i++) 
	{
		squares[i] = randomBinary();
	}
	update();
}
function randomBinary()
{
    return (Math.floor(Math.random() * 9) % 2);
}
function startNew()
{
	if(moves != 0)
		score = Math.floor(score + 1000 / moves);
	else
		score++;
	moves = 0;
	minutes = 0;
	seconds = 0;
	games++;
	if(score > highscore)
		{
			highscore = score;
			setCookie('highscore', highscore, 100);
		}
	document.getElementById('games').innerHTML = games;
	document.getElementById('score').innerHTML = score;
	document.getElementById('highscore').innerHTML = highscore;
	document.getElementById('moves').innerHTML = moves;
	document.getElementById('timer').innerHTML = minutes + ':' + addZero(seconds);
	if(alertBox == 1)
		alert("You Won!");
	else
	{
		document.getElementById('bodyid').className = 'colorsecondary';
        setTimeout(function(){ document.getElementById('bodyid').className = 'colorbackground'; }, 300);
	}
	randomUpdate();
}
function prepareGame()
{
	if(getCookie('highscore') != '')
		highscore = getCookie('highscore');
	else
		highscore = 0;

	if(getCookie('alertBox') == 1)
		{
			document.getElementById('alertBox').checked = false;
			alertBox = 1;
		}
	else if(getCookie('alertBox') == 0)
		{
			document.getElementById('alertBox').checked = true;
			alertBox = 0;
		}
	score = 0;
	moves = 0;
	games = 0;
	minutes = 0;
	seconds = 0;
	document.getElementById('games').innerHTML = games;
	document.getElementById('score').innerHTML = score;
	document.getElementById('highscore').innerHTML = highscore;
	document.getElementById('moves').innerHTML = moves;
	document.getElementById('timer').innerHTML = minutes + ':' + addZero(seconds);
	randomUpdate();
}
function clock()
{
	var date = new Date();
	seconds++;
	minutes = Math.floor(seconds / 60) + minutes;
	seconds = seconds % 60;
	document.getElementById('timer').innerHTML = minutes + ':' + addZero(seconds);
	document.getElementById('time').innerHTML = date.getHours() + ':' + addZero(date.getMinutes());
	setTimeout(clock, 1000);
}
function changeAlertBox()
{
	if(document.getElementById("alertBox").checked)
		{
			alertBox = 0;
			setCookie('alertBox', 0, 100);
		}
	else 
		{
			alertBox = 1;
			setCookie('alertBox', 1, 100);
		}
}
function addZero(seconds)
{
	if(seconds<10)
		seconds = '0' + seconds;
	return seconds;		
}
function setCookie(cname, cvalue, exdays) 
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
} 
function getCookie(cname) 
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
} 
$(document).keypress(function(event){
 
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '55')
            color(1);
        else if(keycode == '56')
            color(2);
        else if(keycode == '57')
            color(3);
        else if(keycode == '52')
            color(4);
        else if(keycode == '53')
            color(5);
        else if(keycode == '54')
            color(6);
        else if(keycode == '49')
            color(7);
        else if(keycode == '50')
            color(8);
        else if(keycode == '51')
            color(9);
});