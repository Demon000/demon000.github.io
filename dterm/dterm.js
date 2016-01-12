window.onkeypress = function(e)
{
  var charCode = e.charCode;
  if(charCode != '0')
  {
    var char = String.fromCharCode(charCode);
    dTerm.key(char);
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
      command: '',
    },
    created()
    {
      this.printChar('-',
      {
        cursor: true,
      });
    },
    methods:
    {
      print(str, options)
      {
        var self = this;
        str.split('').forEach(function(char)
        {
          self.printChar(char, options);
        });
      },
      printChar(char, options)
      {
        options = options || {};
        var o = new Char(char, options);
        this.chars.splice(this.chars.length - 1, 0, o);
      },
      key(char)
      {
        this.command += char;
        this.printChar(char);
      },
      8()
      {
        this.chars.splice(this.chars.length - 2, 1);
      },
      13()
      {

      }
    }
  });
function Char(char, options)
{
  this.class = '';
  if(options.cursor)
    this.class += 'cursor ';
  if(options.color)
    this.class += 'color-' + options.color + ' ';
  if(options.background)
    this.class += 'bg-' + options.background + ' ';
  this.data = char;
}
