
import logging
logging.basicConfig()
from pyplasm import *

GRID = COMP([INSR(PROD),AA(QUOTE)])

def Pillar0 ():
    pil = CYLINDER([1.25, 26])(36)
    #il pilastro viene spostato, inizialmente centrato nell'origine
    return T([1,2])([1.25,1.25]) (pil)

roundPillarsLine0A = STRUCT(NN(5)([Pillar0(),T([1])([27.5])]))
roundPillarsLine0B = STRUCT([T([2])([50])(Pillar0()),T([1,2])([110,50])(Pillar0())])
squarePillarsLine0 = GRID([[-13.75,2.5,-11.25,2.5,-25,2.5,-25,2.5], [-50,2.5],[-1,25]])

pillars0 = STRUCT([roundPillarsLine0A,roundPillarsLine0B,squarePillarsLine0])

def Pillar1 ():
    pil = CYLINDER([1.25, 24])(36)
    #il pilastro viene spostato, inizialmente centrato nell'origine
    return T([1,2])([1.25,1.25]) (pil)

squarePillarsLine1A = GRID([[2.5,-25,2.5],[2.5],[-27,49]])
squarePillarsLine1B = GRID([[-2.5,-25,-2.5,-25,2.5,-25,2.5,-25,2.5],[2.5],[-27,24]])
squarePillarsLine1C = GRID([[2.5,-25,2.5],[-50,2.5],[-27,49]])
squarePillarsLine1D = GRID([[-2.5,-25,-2.5,-25,2.5,-25,-2.5,-25,2.5],[-50,2.5],[-27,24]])
roundPillar1FloorTranslated = T([1,2,3])([2.5+25+2.5+25+2.5+25,50,27])(Pillar1())

pillars1 = STRUCT([squarePillarsLine1A,squarePillarsLine1B,squarePillarsLine1C,squarePillarsLine1D,roundPillar1FloorTranslated])

squarePillarsLine2A = GRID([[-55,2.5,-52.5,2.5], [2.5,-62.5], [-52,24,-26]]) 
squarePillarsLine2B = GRID([[-2.5,-25,-2.5,-25,2.5,-25,2.5,-25,2.5], [-50,2.5,-12.5], [-52,24,-26]])

pillars2 = STRUCT([squarePillarsLine2A,squarePillarsLine2B])

smallSquarePillars3A = GRID([[1.25], [1.25], [-1,-25,-1,-24,-1,-24,-1,23]])
squarePillarsLine3A = GRID([[-2.5,-25,-2.5,-25,2.5,-25,-2.5,-25,2.5], [2.5], [-1,-25,-1,-24,-1,-24,-1,23]])
smallSquarePillars3B = GRID([[1.25,-1.25,-25,1.25], [-1.25,-50,1.25], [-1,-25,-1,-24,-1,-24,-1,23]])
squarePillarsLine3B = GRID([[-2.5,-25,-2.5,-25,2.5,-25,2.5,-25,2.5], [-50,2.5], [-1,-25,-1,-24,-1,-24,-1,23]])

pillars3 = STRUCT([smallSquarePillars3A,squarePillarsLine3A,smallSquarePillars3B,squarePillarsLine3B])

building = STRUCT([pillars0,pillars1,pillars2,pillars3])
VIEW(building)





























