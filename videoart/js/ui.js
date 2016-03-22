var nav = document.querySelector('.nav');
var contact = document.querySelector('.contact');
function scrolled(e)
{
  if(document.documentElement.scrollTop > window.innerHeight / 3)
  {
    document.body.classList.add('scrolled')
  }
  else
  {
    document.body.classList.remove('scrolled')
  }
}
document.onscroll = document.onload = scrolled;
