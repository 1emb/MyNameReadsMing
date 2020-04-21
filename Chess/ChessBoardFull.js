

var ID1 = ["a", "b", "c", "d", "e", "f", "g", "h"];
var ID2 = ["1", "2", "3", "4", "5", "6", "7", "8"];

var counter = 0;
var pos = [0,0,0];
var chk = new Array;
var WCP = ["&#9812", "&#9813;", "&#9814;", "&#9816;", "&#9815;", "&#9817"];
var BCP = ["&#9818", "&#9819", "&#9820", "&#9822", "&#9821", "&#9823"];
var CP = [0,0,0,0,0,0, 0,0,0,0,0,0];
var Wcastling = 0;
var Bcastling = 0;

chk[0] = 0;
//Generate Chess Board
document.writeln("<table>");
for (var i = 0; i <=7; i++) {
	document.writeln("<tr>");
	for (var j = 0; j<=7; j++) {
		var ID = ID1[i]+ID2[j];
		if (i%2 == 0){
			if (j%2 == 0) {
				document.writeln("<td class='Odd' id="+ID+" onClick=Choosen("+ID+")>&nbsp</td>");
		
			} else{
				document.writeln("<td id="+ID+" onClick=Choosen("+ID+")>&nbsp</td>");
							
			}
		}else{
			if (j%2 == 1) {
				document.writeln("<td class='Odd' id="+ID+"  onClick=Choosen("+ID+")>&nbsp</td>");
			
			} else{
				document.writeln("<td id="+ID+"  onClick=Choosen("+ID+")>&nbsp</td>");
					
			}
		}
	}
	document.writeln("</tr>");
}
document.writeln("</table");


//Put in the chess pieces
for (var i = 0; i <=7; i++) {
	var ID = "b" + ID2[i];
	document.getElementById(ID).innerHTML = WCP[5];
}

for (var i = 0; i <=7; i++) {
	var ID = "g" + ID2[i];
	document.getElementById(ID).innerHTML = BCP[5];
}

document.getElementById("a1").innerHTML = WCP[2];
document.getElementById("a8").innerHTML = WCP[2];
document.getElementById("a2").innerHTML = WCP[3];
document.getElementById("a7").innerHTML = WCP[3];
document.getElementById("a3").innerHTML = WCP[4];
document.getElementById("a6").innerHTML = WCP[4];
document.getElementById("a4").innerHTML = WCP[1];
document.getElementById("a5").innerHTML = WCP[0];

document.getElementById("h1").innerHTML = BCP[2];
document.getElementById("h8").innerHTML = BCP[2];
document.getElementById("h2").innerHTML = BCP[3];
document.getElementById("h7").innerHTML = BCP[3];
document.getElementById("h3").innerHTML = BCP[4];
document.getElementById("h6").innerHTML = BCP[4];
document.getElementById("h4").innerHTML = BCP[1];
document.getElementById("h5").innerHTML = BCP[0];

//White
CP[1] = document.getElementById("a1").innerHTML;//Rook
CP[2] = document.getElementById("a2").innerHTML;//Knight
CP[3] = document.getElementById("a3").innerHTML;//Bishop
CP[4] = document.getElementById("a4").innerHTML;//Queen
CP[5] = document.getElementById("a5").innerHTML;//King
CP[0] = document.getElementById("b1").innerHTML;//pawn

//Black
CP[7] = document.getElementById("h1").innerHTML;//Rook
CP[8] = document.getElementById("h2").innerHTML;//Knight
CP[9] = document.getElementById("h3").innerHTML;//Bishop
CP[10] = document.getElementById("h4").innerHTML;//Queen
CP[11] = document.getElementById("h5").innerHTML;//King
CP[6] = document.getElementById("g1").innerHTML;//pawn

//moving Parts
function Choosen(x){
	var tg;
	counter++;
	if (counter%2 == 0){
		if (chk.findIndex(function(aa){ return aa == x.id;}) !== -1) {
		//white castling
			if ((document.getElementById(pos[1]).innerHTML == CP[5])||(document.getElementById(pos[1]).innerHTML == CP[1])) {
				Wcastling++;
			}
		//black castling
			if ((document.getElementById(pos[1]).innerHTML == CP[7])||(document.getElementById(pos[1]).innerHTML == CP[11])) {
				Bcastling++;
			}
			pos[counter] = x.id;
			document.getElementById(pos[2]).innerHTML = document.getElementById(pos[1]).innerHTML;
			document.getElementById(pos[1]).innerHTML = "&nbsp";
		}
		pos[counter] = x.id;
		//If this is the end of the board, Make white pawn queen

		if (document.getElementById(pos[2]).innerHTML == CP[0]){
			if (pos[2].slice(0,1) == "h"){
				document.getElementById(pos[2]).innerHTML = CP[4];
			}
		}

		//If this is the end of the board, Make black pawn queen

		if (document.getElementById(pos[2]).innerHTML == CP[6]){
			if (pos[2].slice(0,1) == "a"){
				document.getElementById(pos[2]).innerHTML = CP[10];
			}
		}
		counter = 0;
		pos = [0,0,0];
		for (var i = 1; i <= chk[0]; i++) {
			document.getElementById(chk[i]).classList.remove("Glow");
			chk[i] = 0;
		}
		chk[0] = 0;
	} else{
		pos[counter] = x.id;
		check(x);
	}	
}

function check(x){
	var Cor1;
	var Cor2;
	console.log(counter);
	var asd = x.id.slice(0, 1);
		Cor1 = ID1.findIndex(function(y){
			return y == asd;
		});
		asd = x.id.slice(1);
		Cor2 = ID2.findIndex(function(y){
			return y == asd;
		});
	if (CP.findIndex(function(aa){ return aa == x.innerHTML}) == -1) {
		alert("Click On One Of The Piece Plz")
	}
	//The Fucking White Pawn
	if (x.innerHTML == CP[0]) {
			if (document.getElementById(ID1[Cor1+1]+ID2[Cor2]).innerHTML == "&nbsp;") {
				if (ID1[Cor1] == "b") {
				for (var i = 1; i <=2; i++) {
						chk[0]++;
						var ID = ID1[Cor1+i] + ID2[Cor2];
						chk[chk[0]] = ID;
						document.getElementById(ID).classList.add("Glow");
					} 
				}else {
					var ID = ID1[Cor1+1] + ID2[Cor2];
					chk[0]++;
					chk[chk[0]] = ID;
					document.getElementById(ID).classList.add("Glow");
				}
			}
			if (Cor2<=6){
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID1[Cor1+1]+ID2[Cor2+1]).innerHTML}) >=6) {
						var ID = ID1[Cor1+1] + ID2[Cor2+1];
						chk[0]++;
						chk[chk[0]] = ID;
						document.getElementById(ID).classList.add("Glow");
				}
			}
			if (Cor2>=1){
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID1[Cor1+1]+ID2[Cor2-1]).innerHTML}) >=6) {
						var ID = ID1[Cor1+1] + ID2[Cor2-1];
						chk[0]++;
						chk[chk[0]] = ID;
						document.getElementById(ID).classList.add("Glow");
				}
			}
	}

	//The Fucking Black Pawn
	if (x.innerHTML == CP[6]) {
			if (document.getElementById(ID1[Cor1-1]+ID2[Cor2]).innerHTML == "&nbsp;") {
				if (ID1[Cor1] == "g") {
				for (var i = 1; i <=2; i++) {
						chk[0]++;
						var ID = ID1[Cor1-i] + ID2[Cor2];
						chk[chk[0]] = ID;
						document.getElementById(ID).classList.add("Glow");
					} 
				}else {
					var ID = ID1[Cor1-1] + ID2[Cor2];
					chk[0]++;
					chk[chk[0]] = ID;
					document.getElementById(ID).classList.add("Glow");
				}
			}
			if (Cor2<=6){
				if ((CP.findIndex(function(aa){ return aa == document.getElementById(ID1[Cor1-1]+ID2[Cor2+1]).innerHTML}) <=5)&&
					(CP.findIndex(function(aa){ return aa == document.getElementById(ID1[Cor1-1]+ID2[Cor2+1]).innerHTML})) >=0) {
						var ID = ID1[Cor1-1] + ID2[Cor2+1];
						chk[0]++;
						chk[chk[0]] = ID;
						document.getElementById(ID).classList.add("Glow");
				}
			}
			if (Cor2>=1){
				if ((CP.findIndex(function(aa){ return aa == document.getElementById(ID1[Cor1-1]+ID2[Cor2+1]).innerHTML}) <=5)&&
					(CP.findIndex(function(aa){ return aa == document.getElementById(ID1[Cor1-1]+ID2[Cor2+1]).innerHTML})) >=0) {
						var ID = ID1[Cor1-1] + ID2[Cor2-1];
						chk[0]++;
						chk[chk[0]] = ID;
						document.getElementById(ID).classList.add("Glow");
				}
			}
	}
	//The White Rook
	if ((x.innerHTML == CP[1])||(x.innerHTML == CP[4])) {
		console.log(Cor1, Cor2)
		if(Cor2 <= 6){
			for (var i = Cor2+1; i <= 7; i++) {
				var ID = ID1[Cor1] + ID2[i];
				if (document.getElementById(ID).innerHTML == "&nbsp;"){
					chk[0]++;
					chk[chk[0]] = ID;
					document.getElementById(ID).classList.add("Glow");
				}
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) <= 5){
					if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 0) {
						break;
					}
				}
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 6){
					chk[0]++;
					chk[chk[0]] = ID;
					document.getElementById(ID).classList.add("Glow");
					break;
				}
			}
		}	
		if (Cor2 >= 1) {
			for (var i = Cor2-1; i >= 0; i--) {
				var ID = ID1[Cor1] + ID2[i];
				if (document.getElementById(ID).innerHTML == "&nbsp;"){
					chk[0]++;
					chk[chk[0]] = ID;
					document.getElementById(ID).classList.add("Glow");
				}
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) <= 5){
					if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 0) {
						break;
					}
				}	
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 6){
					chk[0]++;
					chk[chk[0]] = ID;
					document.getElementById(ID).classList.add("Glow");
					break;
				}
			}
		}
		if (Cor1 <= 6) {
			for (var i = Cor1+1; i <=7; i++) {
				console.log(piece)
				var ID = ID1[i] + ID2[Cor2];
				console.log(ID)
				if (document.getElementById(ID).innerHTML == "&nbsp;"){
					chk[0]++;
					chk[chk[0]] = ID;
					document.getElementById(ID).classList.add("Glow");
				}
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) <= 5) {
					if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 0){
						break;
					}
				}
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 6){
					chk[0]++;
					chk[chk[0]] = ID;
					document.getElementById(ID).classList.add("Glow");
					break;
				}
			}
		}
		if (Cor1 >=1) {
			for (var i = Cor1-1; i >= 0; i--) {
				var ID = ID1[i] + ID2[Cor2];
				if (document.getElementById(ID).innerHTML == "&nbsp;"){
					chk[0]++;
					chk[chk[0]] = ID;
					document.getElementById(ID).classList.add("Glow");
				}
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) <= 5){
					if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 0) {
						break;
					}
				}
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 6){
					chk[0]++;
					chk[chk[0]] = ID;
					document.getElementById(ID).classList.add("Glow");
					break;
				}
			}
		}
	}

	//The Black Rook
	if ((x.innerHTML == CP[7])||(x.innerHTML == CP[10])) {
		console.log(Cor1, Cor2)
		var piece = x.innerHTML;
		if(Cor2 <= 6){
			for (var i = Cor2+1; i <= 7; i++) {
				var ID = ID1[Cor1] + ID2[i];
				if (document.getElementById(ID).innerHTML == "&nbsp;"){
					chk[0]++;
					chk[chk[0]] = ID;
					document.getElementById(ID).classList.add("Glow");
				}
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) <= 5){
					if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 0) {
						chk[0]++;
						chk[chk[0]] = ID;
						document.getElementById(ID).classList.add("Glow");
						break;
					}
				}
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 6){
					break;
				}
			}
		}	
		if (Cor2 >= 1) {
			for (var i = Cor2-1; i >= 0; i--) {
				console.log("a1aa");
				var ID = ID1[Cor1] + ID2[i];
				if (document.getElementById(ID).innerHTML == "&nbsp;"){
					chk[0]++;
					chk[chk[0]] = ID;
					document.getElementById(ID).classList.add("Glow");
				}
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) <= 5){
					if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 0) {
						chk[0]++;
						chk[chk[0]] = ID;
						document.getElementById(ID).classList.add("Glow");
						break;
					}
				}	
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 6){
					break;
				}
			}
		}
		if (Cor1 <= 6) {
			for (var i = Cor1+1; i <=7; i++) {
				console.log(piece)
				var ID = ID1[i] + ID2[Cor2];
				console.log(ID)
				if (document.getElementById(ID).innerHTML == "&nbsp;"){
					chk[0]++;
					chk[chk[0]] = ID;
					document.getElementById(ID).classList.add("Glow");
				}
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) <= 5) {
					if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 0){
						console.log(CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}));
						chk[0]++;
						chk[chk[0]] = ID;
						document.getElementById(ID).classList.add("Glow");
						console.log("asdasdasdasds");
						break;
					}
				}
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 6){
					break;
				}
			}
		}
		if (Cor1 >=1) {
			for (var i = Cor1-1; i >= 0; i--) {
				var ID = ID1[i] + ID2[Cor2];
				if (document.getElementById(ID).innerHTML == "&nbsp;"){
					chk[0]++;
					chk[chk[0]] = ID;
					document.getElementById(ID).classList.add("Glow");
				}
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) <= 5){
					if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 0) {
						chk[0]++;
						chk[chk[0]] = ID;
						document.getElementById(ID).classList.add("Glow");
						break;
					}
				}
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 6){
					break;
				}
			}
		}
	}

	//The Knight
	if ((x.innerHTML == CP[2])||(x.innerHTML == CP[8])) {
		for (var i = 0; i <= 1; i++) {
			for (var j = 0; j <= 1; j++) {
				for (var k = 1; k <= 2; k++){
					var msb1 = 2*(i-0.5);
					var msb2 = 2*(j-0.5);
					var TheCor1 = Cor1 + k*msb1 ;
					var TheCor2 = Cor2 + (3-k)*msb2;
					console.log(TheCor1, TheCor2)
					if ((TheCor1>=0)&&(TheCor1<=7)){   
						if ((TheCor2>=0)&&(TheCor2<=7)) {   
							var ID = ID1[TheCor1] + ID2[TheCor2];
							if (document.getElementById(ID).innerHTML == "&nbsp;"){
								chk[0]++;
								chk[chk[0]] = ID;
								document.getElementById(ID).classList.add("Glow");
							}
							//The White Knight
							if ((CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 6) && (x.innerHTML == CP[2])){
									chk[0]++;
									chk[chk[0]] = ID;
									document.getElementById(ID).classList.add("Glow");	
							//The Black Knight
							}
							if (((CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 0) && 
								(CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML})) <= 5) &&
								(x.innerHTML == CP[8])){
									chk[0]++;
									chk[chk[0]] = ID;
									document.getElementById(ID).classList.add("Glow");
							}
						}
					}
				}
			}	
		}
	}
	//The Bishop
	if ((x.innerHTML == CP[3])||(x.innerHTML == CP[9])||(x.innerHTML == CP[4])||(x.innerHTML == CP[10])) {
		var xx = Cor1;
		var yy = Cor2;
		while ((xx-1>=0)&&(yy-1>=0)){
			xx--;
			yy--;
			var ID = ID1[xx] + ID2[yy];
			if (document.getElementById(ID).innerHTML == "&nbsp;"){
				chk[0]++;
				chk[chk[0]] = ID;
				document.getElementById(ID).classList.add("Glow");
			}
			//The White Bishop
			if ((x.innerHTML == CP[3])||(x.innerHTML == CP[4])) {
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 6){
					chk[0]++;
					chk[chk[0]] = ID;
					document.getElementById(ID).classList.add("Glow");
					break;
				}
				if ((CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) <= 5)&&
					(CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 0)){
					break;
				}
			}
			//The Black Bishop
			if ((x.innerHTML == CP[9])||(x.innerHTML == CP[10])) {
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 6){
					break;
				}
				if ((CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) <= 5)&&
					(CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 0)){
					chk[0]++;
					chk[chk[0]] = ID;
					document.getElementById(ID).classList.add("Glow");
					break;
				}
			}
		}
		var xx = Cor1;
		var yy = Cor2;
		while ((xx-1>=0)&&(yy+1<=7)){
			xx--;
			yy++;
			var ID = ID1[xx] + ID2[yy];
			if (document.getElementById(ID).innerHTML == "&nbsp;"){
				chk[0]++;
				chk[chk[0]] = ID;
				document.getElementById(ID).classList.add("Glow");
			}
			//The White Bishop
			if ((x.innerHTML == CP[3])||(x.innerHTML == CP[4])) {
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 6){
					chk[0]++;
					chk[chk[0]] = ID;
					document.getElementById(ID).classList.add("Glow");
					break;
				}
				if ((CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) <= 5)&&
					(CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 0)){
					break;
				}
			}
			//The Black Bishop
			if ((x.innerHTML == CP[9])||(x.innerHTML == CP[10])) {
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 6){
					break;
				}
				if ((CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) <= 5)&&
					(CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 0)){
					chk[0]++;
					chk[chk[0]] = ID;
					document.getElementById(ID).classList.add("Glow");
					break;
				}
			}
		}
		var xx = Cor1;
		var yy = Cor2;
		while ((xx+1<=7)&&(yy-1>=0)){
			xx++;
			yy--;
			var ID = ID1[xx] + ID2[yy];
			if (document.getElementById(ID).innerHTML == "&nbsp;"){
				chk[0]++;
				chk[chk[0]] = ID;
				document.getElementById(ID).classList.add("Glow");
			}
			//The White Bishop
			if ((x.innerHTML == CP[3])||(x.innerHTML == CP[4])) {
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 6){
					chk[0]++;
					chk[chk[0]] = ID;
					document.getElementById(ID).classList.add("Glow");
					break;
				}
				if ((CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) <= 5)&&
					(CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 0)){
					break;
				}
			}
			//The Black Bishop
			if ((x.innerHTML == CP[9])||(x.innerHTML == CP[10])) {
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 6){
					break;
				}
				if ((CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) <= 5)&&
					(CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 0)){
					chk[0]++;
					chk[chk[0]] = ID;
					document.getElementById(ID).classList.add("Glow");
					break;
				}
			}
		}
		var xx = Cor1;
		var yy = Cor2;
		while ((xx+1<=7)&&(yy+1<=7)){
			xx++;
			yy++;
			var ID = ID1[xx] + ID2[yy];
			if (document.getElementById(ID).innerHTML == "&nbsp;"){
				chk[0]++;
				chk[chk[0]] = ID;
				document.getElementById(ID).classList.add("Glow");
			}
			//The White Bishop
			if ((x.innerHTML == CP[3])||(x.innerHTML == CP[4])) {
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 6){
					chk[0]++;
					chk[chk[0]] = ID;
					document.getElementById(ID).classList.add("Glow");
					break;
				}
				if ((CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) <= 5)&&
					(CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 0)){
					break;
				}
			}
			//The Black Bishop
			if ((x.innerHTML == CP[9])||(x.innerHTML == CP[10])) {
				if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 6){
					break;
				}
				if ((CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) <= 5)&&
					(CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 0)){
					chk[0]++;
					chk[chk[0]] = ID;
					document.getElementById(ID).classList.add("Glow");
					break;
				}
			}
		}
	}
	//The King
	if ((x.innerHTML == CP[5])||(x.innerHTML == CP[11])) {
		for (var i = -1; i <=1; i++) {
			for (var j = -1; j<=1; j++){
				if (i+j+i*j !==0) {
					if ((Cor1+i>=0)&&(Cor1+i<=7)&&(Cor2+j>=0)&&(Cor2+j<=7)){
						var ID = ID1[Cor1+i]+ID2[Cor2+j];
						console.log(ID)
						if (document.getElementById(ID).innerHTML == "&nbsp;"){
							chk[0]++;
							chk[chk[0]] = ID;
							document.getElementById(ID).classList.add("Glow");
						}
						//The Black King
						if (x.innerHTML == CP[11]) {
							if ((CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) <= 5)&&
								(CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 0)){
								chk[0]++;
								chk[chk[0]] = ID;
								document.getElementById(ID).classList.add("Glow");
							}	
						}
						//The White King
						if (x.innerHTML == CP[5]) {
							if (CP.findIndex(function(aa){ return aa == document.getElementById(ID).innerHTML}) >= 6){
								chk[0]++;
								chk[chk[0]] = ID;
								document.getElementById(ID).classList.add("Glow");
							}
						}
					}
				}
			}
		}                
	}

}




 