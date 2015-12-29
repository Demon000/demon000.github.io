tion clock()
{
	var date = new Date();
	document.getElementById('time').innerHTML = date.getHours() + ':' + addZero(date.getMinutes());
	setTimeout(clock, 30000);
}
function getid(){
	var url=document.getElementById('tb').value;
	var ID = '';
	url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
	if(url[2] != undefined) 
	{
		ID = url[2].split(/[^0-9a-z_]/i);
		ID = ID[0];
		document.getElementById('clipvid').src = 'http://www.youtube.com/embed/' + ID + '?autoplay=1&loop=1&playlist=' + ID;
	}
	else
	{
		ID = url;
		if(ID[0].length == 11)
			document.getElementById('clipvid').src = 'http://www.youtube.com/embed/' + ID + '?autoplay=1&loop=1&playlist=' + ID;
		else if(ID[0].length != 0)
		{
			document.getElementById('clipvid').src = 'http://www.youtube.com/embed/?listType=search&list='+ ID +'&showinfo=1&autoplay=1&loop=1';
		}
		else
		{
			alert("Enter something!");
		}
	}
	return false;
}