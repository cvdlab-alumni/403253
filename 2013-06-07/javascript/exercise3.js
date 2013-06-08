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

//create a function that generates the tree trunk
function creaCilindri(raggio,altezza,dominio){
     var cilindro = CYL_SURFACE([raggio, altezza])([dominio, 1])
	 var tappo = DISK(raggio)([dominio, 1])
	 var tappoTraslato = T([2])([altezza])(tappo) 
     return STRUCT([cilindro,tappo,tappoTraslato]);
}

//create a function that generates the tree cone
function coni(h,r,altezzaTronco){
	var domain = DOMAIN([[0,1],[0,2*PI]])([20,20]);
	var profile = BEZIER(S0)([[0,0,h],[r,0,0]]);
	var mapping = ROTATIONAL_SURFACE(profile);
	var tappo = T([2])([altezzaTronco])(DISK(r)([32, 1]))
	var surface = T([2])([altezzaTronco])(MAP(mapping)(domain));
	return STRUCT([surface,tappo]);

}

//Color of the base
var coloreBase = [230/255,190/255,135/255];

//Color of the lake
var coloreLago = [21/255,96/255,189/255];


//Color of the trunk
var coloreTronco = [255/255,153/255,51/255];

//Color of the cone
var coloreCono = [0/255,255/255,0/255];



var find = false;
var xCord;
var yCord;

var alberi=[];

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
			if(x>1 && y>1 & z===0 & !find){
				xCord = x;
				yCord = y;
				find = true;
		
		
			}
				//create my forest by adding trees in random positions
				if(z>0.6 &&  y !== 0 & x!==0){
					raggioCilindro = 0.03 * (3*Math.random()+1);
					altezzaCilindro = 0.3* (3*Math.random()+1);
					altezzaCono = 0.3 + altezzaCilindro;
					raggioCono = 0.15 * (3*Math.random()+1)+0.005;
					var albero = creaCilindri(raggioCilindro,altezzaCilindro,32);
					var alberoColorato = (coloreTronco,albero);
					var cono = coni(altezzaCono,raggioCono,0.3);
					var conoColorato = colora(coloreCono,cono);
					var tree = T([0,1,2])([x-0.1,y-0.1,z-0.2])(STRUCT([conoColorato,alberoColorato]))
					alberi.push(tree);

				}
	
    return [x,y,z];
  }
  var model = MAP(mapping)(domain);
  return model;

}


var x=20;
var y=20;
var z=10;

var base = mapping(x,y,z);
var baseColorata=colora(coloreBase,base);


//****************	ESERCIZIO 2	****************//

var lago = CUBOID([1,3,0.01]);
var lagoColorato = colora(coloreLago,lago)
var lagoTraslato = traslaOggetto([0,1],[xCord,yCord],lagoColorato)



//****************	ESERCIZIO 3	****************//

//Print the forest
function creaForesta(alberi,maxNumero){
	for(var cont=0;cont<maxNumero;cont++){
		DRAW(alberi[cont]);
	}
}
var foresta = creaForesta(alberi,12);




var model = STRUCT([lagoTraslato,baseColorata]);

DRAW(model)