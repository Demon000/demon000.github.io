var windowTmp = document.querySelector('#template').content.querySelector('.window');
var body = document.body, apps = document.querySelector('#apps');
var currentId = 1, moving = null, lastactive = null, offY, offX, currentIndex = 1000;

document.onmousemove = mouseMove;
document.onmouseup = mouseUp;


function createWindow(source, icon, title, width, height)
{
	var windowVar = document.importNode(windowTmp, true);
	windowVar.id = currentId;

	windowVar.style.zIndex = currentIndex;
	windowVar.querySelector('img').src = icon;
	windowVar.querySelector('.title').innerHTML = title;
	windowVar.querySelector('.title').onmousedown = mouseDown;
	windowVar.querySelector('.close').onclick = close;
	windowVar.querySelector('.maximize').onclick = maximize;
	windowVar.querySelector('.minimize').onclick = minimize;

	loadPage(source, windowVar.querySelector('main'));

	windowVar.style.height = height;
	windowVar.style.width = width;

	windowVar.barItem = document.createElement('img');
	windowVar.barItem.onclick = minimize;
	windowVar.barItem.src = icon;
	windowVar.barItem.title = title;
	windowVar.barItem.className = 'active';
	windowVar.barItem.windowVar = windowVar;
	body.appendChild(windowVar);
	apps.appendChild(windowVar.barItem);

	fireEvent(windowVar, 'mousedown');

	windowVar.onmousedown = makeactive;

	currentId++;
	currentIndex++;
	return;
}

function loadPage(page, object)
{
	xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function(e)
	{ 
		if (xhr.readyState == 4 && xhr.status == 200)
			object.innerHTML = xhr.responseText;
	}

	xhr.open("GET", page, true);
	xhr.setRequestHeader('Content-type', 'text/html');
	xhr.send();
}
function close(e)
{
	remove(e.target.parentElement.parentElement.barItem);
	remove(e.target.parentElement.parentElement);
}
function maximize(e)
{
	e = e.target.parentElement.parentElement;
	e.classList.remove('leftscreen', 'rightscreen');
	e.classList.toggle('fullscreen');
}
function minimize(e)
{
	if(e.target.classList.contains('minimize'))
		e = e.target.parentElement.parentElement;
	else
		e = e.target.windowVar;


	e.classList.toggle('minimized');
	e.barItem.classList.toggle('minimized');

	var windows = document.body.querySelectorAll('.window');
}
function mouseDown(e)
{
	moving = e.target.parentElement.parentElement;

	if(moving.classList.contains('fullscreen', 'rightscreen', 'leftscreen'))
	{
		offY = 23;
		offX = parseInt(moving.style.width, 10) / 2;
	}
	else
	{
		offY = e.pageY - moving.offsetTop;
		offX = e.pageX - moving.offsetLeft;
	}

}
function mouseMove(e)
{
	if(moving == null)
		return;
	else if(e.pageY < 2)
	{
		moving.classList.add('fullscreen');
		return;
	}
	else if(e.pageX < 2)
	{
		moving.classList.add('leftscreen');
		return;
	}
	else if(e.pageX > window.innerWidth - 2)
	{
		moving.classList.add('rightscreen');
	}
	else
	{
		moving.classList.remove('fullscreen', 'leftscreen', 'rightscreen');
	}

	moving.style.left = e.pageX - offX + "px";
	moving.style.top = e.pageY - offY + "px";
}
function mouseUp(e)
{
	moving = null;
}
function remove(element)
{
	element.parentElement.removeChild(element);
}
/*function makeactive(e)
{
	e = e.currentTarget;

	e.style.zIndex = currentIndex;
	currentIndex++;

	var windows = document.body.querySelector('.active');

	windows.classList.remove('active');
	windows.barItem.classList.remove('active');

	e.classList.add('active');
	e.barItem.classList.add('active');
}*/
function makeactive
function fireEvent(e, etype){
  if (e.fireEvent) 
  {
    e.fireEvent('on' + etype);
  } 
  else 
  {
    var ev = document.createEvent('Events');
    ev.initEvent(etype, true, false);
    e.dispatchEvent(ev);
  }
}
createWindow('filemanager.html', 'images/computer.png', 'Computer', '500px', '500px');