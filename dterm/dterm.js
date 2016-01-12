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
      input: '',
    },
    created()
    {
      this.printChar('-',
      {
        mod: 'cursor',
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
        this.input += char;
        this.printChar(char);
      },
      8()
      {
        if(this.chars.length > 1 && this.chars[this.chars.length - 2].lock == false)
          this.chars.splice(this.chars.length - 2, 1);
      },
      13()
      {

      }
    }
  });
function Char(char, options)
{
  this.color = options.color ? 'color-' + options.color : '';
  this.background = options.background? 'bg-' + options.background : '';
  this.mod = options.mod || '';
  this.lock = options.lock || false;

  this.data = char;
}
dTerm.print('[root @ dterm ~]$ ',
{
  lock: true,
  color: 'dodge-blue',
});
