var clientWidth,clientHeight,canvasFontSize,canvasNavTableHeight,canvasBoxHeight,canvasPictureWidth,canvasXmlTableHeight;

$(document).ready(function(){
  init();
});

var startTime = (new Date()).getTime();

function debug(s)
{
//  document.getElementById("Room").innerHTML = s;
  var milliseconds = (new Date()).getTime() - startTime;
  window.setTimeout(function () {
    throw( new Error(milliseconds + ': ' + s, "") );
  });
}

function init()
{
	setLayout();
  $(window).resize(function () { setLayout(); });
  jQuery.support.cors = true;	
}

//*************************************** browser layout.... ***********************************************

function trunc(x)
{
  return Math.ceil(x);
}

function initLayout()
{
	clientWidth = $(window).width();
  clientHeight = $(window).height();
	canvasBoxHeight = trunc((clientHeight - 60) / 20);
	if (canvasBoxHeight>24) canvasBoxHeight = 24; 	 
	fontFactor = 0.7;
	canvasFontSize = trunc(fontFactor * canvasBoxHeight);
}	 

function SetPosition(obj, Left, Top, Width, Height) {
	obj.style.position = "absolute";
	obj.style.top = Top+"px";
	obj.style.left = Left+"px";
	obj.style.width = Width+"px";
	obj.style.height = Height+"px";	
}

function SetFontSize(obj, Size) {
	obj.style.fontSize  = Size +"px";
}

function rect(x,y,w,h)
{
  this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
}

function dimensions(w,h)
{
  this.w=w;
	this.h=h;
}

function elmCenterer()
{
   var preferredDimensions;
	 var clientArea;
	 var area;
	 this.calculate = function() 
	 {	 
   	  this.area = new rect(0,0,0,0);
  	 	if (this.clientArea.w/this.preferredDimensions.w<this.clientArea.h/this.preferredDimensions.h) 
			{ this.area.w=this.clientArea.w; 
			  this.area.h = this.area.w*this.preferredDimensions.h/this.preferredDimensions.w; 
			} 
			else 
			{ this.area.h=this.clientArea.h; 
			  this.area.w = this.preferredDimensions.w/this.preferredDimensions.h* this.area.h; 
			}
			this.area.x=this.clientArea.x+(this.clientArea.w-this.area.w) / 2;
			this.area.y=this.clientArea.y+(this.clientArea.h-this.area.h) / 2;
	 }
	 this.placePicture = function(divName,picName)
	 {
      this.calculate();	 
      SetPosition(document.getElementById(divName),this.area.x, this.area.y, this.area.w, this.area.h);
  		SetPosition(document.getElementById(picName),0,0, this.area.w, this.area.h);	 
	 }
}
	 

function setLayout()
{
  initLayout();
		
	SetPosition(document.getElementById("Canvas"),0,0,clientWidth,clientHeight);
 
	var elm = new elmCenterer();

	elm.preferredDimensions = new dimensions(808,144);
	elm.clientArea = new rect(10,2*clientHeight/3+10,w=clientWidth -20,h=clientHeight/3-20);
	elm.placePicture("div_OssWeather", "OssWeather");

	clientWidth=elm.area.w;
	clientLeft=elm.area.x;
	
  elm.preferredDimensions = new dimensions(550,512);
	elm.clientArea = new rect(clientLeft+10,10, clientWidth/2 -20,2*clientHeight/3-20);
	elm.placePicture("div_Buienradar","Buienradar"); 
		
  SetPosition(document.getElementById("div_OssTxt"),clientWidth / 2+clientLeft,0,clientWidth / 2 ,3*canvasFontSize);
	SetFontSize(document.getElementById("div_OssTxt"),2*canvasFontSize);
	
  elm.preferredDimensions = new dimensions(250,120);
	elm.clientArea = new rect(clientLeft+clientWidth / 2+10,3*canvasFontSize, clientWidth/2 -20,clientHeight/3-20-3*canvasFontSize);
	elm.placePicture("div_OssImg","OssPicture"); 

  SetPosition(document.getElementById("div_MalagaTxt"),clientWidth / 2+clientLeft,clientHeight/3,clientWidth / 2 ,3*canvasFontSize);
	SetFontSize(document.getElementById("div_MalagaTxt"),2*canvasFontSize);
	
  elm.preferredDimensions = new dimensions(250,120);
	elm.clientArea = new rect(clientLeft+clientWidth / 2+10,3*canvasFontSize+clientHeight/3, clientWidth/2 -20,clientHeight/3-20-3*canvasFontSize);
	elm.placePicture("div_MalagaImg","MalagaPicture"); 	
}
	