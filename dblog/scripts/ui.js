function ripple(e)
{
  var parent = e.target;
  var ink;
  if(parent.querySelector('.ink'))
  {
    ink = parent.querySelector('.ink')
    setTimeout(function(){parent.removeChild(ink);}, 500);
  }
  ink = document.createElement('span');
  parent.appendChild(ink);
  ink.className = 'ink';
  ink.style.height = ink.style.width = Math.max(parent.offsetWidth, parent.offsetHeight) + 'px';
  var x = e.pageX - parent.offsetLeft - ink.clientWidth / 2;
  var y = e.pageY - parent.offsetTop - ink.clientHeight / 2;
  ink.style.top = y + 'px';
  ink.style.left = x + 'px';
}
