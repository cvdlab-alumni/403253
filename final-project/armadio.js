//function that colors an object
function colors(colore,oggetto){
	return COLOR(colore)(oggetto);
}

//translate an object
function translateObject(assi,valori,oggetto){
	return TRANSLATE(assi)(valori)(oggetto);
}

//rotate an object
function rotateObject(assi,valori,oggetto){
	return ROTATE(assi)(valori)(oggetto);
}

//scale an object
function scaleObject(assi,valori,oggetto){
	return SCALE(assi)(valori)(oggetto);
}


//replicate and translate an object
function replicationAndMovesObject(numeroRipetizioni,oggetto,assiTraslazione,valoriTraslazione){
	return STRUCT(REPLICA(numeroRipetizioni)([oggetto,T(assiTraslazione)(valoriTraslazione)]))
}

//replicate and rotate an object
function ruotaEReplicaOggetto(numeroOggetti2Ruotare,oggetto){
    var rotazione = R([0,1])((PI)/numeroOggetti2Ruotare)
    var oggetti = STRUCT(REPLICA(numeroOggetti2Ruotare)([rotazione,oggetto]))
    return oggetti
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


function createsCylinders(raggio,altezza,dominio){
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
	
	
    return STRUCT([cilindro,secondCapTranslate,firstCapClimbed]);
}

function createjar(scalingFactor,color){
 var mapping = function (v) {
			var x = v[0];
			var y = v[1];

		var a = SIN(x)*COS(y);
		var b = SIN(x)*SIN(y);
		var c = COS(x);

		return[a,b,c];
	}
	var domainTaps = DOMAIN([[0,PI],[0,PI]])([32,32]);
	var object = colors(color,MAP(mapping)(domainTaps));
	var objectScalated = scaleObject([0,1,2],[1*scalingFactor,1*scalingFactor,1*scalingFactor],object);
	return objectScalated;
	
}

var coloreBase = [230/255,190/255,135/255];

//Base
var basePrimaria = SIMPLEX_GRID([[30,-10,30],[20],[0.5]]);
var basePrimariaColorata = colors(coloreBase,basePrimaria);

//Left Door
var leftDoor = SIMPLEX_GRID([[0.5],[40],[20]]);
var leftDoorColored = colors(coloreBase,leftDoor);
var leftDoorRotated = rotateObject([1,2],PI/2,leftDoorColored);
var leftDoorTranslated = translateObject([0,1],[-0.5,20],leftDoorRotated);

//First Lower part
var firstLowerPart = SIMPLEX_GRID([[1],[13.33],[20]]);
var firstLowerPartColored = colors(coloreBase,firstLowerPart);
var firstLowerPartRotated = rotateObject([1,2],PI/2,firstLowerPartColored);
//20 sulle y perche deve essere largo quanrto la base
var firstLowerPartTraslated = translateObject([0,1],[15,20],firstLowerPartRotated);

//Second Lower Part
var secondLowerPart = SIMPLEX_GRID([[0.5],[13.33],[20]]);
var secondLowerPartColored = colors(coloreBase,secondLowerPart);
var secondLowerPartRotated = rotateObject([1,2],PI/2,secondLowerPartColored);
var secondLowerPartTraslated = translateObject([0,1],[30,20],secondLowerPartRotated);

//Third Lower Part
var thirdLowerPart = SIMPLEX_GRID([[0.5],[13.33],[20]]);
var thirdLowerPartColored = colors(coloreBase,thirdLowerPart);
var thirdLowerPartRotated = rotateObject([1,2],PI/2,thirdLowerPartColored);
var thirdLowerPartTraslated = translateObject([0,1],[40,20],thirdLowerPartRotated);

//Fourth Part
var fourthLowerPart = SIMPLEX_GRID([[1],[13.33],[20]]);
var fourthLowerPartColored = colors(coloreBase,fourthLowerPart);
var fourthLowerPartRotated = rotateObject([1,2],PI/2,fourthLowerPartColored);
var fourthLowerPartTraslated = translateObject([0,1],[55,20],fourthLowerPartRotated);

//Fifth Part
var fifthLowerPart = SIMPLEX_GRID([[1],[6.66],[20]]);
var fifthLowerPartColored = colors(coloreBase,fifthLowerPart);
var fifthLowerPartRotated = rotateObject([1,2],PI/2,fifthLowerPartColored);
var fifthLowerPartTraslated = translateObject([0,1],[70,20],fifthLowerPartRotated);

//Up base right
var upBaseRigth = SIMPLEX_GRID([[16],[20],[1]]);
var upBaseRigthColored = colors(coloreBase,upBaseRigth);
var upBaseRigthTranslated = translateObject([0,2],[55,6.66],upBaseRigthColored);

//Rigth jutting
var upRigthJutting = SIMPLEX_GRID([[0.5],[20],[13.5]]);
var upRigthJuttingColored = colors(coloreBase,upRigthJutting);
var upRigthJuttingTranslated = translateObject([0,2],[80,7.5],upRigthJuttingColored); 

//Up Rigth jutting
var rigthJutting = SIMPLEX_GRID([[10.5],[20],[0.5]]);
var rigthJuttingColored = colors(coloreBase,rigthJutting);
var rigthJuttingTranslated = translateObject([0,2],[70,7.2],rigthJuttingColored); 

var LowerPart = STRUCT([leftDoorTranslated,upRigthJuttingTranslated,rigthJuttingTranslated,upBaseRigthTranslated,firstLowerPartTraslated,secondLowerPartTraslated,thirdLowerPartTraslated,fourthLowerPartTraslated,fifthLowerPartTraslated]);

//Middle Part

//First middle part
var firstMiddlePart = SIMPLEX_GRID([[55],[20],[1]]);
var firstMiddlePartColored = colors(coloreBase,firstMiddlePart);
var firstMiddlePartTranslated = translateObject([2],[13.33],firstMiddlePartColored);

//Second middle part
var secondMiddlePart = SIMPLEX_GRID([[1],[31.67],[20]]);
var secondMiddlePartColored = colors(coloreBase,secondMiddlePart);
var secondMiddlePartRotated = rotateObject([1,2],PI/2,secondMiddlePartColored);
var secondMiddlePartTraslated = translateObject([0,1,2],[7,20,13.33],secondMiddlePartRotated);

//Third middle Part
var thirdMiddlePart = SIMPLEX_GRID([[73],[20],[1]]);
var thirdMiddlePartColored = colors(coloreBase,thirdMiddlePart);
var thirdMiddlePartTranslated = translateObject([0,2],[7,19.98],thirdMiddlePartColored);

//Rigth under part
var rigthUnderPart = SIMPLEX_GRID([[1],[6.65],[20]]);
var rigthUnderPartColored = colors(coloreBase,rigthUnderPart);
var rigthUnderPartRotated = rotateObject([1,2],PI/2,rigthUnderPartColored);
var rigthUnderPartTraslated = translateObject([0,1,2],[55,20,13.33],rigthUnderPartRotated);

//First Left part
var firstLeftPart = SIMPLEX_GRID([[7],[20],[1]]);
var firstLeftPartColored = colors(coloreBase,firstLeftPart);
var firstLeftPartTranslated = translateObject([2],[26.66],firstLeftPartColored);

//Second left part
var secondLeftPart = SIMPLEX_GRID([[8],[20],[0.5]]);
var secondLeftPartColored = colors(coloreBase,secondLeftPart);
var secondLeftPartTranslated = translateObject([0,2],[-0.5,40],secondLeftPartColored);

//Third left part
var thirdLeftPart = SIMPLEX_GRID([[1],[13],[20]]);
var thirdLeftPartColored = colors(coloreBase,thirdLeftPart);
var thirdLeftPartRotated = rotateObject([1,2],PI/2,thirdLeftPartColored);
var thirdLeftPartTraslated = translateObject([0,1,2],[63,20,7],thirdLeftPartRotated);

//Central part

var centralPart = SIMPLEX_GRID([[1],[6.65],[20]]);
var centralPartColored = colors(coloreBase,centralPart);
var centralPartRotated = rotateObject([1,2],PI/2,centralPartColored);
var centralPartTraslated = translateObject([0,1,2],[21,20,13.33],centralPartRotated);

//Second central part
var secondCentralPart = SIMPLEX_GRID([[1],[6.65],[20]]);
var secondCentralPartColored = colors(coloreBase,centralPart);
var secondCentralPartRotated = rotateObject([1,2],PI/2,centralPartColored);
var secondCentralPartTraslated = translateObject([0,1,2],[21,20,13.33],centralPartRotated);

//Central part right
var centralPartRight = SIMPLEX_GRID([[25],[20],[1]]);
var centralPartRightColored = colors(coloreBase,centralPartRight);
var centralPartRightRotate = rotateObject([0,2],PI/2,centralPartRightColored);
var centralPartRightTranslated = translateObject([0,2],[21,44.5],centralPartRightRotate);

//Central Top
var centralTop = SIMPLEX_GRID([[15],[20],[1]]);
var centralTopColored = colors(coloreBase,centralTop);
var centralTopTranslated = translateObject([0,2],[7,32.5],centralTopColored);

//Central Ultimate Top
var centralUltimateTop = SIMPLEX_GRID([[15],[20],[1]]);
var centralUltimateTopColored = colors(coloreBase,centralUltimateTop);
var centralUltimateTopTranslated = translateObject([0,2],[7,44.5],centralUltimateTopColored);

var central = STRUCT([centralPartTraslated,centralPartRightTranslated,centralTopTranslated,centralUltimateTopTranslated]);


var middlePart = STRUCT([firstMiddlePartTranslated,secondMiddlePartTraslated,firstLeftPartTranslated,
							secondLeftPartTranslated,thirdLeftPartTraslated,thirdMiddlePartTranslated,
							rigthUnderPartTraslated,centralPartRightTranslated]);

//Book in the wardrobe
var firstBook = SIMPLEX_GRID([[1.5],[8],[8]]);
var firstBookColored = colors([1,0,0],firstBook);
var firstBookRotate = rotateObject([1,2],PI/2,firstBookColored);
var firstBookTranslated = translateObject([0,1,2],[7.9,8,33.5],firstBookRotate);

var secondBook = colors([1,1,0],firstBook);
var secondBookRotate = rotateObject([1,2],PI/2,secondBook);
var secondBookTranslated = translateObject([0,1,2],[9.4,8,33.5],secondBookRotate);

var thirdBookColored = colors([0/255,0/255,255/255],firstBook);
var thirdBookRotate = rotateObject([1,2],PI/2,thirdBookColored);
var thirdBookTranslated = translateObject([0,1,2],[10.9,8,33.5],thirdBookRotate);

//Book in the wardrobe
var fourthBook = SIMPLEX_GRID([[1.5],[8],[8]]);
var fourthBookColored = colors([1,0,0],fourthBook);
var fourthBookRotate = rotateObject([1,2],PI/2,fourthBookColored);
var fourthBookTranslated = translateObject([0,1,2],[56,8,7.66],fourthBookRotate);

var sixthBook = colors([1,1,0],firstBook);
var sixthBookRotate = rotateObject([1,2],PI/2,sixthBook);
var sixthBookTranslated = translateObject([0,1,2],[57.5,8,7.66],sixthBookRotate);

var fifthBookColored = colors([255/255,153/255,0/255],firstBook);
var fifthBookRotate = rotateObject([1,2],PI/2,fifthBookColored);
var fifthBookTranslated = translateObject([0,1,2],[59,8,7.66],fifthBookRotate);

var books = STRUCT([firstBookTranslated,secondBookTranslated,thirdBookTranslated,fourthBookTranslated,fifthBookTranslated,sixthBookTranslated]);



var wardrobe = STRUCT([basePrimariaColorata,LowerPart,middlePart,central,books]);
var wardrobeTranslated = translateObject([0,1],[-5,20],wardrobe);
var wardrobeRotated = rotateObject([0,2],PI/4,wardrobeTranslated);


//second wardrobe
var baseSecondWardrobe = SIMPLEX_GRID([[20],[20],[0.5]]);
var baseSecondWardrobeColored = colors(coloreBase,baseSecondWardrobe);


//First Left Part Second wardrobe
var seconWardrobeSx1 = SIMPLEX_GRID([[10],[10],[0.5]]);
var seconWardrobeSx1Colored = colors(coloreBase,seconWardrobeSx1);
var seconWardrobeSx1Rotate = rotateObject([1,2],PI/2,seconWardrobeSx1Colored);
var seconWardrobeSx1Translated = translateObject([1],[0.5],seconWardrobeSx1Rotate);

//Second Left Part Second wardrobe
var seconWardrobeSx2 = SIMPLEX_GRID([[10],[10],[0.5]]);
var seconWardrobeSx2Colored = colors(coloreBase,seconWardrobeSx2);
var seconWardrobeSx2Rotate = rotateObject([1,2],PI/2,seconWardrobeSx2Colored);
var seconWardrobeSx2Translated = translateObject([0,1],[10,20],seconWardrobeSx2Rotate);

//Front Part Second wardrobe
var seconWardrobeFront = SIMPLEX_GRID([[10],[10],[0.5]]);
var seconWardrobeFrontColored = colors(coloreBase,seconWardrobeFront);
var seconWardrobeFrontRotate = rotateObject([0,2],PI/2,seconWardrobeFrontColored);
var seconWardrobeFrontTranslated = translateObject([0,2],[19.5,10],seconWardrobeFrontRotate);

//Second Front Part Second wardrobe
var seconWardrobeFront1 = SIMPLEX_GRID([[10],[10],[0.5]]);
var seconWardrobeFront1Colored = colors(coloreBase,seconWardrobeFront1);
var seconWardrobeFront1Rotate = rotateObject([0,2],PI/2,seconWardrobeFront1Colored);
var seconWardrobeFront1Translated = translateObject([1,2],[10,10],seconWardrobeFront1Rotate);


//First floor second wardrobe
var firstFloor = SIMPLEX_GRID([[20],[20],[0.5]]);
var firstFloorColored = colors(coloreBase,firstFloor);
var firstFloorTranslated = translateObject([2],[10],firstFloorColored);

//First part floor
var firsFloorPart1 = SIMPLEX_GRID([[10],[5],[0.5]]);
var firsFloorPart1Colored = colors(coloreBase,firsFloorPart1);
var firsFloorPart1Rotate = rotateObject([1,2],PI/2,firsFloorPart1Colored);
var firsFloorPart1Translated = translateObject([0,1,2],[10,0.5,10.5],firsFloorPart1Rotate);

//Second part floor
var firsFloorPart2 = SIMPLEX_GRID([[10],[5],[0.5]]);
var firsFloorPart2Colored = colors(coloreBase,firsFloorPart2);
var firsFloorPart2Rotate = rotateObject([1,2],PI/2,firsFloorPart2Colored);
var firsFloorPart2Translated = translateObject([0,1,2],[10,20,10.5],firsFloorPart2Rotate);


//Second floor 
var secondFloor = SIMPLEX_GRID([[10],[20],[0.5]]);
var secondFloorColored = colors(coloreBase,secondFloor);
var secondFloorTranslated = translateObject([0,2],[10,15.5],secondFloorColored);

//First part second floor
var secondFloor1 = SIMPLEX_GRID([[8],[10],[0.5]]);
var secondFloor1Colored = colors(coloreBase,secondFloor1);
var secondFloor1Translated = translateObject([0,2],[10,15.5],secondFloor1Colored);
var secondFloor1Rotate = rotateObject([0,1],PI/2,secondFloor1Translated);
var secondFloor1Final = translateObject([0,1],[10,-3.33],secondFloor1Rotate);

//First part second floor
var secondFloor2 = SIMPLEX_GRID([[5],[8],[0.5]]);
var secondFloor2Colored = colors(coloreBase,secondFloor2);
var secondFloor2Rotate = rotateObject([0,2],PI/2,secondFloor2Colored);
var secondFloor2Translated = translateObject([1,2],[6.7,15.5],secondFloor2Rotate);

//jar second wardrobe

var colorJar = [171/255,205/255,239/255];

var jar = createjar(3,colorJar);
var jarColored = colors(colorJar,jar);
var jarRotate = rotateObject([1,2],PI,jarColored);
var jarTranslated = translateObject([0,1,2],[10,10,0.5],jarRotate);
var jarRotate1 = rotateObject([1,2],PI/2,jarTranslated);
var jarTranslated1 = translateObject([1,2],[10,-6.3],jarRotate1);

var secondWardrobe = STRUCT([seconWardrobeSx1Translated,baseSecondWardrobeColored,seconWardrobeSx2Translated,
							seconWardrobeFrontTranslated,seconWardrobeFront1Translated,firstFloorTranslated,
							firsFloorPart1Translated,firsFloorPart2Translated,secondFloorTranslated,
							secondFloor1Final,secondFloor2Translated,jarTranslated1]);


var secondWardrobeTranslate =  translateObject([0],[10],secondWardrobe);
var secondWardrobeRotated =rotateObject([0,2],PI/4,secondWardrobeTranslate);
var secondWardrobeTranslate1 =  translateObject([1],[-25],secondWardrobeRotated);
							
var model=STRUCT([wardrobeRotated,secondWardrobeTranslate1]);


DRAW(model);