class Juego {
}
class Torre {
  constructor(id,x,y,w,h,discos) {
    if (typeof(id) === 'undefined') {
        id = 1;
    };
    if (typeof(x) === 'undefined') {
        x = 100;
    };
    if (typeof(y) === 'undefined') {
        y = 100;
    };
    if (typeof(w) === 'undefined') {
        w = 100;
    };
    if (typeof(h) === 'undefined') {
        h = 100;
    };
     if (typeof(discos) === 'undefined') {
        discos = [];
    };
    this.discos = discos
    this.numero = id;
    this.posX = x;
    this.posY = y;
    this.width = w;
    this.height =  h;
    this.color ="rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")"

  }
    get id(){
      return this.id;
    }
    get X(){
      return this.posX;
    }
    get Y(){
      return this.posY;
    }
    get H(){
      return this.height;
    }
    get W(){
      return this.width;
    }
    addDiscs(discs){
      this.discos = discs;
    }
    isWin(){
      return (this.discos.length == dificultad && this.numero != 1);
    }
    isHit(e){
      var x=e.layerX;
      var y=e.layerY;
      return (x>this.X && x<(this.X+this.W) && y<this.Y && y>(this.Y-this.H))
    }
    isEmpty(torre){
    	return (torre.discos.length<=0)
    }
    entra(disco){
    	if (this.isEmpty(this)){
    		return true
    	}
    	var last = this.discos[this.discos.length - 1];
    	return (last.num < disco.num)

    }
	agregar(disco){
		this.discos.push(disco);
		var newx = this.X + (this.W -disco.W)/2
		var newy = this.Y- (this.discos.length*15)
		disco.setpos(newx,newy)

	}
    draw(canvas){
      var ctx = document.getElementById(canvas).getContext("2d");
      ctx.fillStyle=this.color
      ctx.fillRect(this.X,this.Y,this.W,this.H/10);
      ctx.stroke();
      ctx.fillRect(this.X+(this.W/2)-(this.W/20),this.Y-this.H,this.W/10,this.H);
      ctx.stroke();
      ctx.fill();
      if (this.discos){
      	for (var i = this.discos.length - 1; i >= 0; i--) {
      		this.discos[i].draw(canvas)
      	};
      }
    }

}

class Disco{
  constructor(id,x,y,w,h) {
    if (typeof(id) === 'undefined') {
        id = 1;
    };
    if (typeof(x) === 'undefined') {
        x = 100;
    };
    if (typeof(y) === 'undefined') {
        y = 100;
    };
    if (typeof(w) === 'undefined') {
        w = 100;
    };
    if (typeof(h) === 'undefined') {
        h = 10;
    };
    w = w*((w-id*10)/100)
    this.numero = id;
    this.posX = x+x-(w/2);
    this.posY = y;
    this.width =w
    this.height =  h;
    this.color = "rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")"
  }
    get num(){
      return this.numero;
    }
    get X(){
      return this.posX;
    }
    get Y(){
      return this.posY;
    }
    get H(){
      return this.height;
    }
    get W(){
      return this.width;
    }
    setpos(x,y){
    	this.posX=x;
    	this.posY=y;
    }
    set(e){
      var evx=e.layerX
      var evy=e.layerY

      this.setpos(evx,evy)
    }

    draw(canvas){
      var ctx = document.getElementById(canvas).getContext("2d");
      ctx.fillStyle=this.color
      ctx.fillRect(this.posX,this.posY,this.W,this.H);
      ctx.stroke();
      ctx.fill();
    }
    isHit(e){
      var x=e.layerX;
      var y=e.layerY;
      return (x>this.X && x<(this.X+this.W) && y>this.Y && y<(this.Y+this.H))
    }

}

var dificultad=-1;
var page = document.getElementById("page")
var canvas = document.getElementById("canvas-hanoi")
canvas.width=600;
canvas.height=300;
var original = 0;
var mouseDown = 0;
var ctx = document.getElementById("canvas-hanoi").getContext("2d");

var disc =[];
var t1 =new Torre(1,50,200,100,150);
var t2 =new Torre(2,250,200,100,150);
var t3 =new Torre(3,450,200,100,150);
var torres =[t1,t2,t3]
var buttonfacil = document.getElementById("facil")
var buttonmedio = document.getElementById("medio")
var buttondificil = document.getElementById("dificil")
buttonfacil.addEventListener('click', function (e) {
  dificultad=5;
  var d1 = new Disco(1,50,185,100,10)
  var d2 = new Disco(2,50,170,100,10)
  var d3 = new Disco(3,50,155,100,10)
  var d4 = new Disco(4,50,140,100,10)
  var d5 = new Disco(5,50,125,100,10)
  var disc =[d1,d2,d3,d4,d5];
  t1.addDiscs(disc);
  for (var i = 0; i < torres.length; i++) {
    torres[i].draw("canvas-hanoi");
  }
  canvas.style.display="inline"
  page.style.display="none"
})
buttonmedio.addEventListener('click', function (e) {
  dificultad=7;
  var d1 = new Disco(1,50,185,100,10)
  var d2 = new Disco(2,50,170,100,10)
  var d3 = new Disco(3,50,155,100,10)
  var d4 = new Disco(4,50,140,100,10)
  var d5 = new Disco(5,50,125,100,10)
  var d6 = new Disco(6,50,110,100,10)
  var d7 = new Disco(7,50,95,100,10)
  var disc =[d1,d2,d3,d4,d5,d6,d7];
  t1.addDiscs(disc);
  for (var i = 0; i < torres.length; i++) {

    torres[i].draw("canvas-hanoi");
  }
    canvas.style.display="inline"
})
buttondificil.addEventListener('click', function (e) {
  dificultad=9;
  var d1 = new Disco(1,50,185,100,10)
  var d2 = new Disco(2,50,170,100,10)
  var d3 = new Disco(3,50,155,100,10)
  var d4 = new Disco(4,50,140,100,10)
  var d5 = new Disco(5,50,125,100,10)
  var d6 = new Disco(6,50,110,100,10)
  var d7 = new Disco(7,50,95,100,10)
  var d8 = new Disco(8,50,80,100,10)
  var d9 = new Disco(9,50,65,100,10)
  var disc =[d1,d2,d3,d4,d5,d6,d7,d8,d9];
  t1.addDiscs(disc);
  for (var i = 0; i < torres.length; i++) {

    torres[i].draw("canvas-hanoi");
  }
    canvas.style.display="inline"
})



canvas.onmousedown= function (e) {
	if (mouseDown==0){
		for (var i = 0; i < torres.length; i++) {
	        if (torres[i].isHit(e)){
	            mouseDown = torres[i].discos.pop();
	            original = torres[i];
	        }
	    }
	}
}
canvas.onmouseup =function (e) {
	if (mouseDown){
		var hit = 0;
		for (var i = 0; i < torres.length; i++) {
	        if (torres[i].isHit(e)){
	        	hit =1;
	        	if (torres[i].entra(mouseDown)){
	        		torres[i].agregar(mouseDown)
	        		ctx.clearRect(0, 0, canvas.width, canvas.height);
              if (torres[i].isWin()){
                alert("win")
              }
	        		for (var i = 0; i < torres.length; i++) {
					           torres[i].draw("canvas-hanoi");
              }

					    original=0
	        	}
	        	else{
	        		original.agregar(mouseDown)
	        		ctx.clearRect(0, 0, canvas.width, canvas.height);
	        		for (var i = 0; i < torres.length; i++) {
					  torres[i].draw("canvas-hanoi");
					}
					original=0
	        	}
	        }

	    }
	    if (hit != 1){
	    	original.agregar(mouseDown)
	        ctx.clearRect(0, 0, canvas.width, canvas.height);
	        for (var i = 0; i < torres.length; i++) {
			  torres[i].draw("canvas-hanoi");
			}
			original=0
	    }
	}
    mouseDown=0;
}
canvas.onmousemove=function chck(e) {
    if(mouseDown){
      mouseDown.set(e);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < torres.length; i++) {
        torres[i].draw("canvas-hanoi");
      }
      mouseDown.draw("canvas-hanoi");
    }

}
