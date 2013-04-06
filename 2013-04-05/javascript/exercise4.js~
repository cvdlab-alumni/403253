// da PLASM a PLASMJS
T = function (dims) {
	dims =  dims.map(function (dim ) {
		return dim - 1;
	}); 
    return function (values) {
      return function (object) {
       return object.clone().translate(dims, values);
      };
    };
  }

R = function (dims) {
	dims =  dims.map(function (dim ) {
		return dim - 1;
	});
    return function (angle) {
      return function (object) {
        return object.clone().rotate(dims, angle);
      };
    };
  }

S = function (dims) {
	dims =  dims.map(function (dim ) {
		return dim - 1;
	});
    return function (values) {
      return function (object) {
        return object.clone().scale(dims, values);
      }; 
    };
  }

S3 = S2
S2 = S1
S1 = S0

GRID = SIMPLEX_GRID
VIEW = DRAW
NN = REPLICA

function roundPillar() {
  pillar = EXTRUDE([26])(DISK([1.25])(36))
  centeredPillar = T([1,2])([1.25,1.25])(pillar)
  return centeredPillar
};

//1 piano
roundPillars1floor0 = STRUCT(NN(5)([roundPillar(),T([1])([27.5])]))
roundPillars1floor1 = T([2])([50])(roundPillar())
roundPillars1floor2 = T([1,2])([110,50])(roundPillar())
squarePillars1floor0 = GRID([[-13.75, 2.5, -11.25, 2.5, -25, 2.5, -25, 2.5, -25], [-50, 2.5, -12.5], [-1,25]])
//pilastri primo piano
pillars0 = STRUCT([squarePillars1floor0,roundPillars1floor0,roundPillars1floor1,roundPillars1floor2])

//2 piano
squarePillars2floor0 = GRID([[2.5,-25,2.5],[2.5],[-27,49]])
squarePillars2floor1 = GRID([[-2.5,-25,-2.5,-25,2.5,-25,2.5,-25,2.5],[2.5],[-27,24]])
squarePillars2floor2 = GRID([[2.5,-25,2.5],[-50,2.5],[-27,49]])
squarePillars2floor3 = GRID([[-2.5,-25,-2.5,-25,2.5,-25,-2.5,-25,2.5],[-50,2.5],[-27,24]])
roundPillar2floor4 = EXTRUDE([24])(DISK([1.25])(36))
roundPillar2floor5 = T([1,2,3])([2.5+25+2.5+25+2.5+25+1.25,50+1.25,27])(roundPillar2floor4)

//pilastri secondo piano
pillars1 = STRUCT([squarePillars2floor0,squarePillars2floor1,squarePillars2floor2,squarePillars2floor3,roundPillar2floor5])

//3 piano
squarePillars3floor0 = GRID([[-55, 2.5, -52.5, 2.5], [2.5, -62.5], [-52, 24, -26]])
squarePillars3floor1 = GRID([[-55, 2.5, -25, 2.5, -25, 2.5], [-50, 2.5, -12.5], [-52, 24, -26]])
//pilastri terzo piano
pillars2 = STRUCT([squarePillars3floor0,squarePillars3floor1])

//4 piano
smallpillars4floor0 = GRID([[1.25, -111.25], [1.25, -62.5], [-77, 23, -2]])
smallpillars4floor1 = GRID([[1.25, -26.25, 1.25], [-51.25, 1.25], [-77, 23, -2]])
smallpillars4floor2 = GRID([[-55, 2.5, -52.5, 2.5],[2.5, -47.5, 2.5],[-77, 23, -2]])
smallpillars4floor3 = GRID([[-55, 2.5, -25, 2.5, -25, 2.5],[-50, 2.5],[-77, 23, -2]])
pillars3 = STRUCT([smallpillars4floor0,smallpillars4floor1,smallpillars4floor2,smallpillars4floor3])
building = STRUCT([pillars0,pillars1,pillars2,pillars3])


//2 Esercizio

function semiCircle(r){
    
    function semiCircle(p){
            alpha = p[0]
            b = p[1]
            a = [b*COS(alpha), b*SIN(alpha)] 
            return a;
        };
    var dom = DOMAIN([[0,PI],[0,r]])([36,1]);
    var cerchioO = MAP(semiCircle)(dom)
    var semiPlan = EXTRUDE([1])(cerchioO);
    return semiPlan;
};

semiPlan0a = GRID([[-13.75, 71.25], [-22, 43], [1]])
semiPlan0b = GRID([[-85, 12.5, -15], [-42, 23], [1]])
semiPlan0c = GRID([[-13.75, 12.5],[-18, 4],[1]])
semiPlan0d = T([1,2])([97.5, 53.5])(R([1,2])(-PI/2)(semiCircle(11.5)))
semiPlan0e = T([1,2])([20, 18])(R([1,2])(-PI)(semiCircle(6.25)))
floor0 = STRUCT([semiPlan0a,semiPlan0b,semiPlan0c,semiPlan0d,semiPlan0e])



hpartition01 = GRID([[2.5,8.57],[50,3.5,9,2.5],[-1,-25,1]])
hpartition02 = GRID([[-2.5,-8.57,40.22],[50,3.5,-9,2.5],[-1,-25,1]])
hpartition04 = GRID([[-2.5,-8.57,-31.65,-4.58,3.99],[-50,-3.5,9],[-1,-25,1]])
hpartition05 = GRID([[-2.5,-8.57,-31.65,-8.57,8.57],[65],[-1,-25,1]])
hpartition06 = GRID([[-2.5,-8.57,-31.65,-8.57,-8.57,52.64],[65],[-1,-25,1]])

floor1 = STRUCT([hpartition01,hpartition02,hpartition04,hpartition05,hpartition06])

hpartition21 = GRID([[2.5,5.71],[65],[-1,-25,-1,-24,1]])
hpartition22 = GRID([[-2.5,-5.71,37.14],[2.5,-51,-9,2.5],[-1,-25,-1,-24,1]])
hpartition23 = GRID([[-2.5,-5.71,-37.14,13.57],[2.5],[-1,-25,-1,-24,1]])
verts = [[58.92,0],[45.35,51],[45.35,65],[58.92,65]]
cells = [[0,1,3],[1,2,3]]
hpartition24 = SIMPLICIAL_COMPLEX(verts)(cells)
hpartition24_3D = T([3])([1+25+1+24])(EXTRUDE([1])(hpartition24))
hpartition25 = GRID([[-2.5,-5.71,-37.14,-13.57,53.53],[65],[-1,-25,-1,-24,1]])
floor2 = STRUCT([hpartition21,hpartition22,hpartition23,hpartition24_3D,hpartition25])
hpartition31 = GRID([[2.5],[65],[-1,-25,-1,-24,-1,-24,1]])
hpartition32 = GRID([[2.5,25,2.5,25],[2.5,-61.25,1.25],[-1,-25,-1,-24,-1,-24,1]])
hpartition33 = GRID([[-2.5,-25,-2.5,-25,2.5],[65],[-1,-25,-1,-24,-1,-24,1]])
hpartition34 = GRID([[-2.5,-25,-2.5,-25,2.5,34.58],[54.75,-9,1.25],[-1,-25,-1,-24,-1,-24,1]])
hpartition35 = GRID([[-2.5,-25,-2.5,-25,2.5,-34.58,20.42],[65],[-1,-25,-1,-24,-1,-24,1]])
floor3 = STRUCT([hpartition31,hpartition32,hpartition33,hpartition34,hpartition35])
hpartition41 = GRID([[2.5],[65],[-1,-25,-1,-24,-1,-24,-1,-23,2]])
hpartition42 = GRID([[2.5,25,2.5,25],[2.5,-51.18,11.32],[-1,-25,-1,-24,-1,-24,-1,-23,2]])
hpartition43 = GRID([[-2.5,-25,-2.5,-25,2.5,25,2.5,25,2.5],[65],[-1,-25,-1,-24,-1,-24,-1,-23,2]])
floor4 = STRUCT([hpartition41,hpartition42,hpartition43])


//3 esercizio
function annulus_sector (alpha, r, R) {
	var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);
	var mapping = function (v) {
	var a = v[0];
	var r = v[1];
	return [r*COS(a), r*SIN(a)];
	}

		var model = MAP(mapping)(domain);
		return model;
}
roundNorth1floor = T([1,2,3])([97.5, 53.5, 1])(R([1,2])(-PI/2)(EXTRUDE([25])(annulus_sector(PI, 9, 11.5))))
north0 = T([3])([1])(GRID([[-82.5, 2.5], [-22, 11.5], [25]]))
north0a = T([1,2,3])([82.5, 33.5, 23])(CUBOID([2.5,8.5,3]))
north0b = T([3])([1])(GRID([[-23.75, 2.5],[-18, 4],[25]]))
north1 = GRID([[-110, 2.5],[-2.5, 50],[-27, 10, -10, 4]])
north1a = GRID([[-110, 2.5], [-52.5, 7, -3, 2.5], [-27, 24]])
north1b = T([1,2,3])([110, 59.5,50])(CUBOID([2.5,3,1]))
north1c = T([1,2,3])([110, 59.5,27])(CUBOID([2.5,3,1]))
north2 = GRID([[-110, 2.5],[-2.5, 50],[-52, 7, -10, 7]])
north2a = GRID([[-110, 2.5], [-52.5, 7, -3, 2.5], [-52, 24]])
north2b = T([1,2,3])([110, 59.5,74.5])(CUBOID([2.5,3,1.5]))
north2c = T([1,2,3])([110, 59.5,52])(CUBOID([2.5,3,1.5]))
north3 = GRID([[-110, 2.5],[-2.5, 50],[-77, 5, -10, 8]])
north3a = GRID([[-110, 2.5], [-52.5, 7, -3, 2.5], [-77, 24]])
north3b = T([1,2,3])([110, 59.5,77])(CUBOID([2.5,3,2]))
north3c = T([1,2,3])([110, 59.5,99])(CUBOID([2.5,3,2]))
north = STRUCT([roundNorth1floor,north0,north0a,north0b,north1,north1a,north1b,north1c,north2,north2a,north2b,north2c,north3,north3a,north3b,north3c])
east0 = T([1,2,3])([20, 18, 1])(R([1,2])(-PI)(EXTRUDE([25])(annulus_sector(PI, 3.75, 6.25))))
east0a = T([3])([1])(GRID([[-23.75, 32.25], [-22, 2.5], [25]]))
east0b = T([3])([1])(GRID([[-56, 26.5], [-22, 2.5], [14, -10, 1]]))
east0c = T([3])([1])(GRID([[-82.5, 15], [-42, 2.5],[25]]))
east1a = GRID([[-2.5, 25], [2.5], [-27, 24]])
east1b = GRID([[-30, 25], [2.5], [-27, 24]])
east1c = GRID([[-85, 25], [2.5], [-27, 24]])
east1d = GRID([[-56, 26.5], [2.5], [-27, 10, -10, 4]])
east1 = STRUCT([east1a,east1b,east1c,east1d])
east2a = GRID([[-2.5, 25], [2.5], [-52, 24]])
east2b = GRID([[-30, 25], [2.5], [-52, 24]])
east2c = GRID([[-82.5, 27.5], [2.5], [-52, 24]])
east2d = GRID([[-56, 26.5], [2.5], [-52, 10, -10, 4]])
east2 = STRUCT([east2a,east2b,east2c,east2d])
east3a = GRID([[55], [2.5], [-77, 7.14, -15.86]])
east3b = GRID([[-82.5, 27.5], [2.5], [-77, 23]])
east3c = GRID([[-56, 26.5], [2.5], [-77, 7.14, -10, 5.86]])
east3 = STRUCT([east3a,east3b,east3c])
east = STRUCT([east0,east0a,east0b,east0c,east1,east2,east3])
south01 = GRID([[2.5],[-50,-2.5,-10,+2.5],[1,25]])
south02 = GRID([[-13.75,2.5],[-2.5,-18.86,28.64],[-1,14.28,-9.47,1.25]])
south0 = STRUCT([south01,south02])
south1 = GRID([[2.5],[-50,-10.82,4.18],[-1,-25,-1,24]])
south2 = GRID([[2.5],[-50,15],[-1,-25,-1,-24,-1,24]])
south3 = GRID([[2.5],[65],[-1,-25,-1,-24,-1,-24,-1,7.14]])
south = STRUCT([south0,south1,south2,south3])
west01 = GRID([[-2.5,25],[-62.5,2.5],[1,25]])
west02 = GRID([[-2.5,-25,46.78],[-62.5,2.5],[-1,25]])
west03 = GRID([[-2.5,-25,-46.78,5.71],[-62.5,2.5],[-1,17.14,-5.71,2.15]])
west04 = GRID([[-74.28,-5.71,18.51],[-62.5,2.5],[-1,25]])
west0 = STRUCT([west01,west02,west03,west04])
west11 = GRID([[63.57],[-62.5,2.5],[-1,-25,-1,24]])
west12 = GRID([[-63.57,25.71],[-62.5,2.5],[-1,-25,-1,12]])
west13 = GRID([[-63.57,-25.71,23.22],[-62.5,2.5],[-1,-25,-1,24]])
west1 = STRUCT([west11,west12,west13])
west21 = GRID([[89.28],[-62.5,2.5],[-1,-25,-1,-24,-1,24]])
west22 = GRID([[-89.28,1.25],[-62.5,2.5],[-1,-25,-1,-24,-1,6,-12,6]])
west23 = GRID([[-89.28,-1.25,5.71],[-62.5,2.5],[-1,-25,-1,-24,-1,24]])
west24 = GRID([[-89.28,-1.25,-5.71,1.25],[-62.5,2.5],[-1,-25,-1,-24,-1,6,-12,6]])
west25 = GRID([[-89.28,-1.25,-5.71,-1.25,15.01],[-62.5,2.5],[-1,-25,-1,-24,-1,24]])
west26 = GRID([[112.5],[-62.5,2.5],[-1,-25,-1,-24,-1,-24,-1,23]])
west2 = STRUCT([west21,west22,west23,west24,west25,west26])
west = STRUCT([west0,west1,west2])
buildingBase = COLOR([0,1,0])(T([3])([-1])(GRID([[112,5],[65],[1]])))
building = STRUCT([buildingBase, pillars0,pillars1,pillars2,pillars3,floor0,floor1,floor2,floor3,floor4,south,north,west,east])



//4 Esercizio

//colore nero
BLACK = [0,0,0]
//strutture delle finestre a est
structureEast1 = COLOR(BLACK)(GRID([[-57.5, 25], [-1.5,0.5], [-37, 0.5, -9, 0.5, -4]]))
structureEast2 = COLOR(BLACK)(GRID([[-57.5, 0.5, -11.5, 1 , -11.5 , 0.5], [-1.5,0.5], [-37, 10, -4]]))
windowEast1 = STRUCT ([structureEast1,structureEast2])
windowEast2 = T([3])([25])(windowEast1)
windowEast3 = T([3])([22.14])(windowEast2)
structureEast3 = COLOR(BLACK)(GRID([[-56, 26.5], [-23.5, 0.5], [-15 ,0.5, -9 , 0.5]]))
structureEast4 = COLOR(BLACK)(GRID([[-56, 0.5, -12.25 , 1 , -12.25 , 0.5], [-23.5, 0.5], [-15 ,10]]))
windowEast4= STRUCT ([structureEast3,structureEast4])
windowEast = STRUCT([windowEast1,windowEast2,windowEast3,windowEast4])
//strutture delle finestre a nord
structureNorth1 = COLOR(BLACK)(GRID([[-110.5, 0.5],[-2.5, 47.5],[-37, 0.5, -9 , 0.5]]))
structureNorth2 = COLOR(BLACK)(GRID([[-110.5, 0.5],[-2.5, 0.6, -11.125, 0.6, -11.125 , 0.6, -11.125 , 0.6, -11.125 , 0.6],[-37, 10, -4]]))
windowNorth1 = STRUCT([structureNorth1,structureNorth2])
windowNorth2 = T([3])([22])(windowNorth1)
windowNorth3 = T([3])([23])(windowNorth2)
windowNorth = STRUCT([windowNorth2,windowNorth3,windowNorth1])
//strutture delle finestre a sud
structureSouth1 = COLOR(BLACK)(GRID([[-1.5,0.5],[-2.5,0.5,-10.875,1,-10.875,1,-10.875,1,-10.875,0.5],[-27,24]]))
structureSouth2 = COLOR(BLACK)(GRID([[-1.5,0.5],[-2.5,47.5],[-27,0.5,-11,1,-11,0.5]]))
windowSouth1 = STRUCT ([structureSouth1,structureSouth2])
windowSouth2 = T([3])([25])(windowSouth1)
structureSouth3 = COLOR(BLACK)(GRID([[-15.25,0.5],[-21.3, 0.5, -13.35, 1, -13.35, 0.5],[-15.28,9.47]]))
structureSouth4 = COLOR(BLACK)(GRID([[-15.25,0.5],[-21.3, 28.7],[-15.28,0.5,-8.47,0.5]]))
windowSouth3 = STRUCT ([structureSouth3,structureSouth4])
windowSouth = STRUCT([windowSouth1,windowSouth2,windowSouth3])
//base di appoggio edificio
buildingBase = COLOR([0,1,0])(T([2,3])([-1,-1])(GRID([[120],[80],[1]])))
building = STRUCT([buildingBase,pillars0,pillars1,pillars2,pillars3,floor0,floor1,floor2,floor3,floor4,north,east,south,west,windowNorth,windowEast,windowSouth])
VIEW(building)

