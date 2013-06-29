var domain = INTERVALS(1)(26);
function curveBezier(controlPoints){
	var curveMapping = BEZIER(S0)(controlPoints);
	//var curve = MAP(curveMapping)(domain);
	return curveMapping;
}


function translateObject(assi,valori,oggetto){
	return TRANSLATE(assi)(valori)(oggetto);
}

//Creo una funzione che ruota un oggetto
function rotateObject(assi,valori,oggetto){
	return ROTATE(assi)(valori)(oggetto);
}


var domainSurface = PROD1x1([INTERVALS(1)(26),INTERVALS(1)(26)]);
function createSurfaceBezier(curve){
	var out = MAP(BEZIER(S1)(curve))(domainSurface);
	return out;

}

function colors(colore,oggetto){
	return COLOR(colore)(oggetto);
}

//Creo una funzione che scala un oggetto
function scaleObject(assi,valori,oggetto){
	return SCALE(assi)(valori)(oggetto);
}



//Front Part

var firstFrontalCurve = curveBezier([[1,1,0],[1.5,3.25,0],[7.95,3.25,0],[9,1,0]]);
var beetweenCurve0 = curveBezier([[0.75,1.25,0],[2.25,5.75,0.15],[7.25,5.75,0.15],[9.25,1.25,0]]);
var beetweenCurve1 = curveBezier([[0.9,3,0.05],[1.5,6.75,0.15],[7.95,6.75,0.15],[9.05,3,0.05]]);
var fourthFrontCurve =  curveBezier([[0.75,1.25,0],[0.5,8.75,0],[9.25,8.5,0],[9.25,1.25,0]]);
var sup0 = createSurfaceBezier([firstFrontalCurve,beetweenCurve0]);
var sup1 = createSurfaceBezier([beetweenCurve0,beetweenCurve1]);
var sup2 = createSurfaceBezier([beetweenCurve1,fourthFrontCurve]);


var secondFrontCurve = curveBezier([[1,1,0],[0.75,0.75,0],[0.75,1.25,0],[0.75,1.25,0]]);
var fifthFrontCurve = curveBezier([[1,1,0],[1,1,0],[0.75,1.25,0],[0.75,1.25,0]]);
var sixthFrontCurve = curveBezier([[9,1,0],[9,1,0],[9.25,1.25,0],[9.25,1.25,0]]);
var thirdFrontCurve = curveBezier([[9,1,0],[9.1,0.85,0],[9.25,0.75,0],[9.25,1.25,0]]);
var leftCurve = createSurfaceBezier([secondFrontCurve,fifthFrontCurve]);
var rightCurve =   createSurfaceBezier([sixthFrontCurve,thirdFrontCurve]);


var frontalPart = STRUCT([sup0,sup1,sup2,leftCurve,rightCurve]);
//color front part

//down part
var downPart = translateObject([2],[2],frontalPart);


//Behind Part
var behindFrontCurve =  curveBezier([[0.75,1.25,0],[0.5,8.75,0],[9.25,8.5,0],[9.25,1.25,0]]);
var behindFrontCurve1 = curveBezier([[0.75,1.25,2],[0.5,8.75,2],[9.25,8.5,2],[9.25,1.25,2]]);
var behind = createSurfaceBezier([behindFrontCurve,behindFrontCurve1]);


//Second Front Part
var secondFrontCurve =  curveBezier([[1,1,0],[1.5,3.25,0],[7.95,3.25,0],[9,1,0]]);
var secondFrontCurve1 =  curveBezier([[1,1,2],[1.5,3.25,2],[7.95,3.25,2],[9,1,2]]);
var secondFront = createSurfaceBezier([secondFrontCurve,secondFrontCurve1]);


//First hole
var firstHole = curveBezier([[1,1,0],[0.75,0.75,0],[0.75,1.25,0],[0.75,1.25,0]]);
var firstHole1 = curveBezier([[1,1,2],[0.75,0.75,2],[0.75,1.25,2],[0.75,1.25,2]]);

//Second hole
var sixthFrontCurve = curveBezier([[9,1,2],[9.1,0.85,2],[9.25,0.75,2],[9.25,1.25,2]]);; 
var thirdFrontCurve = curveBezier([[9,1,0],[9.1,0.85,0],[9.25,0.75,0],[9.25,1.25,0]]);


var hole1 = createSurfaceBezier([firstHole,firstHole1]);
var hole2 = createSurfaceBezier([sixthFrontCurve,thirdFrontCurve]);

var firstSofa = STRUCT([frontalPart,downPart,behind,secondFront,hole1,hole2]);

//Second Sofa
var secondSofa = rotateObject([0,1],PI,firstSofa);
var secondSofaTranslate = translateObject([0,1],[6,3],secondSofa);


//First Pillow
var firstCurvePillow = curveBezier([[1,1,0],[1,1,0],[5,1,0],[5,1,0]]);
var secondCurvePillow = curveBezier([[1,2,0],[1.5,2.5,0.4],[4,2.5,0.4],[5,2,0]]);
var thirdCurvePillow = curveBezier([[1,3,0],[1.5,3.5,0.8],[4,3.5,0.8],[5,3,0]]);
var fourthCurvePillow = curveBezier([[1,4,0],[1.5,4.5,0.8],[4,4.5,0.8],[5,4,0]]);
var fifthCurvePillow = curveBezier([[1,5,0],[1.5,5.5,0.4],[4,5.5,0.4],[5,5,0]]);
var sixthCurvePillow = curveBezier([[1,6,0],[1,6,0],[5,6,0],[5,6,0]]);

var pillowSurface0 =   createSurfaceBezier([firstCurvePillow,secondCurvePillow]);
var pillowSurface1 =   createSurfaceBezier([secondCurvePillow,thirdCurvePillow]);
var pillowSurface2 =   createSurfaceBezier([thirdCurvePillow,fourthCurvePillow]);
var pillowSurface3 =   createSurfaceBezier([fourthCurvePillow,fifthCurvePillow]);
var pillowSurface4 =   createSurfaceBezier([fifthCurvePillow,sixthCurvePillow]);

var pillow0 = STRUCT([pillowSurface0,pillowSurface1,pillowSurface2,pillowSurface3,pillowSurface4]);
var pillow1 = rotateObject([0,2],PI,pillow0);
var pillow1Translate = translateObject([0],[1],pillow1);
var pillow1Rotate = rotateObject([0,1],PI,pillow1Translate);
var pillow1Final = translateObject([0,1],[6,0.1],pillow1);

var firstPillow = STRUCT([pillow0,pillow1Final]);

//Second Pillow
var secondPillow = rotateObject([0,1],PI/2,firstPillow);
var secondPillowTranslated = translateObject([0],[3],secondPillow);
var secondPillowRotated = rotateObject([0,2],PI/8,secondPillowTranslated);
var secondPillowTranslated = translateObject([0,1],[6.6,0.2],secondPillowRotated);

var pillow = STRUCT([firstPillow,secondPillowTranslated]);


//color pillow
var colorPillow = [41/255,41/255,41/255]
var pillow = colors(colorPillow,pillow);
var pillowScalated = scaleObject([0,1,2],[1/3,1/3,1/3],pillow);
var pillowTranslated =translateObject([0,1,2],[4,3,2.3],pillowScalated);

var colorSofa = [204/255,204/255,204/255];
var model = STRUCT([firstSofa,secondSofaTranslate]);
var modelColor = colors(colorSofa,model);

var modelFinal = STRUCT([pillowTranslated,modelColor]);


DRAW(modelFinal);