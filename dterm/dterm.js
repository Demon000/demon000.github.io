window.onkeypress = function(e)
{
  var charCode = e.charCode;
  if(charCode != '0')
  {
    var char = String.fromCharCode(charCode);
    dTerm.print(char);
  }
}
window.onkeydown = function(e)
{
  var keyCode = e.keyCode;
  if(dTerm[keyCode])
  {
    dTerm[keyCode]();
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
      print(str)
      {
        var self = this;
        str.split('').forEach(function(char)
        {
          self.printChar(char);
        });
      },
      printChar(char)
      {
        var o = new Char(
          {
            data: char,
            class: 'color-red'
          });
        this.chars.push(o);
      },
      8()
      {
        this.chars.pop();
      }
    }
  });
function Char(options)
{
  this.class = options.class;
  this.data = options.data;
}
