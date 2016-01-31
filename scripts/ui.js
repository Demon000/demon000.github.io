var nav = document.querySelector('.nav');
var contact = document.querySelector('.contact');
document.onscroll = function(e)
{
  if(document.documentElement.scrollTop > 100)
  {
    document.body.classList.add('scrolled')
  }
  else
  {
    document.body.classList.remove('scrolled')
  }
}
