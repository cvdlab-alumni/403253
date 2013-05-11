'''
Created on 11/mag/2013

@author: ilario
'''

from pyplasm import *
import scipy
from scipy import *
from pyplasm.fenvs import OFFSET

#-------------------Prof GRID------------------------------
def VERTEXTRUDE((V,coords)):
    """
        Utility function to generate the output model vertices in a 
        multiple extrusion of a LAR model.
        V is a list of d-vertices (each given as a list of d coordinates).
        coords is a list of absolute translation parameters to be applied to 
        V in order to generate the output vertices.
        
        Return a new list of (d+1)-vertices.
    """
    return CAT(AA(COMP([AA(AR),DISTR]))(DISTL([V,coords])))

def cumsum(iterable):
    # cumulative addition: list(cumsum(range(4))) => [0, 1, 3, 6]
    iterable = iter(iterable)
    s = iterable.next()
    yield s
    for c in iterable:
        s = s + c
        yield s

def larExtrude(model,pattern):
    V,FV = model
    d = len(FV[0])
    offset = len(V)
    m = len(pattern)
    outcells = []
    for cell in FV:
        # create the indices of vertices in the cell "tube"
        tube = [v + k*offset for k in range(m+1) for v in cell]
        # take groups of d+1 elements, via shifting by one
        rangelimit = len(tube)-d
        cellTube = [tube[k:k+d+1] for k in range(rangelimit)]
        outcells += [scipy.reshape(cellTube,newshape=(m,d,d+1)).tolist()]
    outcells = AA(CAT)(TRANS(outcells))
    outcells = [group for k,group in enumerate(outcells) if pattern[k]>0 ]
    coords = list(cumsum([0]+(AA(ABS)(pattern))))
    outVerts = VERTEXTRUDE((V,coords))
    newModel = outVerts, CAT(outcells)
    return newModel

def GRID(args):
    model = ([[]],[[0]])
    for k,steps in enumerate(args):
        model = larExtrude(model,steps*[1])
    V,cells = model
    verts = AA(list)(scipy.array(V) / AA(float)(args))
    return MKPOL([verts, AA(AA(lambda h:h+1))(cells), None])



#-----------------Funzioni d'ausilio----------------------------------------#


def cerchio(r):
    def cerchio0(p):
        a=p[0]
        return [r*SIN(a), r*COS(a)]
    return cerchio0;


def creaCurvaHermite(args):
    dom = GRID([20])
    return MAP(CUBICHERMITE(S1)(args))(dom);

def creaEllisse(r,l):
    def ellisse0(p):
        a=p[0]
        return [l*SIN(a), r*COS(a)]
    return ellisse0;
#---------------------------------------------------------#

#Costruisco il parafanfo
Dom1D = GRID([20])
Bezier = BEZIER(S1)


#-------------------------Prima curva Bezier (prima della ruota anteriore)------------------------
puntiContolloparafango0 = [[0,0.5],[0.8,0.3],[1.5,0.3],[2,0.3]]
curvaParafango0 = MAP(Bezier(puntiContolloparafango0))(Dom1D)


puntiContolloparafango1 = [[9.6,0.3],[10,0.2],[10.3,0.3],[10.5,0.5]]
curvaParafango1 = MAP(Bezier(puntiContolloparafango1))(Dom1D)


puntiContolloparafango2 = [[0.01,0.5],[0.05,0.9],[0.03,0.9],[0,0.9]]
curvaParafango2 = MAP(Bezier(puntiContolloparafango2))(Dom1D)

puntiContolloparafango3 = [[0,0.9],[0,1.2]]
curvaParafango3 = POLYLINE(puntiContolloparafango3)

puntiContolloparafango4 = [[0,1.2],[2.4,1.4]]
curvaParafango4 = POLYLINE(puntiContolloparafango4)


puntiContolloparafango5 = [[0,1.2],[1.2,2.1],[3.4,2.4],[3.9,2.2]]
curvaParafango5 = MAP(Bezier(puntiContolloparafango5))(Dom1D)


puntiContolloparafango6 = [[10.5,0.5],[10.9,0.9],[10.9,1.1],[10.9,1.6]]
curvaParafango6 = MAP(Bezier(puntiContolloparafango6))(Dom1D)


puntiContolloparafango7 = [[10.9,1.6],[10.9,1.7],[10.6,2],[10.5,2.2]]
curvaParafango7 = MAP(Bezier(puntiContolloparafango7))(Dom1D)
#---------------------------------------------------------------------



#-----------------------------Vetri----------------------------------
puntiControlloVetroAnt0 = [[3.9,2.2],[5.5,2.6],[5.7,2.9],[5.5,2.94]]
curvaVetroAnt0 = MAP(Bezier(puntiControlloVetroAnt0))(Dom1D)

puntiControlloVetroAnt1= [[3.5,2.27],[4.8,2.8],[6.2,3.3],[7.8,3]]
curvaVetroAnt1 = MAP(Bezier(puntiControlloVetroAnt1))(Dom1D)

vetroAnt = STRUCT([curvaVetroAnt0,curvaVetroAnt1])


puntiControlloVetroPost0 = [[7.8,3],[7.6,2.7],[9.2,2.7],[10.5,2.2]]
curvaVetroPost0 = MAP(Bezier(puntiControlloVetroPost0))(Dom1D)

puntiControlloVetroPost1 = [[7.8,3],[7.6,2.9],[9.2,2.9],[10.5,2.2]]
curvaVetroPost1 = MAP(Bezier(puntiControlloVetroPost1))(Dom1D)

vetroPost = STRUCT([curvaVetroPost0,curvaVetroPost1])


vetri = STRUCT([vetroAnt,vetroPost])
#--------------------------------------------------



#-------------------------Finestrino---------------------------------

puntiControlloFinestrino0 = [[4.2,2],[5.6,1.9],[7.5,2.1],[8.3,2.5]]
curveFinestrino0 = MAP(Bezier(puntiControlloFinestrino0))(Dom1D)

puntiControlloFinestrino1 = [[4.2,2],[4.9,2.3],[4.6,2.3],[6,2.7]]
curveFinestrino1 = MAP(Bezier(puntiControlloFinestrino1))(Dom1D)

puntiControlloFinestrino2 = [[6,2.7],[6.3,2.8],[7,3],[8.3,2.5]]
curveFinestrino2 = MAP(Bezier(puntiControlloFinestrino2))(Dom1D)


finestrino = STRUCT([curveFinestrino0,curveFinestrino1,curveFinestrino2])

#-------------------------------------------------------------------



#----------------------------Sportello---------------------------

puntiControlloSportello0 = [[4.2,0.7],[3.8,1.4],[3.9,1.7],[4.2,2]]
curvaSportello0 = MAP(Bezier(puntiControlloSportello0))(Dom1D)


puntiControlloSportello1 = [[6.7,0.7],[7,0.7],[7.3,1.8],[7.1,2.1]]
curvaSportello1 = MAP(Bezier(puntiControlloSportello1))(Dom1D)

puntiControlloSportello2 = [[3.75,0.7],[6.7,0.7]]
curvaSportello2 = POLYLINE(puntiControlloSportello2)

sportello = STRUCT([curvaSportello0,curvaSportello1,curvaSportello2]) 

#-----------------------------------------------------------------






#--------------Linea fra le due ruote---------------
puntiParafango0 = [[3.8,0.3],[7.6,0.3]]
parafango0 = POLYLINE(puntiParafango0)
#--------------------------------------------------


#----------------------------Prima linea sopra il parafango---------------------------

puntiParafango1 = [[3.8,0.5],[7.6,0.5]]
parafango1 = POLYLINE(puntiParafango1)


#-------------------------------------------------------------------------------------

#----------------------------Seconda linea sopra il parafango---------------------------

puntiParafango2 = [[3.75,0.9],[7.7,1]]
parafango2 = POLYLINE(puntiParafango2)


#-------------------------------------------------------------------------------------


#----------------------------Terza linea sopra il parafango---------------------------

puntiParafango3 = [[3.4,1.45],[10.5,2.2]]
parafango3 = POLYLINE(puntiParafango3)


#-------------------------------------------------------------------------------------


#------------------------------Parafango--------------------------------
parafango = STRUCT([curvaParafango0,parafango0,curvaParafango1,curvaParafango7,curvaParafango6,parafango1,parafango2,parafango3,curvaParafango5,curvaParafango2,curvaParafango3,curvaParafango4])
#----------------------------------------------------------------------



#---------------------------Cerchio Ruote-------------------------------


puntiControlloCerchioAnt = [[2,0.3],[3.8,0.3],[0,5],[0,-5]]
cerchioAnt = creaCurvaHermite(puntiControlloCerchioAnt)

puntiControlloCerchioPost = [[7.6,0.3],[9.6,0.3],[0,5],[0,-5]]
cerchioPost = creaCurvaHermite(puntiControlloCerchioPost)

cerchi = STRUCT([cerchioAnt,cerchioPost])


#-----------------------------------------------------------------------

#---------------------------Freccia-------------------------------

domainFreccia = INTERVALS(PI*2)(36)
freccia = R([1,2])(PI/2)(MAP(cerchio(0.05))(domainFreccia))
frecciaTraslata = T([1,2])([3.75,1.25])(freccia)

#-----------------------------------------------------------------------


#-----------------------Parti del muso-------------------------------

puntiMuso0 = [[0.4,0.5],[1.8,0.5]]
muso0 = POLYLINE(puntiMuso0)


puntiContolloMuso1 = [[1.2,0.5],[1.2,1],[1.5,1.1],[1.9,1.1]]
muso1 = Bezier(puntiContolloMuso1)


puntiContolloMuso2 = [[1.8,0.5],[1.8,0.9],[1.8,0.6],[1.9,1.1]]
muso2 = Bezier(puntiContolloMuso2)


#------------------------Seconda Surface esercizio 2----------------

domSurf2 = GRID([20,20])
surf2 = BEZIER(S2)([muso1,muso2])
surfSurface2 = COLOR(BLACK)(MAP(surf2)(domSurf2))
#--------------------------------------------------------------------

muso = STRUCT([muso0,surfSurface2])
#--------------------------------------------------------------------



#-------------------------faretti-----------------------------

dominioElisse = INTERVALS(2*PI)(32)
faretti = MAP(creaEllisse(1,5))(dominioElisse)


#---------------------------------------------------------------


#-------------------------Fari-----------------------------

puntiContolloFaroAnt0 = [[0.7,1.5],[1.5,2.1],[1.7,1.9],[1.8,1.9]]
curvafaroAnt0 = MAP(Bezier(puntiContolloFaroAnt0))(Dom1D)

puntiContolloFaroAnt1 = [[0.7,1.5],[1,1.5],[1.7,1.5],[1.8,1.9]]
curvafaroAnt1 = MAP(Bezier(puntiContolloFaroAnt1))(Dom1D)

fariAnt = STRUCT([curvafaroAnt0,curvafaroAnt1])

dominioElisse = INTERVALS(2*PI)(32)
faretti = T([1,2])([0.5,0.9])(MAP(creaEllisse(0.2,0.3))(dominioElisse))


fari = STRUCT([fariAnt,faretti])


#---------------------------------------------------------------


puntiContolloSopraRuota0 = [[3,1.55],[4.4,1.7]]
curvaSopraRuota0 = POLYLINE(puntiContolloSopraRuota0)
puntiContolloSopraRuota1 =  [[1.8,1.35],[2.3,1.8],[3.3,2],[4.4,1.7]]
curvaSopraRuota1 = MAP(Bezier(puntiContolloSopraRuota1))(Dom1D)
curvaSopraRuota = STRUCT([curvaSopraRuota0,curvaSopraRuota1])


macchinaFront = STRUCT([cerchi,parafango,frecciaTraslata,muso,vetri,finestrino,sportello,fari,curvaSopraRuota])

macchinaFrontTraslata = COLOR(BLACK)(T(1)(-3.5)(R([1,3])(PI/2)(macchinaFront)))




#---------------------Visualizzazione modello sul piano zy---------------------------

puntiControlloParabrezzaX0 = [[0,2.2],[1.9,2.2]]
curvaParabrezzaX0 = POLYLINE(puntiControlloParabrezzaX0)

puntiControlloParabrezzaX1 =  [[0,2.9],[1.4,3],[1.6,2.7],[1.9,2.2]]
curvaParabrezzaX1 = MAP(Bezier(puntiControlloParabrezzaX1))(Dom1D)

puntiControlloParabrezzaX2 =  [[0,3],[1.6,3],[1.8,2.7],[1.9,2.2]]
curvaParabrezzaX2 = MAP(Bezier(puntiControlloParabrezzaX2))(Dom1D)

puntiControlloParabrezzaX3 = [[0,1.5],[0.9,1.5]]
curvaParabrezzaX3 = POLYLINE(puntiControlloParabrezzaX3)

puntiControlloParabrezzaX4 = [[0.9,1.5],[1.9,1.6],[1,2.2],[1.9,2.2]]
curvaParabrezzaX4 = MAP(Bezier(puntiControlloParabrezzaX4))(Dom1D)

puntiControlloParabrezzaX5 = [[0,1.3],[2.2,1.3],[2.3,1.4],[2.3,1.4]]
curvaParabrezzaX5 = MAP(Bezier(puntiControlloParabrezzaX5))(Dom1D)

puntiControlloParabrezzaX6 = [[0,1],[0.4,1]]
curvaParabrezzaX6 = POLYLINE(puntiControlloParabrezzaX6)

puntiControlloParabrezzaX7 = [[0,0.7],[0.6,0.7],[0.6,0.5],[0,0.5]]
curvaParabrezzaX7 = POLYLINE(puntiControlloParabrezzaX7)

puntiControlloParabrezzaX8 = [[0.4,1],[0.5,0.5],[1.4,0.6],[2.1,0.4]]
curvaParabrezzaX8 =  MAP(Bezier(puntiControlloParabrezzaX8))(Dom1D)

puntiControlloParabrezzaX9 = [[2.1,0.4],[2.25,0.6],[2.55,1.8],[1.9,2.2]]
curvaParabrezzaX9 =  MAP(Bezier(puntiControlloParabrezzaX9))(Dom1D)


puntiControlloParabrezzaX10 = [[0.6,0.9],[0.5,1.2],[2,1.2],[1.9,0.9]]
curvaParabrezzaX10 =  MAP(Bezier(puntiControlloParabrezzaX10))(Dom1D)

puntiControlloParabrezzaX11 = [[0.6,0.9],[0.5,0.7],[2,0.7],[1.9,0.9]]
curvaParabrezzaX11 =  MAP(Bezier(puntiControlloParabrezzaX11))(Dom1D)

puntiControlloParabrezzaX12 = [[1.6,0.77],[1.2,0.8],[1.4,0.9],[1.7,1.1]]
curvaParabrezzaX12 =  MAP(Bezier(puntiControlloParabrezzaX12))(Dom1D)

puntiControlloParabrezzaX13 = [[1.5,1.5],[1.6,1.9],[1.9,2],[2.1,1.8]]
curvaParabrezzaX13 =  MAP(Bezier(puntiControlloParabrezzaX13))(Dom1D)

puntiControlloParabrezzaX14 = [[1.5,1.5],[1.8,1.5],[2.2,1.6],[2.1,1.8]]
curvaParabrezzaX14 =  MAP(Bezier(puntiControlloParabrezzaX14))(Dom1D)

puntiControlloParabrezzaX15 = [[1.6,0.6],[2.1,0.6],[2.3,1.3],[2.3,1.4]]
curvaParabrezzaX15 =  POLYLINE(puntiControlloParabrezzaX15)


puntiControlloParabrezzaX16 = [[1.9,0.42],[1.9,0.3]]
curvaParabrezzaX16 =  POLYLINE(puntiControlloParabrezzaX16)


puntiControlloParabrezzaX17 = [[2.3,1.4],[2.3,0.3]]
curvaParabrezzaX17 =  POLYLINE(puntiControlloParabrezzaX17)

puntiControlloParabrezzaX18 = [[2.3,0.3],[2.3,0.2],[1.9,0.2],[1.9,0.3]]
curvaParabrezzaX18= MAP(Bezier(puntiControlloParabrezzaX18))(Dom1D)


puntiControlloParabrezzaX19 = [[1.6,0.6],[2.15,0.55],[2.3,1.28],[2.3,1.38]]
curvaParabrezzaX19 =  POLYLINE(puntiControlloParabrezzaX19)


puntiControlloParabrezzaX20 = [[1.9,2.2],[2.3,2.2],[2.9,2.6],[2.3,2.35]]
curvaParabrezzaX20 =  POLYLINE(puntiControlloParabrezzaX20)

puntiSpecchietto0 = [[5.5,6],[6.5,6.5],[2,0],[0,1]]
specchietto0 = creaCurvaHermite(puntiSpecchietto0)
puntiSpecchietto1 = [[6.5,6.5],[5.8,6.7],[0,1],[-1,0]]
specchietto1 = creaCurvaHermite(puntiSpecchietto1)
puntiSpecchietto2 = [[5.8,6.7],[5.45,6.2],[-2,0],[-0.5,0]]
specchietto2 = creaCurvaHermite(puntiSpecchietto2)

specchietti = S([1,2,3])([0.5,0.5,0.5])(T([1,2])([-1.7,-1.6])(STRUCT([specchietto0,specchietto1,specchietto2])))


dominioFari0 = INTERVALS(2*PI)(32)
dominioFari1 = INTERVALS(PI+0.5)(32)
farettiAnt0 = T([1,2])([1.85,1.75])(MAP(creaEllisse(0.09,0.09))(dominioFari0))
farettiAnt1 = T([1,2])([1.85,1.75])(MAP(creaEllisse(0.1,0.1))(dominioFari0))
farettiAnt2 = T([1,2])([1.93,1.75])(R([1,2])(PI/10)(MAP(creaEllisse(0.09,0.09))(dominioFari1)))
farettiAnt3 = T([1,2])([1.93,1.75])(R([1,2])(PI/10)(MAP(creaEllisse(0.1,0.1))(dominioFari1)))
far = STRUCT([farettiAnt0,farettiAnt1,farettiAnt2,farettiAnt3])

parabrezzaX = STRUCT([curvaParabrezzaX0,curvaParabrezzaX1,curvaParabrezzaX2,
                      curvaParabrezzaX3,curvaParabrezzaX4,curvaParabrezzaX5,
                      curvaParabrezzaX6,curvaParabrezzaX7,curvaParabrezzaX8,
                      curvaParabrezzaX9,curvaParabrezzaX10,curvaParabrezzaX11,
                      curvaParabrezzaX12,curvaParabrezzaX13,curvaParabrezzaX14,
                      far,curvaParabrezzaX15,curvaParabrezzaX16,
                      curvaParabrezzaX17,curvaParabrezzaX18,curvaParabrezzaX19,
                      specchietti
                      
                      ])

modelloX0 = STRUCT([parabrezzaX])
modelloX1 = R([1,3])(PI)(modelloX0)

modelloX = COLOR(BLACK)(STRUCT([modelloX0,modelloX1]))

#----------------------------------------------------------------------






#-------------------------------Vista dall'alto (piano y)---------------

puntiControlloY0 = [[0,5.6],[0.95,5.8],[2.35,4.85],[2.3,3.7]]
curvaParabrezzaY0= MAP(Bezier(puntiControlloY0))(Dom1D)

puntiControlloY1 = [[0,5.8],[0.95,5.8],[2.4,5],[2.3,3.7]]
curvaParabrezzaY1= MAP(Bezier(puntiControlloY1))(Dom1D)

puntiControlloY2 = [[0,5.25],[0.45,5.25],[0.55,5.45],[1.45,2.25]]
curvaParabrezzaY2= MAP(Bezier(puntiControlloY2))(Dom1D)

puntiControlloY3 = [[0,0.6],[0.5,0.65],[1,0.65],[1.35,0.5]]
curvaParabrezzaY3= Bezier(puntiControlloY3)

puntiControlloY4 = [[0,2.7],[1.9,2.5],[2,1.85],[1.35,0.5]]
curvaParabrezzaY4= Bezier(puntiControlloY4)


#----------------------Esercizio 5 Superfice----------------------------
domSurf = GRID([20,20])
surface = BEZIER(S2)([curvaParabrezzaY3,curvaParabrezzaY4])
mapSurface0 = MAP(surface)(domSurf)



mapSurface1 = R([1,3])(PI)(mapSurface0)

mapSurface = T([2,3])([4,6])(R([2,3])(-PI/2)(COLOR(BLACK)(STRUCT([mapSurface0,mapSurface1]))))

#-----------------------------------------------------------------------


puntiControlloY5 = [[2.3,3.65],[2.3,1.5]]
curvaParabrezzaY5=  POLYLINE(puntiControlloY5)

puntiControlloY6 = [[2.3,1],[2.3,-3.4]]
curvaParabrezzaY6=  POLYLINE(puntiControlloY6)

puntiControlloY7 = [[2.3,-3.4],[2.4,-4.7],[2.3,-5.2],[2.1,-5.45]]
curvaParabrezzaY7=  MAP(Bezier(puntiControlloY7))(Dom1D)

puntiControlloY8 = [[2.1,-5.45],[1.2,-5.75],[1.9,-5.6],[0,-5.8]]
curvaParabrezzaY8=  MAP(Bezier(puntiControlloY8))(Dom1D)

puntiControlloY9 = [[0,-5.5],[1,-5.5]]
curvaParabrezzaY9=  POLYLINE(puntiControlloY9)

puntiControlloY10 = [[0,-1.9],[1.25,-1.85],[1.55,-2.35],[1,-5.5]]
curvaParabrezzaY10=  MAP(Bezier(puntiControlloY10))(Dom1D)

puntiControlloY11 = [[0,-5],[0.5,-5],[0.8,-5],[1.1,-4.9]]
curvaParabrezzaY11=  MAP(Bezier(puntiControlloY11))(Dom1D)

puntiControlloY12 = [[0.7,-2],[1.1,-3.2],[1.1,-3.9],[0.7,-5]]
curvaParabrezzaY12=  MAP(Bezier(puntiControlloY12))(Dom1D)


puntiControlloY13 = [[1.7,4.15],[2,3.75],[2.25,4],[1.9,4.7]]
curvaParabrezzaY13=  T([1])(-0.3)(MAP(Bezier(puntiControlloY13))(Dom1D))

puntiControlloY14 = [[1.7,4.15],[1.7,4.5],[1.5,5],[1.9,4.7]]
curvaParabrezzaY14=  T([1])(-0.3)(MAP(Bezier(puntiControlloY14))(Dom1D))

puntiControlloY15 = [[1.5,-5.5],[1.6,-4.7],[1.6,-3.4],[2.1,-2.8]]
curvaParabrezzaY15=  T([1])(-0.3)(MAP(Bezier(puntiControlloY15))(Dom1D))

puntiControlloY16 = [[2.1,-2.8],[2.1,-3.9],[2.4,-3.35],[2.6,-1.4]]
curvaParabrezzaY16 =  T([1])(-0.3)(MAP(Bezier(puntiControlloY16))(Dom1D))

puntiControlloY17 = [[1.75,-2.5],[1.6,-0.1],[2,0.6],[2.3,1.6]]
curvaParabrezzaY17 =  T([1])(-0.3)(MAP(Bezier(puntiControlloY17))(Dom1D))


puntiControlloY18 = [[1.75,-2.5],[2.1,-0.5],[2.8,0.6],[2.3,1.6]]
curvaParabrezzaY18 =  T([1])(-0.3)(MAP(Bezier(puntiControlloY18))(Dom1D))


#ATTENZIONE HO ELIMINATO DALLA STRUCT curvaParabrezzaY3,curvaParabrezzaY4 PER FARE LA SURFACE

vistaAlta = STRUCT([
                    curvaParabrezzaY0,curvaParabrezzaY1,curvaParabrezzaY2,
                    curvaParabrezzaY5,
                    curvaParabrezzaY6,curvaParabrezzaY7,curvaParabrezzaY8,
                    curvaParabrezzaY9,curvaParabrezzaY10,curvaParabrezzaY11,
                    curvaParabrezzaY12,curvaParabrezzaY13,curvaParabrezzaY14,
                    curvaParabrezzaY15,curvaParabrezzaY16,curvaParabrezzaY17,
                    curvaParabrezzaY18
                                        
                    ])

modelloY0 = STRUCT([vistaAlta])
modelloY1 = R([1,3])(PI)(modelloY0)

modelloY = STRUCT([modelloY0,modelloY1])
modelloYRuotato = R([2,3])(PI)(R([2,3])(PI/2)(modelloY))
modelloYTraslato = COLOR(BLACK)(T([2,3])([4,6])(modelloYRuotato))
#----------------------------------------------------------------------









#radius[raggio_esterno,raggio_interno]
def creaPneumatico(radius):
    pneumatic = TORUS(radius)([32,32])
    pneumaticBlack = COLOR(BLACK)(pneumatic)
    return pneumaticBlack



def creaCerchione(alpha, r , R):
    dom= PROD([INTERVALS(alpha)(36), T(1)(r)(INTERVALS(R-r)(1))])
    def mapping(v):
        a=v[0]
        r=v[1]
        return [r*COS(a), r*SIN(a)]
    model=MAP(mapping)(dom)
    return model

def ruotaEReplicaOggetto(numeroOggetti2Ruotare,oggetto):
    rotazione = R([1,2])((2*PI)/numeroOggetti2Ruotare)
    oggetti = STRUCT(NN(numeroOggetti2Ruotare)([rotazione,oggetto]))
    return oggetti

Dom1D = GRID([20])
Dom2D = GRID([20,20])
Bezier = BEZIER(S1)

pneumatico = creaPneumatico([0.8,1.1])
cerchione = T([3])([-0.1])(COLOR(GRAY)(PROD([creaCerchione(2*PI,0.75,0.85),Q(0.15)])))

punto0 =[[5,1],[5.5,2],[5.5,4],[5,5]]
curva0 = Bezier(punto0)

punto1 =[[7,1],[6.5,2],[6.5,4],[7,5]]
curva1 = Bezier(punto1)

punto2 =[[5,1],[7,1]]
curva2 = POLYLINE(punto2)

punto3 =[[5,5],[7,5]]
curva3 = POLYLINE(punto3)

perno = T([3])(-0.1)(COLOR(GRAY)(CYLINDER([0.2,0.2])(32)))


#rim = S([1,2,3])([0.15,0.15,0.15])(T([1,2])([-6,-0.3])(STRUCT([curva0,curva1,curva2,curva3])))
#rims = ruotaEReplicaOggetto(5,rim)

bullone = T([2,3])([0.15,0.08])(COLOR(BLACK)(CYLINDER([0.03,0.03])(32)))
bulloni = ruotaEReplicaOggetto(5,bullone)


superfici = BEZIER(S2)([curva0,curva1])

mapSuperfici = S([1,2,3])([0.15,0.15,0.15])(T([1,2])([-6,-0.3])(MAP(superfici)(Dom2D)))

rims =  ruotaEReplicaOggetto(5,mapSuperfici)


ruotaAnt = T([1,2,3])([-4.75,1,4.2])(R([1,3])(PI/2)(STRUCT([pneumatico,rims,cerchione,perno,bulloni])))
ruotaAntScalata = S([1,2,3])([0.7,0.7,0.7])(ruotaAnt)
ruotaPost = T([3])([5.75])(ruotaAntScalata)

ruote = STRUCT([ruotaAntScalata,ruotaPost])







Dom1D = GRID([20])
Dom2D = GRID([20,20])
Bezier = BEZIER(S1)

esternoVolante = creaPneumatico([6,5.2])
parteGialla = T([1,2])([0.5,5.55])(R([1,3])(PI/2)(COLOR(YELLOW)(CYLINDER([0.45,0.45])(32))))
pernoCentrale = T([3])(-0.25)(COLOR(BLACK)(CYLINDER([1.25,0.5])(32)))
bullone = T([2,3])([0.9,0.25])(COLOR(GRAY)(CYLINDER([0.1,0.1])(32)))
bulloni = ruotaEReplicaOggetto(6,bullone)


puntiControlloVetro0 = [[1,2],[1.66,3,5],[6,2.33],[6,2.33]]
curvaVolante0 = Bezier(puntiControlloVetro0)

puntiControlloVetro1 = [[1,4],[1.66,3,5],[6,3.6],[6,3.66]]
curvaVolante1 = Bezier(puntiControlloVetro1)

bullonciniVolant0 = T([1])([-2.25])(COLOR(WHITE)(CYLINDER([0.35,0.1])(32)))
bullonciniVolant1 = T([1])([-3.5])(COLOR(WHITE)(CYLINDER([0.25,0.1])(32)))

superficeVolante = BEZIER(S2)([curvaVolante0,curvaVolante1])
mapSuperficeVolante = T([1,2])([-6.19,-3])(COLOR(BLACK)(MAP(superficeVolante)(Dom2D)))

superficeVolante0 = STRUCT([mapSuperficeVolante,bullonciniVolant0,bullonciniVolant1])

superficeVolante1 = R([1,3])(PI)(mapSuperficeVolante)

bullonciniVolant2 = T([1])([2.25])(COLOR(WHITE)(CYLINDER([0.35,0.1])(32)))
bullonciniVolant3 = T([1])([3.5])(COLOR(WHITE)(CYLINDER([0.25,0.1])(32)))

latoDX = STRUCT([superficeVolante1,bullonciniVolant2,bullonciniVolant3])


superficeVolante2 = R([1,2])(PI+(PI/2))(superficeVolante1)
bullonciniVolant3 = T([2])([-2.25])(COLOR(WHITE)(CYLINDER([0.35,0.1])(32)))
bullonciniVolant4 = T([2])([-3.5])(COLOR(WHITE)(CYLINDER([0.25,0.1])(32)))

latoSotto = STRUCT([superficeVolante2,bullonciniVolant3,bullonciniVolant4])



volante = S([1,2,3])([0.1,0.1,0.1])(STRUCT([esternoVolante,parteGialla,pernoCentrale,bulloni,superficeVolante0,latoDX,latoSotto]))
volanteTraslato = T([1,2,3])([-1.5,1.75,5])(volante)






modello = COLOR(WHITE)(STRUCT([modelloX,macchinaFrontTraslata,modelloYTraslato,ruote,volanteTraslato,mapSurface]))
VIEW(modello)

