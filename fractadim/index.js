'use strict';
var fractadim = new Vue(
  {
    el: 'body',
    data:
    {
      history:
      [

      ],
      curent:
      {
        image: '',
        name: '',
        size: '',
      },
      limit: 220,
      base: 32,
      iterations: 4,
    },

    init()
    {
      this.canvas = document.querySelector('canvas');
      this.context = this.canvas.getContext('2d');
      this.upload = document.querySelector('#upload');
      this.preview = document.querySelector('#preview');
    },
    methods:
    {
      uploadstart()
      {
        this.upload.click();
      },
      uploaded(e)
      {
        if(this.curent.name)
        {
            this.history.unshift({name: this.curent.name, image: this.curent.image, size: this.curent.size});
        }
        var file = this.upload.files[0];
        this.curent.name = file.name;

        var fr = new FileReader();
        var self = this;
        fr.onload = function()
        {
            self.curent.image = fr.result;
        }
        this.preview.onload = function()
        {
            var image = new Image();
            image.src = self.curent.image;
            self.canvas.width = 512;
            self.canvas.height = self.canvas.width / image.width * image.height;
            self.context.fillStyle = '#fff';
            self.context.fillRect(0, 0, self.canvas.width, self.canvas.height);
            self.context.drawImage(image, 0, 0, self.canvas.width, self.canvas.height);
            self.compute();
        }
        fr.readAsDataURL(file);
      },
      compute()
      {
        var image = [];
        var imgdata = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        var data = imgdata.data;

        for(var i = 0; i < data.length; i = i + 4)
        {
          data[i] = data[i + 1] = data[i + 2] = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11 < this.limit ? 0 : 255;
        }
        for (var i = 0; i < this.canvas.height; i++)
        {
          image[i] = [];
        }
        for(var i = 0; i < this.canvas.height; i++)
      {
          for(var j = 0; j < this.canvas.width; j++)
          {
             image[i][j] = data[(i * this.canvas.width + j) * 4] == 255 ? 0 : 1;
          }
      }
      this.context.putImageData(imgdata, 0, 0);
      image = cleanRows(image);
      image = cleanCols(image);
      var size = [];
      var sum = 0;
      var start = 2;
      for(var i = 0; i < this.iterations; i++)
      {
          size.push(0 - (Math.log(this.calc(image, this.base / start)) - Math.log(this.calc(image, this.base / start / 2))) / (Math.log(start) - Math.log(start / 2)));
          console.log(size[size.length - 1]);
          start *= 2;
      }
      for(var i = 0; i < size.length; i++)
          sum = sum + size[i];
      sum = sum / size.length;
      this.curent.size = sum;
      },
      calc(arr, k)
      {
          var boxes = 0;
          for(var i = 0; i < arr.length; i = i + k)
          {
              for(var j = 0; j < arr[i].length; j = j + k)
              {
                  var occupied = 0;
                  for(var ii = i; ii < i + k && ii < arr.length; ii++)
                  {
                      for(var jj = j; jj < j + k && jj < arr[i].length; jj++)
                      {
                          if(arr[ii][jj] == 1)
                          {
                              occupied = 1;
                              break;
                          }
                      }
                      if(occupied == 1)
                          break;
                  }
                  if(occupied == 1)
                      boxes++;
              }
          }
          return boxes;
      }
    },
  });
  function cleanRows(arr) {
      var i = 0, j = arr.length - 1;

      while(i < arr.length && isEmpty(arr[i]))
      {
          i++;
      }
      while(j > i && isEmpty(arr[j]))
      {
          j--;
      }
      return arr.slice(i,j+1);
  }

  function cleanCols(arr)
  {
      var i = 0, j = arr[0].length - 1;

      while(i < j && isEmpty(getCol(arr,i)))
      {
          i++;
      }
      while(j > i && isEmpty(getCol(arr,j)))
      {
          j--;
      }
      j++;

      return arr.map(function(row)
      {
          return row.slice(i, j);
      })
  }
  function getCol(arr, colIndex)
  {
      return arr.map(function(item)
      {
          return item[colIndex];
      });
  }
  function isEmpty(arr)
  {
      return arr.every(function(item)
      {
          return item === 0;
      });
  }
