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

          document.getElementById("upload").onchange=function addImage(e){
            document.getElementById("btn-download").style.display="block";
            document.getElementById("btn-undo").style.display="block";
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
              image1.src = e.target.result;
            }
            reader.readAsDataURL(file);
          };



          image1.onload = function(){
            dibujar(this);
            blancoYnegro(ctx2,ctx3);
            sepia(ctx2,ctx4);
            invertir(ctx2,ctx5);
            correccionGamma(ctx2,ctx6);
            sharpear(ctx2,ctx7);
            blurear(ctx2,ctx8);
          };
          function downloadCanvas(link, canvasId, filename) {
              link.href = document.getElementById(canvasId).toDataURL();
              link.download = filename;
          }

          var buttondwn = document.getElementById('btn-download');
          buttondwn.addEventListener('click', function (e) {
            downloadCanvas(this, 'canvas1', 'test.png');
          });
          var buttonundo = document.getElementById('btn-undo');
          buttonundo.addEventListener('click', function (e) {
            ctx.drawImage(image1, 0, 0,canvaswidth,canvasheight);
          });



          var canvaswidth=0
          var canvasheight=0
          var canvaswidthsml=0
          var canvasheightsml=0
          function dibujar(image){

            var canvas1 =  document.getElementById("canvas1");
            var canvas2 =  document.getElementById("canvas2");
            var canvas3 =  document.getElementById("canvas3");
            var canvas4 =  document.getElementById("canvas4");
            var canvas5 =  document.getElementById("canvas5");
            var canvas6 =  document.getElementById("canvas6");
            var canvas7 =  document.getElementById("canvas7");
            var canvas8 =  document.getElementById("canvas8");
            canvaswidth=700;
            canvasheight=image.height/(image.width/canvaswidth);
            canvaswidthsml=canvaswidth/3;
            canvasheightsml=canvasheight/3;
            canvas1.width=canvaswidth;
            canvas1.height=canvasheight;
            canvas1.style.display="default";
            canvas2.width=canvaswidthsml
            canvas2.height=canvasheightsml
            canvas2.style.display="default";
            canvas3.width=canvaswidthsml
            canvas3.height=canvasheightsml
            canvas3.style.display="default";
            canvas4.width=canvaswidthsml
            canvas4.height=canvasheightsml
            canvas4.style.display="default";
            canvas5.width=canvaswidthsml
            canvas5.height=canvasheightsml
            canvas5.style.display="default";
            canvas6.width=canvaswidthsml
            canvas6.height=canvasheightsml
            canvas6.style.display="default";
            canvas7.width=canvaswidthsml
            canvas7.height=canvasheightsml
            canvas7.style.display="default";
            canvas8.width=canvaswidthsml;
            canvas8.height=canvasheightsml;
            canvas8.style.display="default";
            document.getElementById("ejemplo-imagenes").style.height=canvasheight+"px";
            ctx.drawImage(image, 0, 0,canvaswidth,canvasheight);
            ctx2.drawImage(image, 0, 0,canvaswidthsml,canvasheightsml);

            canvas2.addEventListener('click', function () {
              ctx.drawImage(image, 0, 0,canvaswidth,canvasheight);
            })
            canvas3.addEventListener('click', function () {
              blancoYnegro(ctx,ctx);
            })
            canvas4.addEventListener('click', function () {
              sepia(ctx,ctx);
            })
            canvas5.addEventListener('click', function () {
              invertir(ctx,ctx);
            })
            canvas6.addEventListener('click', function () {
              correccionGamma(ctx,ctx);
            })
            canvas7.addEventListener('click', function () {
              sharpear(ctx,ctx);
            })
            canvas8.addEventListener('click', function () {
              blurear(ctx,ctx);
            })


          }


          function setBrillo(imageData, x, y, brillo){
            var index=(x+y*imageData.width) * 4;
            imageData.data[index+0] = imageData.data[index+0]*(brillo/100);
            imageData.data[index+1] = imageData.data[index+1]*(brillo/100);
            imageData.data[index+2] = imageData.data[index+2]*(brillo/100);
          };

          function correccionGamma(ctxo,ctxn){
            var brillo=150
            var imageData = ctxo.getImageData(0, 0, canvaswidth, canvasheight);
            for (var i = 0; i < imageData.width; i++) {
              for (var j = 0; j < imageData.height; j++) {
                setBrillo(imageData, i, j, brillo);
              }
            }
            ctxn.putImageData(imageData,0,0);
            }
          function setSol(imageData, x, y){
            var index=(x+y*imageData.width) * 4;

            if(imageData.data[index+0]>127){imageData.data[index+0] =255-imageData.data[index+0];}
            if(imageData.data[index+1]>127){imageData.data[index+1]=255-imageData.data[index+1];}
            if(imageData.data[index+2]>127){imageData.data[index+2]=255-imageData.data[index+2];}
          };

          function solarizar(ctxo,ctxn){
          var imageData = ctxo.getImageData(0, 0, canvaswidth, canvasheight);


            for (var i = 0; i < imageData.width; i++) {
              for (var j = 0; j < imageData.height; j++) {
                setSol(imageData, i, j);
              }
            }
            ctxn.putImageData(imageData,0,0);

          };

          function setInv(imageData, x, y){
            var index=(x+y*imageData.width) * 4;

            imageData.data[index+0]=255-imageData.data[index+0];
            imageData.data[index+1]=255-imageData.data[index+1];
            imageData.data[index+2]=255-imageData.data[index+2];
          };

          function invertir(ctxo,ctxn){
          var imageData = ctxo.getImageData(0, 0, canvaswidth, canvasheight);


            for (var i = 0; i < imageData.width; i++) {
              for (var j = 0; j < imageData.height; j++) {
                setInv(imageData, i, j);
              }
            }
            ctxn.putImageData(imageData,0,0);

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


          function sepia(ctxo,ctxn){
          var imageData = ctxo.getImageData(0, 0, canvaswidth, canvasheight);


            for (var i = 0; i < imageData.width; i++) {
              for (var j = 0; j < imageData.height; j++) {
                setSepia(imageData, i, j);
              }
            }
            ctxn.putImageData(imageData,0,0);

          };

          function setProm(imageData, x, y){
            var index=(x+y*imageData.width) * 4;
            var prom = (0.2126*imageData.data[index+0] + 0.7152*imageData.data[index+1] + 0.0722*imageData.data[index+2]);

            imageData.data[index+0]=prom;
            imageData.data[index+1]=prom;
            imageData.data[index+2]=prom;
          };

          function blancoYnegro(ctxo,ctxn){
          var imageData = ctxo.getImageData(0, 0, canvaswidth, canvasheight);


            for (var i = 0; i < imageData.width; i++) {
              for (var j = 0; j < imageData.height; j++) {
                setProm(imageData, i, j);
              }
            }
            ctxn.putImageData(imageData,0,0);

          };
          function espejo(ctxo,ctxn){
            var imageData = ctxo.getImageData(0, 0, image1.width, image1.height);
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
                ctxn.putImageData(imageData,0,0);
              };
        function sharpear(ctxo,ctxn){
          var matriz=
          [[  0, -1,  0],
          [-1,  5, -1],
          [ 0, -1,  0 ]]
          var imageData = ctxo.getImageData(0, 0, canvaswidth, canvasheight);
          setkernel(imageData,matriz,ctxn);
        }
        function blurear(ctxo,ctxn){
          var matriz=
          [[  1/9, 1/9, 1/9],
          [1/9, 1/9, 1/9],
          [ 1/9, 1/9,  1/9 ]]
          var imageData = ctxo.getImageData(0, 0, canvaswidth, canvasheight);
          setkernel(imageData,matriz,ctxn);
        }

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
