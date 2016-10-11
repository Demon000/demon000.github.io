var quotes = 
    [
      {
        'quote':'There are two ways of constructing a software design: One way is to make it so simple that there are obviously no deficiencies and the other way is to make it so complicated that there are no obvious deficiencies.',
        'author': 'C.A.R. Hoare'
      },
      {
        'quote':'The computing scientist’s main challenge is not to get confused by the complexities of his own making.',
        'author': 'E. W. Dijkstra'
      },
      {
        'quote':'The cheapest, fastest, and most reliable components are those that aren’t there.',
        'author': 'Gordon Bell'
      },
      {
        'quote':'One of my most productive days was throwing away 1000 lines of code.',
        'author': 'Ken Thompson'
      },
      {
        'quote':'Deleted code is debugged code.',
        'author': 'Jeff Sickel'
      },
      {
        'quote':'UNIX was not designed to stop its users from doing stupid things, as that would also stop them from doing clever things.',
        'author': 'Doug Gwyn'
      },
      {
        'quote':'Life is too short to run proprietary software.',
        'author': 'Bdale Garbee'
      },
      {
        'quote':'Unix is simple. It just takes a genius to understand its simplicity.',
        'author': 'Dennis Ritchie'
      },
      {
        'quote':'The only places for icons is in a church, a burning church at that.',
        'author': 'mhat'
      },
      {
        'quote':'The object-oriented model makes it easy to build up programs by accretion. What this often means, in practice, is that it provides a structured way to write spaghetti code.',
        'author': 'Paul Graham'
      },
      {
        'quote': 'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.',
        'author': 'Rick Osborne'
      },
      {
        'quote': 'Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the Universe trying to produce bigger and better idiots. So far, the Universe is winning.',
        'author': 'Rick Cook'
      }
    ];
function random()
{
  var rand = randomint(0, quotes.length);
  document.querySelector('.quote').innerHTML = quotes[rand].quote;
  document.querySelector('.author').innerHTML = 'by ' + quotes[rand].author;
}
function tweet()
{
  window.open('https://twitter.com/intent/tweet?text=' + encodeURI(document.querySelector('.quote').innerHTML), '_blank');
}
function randomint(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}