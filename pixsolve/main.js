var userLang = navigator.language || navigator.userLanguage, loaded; 
document.querySelector('#language').value = userLang.substr(0,2) || 'en';
for(var i = 0; i < words.length; i = i + 25)
{
	create(i, document.querySelector('#language').value);
}
document.querySelector('#blackscreen').onclick = hide;
function clear()
{
	document.querySelector('main').innerHTML = '';
}
function create(i, lang)
{
	var element = document.createElement('figure');
	var temp = document.createElement('img');
	temp.src = 'images/' + words[i].img;

	checkimg(temp.src, function(exists)
	{
		if(exists)
		{
			element.appendChild(temp);

			temp = document.createElement('figcaption');
			temp.innerHTML = words[i][lang];

			element.appendChild(temp);

			document.querySelector('main').appendChild(element);
		}
	});

}
function search(text, lan)
{
	var text = document.querySelector('#searchinput').value.toLowerCase();
	var lang = document.querySelector('#language').value;
	var found = 0;
	clear();
	if(!text)
		{
			document.querySelector('main').innerHTML = '<span>Enter a search criteria.</span>'
			return;
		}
	else
	{
		for(var i = 0; i < words.length; i++)
		{
			if(words[i][lang].length == text.length)
			{
				for(var j = 0; j < text.length; j++)
				{
					if(words[i][lang][j] != text[j] && text[j] != '*' && text[j] != ' ')
						break;
					if(j == text.length - 1)
						{
							create(i, lang);
							found++;
						}
				}
			}
		}
	}
	if(document.querySelector('main').innerHTML == '')
	{
		document.querySelector('main').innerHTML = '<span>Found ' + found + ' matches.</span>';
	}
}
function hide()
{
	var boxes = document.querySelectorAll('.box');
	for(var i = 0; i < boxes.length; i++)
		boxes[i].style.display = 'none';
	document.querySelector('#blackscreen').style.display = 'none';
}
function show(element)
{
	document.querySelector(element).style.display = 'block';
	document.querySelector('#blackscreen').style.display = 'block';
}
function checkimg(url, callback) {
	var img = new Image();
	img.onload = function() { callback(true); };
	img.onerror = function() { callback(false); };
	img.src = url;
}