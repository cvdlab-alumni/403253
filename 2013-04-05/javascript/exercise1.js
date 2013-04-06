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
VIEW(building)
