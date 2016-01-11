window.onkeypress = function(e)
{
  var charCode = e.which;
  if(charCode != 0)
  {
    var char = String.fromCharCode(charCode);
    dTerm.print(char);
  }
}
var dTerm = new Vue(
  {
    el: '#dterm',
    data:
    {
      chars: [],
    },
    methods:
    {
      print: function(str)
      {
        var self = this;
        str.split('').every(function(char)
        {
          self.chars.push(char);
        });
      },
      printChar: function(char)
      {
        var o = new Char(
          {
            data: char,
            class: 'color-red'
          });
        this.chars.push(o);
      }
    }
  });
function Char(options)
{
  if(typeof options.class == 'Array')
    this.class = options.class.join(' ');
  else
    this.class = options.class;
  this.data = options.data;
}
