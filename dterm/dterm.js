window.onkeypress = function(e)
{
  var charCode = e.charCode;
  if(charCode != '0' && charCode != '32')
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
      geometry:
      {
        'font-size': '12',
        'width': '80',
        'height': '24',
        'line-height': '1.1'
      },
      style: {},
      input: '',
      commands: [],
    },
    created()
    {
      this.printChar('&#9608;',
      {
        mod: 'flash',
      });
      this.style['font-size'] = this.geometry['font-size'] + 'px';
      this.style['width'] = this.geometry['width'] + 'ch';
      this.style['line-height'] = this.geometry['font-size'] * this.geometry['line-height'] + 'px';
      this.style['height'] = this.geometry['font-size'] * this.geometry['line-height'] * this.geometry['height'] + 'px';
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
        while(this.chars.length % this.geometry['width'] > 0)
          this.printChar('&nbsp;');
      },
      32()
      {
        this.printChar('&nbsp;');
      },
    }
  });
function Char(char, options)
{
  this.color = options.color ? 'color-' + options.color : '';
  this.background = options.background ? 'bg-' + options.background : '';
  this.mod = options.mod || '';
  this.lock = options.lock || false;

  this.data = char;
}
dTerm.print('[root @ dterm ~]$ ',
{
  lock: true,
  color: 'dodge-blue',
});
