//**********************EXERCISE 1*******************//

//create a function that colors an object
function colora(colore,oggetto){
	return COLOR(colore)(oggetto);
}

//create a function that rotate an object
function ruotaOggetto(assi,valori,oggetto){
	return ROTATE(assi)(valori)(oggetto);
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

//Color of the roof
var coloreTetto = [255/255,255/255,0/255];

//function that creates a home
function creaCasa(x,y,z){
	var tetto = CUBOID([x,y,0.05])
	var tettoColorato = colora(coloreTetto,tetto);
	var tettoTraslato = traslaOggetto([2],[z],tettoColorato);
	var casa = STRUCT([CUBOID([x,y,z]),tettoTraslato])
	return casa;

}

var find = false;
var xCord;
var yCord;

var xCordStrad = 13;
var yCordStrad = 6;

var alberi=[];
var alberi=[];
var numeroAlberi = 30;

var homes = [];
var homesSecondoAgglomerato = [];
var numeroCasePrimoAgglomerato = 20;
var numeroCaseSecondoAgglomerato = 20;





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
	
	//create the first cluster of buildings
		if(x>13 && x<16){
			z = 0;
			var xCasa =  0.5 ;
			var yCasa =  0.5 ;
			var zCasa =  (2*Math.random()+1);		
			
			
			if( x !== 0 && y!==0 && numeroCasePrimoAgglomerato>0 && x>5 && y>5 ){
				var casaHomes = creaCasa(xCasa,xCasa,zCasa); 
				var randomN = 1*(3*Math.random()+1);
				var xCordStrad = 13.45;
				var yCordStrad = 0 + randomN;
				var r1 = 2*(3*Math.random()+1);
				var casaReplicata = traslaOggetto([0,1],[xCordStrad,(yCordStrad+r1)],casaHomes);
				numeroCasePrimoAgglomerato--;
				homes.push(casaReplicata);
				
			}
	
		}
		//create the second cluster of buildings
			if(y>11 & y<14){
				z = 0;
				var xCasa =  0.5 ;
				var yCasa =  0.5 ;
				var zCasa =  0.5 * (3*Math.random()+1);			
					if( x !== 0 && y !==0 && numeroCaseSecondoAgglomerato>0 && x>10 && y>10 ){
						var casa = creaCasa(xCasa,xCasa,zCasa);
						var randomN1 = 1*(3*Math.random()+1);
						var xCordStrad = 10 + randomN1;
						var yCordStrad = 11;
						var r = 2*(3*Math.random()+1);
						var casaReplicataHomes =  traslaOggetto([0,1],[(xCordStrad - r),yCordStrad],casa);
						numeroCaseSecondoAgglomerato--;
						homesSecondoAgglomerato.push(casaReplicataHomes);
						
					}
			}
			
				if(x>1 && y>1 && z===0 && !find){
					xCord = x;
					yCord = y;
					find = true;
				}				
				
					if(z>0.6 &&  y !== 0 && x!==0 && numeroAlberi>0 ){				
						raggioCilindro = 0.03 * (3*Math.random()+1);
						altezzaCilindro = 0.3* (5*Math.random()+1);
						altezzaCono = 0.3 + altezzaCilindro +0.03;
						raggioCono = 0.15 * (3*Math.random()+1)+0.005;
						var albero = creaCilindri(raggioCilindro,altezzaCilindro,32);
						var alberoColorato = (coloreTronco,albero);
						var cono = coni(altezzaCono,raggioCono,0.3);
						var conoColorato = colora(coloreCono,cono);
						var tree = T([0,1,2])([x-0.1,y-0.1,z-0.2])(STRUCT([conoColorato,alberoColorato]))
						var treereplicati = replicaAndTrasla(2,tree,[0],[1]);
						numeroAlberi--;
						alberi.push(treereplicati);

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
function creaForesta(alberi,maxNumero){
	for(var cont=0;cont<maxNumero;cont++){
		DRAW(alberi[cont]);
	}
}
var foresta = creaForesta(alberi,12);



//****************	ESERCIZIO 4	****************//
function creaPrimoAgglomerato(primoAgglomerato,maxNumero){
	
		for(var cont=0;cont<maxNumero;cont++){
			var casa =primoAgglomerato[cont];
			DRAW(casa);
		}
	
}
function creaSecondoAgglomerato(secondoAgglomerato,maxNumero){
		for(var cont=0;cont<maxNumero;cont++){
		
			var casa = secondoAgglomerato[cont];
			DRAW(casa);
		}
}
var numCasePrimo = Math.floor(4*Math.random()+2);
var numCaseSecondo = Math.floor((4*Math.random()+3));
var caseprimoAgglomerato = creaPrimoAgglomerato(homes,numCasePrimo);
var caseSecondoAgglomerato = creaSecondoAgglomerato(homesSecondoAgglomerato,numCaseSecondo);


//****************	ESERCIZIO 5	****************//
function creaStrada (lunghezza,larghezza){
	var strada = SIMPLEX_GRID([[lunghezza],[larghezza],[0.05]]);
	var linea = COLOR([2,2,2])(SIMPLEX_GRID([[larghezza],[larghezza/100],[-0.05,0.01]]));
	var lineaRuotata = ruotaOggetto([0,1],(PI/2),linea);
	var lineaTraslata = T([0])([1])(lineaRuotata);
	var stradaTraslata = STRUCT([strada,lineaTraslata]);
	var finale = T([0])([xCordStrad +0.5])(stradaTraslata);
	return STRUCT([finale]);
}
traslaOggetto([0,1],[xCord,yCord],lagoColorato)
var stradaUno = creaStrada(1.8,20);
var stradaDue = ruotaOggetto([0,1],(PI/2),creaStrada(1.8,20));
var stradaDueTraslata = traslaOggetto([0,1],[20,-1.9],stradaDue);
var strade = STRUCT([stradaUno,stradaDueTraslata]);



//Struct del modello
var model = STRUCT([lagoTraslato,baseColorata,strade]);
DRAW(model)