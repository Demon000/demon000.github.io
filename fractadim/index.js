var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var image = [];
canvas.width = window.innerWidth;
function draw(e) 
{
    var img = new Image();
    var f = document.getElementById("uploadimage").files[0];
    var url = window.URL || window.webkitURL;
    var src = url.createObjectURL(f);
    img.src = src;
    img.onload = function() 
    {
        canvas.height = canvas.width / img.width * img.height;
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        url.revokeObjectURL(src);

        calculate();
    }
}
function calculate()
{
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    var pixels = imgData.data;
    for(var i = 0; i < pixels.length; i = i + 4)
    {
        var greyscale = pixels[i] * 0.3 + pixels[i + 1] * 0.59 + pixels[i + 2] * 0.11;
        if(greyscale < 240)
            greyscale = 0;
        else
            greyscale = 255;
        pixels[i] = greyscale;
        pixels[i + 1] = greyscale;
        pixels[i + 2] = greyscale;
    }
    for (y = 0; y < canvas.height; y++) 
    {
        image[y] = [];
    }

    for (y = 0; y < canvas.height; y++) 
    {
        for (x = 0; x < canvas.width; x++) 
        {
            index = (y * canvas.width + x) * 4;

            if(pixels[index] == 255)
                image[y][x] = 0;
            else
                image[y][x] = 1;
        }

    }
    image = cleanRows(image);
    image = cleanCols(image);
    context.putImageData(imgData, 0, 0);
    var size = [];
    var sum = 0;
    var base = 32;
    var iterations = 3;
    size[0] = (Math.log( calc(base / 2) ) - Math.log( calc(base / 1)) ) / (Math.log(2) - Math.log(1));
    size[1] = (Math.log( calc(base / 4) ) - Math.log( calc(base / 1)) ) / (Math.log(4) - Math.log(1));
    size[2] = (Math.log( calc(base / 4) ) - Math.log( calc(base / 2)) ) / (Math.log(4) - Math.log(2));
    for(var i = 0; i < iterations; i++)
        sum = sum + size[i];
    sum = sum / iterations;
    document.querySelector('#text').value = sum;


}
function calc(k)
{
    var boxes = 0;
    for(var i = 0; i < image.length; i = i + k)
    {
        for(var j = 0; j < image[i].length; j = j + k)
        {
            var occupied = 0;
            for(var ii = i; ii < i + k && ii < image.length; ii++)
            {
                for(var jj = j; jj < j + k && jj < image[i].length; jj++)
                {
                    if(image[ii][jj] == 1)
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
function cleanRows(arr) {
    var i = 0;
    var j = arr.length - 1;

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

function cleanCols(arr) {
    var i= 0, j=arr[0].length-1;

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

function getCol(arr,colIndex) 
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
document.querySelector('#uploadimage').onchange = draw;