//**********************EXERCISE 1*******************//

//create a function that colors an object
function colora(colore,oggetto){
	return COLOR(colore)(oggetto);
}

//create a function that translates an object
function traslaOggetto(assi,valori,oggetto){
	return TRANSLATE(assi)(valori)(oggetto);
}

//Create a function that tracks an object and moves it
function replicaAndTrasla(numeroRipetizioni,oggetto,assiTraslazione,valoriTraslazione){
	return STRUCT(REPLICA(numeroRipetizioni)([oggetto,T(assiTraslazione)(valoriTraslazione)]))
}

var find = false;
var xCord;
var yCord;


function mapping(x,y,z){
	var domain = DOMAIN([[0,x],[0,y],[0,z]])([25,25,5]);
	var mapping = function (v) {
    var x = v[0];
    var y = v[1];
	var random = (COS(x)*SIN(y))*Math.random();
	var z = Math.abs(random);
	if(z<0.5){
		z = 0;
	}
		if(y>17 & y<20){
			z=0;
		}
			//try randomly an area in which to place my lake
			if(x>1 && y>1 & z===0 & !find){
				xCord = x;
				yCord = y;
				find = true;
		
		
			}
	
    return [x,y,z];
  }
  var model = MAP(mapping)(domain);
  return model;

}


var x=20;
var y=20;
var z=10;


//Color of the base
var coloreBase = [230/255,190/255,135/255];

//Color of the lake
var coloreLago = [21/255,96/255,189/255];



var base = mapping(x,y,z);
var baseColorata=colora(coloreBase,base);


//****************	ESERCIZIO 2	****************//

var lago = CUBOID([1,3,0.01]);
var lagoColorato = colora(coloreLago,lago)
var lagoTraslato = traslaOggetto([0,1],[xCord,yCord],lagoColorato)
var model =STRUCT([lagoTraslato,baseColorata]);

DRAW(model)