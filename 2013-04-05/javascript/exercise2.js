T = function (dims) {
	dims = dims.map(function (dim ) {
	return dim - 1;
    }); 
	return function (values) {
		return function (object) {
			return object.clone().translate(dims, values);
			};
		};
	}


R = function (dims) {
	dims = dims.map(function (dim ) {
	return dim - 1;
    });
	return function (angle) {
		return function (object) {
			return object.clone().rotate(dims, angle);
			};
		};
	}


S = function (dims) {
	dims = dims.map(function (dim ) {
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
//buildingBase = COLOR([0,1,0])(T([3])([-1])(GRID([[112,5],[65],[1]])))


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
VIEW(STRUCT([building,floor0,floor1,floor2,floor3,floor4]))
