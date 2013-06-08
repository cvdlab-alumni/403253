//Write a function to export a LAR model, which is a pair (V, FV), 
//where V is an array of points and FV is the compact representation of the 
//characteristic matrix of 2D faces, in the file format OBJ.


FV = [[6,7,8,9],[0,5,8],[0,4,5],[1,2,4,5],[2,4,5,1],[0,8,7], [3,6,7], [1,2,3], [0,1,4]]
V = [[0,6],[0,0,1],[3,0],[6,0],[0,3],[3,3],[6,3,2],[6,6],[3,6]]

modelloLAR = [V,FV];

function changeFormatFile (model){
	var vertici = model[0];
	var facceVertici = model[1];
	var output = "";

	for (var i = 0; i < vertici.length; i++){
			output+= "vertici: ";		
			if(vertici[i][2] !== undefined){
				output+= vertici[i][0]+",  "+vertici[i][1]+",  "+vertici[i][2];
			}
				else{
					output+= vertici[i][0]+",  "+vertici[i][1]+",  0";
				}
			
			output+="\n";
	
		
		
		
	}	
	output+="\n";
	
		for (var i = 0; i < facceVertici.length; i++){
			output+="facceVertici: ";
			for (var j = 0; j < facceVertici[i].length; j++) {
				output+=facceVertici[i][j] + "  ";
			}
		output+="\n";
		}
	return output;

}

changeFormatFile(modelloLAR);
