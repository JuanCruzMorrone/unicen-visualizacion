var imageData;
          var c=document.getElementById("canvas1");
          var ctx=c.getContext("2d");
          var c2=document.getElementById("canvas2");
          var ctx2=c2.getContext("2d");
          var c3=document.getElementById("canvas3");
          var ctx3=c3.getContext("2d");
          var c4=document.getElementById("canvas4");
          var ctx4=c4.getContext("2d");
          var c5=document.getElementById("canvas5");
          var ctx5=c5.getContext("2d");
          var c6=document.getElementById("canvas6");
          var ctx6=c6.getContext("2d");
          var c7=document.getElementById("canvas7");
          var ctx7=c7.getContext("2d");
          var c8=document.getElementById("canvas8");
          var ctx8=c8.getContext("2d");
          var image1 = new Image();

          document.getElementById("file-input").onchange=function addImage(e){
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
              image1.src = e.target.result;
            }
            reader.readAsDataURL(file);
          };

          // document.getElementById("boton1").onclick=blancoYnegro;
          // document.getElementById("boton2").onclick=sepia;
          // document.getElementById("boton3").onclick=invertir;
          // document.getElementById("boton4").onclick=solarizar;

          
          image1.onload = function(){
            dibujar(this);
            blancoYnegro();
            sepia();
            invertir();
            correccionGamma();
            sharpear();
            blurear();
          };
          function downloadCanvas(link, canvasId, filename) {
              link.href = document.getElementById(canvasId).toDataURL();
              link.download = filename;
          }

          /** 
           * The event handler for the link's onclick event. We give THIS as a
           * parameter (=the link element), ID of the canvas and a filename.
          */
          
          var button = document.getElementById('btn-download');
            button.addEventListener('click', function (e) {
            downloadCanvas(this, 'canvas1', 'test.png');
            });
          var canvases =document.getElementsByClassName("canvas");
          for (var i = 0, len = canvases.length; i < len; i++) {
            canvases[i].onclick=function changeCanvas(e){
              var imageData=this.getContext("2d").getImageData(0, 0, image1.width, image1.height);
              ctx.putImageData(imageData,0,0)
            }
          }
          function myFunction(canvas){
            canvas.onclick=function changeCanvas(e){
              var imageData=this.getContext("2d").getImageData(0, 0, image1.width, image1.height);
              ctx.putImageData(imageData,0,0)
            }
          }


          function dibujar(image){
            var canvas1 =  document.getElementById("canvas1");
            var canvas2 =  document.getElementById("canvas2");
            var canvas3 =  document.getElementById("canvas3");
            var canvas4 =  document.getElementById("canvas4");
            var canvas5 =  document.getElementById("canvas5");
            var canvas6 =  document.getElementById("canvas6");
            var canvas7 =  document.getElementById("canvas7");
            var canvas8 =  document.getElementById("canvas8");

            canvas1.width=image.width;
            canvas1.height=image.height;
            canvas1.style.display="default";
            canvas2.width=(image.width);
            canvas2.height=(image.height);
            canvas2.style.display="default";
            canvas3.width=(image.width);
            canvas3.height=(image.height);
            canvas3.style.display="default";
            canvas4.width=(image.width);
            canvas4.height=(image.height)
            canvas4.style.display="default";
            canvas5.width=(image.width);
            canvas5.height=(image.height)
            canvas5.style.display="default";
            canvas6.width=(image.width);
            canvas6.height=(image.height)
            canvas6.style.display="default";
            canvas7.width=(image.width);
            canvas7.height=(image.height)
            canvas7.style.display="default";
            canvas8.width=(image.width);
            canvas8.height=(image.height)
            canvas8.style.display="default";
            ctx.drawImage(image, 0, 0);
            ctx2.drawImage(image, 0, 0);

          };

          function setBrillo(imageData, x, y, brillo){
            var index=(x+y*image1.width) * 4;
            imageData.data[index+0] = imageData.data[index+0]*(brillo/100);
            imageData.data[index+1] = imageData.data[index+1]*(brillo/100);
            imageData.data[index+2] = imageData.data[index+2]*(brillo/100);
          };

          function correccionGamma(){
            var brillo=150
            var imageData = ctx2.getImageData(0, 0, image1.width, image1.height);

            for (var i = 0; i < image1.width; i++) {
              for (var j = 0; j < image1.height; j++) {
                setBrillo(imageData, i, j, brillo);
              }
            }
            ctx6.putImageData(imageData,0,0);

          };

          function setSol(imageData, x, y){
            var index=(x+y*imageData.width) * 4;

            if(imageData.data[index+0]>127){imageData.data[index+0] =255-imageData.data[index+0];}
            if(imageData.data[index+1]>127){imageData.data[index+1]=255-imageData.data[index+1];}
            if(imageData.data[index+2]>127){imageData.data[index+2]=255-imageData.data[index+2];}
          };

          function solarizar(imageData, x, y){
            var imageData = ctx.getImageData(0, 0, image1.width, image1.height);

            for (var i = 0; i < imageData.width; i++) {
              for (var j = 0; j < imageData.height; j++) {
                setSol(imageData, i, j);
              }
            }
            ctx3.putImageData(imageData,0,0,(image1.width)/2,(image1.height)/2);

          };

          function setInv(imageData, x, y){
            var index=(x+y*imageData.width) * 4;

            imageData.data[index+0]=255-imageData.data[index+0];
            imageData.data[index+1]=255-imageData.data[index+1];
            imageData.data[index+2]=255-imageData.data[index+2];
          };

          function invertir(){
            var imageData = ctx.getImageData(0, 0, image1.width, image1.height);

            for (var i = 0; i < imageData.width; i++) {
              for (var j = 0; j < imageData.height; j++) {
                setInv(imageData, i, j);
              }
            }
            ctx5.putImageData(imageData,0,0);

          };

          function setSepia(imageData, x, y){
            var index=(x+y*imageData.width) * 4;
            red = imageData.data[index+0]
            green = imageData.data[index+1]
            blue = imageData.data[index+2]
          
            imageData.data[index+0] = (red * 0.393) + (green * 0.769) + (blue * 0.189);
            imageData.data[index+1] = (red * 0.349) + (green * 0.686) + (blue * 0.168);
            imageData.data[index+2] = (red * 0.272) + (green * 0.534) + (blue * 0.131);
          };
      

          function sepia(){
            var imageData = ctx2.getImageData(0, 0, image1.width, image1.height);

            for (var i = 0; i < imageData.width; i++) {
              for (var j = 0; j < imageData.height; j++) {
                setSepia(imageData, i, j);
              }
            }
            ctx4.putImageData(imageData,0,0);

          };

          function setProm(imageData, x, y){
            var index=(x+y*imageData.width) * 4;
            var prom = (0.2126*imageData.data[index+0] + 0.7152*imageData.data[index+1] + 0.0722*imageData.data[index+2]);

            imageData.data[index+0]=prom;
            imageData.data[index+1]=prom;
            imageData.data[index+2]=prom;
          };

          function blancoYnegro(){
            var imageData = ctx.getImageData(0, 0, image1.width, image1.height);

            for (var i = 0; i < imageData.width; i++) {
              for (var j = 0; j < imageData.height; j++) {
                setProm(imageData, i, j);
              }
            }
            ctx3.putImageData(imageData,0,0);

          };
          function espejo(){
            var imageData = ctx.getImageData(0, 0, image1.width, image1.height);
                for(var i = 0; i < image1.height; i++) {
                  for(var j = 0; j < image1.width; j++) {
                    var off = (i * image1.width + j) * 4;
                    var dstOff = (i * image1.width + (image1.width - j - 1)) * 4;
                    imageData.data[dstOff]   = imageData.data[off];
                    imageData.data[dstOff+1] = imageData.data[off+1];
                    imageData.data[dstOff+2] = imageData.data[off+2];
                    imageData.data[dstOff+3] = imageData.data[off+3];
                  }
                }
                ctx8.putImageData(imageData,0,0);
              };
        function sharpear(){
          var matriz=
          [[  0, -1,  0],
          [-1,  5, -1],
          [ 0, -1,  0 ]]
          var imageData = ctx.getImageData(0, 0, image1.width, image1.height);
          setkernel(imageData,matriz,ctx7);
        }
        function blurear(){
          var matriz=
          [[  1/9, 1/9, 1/9],
          [1/9, 1/9, 1/9],
          [ 1/9, 1/9,  1/9 ]]
          var imageData = ctx.getImageData(0, 0, image1.width, image1.height);
          setkernel(imageData,matriz,ctx8);
        }
        

        //function cosarara(){
//
        //var sobel_x =
        //  [[0,-1,0],
        //   [-1,5,-1],
        //   [0,-1,0]]
        //var sobel_y=
        //  [[0,-1,0],
        //   [-1,5,-1],
        //   [0,-1,0]]
        //   var imageData = ctx2.getImageData(0, 0, image1.width, image1.height);
        //   //for (var i = 0; i < imageData.width; i++) {
        //   //  for (var j = 0; j < imageData.height; j++) {
        //   //    setProm(imageData, i, j);
        //   //  }
        //   //}
        //   //ctx6.putImageData(imageData,0,0);
        //   var imageData2 =imageData;
        //       for(var i = 0; i < image1.height; i++) {
        //         for(var j = 0; j < image1.width; j++) {
        //              setcosarara(imageData2,imageData,i,j,sobel_x,sobel_y)
        //          }
        //        }
        //      ctx6.putImageData(imageData2,0,0);
        //}
      //  function setcosarara(imageData2,imageData,x,y,f,g){
      //    var i = (y + x * imageData.width)*4
      //    var xr=0;
      //    for(var a = 0; a < 3; a++)
      //    {
      //        for(var b = 0; b < 3; b++)
      //        {
      //            var xn = x + a - 1;
      //            var yn = y + b - 1;
//
      //            var index = (yn + xn * imageData.width)*4;
      //            xr=  (imageData.data[index] * f[a][b])+xr;
      //        }
      //    }
      //    var yr=0;
      //    for(var a = 0; a < 3; a++)
      //    {
      //        for(var b = 0; b < 3; b++)
      //        {
      //            var xn = x + a - 1;
      //            var yn = y + b - 1;
//
      //            var index = (yn + xn * imageData.width)*4;
      //            yr=  (imageData.data[index] * g[a][b])+yr;
      //        }
      //    }
      //    var xg=0;
      //    for(var a = 0; a < 3; a++)
//
      //    {
      //        for(var b = 0; b < 3; b++)
      //        {
      //            var xn = x + a - 1;
      //            var yn = y + b - 1;
//
      //            var index = (yn + xn * imageData.width)*4;
      //            xg =  (imageData.data[index+1] * f[a][b])+xg;
      //        }
      //    }
      //    var yg=0;
      //    for(var a = 0; a < 3; a++)
//
      //    {
      //        for(var b = 0; b < 3; b++)
      //        {
      //            var xn = x + a - 1;
      //            var yn = y + b - 1;
//
      //            var index = (yn + xn * imageData.width)*4;
      //            yg =  (imageData.data[index+1] * g[a][b])+yg;
      //        }
      //    }
      //    var xb=0;
      //    for(var a = 0; a < 3; a++)
//
      //    {
      //        for(var b = 0; b < 3; b++)
      //        {
      //            var xn = x + a - 1;
      //            var yn = y + b - 1;
//
      //            var index = (yn + xn * imageData.width)*4;
      //            xb =  (imageData.data[index+2] * f[a][b])+xb;
      //        }
      //    }
      //    var yb=0;
      //    for(var a = 0; a < 3; a++)
//
      //    {
      //        for(var b = 0; b < 3; b++)
      //        {
      //            var xn = x + a - 1;
      //            var yn = y + b - 1;
//
      //            var index = (yn + xn * imageData.width)*4;
      //            yb = (imageData.data[index+2] * g[a][b])+yb;
      //        }
      //    }
      //    xr=Math.abs(xr);
      //    yr=Math.abs(yr);
      //    xg=Math.abs(xg);
      //    yg=Math.abs(yg);
      //    xb=Math.abs(xb);
      //    yb=Math.abs(yb);
      //    v = Math.sqrt((xr*xr)+(yr*yr));
      //    h = Math.sqrt((xg*xg)+(yg*yg));
      //    z = Math.sqrt((xb*xb)+(yb*yb));
      //     imageData2.data[i+0]=xr;
      //     imageData2.data[i+1]=xg;
      //      imageData2.data[i+2]=xb;
      //     imageData2.data[i+3]=255;
      //}
      function setkernel(imageData,f,ctx){
          var src = imageData.data;
          var sw = imageData.width;
          var sh = imageData.height;
          // pad output by the convolution matrix
          var w = sw;
          var h = sh;
          output = ctx.createImageData(w,h);
          dst = output.data
          // go through the destination image pixels
          for (var y=1; y<h; y++) {
            for (var x=1; x<w; x++) {
              var sy = y;
              var sx = x;
              var dstOff = (y*w+x)*4;
              // calculate the weighed sum of the source image pixels that
              // fall under the convolution matrix
              var r=0, g=0, b=0, a=0;
              for (var cy=0; cy<3; cy++) {
                for (var cx=0; cx<3; cx++) {
                  var scy = sy + cy - 1;
                  var scx = sx + cx - 1;
                    {
                    var srcOff = (scy*sw+scx)*4;
                    var wt = f[cx][cy];
                    r += src[srcOff] * wt;
                    g += src[srcOff+1] * wt;
                    b += src[srcOff+2] * wt;
                    a += src[srcOff+3] * wt;
                  }
                }
              }
              dst[dstOff] = r;
              dst[dstOff+1] = g;
              dst[dstOff+2] = b;
              dst[dstOff+3] = 255;
            }
          }
          ctx.putImageData(output,0,0)
      }