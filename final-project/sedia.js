function getBackrest(alpha, r, R) {
  var domain = DOMAIN([[0,alpha],[r,R]])([60,1]);
  var mapping = function (v) {
    var a = v[0];
    var r = v[1];
    
    return [r*COS(a), r*SIN(a)];
  }
  var model = MAP(mapping)(domain);
  return model;
}

//function that scale an object
function scaleObject(assi,valori,oggetto){
	return SCALE(assi)(valori)(oggetto);
}

function colors(colore,oggetto){
	return COLOR(colore)(oggetto);
}

//function for the support
function createsSupports(raggio,altezza,dominio){
     var cilindro = CYL_SURFACE([raggio, altezza])([dominio, 1])
	 var mapping = function (v) {
			var x = v[0];
			var y = v[1];

		var a = SIN(x)*COS(y);
		var b = SIN(x)*SIN(y);
		var c = COS(x);

		return[a,b,c];
	}
	var domainTappi = DOMAIN([[0,PI],[0,PI]])([32,32]);
	var firstCap = MAP(mapping)(domainTappi);
	var firstCapRotate = rotateObject([1,2],-PI/2,firstCap);
	var firstCapClimbed =  scaleObject([0,1,2],[1*raggio,1*raggio,1*raggio],firstCapRotate);
	var secondCap = rotateObject([1,2],PI/2,firstCap);
	var secondCapClimbed = scaleObject([0,1,2],[1*raggio,1*raggio,1*raggio],secondCap);
	var secondCapTranslate = T([2])([altezza])(secondCapClimbed);
	var colorupport =  colors([199/255,199/255,199/255],STRUCT([cilindro,secondCapTranslate,firstCapClimbed]));
	
    return colorupport;
}

var domain = INTERVALS(1)(32);
function curveBezier(controlPoints){
	var curveMapping = BEZIER(S0)(controlPoints);
	return curveMapping;
}


function translateObject(assi,valori,oggetto){
	return TRANSLATE(assi)(valori)(oggetto);
}

//rotate an object
function rotateObject(assi,valori,oggetto){
	return ROTATE(assi)(valori)(oggetto);
}


var domainSurface = PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)]);
function createSurfaceBezier(curve){
	var out = MAP(BEZIER(S1)(curve))(domainSurface);
	return out;
}

var colorChair = [255/255,0/255,0/255];	
var backrest = EXTRUDE([6])(COLOR(colorChair)(getBackrest(PI,5,6)));
var backrestTranslated = translateObject([0],[5],backrest);

//First part of the seat
var seatPoint0 = curveBezier([[0,0],[0.3,7],[10,6.5],[10,0]]);
var seatPoint1 = curveBezier([[0,0],[0,0],[10,0],[10,0]]);
var curveSeat0 = createSurfaceBezier([seatPoint0,seatPoint1]);
var curveSeat0Colored = colors(colorChair,curveSeat0);

//Second part of the seat
var curveSeat1 = translateObject([2],[0.5],curveSeat0);
var curveSeat1Colored = colors(colorChair,curveSeat1);

//Third part of the seat
var thirdSeatPoint0 = curveBezier([[0,0],[0,0],[10,0],[10,0]]); 
var thirdSeatPoint1 = curveBezier([[0,0.5],[0,0.5],[10.5,0.5],[10.5,0.5]]);
var thirdSeat = createSurfaceBezier([thirdSeatPoint0,thirdSeatPoint1]);
var thirdSeatColored = colors(colorChair,thirdSeat);
var thirdSeatRotated = rotateObject([1,2],PI/2,thirdSeatColored);


var seat = STRUCT([curveSeat0Colored,curveSeat1Colored,thirdSeatRotated]);


//Pillow

//First Pillow
var pillowPoint0 = curveBezier([[0,-0.3,0],[0.3,7,0],[10,6.5,0],[10,-0.3,0]]);
var pillowPoint2 = curveBezier([[0,-0.3,0],[0.2,2,0.35],[10,1.5,0.35],[10,-0.3,0]]);
var pillowPoint3 = curveBezier([[0,-0.3,0],[0.2,4,0.35],[10,4,0.35],[10,-0.3,0]]);
var pillowPoint4 = curveBezier([[0,-0.3,0],[0,0,0],[10,0,0],[10,-0.3,0]]);
var curvePillow0 = createSurfaceBezier([pillowPoint0,pillowPoint2]);
var curvePillow2 = createSurfaceBezier([pillowPoint2,pillowPoint3]);
var curvePillow3 = createSurfaceBezier([pillowPoint3,pillowPoint4]);
var pillow0 = STRUCT([curvePillow0,curvePillow2,curvePillow3]);

//Second Pillow
var secondPillowPoint0 = curveBezier([[0,-0.3,0],[0,0,0],[10,0,0],[10,-0.3,0]]);
var secondPillowPoint1 = curveBezier([[0,-0.3,-0.5],[0,0,-0.5],[10,0,-0.5],[10,-0.3,-0.5]]);
var curveSecondPillow0 = createSurfaceBezier([secondPillowPoint0,secondPillowPoint1]);
var secondPillowPoint2 = curveBezier([[0,-0.3,0],[0.3,7,0],[10,6.5,0],[10,-0.3,0]]);
var secondPillowPoint3 = curveBezier([[0,-0.3,-0.5],[0.3,7,-0.5],[10,6.5,-0.5],[10,-0.3,-0.5]]);
var curveSecondPillow1 = createSurfaceBezier([secondPillowPoint2,secondPillowPoint3]);

var pillow = colors(colorChair,STRUCT([pillow0,curveSecondPillow0,curveSecondPillow1]));
var pillowTranslated = translateObject([2],[0.8],pillow);

//Support

var colorSupport = [192/255,192/255,192/255];
//Support 0
var support0 =  createsSupports(0.15,5,26);
var support0Translated = colors(colorSupport,translateObject([0,1,2],[-0.5,0.5,-5],support0));

//Support 1
var support1Translated = colors(colorSupport,translateObject([0,1,2],[10,0.5,-5],support0));

//Support 2
var support2Translated = colors(colorSupport,translateObject([0,1,2],[3,5,-5],support0));

//Support 3
var support3Translated = colors(colorSupport,translateObject([0,1,2],[7.5,4.75,-5],support0));

//support 4
var supportPoint0 = curveBezier([[-0.35,0.4,0],[0.5,6.79,0],[9.5,6.79,0],[9.9,0.5,0]]);
var supportPoint1 = curveBezier([[-0.65,0.4,0],[0.5,7.23,0],[9.5,7.23,0],[10.1,0.5,0]]);
var supportPoint2 = curveBezier([[-0.47,0.4,-0.15],[0.5,7.23,-0.15],[9.5,7.23,-0.15],[10,0.5,-0.15]]);
var supportPoint3 = curveBezier([[-0.47,0.4,0.15],[0.5,7.23,0.15],[9.5,7.23,0.15],[10,0.5,0.15]]);
var curveSupport0 = createSurfaceBezier([supportPoint0,supportPoint2]);
var curveSupport1 = createSurfaceBezier([supportPoint2,supportPoint1]);
var curveSupport2 = createSurfaceBezier([supportPoint1,supportPoint3]);
var curveSupport3 = createSurfaceBezier([supportPoint3,supportPoint0]);
var support4 = colors(colorSupport,STRUCT([curveSupport0,curveSupport1,curveSupport2,curveSupport3]));
var support4Translated = translateObject([2],[-5.1],support4);

var support = STRUCT([support0Translated,support1Translated,support2Translated,support3Translated,support4Translated]);

var model = STRUCT([seat,backrestTranslated,support,pillowTranslated]);

DRAW(model);