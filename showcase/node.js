!(function (exports){

  var fs = require('fs');

  var plasm_lib = require('plasm.js');
  var obj = plasm_lib.plasm;
  var fun = plasm_lib.plasm_fun;
  var plasm = obj.plasm;
  var Plasm = obj.Plasm;

  var root = this;

  Object.keys(fun).forEach(function (k) { 
    root[k] = fun[k];
  });

  var p = new Plasm();
  fun.PLASM(p);


  var scmodel = (function () {
//Creo una funzione che mi genera cilindri
function creaCilindri(raggio,altezza,dominio){
     var cilindro = CYL_SURFACE([raggio, altezza])([dominio, 1])
	 var tappo = DISK(raggio)([dominio, 1])
	 var tappoTraslato = T([2])([altezza])(tappo) 
     return STRUCT([cilindro,tappo,tappoTraslato]);
}
//Creo una funzione che colori un oggetto
function colora(colore,oggetto){
	return COLOR(colore)(oggetto);
}

//Creo una funzione che trasla un oggetto
function traslaOggetto(assi,valori,oggetto){
	
	return TRANSLATE(assi)(valori)(oggetto);
}

//Creo una funzione che ruota un oggetto
function ruotaOggetto(assi,valori,oggetto){
	return ROTATE(assi)(valori)(oggetto);
}

//Creo una funzione che scala un oggetto
function scalaOggetto(assi,valori,oggetto){
	return SCALE(assi)(valori)(oggetto);
}


//Creo una funzione che replica un oggetto e lo trasla
function replicaAndTrasla(numeroRipetizioni,oggetto,assiTraslazione,valoriTraslazione){

return STRUCT(REPLICA(numeroRipetizioni)([oggetto,T(assiTraslazione)(valoriTraslazione)]))

}

function creaMezzaLuna (alpha, r, R) {
  var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);
  var mapping = function (v) {
    var a = v[0];
    var r = v[1];

    return [r*COS(a), r*SIN(a)];
  }
  var model = MAP(mapping)(domain);
  return model;
}


//Colore della base
var coloreBase = [230/255,190/255,135/255];

//Colore Dischi
var coloreDischi = [192/255,192/255,192/255];

//Colore piombino
var colorePiombino = [5/255,4/255,2/255];

//Colore Cavi
var coloreCavo = [255/255,255/255,240/255];


//Costruisco la base principale
var basePrimaria = SIMPLEX_GRID([[22],[18],[1]]);
var basePrimariaColorata = colora(coloreBase,basePrimaria);

//Costruisco la base secondaria
var baseSecondaria = SIMPLEX_GRID([[18],[14],[0.5]]);
var baseSecondariaTraslata = traslaOggetto([0,1,2],[2,2,1.6],baseSecondaria);
var baseSecondariaColorata = colora(coloreBase,baseSecondariaTraslata);


//Prima parte laterale sopra base secondaria
var primoLato = SIMPLEX_GRID([[18],[1],[0.5]]);
var primoLatoTraslato = traslaOggetto([0,1,2],[2,2,2.1],primoLato);
var primoLatoColorato = colora(coloreBase,primoLatoTraslato);

//Seconda parte laterale sopra base secondaria
var secondoLato = traslaOggetto([1],[13],primoLatoColorato);
var secondoLatoColorato = colora(coloreBase,secondoLato);





//Prima parte frontale

//Primo pezzo della parte frontale
var primoPezzoFrontale = SIMPLEX_GRID([[1.5],[8],[0.5]]);
var primoPezzoFrontaleRuotato = ruotaOggetto([1,2],(PI/2),primoPezzoFrontale);
var primoPezzoFrontaleTranslato = traslaOggetto([0,1,2],[10,3.5,2.1],primoPezzoFrontaleRuotato);
var primoPezzoFrontaleColorato = colora(coloreBase,primoPezzoFrontaleTranslato);

//Secondeo pezzo della parte frontale
var secondoPezzoFrontale = SIMPLEX_GRID([[11],[1],[0.5]]);
var secondoPezzoFrontaleRuotato = ruotaOggetto([1,2],(PI/2),secondoPezzoFrontale);
var secondoPezzoFrontaleRuotatoY = ruotaOggetto([0,2],-(PI/4),secondoPezzoFrontaleRuotato);
var secondoPezzoFrontaleTranslato = traslaOggetto([0,1,2],[2.8,3.5,1.6],secondoPezzoFrontaleRuotatoY);
var secondoPezzoFrontaleColorato = colora(coloreBase,secondoPezzoFrontaleTranslato);


//Terzo pezzo della parte frontale
var terzoPezzoFrontale = SIMPLEX_GRID([[11],[1],[0.5]]);
var terzoPezzoFrontaleRuotato = ruotaOggetto([1,2],(PI/2),terzoPezzoFrontale);
var terzoPezzoFrontaleRuotatoY = ruotaOggetto([0,2],(PI/4.2),terzoPezzoFrontaleRuotato);
var terzoPezzoFrontaleTranslato = traslaOggetto([0,1,2],[10.8,3.5,9.4],terzoPezzoFrontaleRuotatoY);
var terzoPezzoFrontaleColorato = colora(coloreBase,terzoPezzoFrontaleTranslato);

//Quarto pezzo della parte frontale
var quartoPezzoFrontale = SIMPLEX_GRID([[5.8],[1],[0.1]]);
var quartoPezzoFrontaleRuotato = ruotaOggetto([1,2],(PI/2),quartoPezzoFrontale);
var quartoPezzoFrontaleTraslato = traslaOggetto([0,1,2],[7.8,3,7],quartoPezzoFrontaleRuotato);
var quartoPezzoFrontaleColorato = colora(coloreBase,quartoPezzoFrontaleTraslato);

//Quinto pezzo della parte frontale
var quintoPezzoFrontale = SIMPLEX_GRID([[11],[1],[0.5]]);
var quintoPezzoFrontaleRuotato = ruotaOggetto([1,2],(PI/2),quintoPezzoFrontale);
var quintoPezzoFrontaleRuotatoY = ruotaOggetto([0,2],(PI/1.6),quintoPezzoFrontaleRuotato);
var quintoPezzoFrontaleTranslato = traslaOggetto([0,1,2],[22.5,3.5,12.5],quintoPezzoFrontaleRuotatoY);
var quintoPezzoFrontaleColorato = colora(coloreBase,quintoPezzoFrontaleTranslato);


//Sesto pezzo della parte frontale
var sestoPezzoFrontale = SIMPLEX_GRID([[11.15],[1],[0.5]]);
var sestoPezzoFrontaleRuotato = ruotaOggetto([1,2],(PI/2),sestoPezzoFrontale);
var sestoPezzoFrontaleRuotatoY = ruotaOggetto([0,2],(PI/1.075),sestoPezzoFrontaleRuotato);
var sestoPezzoFrontaleTranslato = traslaOggetto([0,1,2],[22.4,3.5,12.5],sestoPezzoFrontaleRuotatoY);
var sestoPezzoFrontaleColorato = colora(coloreBase,sestoPezzoFrontaleTranslato);




//Primo perno
var primoPernoFrontale = creaCilindri(0.2,13,60);
var primoPernoFrontaleZ = ruotaOggetto([0,1],-(PI/2),primoPernoFrontale);
var primoPernoFrontaleX = ruotaOggetto([1,2],-(PI/2),primoPernoFrontaleZ);
var primoPernoTranslato = traslaOggetto([0,1,2],[10.8,2.5,9.5],primoPernoFrontaleX);
var primoPernoColorato = colora(coloreBase,primoPernoTranslato);

//Secondo perno
var secondoPernoFrontale = creaCilindri(0.2,13,60);
var secondoPernoFrontaleZ = ruotaOggetto([0,1],-(PI/2),secondoPernoFrontale);
var secondoPernoFrontaleX = ruotaOggetto([1,2],-(PI/2),secondoPernoFrontaleZ);
var secondoPernoTranslato = traslaOggetto([0,1,2],[22.5,2.5,12],secondoPernoFrontaleX);
var secondoPernoColorato = colora(coloreBase,secondoPernoTranslato);
//Perni della struttura
var perniStruttura = STRUCT([secondoPernoColorato]);



//Primo disco cavi
var primoDisco = creaCilindri(0.5,0.2,60);
var primoDiscoZ = ruotaOggetto([0,1],-(PI/2),primoDisco);
var primoDiscoX = ruotaOggetto([1,2],-(PI/2),primoDiscoZ); 
var primoDiscoTraslato = traslaOggetto([0,1,2],[10.8,9.5,9.5],primoDiscoX);
var primoDiscoColorato = colora(coloreDischi,primoDiscoTraslato)

//Secondo disco cavi
var secondoDisco = creaCilindri(0.5,0.2,60);
var secondoDiscoZ = ruotaOggetto([0,1],-(PI/2),secondoDisco);
var secondoDiscoX = ruotaOggetto([1,2],-(PI/2),secondoDiscoZ); 
var secondoDiscoTraslato = traslaOggetto([0,1,2],[22.5,9.5,12],secondoDiscoX);
var secondoDiscoColorato = colora(coloreDischi,secondoDiscoTraslato)


var dischiCavi = STRUCT([primoDiscoColorato,secondoDiscoColorato]);

//Primo cavo

var primoCavo = creaCilindri(0.05,5,60);
var primoCavoZ = ruotaOggetto([0,1],-(PI/2),primoCavo);
var primoCavoTraslato = traslaOggetto([0,1,2],[23,9.6,7],primoCavoZ);
var primoCavoColorato = colora(coloreCavo,primoCavoTraslato);

//Secondo cavo
var secondoCavo = creaCilindri(0.05,10,60);
var secondoCavoRuotato = ruotaOggetto([0,2],(PI/2.8),secondoCavo);
var secondoCavoTraslato = traslaOggetto([0,1,2],[13.5,9.6,8],secondoCavoRuotato);
var secondoCavoColorato = colora(coloreCavo,secondoCavoTraslato)


var cavi = STRUCT([secondoCavoColorato]);



//Parte Frontale Destra
var parteFrontaleDestra = STRUCT([quintoPezzoFrontaleColorato,sestoPezzoFrontaleColorato]);
var parteFrontaleDestraPosteriore = traslaOggetto([1],[11.5],parteFrontaleDestra);
var parteFrontaleDestra = STRUCT([parteFrontaleDestra,parteFrontaleDestraPosteriore]);


//Parte Frontale
var parteFrontale = STRUCT([primoPezzoFrontaleColorato,secondoPezzoFrontaleColorato,terzoPezzoFrontaleColorato,
							quartoPezzoFrontaleColorato]);


//Parte Posteriore
var partePosteriore = ruotaOggetto([0,1],PI,parteFrontale);
var partePosterioreTraslata = traslaOggetto([0,1],[22,18],partePosteriore);
var partePosterioreColorata = colora(coloreBase,partePosterioreTraslata);


//Creo piloni tra le due basi
var pilone = creaCilindri(0.3,15,60);
var piloni = replicaAndTrasla(7,pilone,[1],[2.5]);
var piloniTraslatiZ = ruotaOggetto([0,1],-(PI/2),piloni);
var piloniTraslatiX = ruotaOggetto([1,2],-(PI/2),piloniTraslatiZ);
var piloniTraslati = traslaOggetto([0,1,2],[3.5,1.5,1.3],piloniTraslatiX);
var piloniColorati = colora(coloreBase,piloniTraslati);


//Creo il piompino
var piombino = creaCilindri(1,3,46);
var piombinoTraslato = traslaOggetto([0,1,2],[24,9,4],piombino);
var piombinoColorato = colora(colorePiombino,piombinoTraslato);

//cilindro nel piombino
var cilindro = creaCilindri(0.2,3,60);
var cilindroRuotato = ruotaOggetto([1,2],PI/2,cilindro);
var cilindroTraslato = traslaOggetto([0,1,2],[24,10.5,5.5],cilindroRuotato);
var cilindroColorato = colora(coloreDischi,cilindroTraslato);

//Piombino e Cilindro
var piombinoStruttura = STRUCT([piombinoColorato,cilindroColorato]);
var piombinoStrutturaTraslato = traslaOggetto([0,1],[-1,0.5],piombinoStruttura);
var piombinoFinale = STRUCT([piombinoStrutturaTraslato,primoCavoColorato]);


//Mezza luna
var parteMezzaLuna = EXTRUDE()(creaMezzaLuna(PI, 10, 11));
var pernoMezzaLuna = creaCilindri(0.4,23,60);
var pernoMezzaLunaRuotato = ruotaOggetto([0,2],PI/2,pernoMezzaLuna);
var pernoMezzaLunaTraslato = traslaOggetto([0,1,2],[-11.5,1,0.5],pernoMezzaLunaRuotato);
var mezzaLuna = STRUCT([parteMezzaLuna,pernoMezzaLunaTraslato]);
var mezzaLunaRuotataX = ruotaOggetto([1,2],PI/2,mezzaLuna);
var mezzaLunaRuotataZ = ruotaOggetto([0,2],PI/2,mezzaLunaRuotataX);
var mezzaLunaScalata = scalaOggetto([0,1,2],[1/3,1/3,1/3],mezzaLunaRuotataZ);
var mezzaLunaRuotata = ruotaOggetto([0,2],(PI/10),mezzaLunaScalata);
var mezzaLunaTraslata = traslaOggetto([0,1,2],[10.5,9.8,9.5],mezzaLunaRuotata);
var mezzaLunaColorata = colora(coloreBase,mezzaLunaTraslata);


//Pala Escavatore
var Dom1D = INTERVALS(1)(20);
var Dom2D = DOMAIN([[0,1], [0,1]])([20,20]);
var puntiPala0 = [[2,2],[0.33,4],[4,4],[4,2]];
var curvaPala0 = BEZIER(S0)(puntiPala0);
var puntiPala1 = [[2,2],[2,2],[4,2],[4,2]];
var curvaPala1 = BEZIER(S0)(puntiPala1);
var domain = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]);
var palaEscavatrice = MAP(BEZIER(S1)([curvaPala0,curvaPala1]))(domain);
var palaEscavatriceRuotataZ= ruotaOggetto([0,1],(PI/2),palaEscavatrice);
var palaEscavatriceRuotataY= ruotaOggetto([0,2],(PI/2),palaEscavatriceRuotataZ);
var palaEscavatriceTraslata = traslaOggetto([0,1,2],[2.4,6.75,10.5],palaEscavatriceRuotataY);
var palaEscavatriceColorata = colora(colorePiombino,palaEscavatriceTraslata);

//Perno pala escavatrice
var pernoPalaEscavatrice = creaCilindri(0.2,12,60);
var pernoPalaEscavatriceRuotatoX = ruotaOggetto([0,2],PI/1.6,pernoPalaEscavatrice);
var pernoPalaEscavatriceTraslato = traslaOggetto([0,1,2],[2.5,9.65,13],pernoPalaEscavatriceRuotatoX);
var pernoPalaEscavatriceColorato = colora(coloreBase,pernoPalaEscavatriceTraslato);
var palaEscavatriceFinale = STRUCT([pernoPalaEscavatriceColorato,palaEscavatriceColorata,mezzaLunaColorata,primoPernoColorato]);


var model = STRUCT([basePrimariaColorata,baseSecondariaColorata,piloniColorati,
						primoLatoColorato,secondoLatoColorato,parteFrontale,
						,partePosterioreColorata,perniStruttura,parteFrontaleDestra,
						dischiCavi,cavi,palaEscavatriceFinale,piombinoFinale
						


						]);

						



// ----------------------------IMPLEMENTAZIONE EFFETTO ROTAZIONE----------------------------

//Per visualizzare l'effetto rotazione decommentare le righe sottostanti ed eliminare palaEscavatriceFinale,piombinoFinale dalla STRUCT del modello
	
//DRAW(piombinoFinale);						
//DRAW(palaEscavatriceFinale);				
//DRAW(modello);


//function ruotaImmagine() {
//  var contatore = 1;
 
//  var message = 'Vuoi attivare la rotazione?'
//  var choice = confirm(message)
//  if (choice == true) {
//    setInterval(function () {
//		if(contatore %2 === 0){
//			piombinoFinale.rotate([0,2], 0.01);
//			palaEscavatriceFinale.rotate([0,2], 0.01);
//			contatore += 1;
			
//		}
//			else{
//				piombinoFinale.rotate([0,2], -0.01);
//				palaEscavatriceFinale.rotate([0,2], -0.01);
//				contatore += 1;
//				
//			}
//	}, 600);
 // }
//}
//ruotaImmagine();

  return model
  })();

  exports.author = 'ilamaiolo';
  exports.category = 'others';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));
