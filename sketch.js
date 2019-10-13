let cell = [];
let player = "O";
let numRound = 1;
let brainStarted = false;
let count = 0;
let gameover = false;
let startWinnerLine;
let endWinnerLine;
let drawing = false;
let scoreO = 0;
let scoreX = 0;
let freezed = -1;
let finish = false;
let drawResult = false;

//THIS FUNCTION RUNS ONLY 1 TIME AT FIRST
function setup()
{
	//SET SCREEN SIZE
	createCanvas(650, 650);
	//RECTANGLES COORDINATES WILL BE IN IT'S CENTER
	rectMode(CENTER);

	//SET THE BEGIN OF THE GAME
	restart();
}

//THEN THIS FUNCTION RUNS REPEATLY
function draw()
{
	//BACKGROUND COLOR IN RGB IS (64, 64, 64)
	background(64);

	//DRAW WHITE RECT
	fill(255);
	noStroke();
	rect(width/2, height/2+15, 600, 600);

	//DRAW DIVISION LINES
	stroke(0);
	strokeWeight(20);
	line(25+20, 40 + (600/3), width-(25+20), 40 + (600/3));
	line(25+20, 40 + 2*(600/3), width-(25+20), 40 + 2*(600/3));
	line(25 + (600/3), 40+20, 25 + (600/3), height-(10+20));
	line(25 + 2*(600/3), 40+20, 25 + 2*(600/3), height-(10+20));

	//RUN IN EACH CELL TO DRAW THEM
	for(let i=0; i<3; i++)
	{
		for(let j=0; j<3; j++)
		{
			cell[i][j].draw();
		}
	}

	//SET THE SCOREBOARD
	fill(255);
	noStroke();
	textAlign(CENTER);
	textSize(30);
	text("X = " + scoreX + "      O = " + scoreO, width/2, 30);

	//checkFinish();

	//IF SOMEONE WINS
	if(freezed < 0 &&
	   (check(0, 0, 0, 1, 0, 2) ||
	    check(1, 0, 1, 1, 1, 2) ||
	    check(2, 0, 2, 1, 2, 2) ||
	    check(0, 0, 1, 0, 2, 0) ||
	    check(0, 1, 1, 1, 2, 1) ||
	    check(0, 2, 1, 2, 2, 2) ||
	    check(0, 0, 1, 1, 2, 2) ||
	    check(0, 2, 1, 1, 2, 0)))
	{
		//THE CURRENT PLAYER WILL BE THE LOSER
		//BECAUSE AFTER THE MARK FUNCTION IT CHANGES AUTOMATICALLY
		if(player == "X")
		{
			scoreO++;
		}
		else
		{
			scoreX++;
		}

		finish = true;

		//CAUSE THE 'DELAY' WHEN SOMEONE WINS
		freezed = 100;

		//CHECK WHERE IS THE WINNER SEQUENCE
		//AND SET THE WINNER LINE LIMITS
		if(check(0, 0, 0, 1, 0, 2))
		{
			startWinnerLine = createVector(0, 0);
			endWinnerLine = createVector(0, 2);
		}
		else if(check(1, 0, 1, 1, 1, 2))
		{
			startWinnerLine = createVector(1, 0);
			endWinnerLine = createVector(1, 2);
		}
		else if(check(2, 0, 2, 1, 2, 2))
		{
			startWinnerLine = createVector(2, 0);
			endWinnerLine = createVector(2, 2);
		}
		else if(check(0, 0, 1, 0, 2, 0))
		{
			startWinnerLine = createVector(0, 0);
			endWinnerLine = createVector(2, 0);
		}
		else if(check(0, 1, 1, 1, 2, 1))
		{
			startWinnerLine = createVector(0, 1);
			endWinnerLine = createVector(2, 1);
		}
		else if(check(0, 2, 1, 2, 2, 2))
		{
			startWinnerLine = createVector(0, 2);
			endWinnerLine = createVector(2, 2);
		}
		else if(check(0, 0, 1, 1, 2, 2))
		{
			startWinnerLine = createVector(0, 0);
			endWinnerLine = createVector(2, 2);
		}
		else if(check(0, 2, 1, 1, 2, 0))
		{
			startWinnerLine = createVector(0, 2);
			endWinnerLine = createVector(2, 0);
		}
	}
	//DRAW - NO ONE WINS
	else if(!finish && 
			cell[0][0].value!="" &&
	   		cell[0][1].value!="" &&
	   		cell[0][2].value!="" &&
	   		cell[1][0].value!="" &&
	   		cell[1][1].value!="" &&
	   		cell[1][2].value!="" &&
	   		cell[2][0].value!="" &&
	   		cell[2][1].value!="" &&
	   		cell[2][2].value!="")
	{
		drawResult = true;

		//CAUSE THE 'DELAY' WHEN SOMEONE WINS
		freezed = 100;

		finish = true;
	}

	//RUN ONLY WHEN THE RESULT OF THE GAME IS 'DRAW'
	if(drawResult)
	{
		//WRITE 'DRAW' IN THE CENTER OF THE SCREEN
		fill(128);
		stroke(0);
		strokeWeight(3);
		rect(width/2, height/2, 400, 100, 20);
		fill(255);
		noStroke();
		textAlign(CENTER);
		textSize(50);
		text("DRAW", width/2, width/2+20);
	}

	//RUN ALWAYS THAT FREEZED IS GREAT THAN 0
	if(freezed > 0)
	{
		//DECREMENT IN FREEZED
		freezed--;
		
		//IF IT'S NOT DRAWING AT THIS MOMENT
		if(!drawing)
		{
			//WINNER LINE
			stroke(0, 255, 0);
			strokeWeight(10);
			if(startWinnerLine.x != 1000)
			{
				line(cell[startWinnerLine.x][startWinnerLine.y].x, 
					 cell[startWinnerLine.x][startWinnerLine.y].y, 
					 cell[endWinnerLine.x][endWinnerLine.y].x, 
					 cell[endWinnerLine.x][endWinnerLine.y].y);
			}
		}
	}
	//RUN JUST ONE TIME TO RESTART THE GAME
	else if(freezed == 0)
	{
		freezed = -1;
		restart();
	}

	//brain("X");
}

function restart()
{
	//CREATE THE CELL BIDIMENTIONAL ARRAY
	//IF IT ALREADY EXISTS, RESET THE SETS TO DEFAULT
	for(let i=0; i<3; i++)
	{
		cell[i] = [];

		for(let j=0; j<3; j++)
		{
			cell[i][j] = new Cell(i, j);
		}
	}

	//THESE COORDINATES SET THE WINNER LINE LIMITS
	//START WITH (1000,1000) BUT IT'S JUST TO SAY THAT IT'S A VECTOR(COORDINATES)
	startWinnerLine = createVector(1000,1000);
	endWinnerLine = createVector(1000,1000);

	//IT'S NOT THE END AND THE RESULT IS NOT 'DRAW'
	finish = false;
	drawResult = false;
}

// THIS FUNCTION STILL DON'T WORK 
function brain(brainValue)
{
	if(player == brainValue)
	{
		let userValue = (brainValue=="X" ? "O" : "X");

		switch(numRound)
		{
			case 1:
				if(checkAll()){}

				let sum = "";
				
				//ACUMULATE THE CELLS VALUE
				for(let i=0; i<3; i++){
					for(let j=0; j<3; j++){
						sum += cell[i][j].value; } }

				if(sum == "")
				{
					//EMPTY CELLS --> MARK THE CENTER
					brainStarted = true;
					cell[1][1].mark();
				}
				else
				{
					brainStarted = false;
					if(cell[1][1].value == userValue)
					{
						//USER WAS MARKED THE CENTER
						cell[0][2].mark();
					}
					else if(cell[0][0].value == userValue ||
							cell[0][2].value == userValue ||
							cell[2][0].value == userValue ||
							cell[2][2].value == userValue)
					{
						//USER WAS MARKED THE CORNER
						cell[1][1].mark();
					}
					else
					{

					}
				}
				break;

			case 2:
				if(cell[1][1] == brainValue)
				{
					//BRAIN WAS THE FIRST PLAYER
					if(cell[0][1].value == playerValue ||
					   cell[1][0].value == playerValue)
					{
						cell[2][2].mark();
					}
					else if(cell[2][1].value == playerValue ||
					   		cell[1][2].value == playerValue)
					{
						cell[0][0].mark();
					}
					else if(cell[0][0].value == playerValue)
					{
						cell[2][2].mark();
					}
					else if(cell[2][2].value == playerValue)
					{
						cell[0][0].mark();
					}
					else if(cell[0][2].value == playerValue)
					{
						cell[2][0].mark();
					}
					else if(cell[2][0].value == playerValue)
					{
						cell[0][2].mark();
					}
				}
				else
				{

				}
				break;

			case 3:
				break;

			case 4:
				break;

			case 5:
				break;
		}


		let sum = "";

		//ACUMULATE THE CELLS VALUE
		for(let i=0; i<3; i++)
		{
			for(let j=0; j<3; j++)
			{
				sum += cell[i][j].value; 
			} 
		}

		if(sum == "")
		{
			//EMPTY CELLS --> MARK THE CENTER
			cell[1][1].mark();
		}
		else
		{
			//SOME CELLS ARE FILLED
			
		}

		numRound++;
	}
	else
	{
		//WAIT USER
	}
}

// THIS FUNCTION STILL DON'T WORK 
function checkFinish()
{
	let reference = (player=="X" ? "O" : "X");

	// CHECKING ROWS
	for(let i=0; i<3; i++)
	{
		for(let j=0; j<3; j++)
		{
			if (checkGameOver(i, j, reference))
			{
				gameover = true; 
				//return;
			}
		}
        count = 0;
    }

    // CHECKING COLUMNS
	for(let j=0; j<3; j++)
	{
		for(let i=0; i<3; i++)
		{
			if (checkGameOver(i, j, reference))
			{
				gameover = true; 
				//return;
			}
		}
        count = 0;
    }

	// CHECKING DECRESCENT DIAGONALS
    if (checkGameOver(0, 0, reference) ||
    	checkGameOver(1, 1, reference) ||
    	checkGameOver(2, 2, reference))
	{ 
    	gameover = true;
    }

	// CHECKING CRESCENT DIAGONALS
	if (checkGameOver(0, 2, reference) ||
    	checkGameOver(1, 1, reference) ||
    	checkGameOver(2, 0, reference))
	{ 
    	gameover = true;
    }

    count = 0;

	console.log("1 "+startWinnerLine);
	console.log("2 "+endWinnerLine);

    if(gameover)
    {
    	stroke(0, 0, 255);
    	strokeWeight(10);
    	line(startWinnerLine.x, startWinnerLine.y, endWinnerLine.x, endWinnerLine.y);
    	noLoop();
    }
}

// THIS FUNCTION STILL DON'T WORK 
function checkGameOver(col, row, reference)
{
	if (cell[col][row].value == reference)
	{
		count++;

		if (count == 1)
		{
			startWinnerLine = createVector(cell[col][row].x, cell[col][row].y);
		}
		else if (count == 3)
		{
			endWinnerLine = createVector(cell[col][row].x, cell[col][row].y);
			return true;
		}
	}
	else
	{
		count = 0;
	}

	return false;
}

// THIS FUNCTION RETURN TRUE IF THE 3 CELLS HAVE THE SAME VALUE, WITH EMPTY EXCESS 
function check(i1, j1, i2, j2, i3, j3)
{
	return (cell[i1][j1].value != "" &&
			cell[i1][j1].value == cell[i2][j2].value &&
	   		cell[i2][j2].value == cell[i3][j3].value);
}

// THIS FUNCTION STILL DON'T WORK 
function checkAll(arr0)
{
	//CHECK ALL MATCH POSSIBILITIES WITH ROTATIONS AND MIRRORING
	let arr90 = arr0;
	let arr180 = arr0;
	let arr270 = arr0;

	let arr0_Mirror = arr0;
	let arr90_Mirror = arr0;
	let arr180_Mirror = arr0;
	let arr270_Mirror = arr0;

	let spin0 = true;
	let spin90 = true;
	let spin180 = true;
	let spin270 = true;
	let spin0_Mirror = true;
	let spin90_Mirror = true;
	let spin180_Mirror = true;
	let spin270_Mirror = true;

    // SPIN 90
	arr90[0][0] = arr0[2][0];
	arr90[0][1] = arr0[1][0];
	arr90[0][2] = arr0[0][0];
	arr90[1][0] = arr0[2][1];
	arr90[1][1] = arr0[1][1];
	arr90[1][2] = arr0[0][1];
	arr90[2][0] = arr0[2][2];
	arr90[2][1] = arr0[1][2];
	arr90[2][2] = arr0[0][2];

    // SPIN 180
	arr180[0][0] = arr0[2][2];
	arr180[0][1] = arr0[2][1];
	arr180[0][2] = arr0[2][0];
	arr180[1][0] = arr0[1][2];
	arr180[1][1] = arr0[1][1];
	arr180[1][2] = arr0[1][0];
	arr180[2][0] = arr0[0][2];
	arr180[2][1] = arr0[0][1];
	arr180[2][2] = arr0[0][0];

    // SPIN 270
	arr270[2][0] = arr0[0][0];
	arr270[1][0] = arr0[0][1];
	arr270[0][0] = arr0[0][2];
	arr270[2][1] = arr0[1][0];
	arr270[1][1] = arr0[1][1];
	arr270[0][1] = arr0[1][2];
	arr270[2][2] = arr0[2][0];
	arr270[1][2] = arr0[2][1];
	arr270[0][2] = arr0[2][2];

    // MIRROR SPIN 0
	arr0_Mirror[0][0] = arr0[0][0];
	arr0_Mirror[0][1] = arr0[1][0];
	arr0_Mirror[0][2] = arr0[2][0];
	arr0_Mirror[1][0] = arr0[0][1];
	arr0_Mirror[1][1] = arr0[1][1];
	arr0_Mirror[1][2] = arr0[2][1];
	arr0_Mirror[2][0] = arr0[0][2];
	arr0_Mirror[2][1] = arr0[1][2];
	arr0_Mirror[2][2] = arr0[2][2];

    // MIRROR SPIN 90
	arr90_Mirror[0][0] = arr0_Mirror[2][0];
	arr90_Mirror[0][1] = arr0_Mirror[1][0];
	arr90_Mirror[0][2] = arr0_Mirror[0][0];
	arr90_Mirror[1][0] = arr0_Mirror[2][1];
	arr90_Mirror[1][1] = arr0_Mirror[1][1];
	arr90_Mirror[1][2] = arr0_Mirror[0][1];
	arr90_Mirror[2][0] = arr0_Mirror[2][2];
	arr90_Mirror[2][1] = arr0_Mirror[1][2];
	arr90_Mirror[2][2] = arr0_Mirror[0][2];

    // MIRROR SPIN 180
	arr180_Mirror[0][0] = arr0_Mirror[2][2];
	arr180_Mirror[0][1] = arr0_Mirror[2][1];
	arr180_Mirror[0][2] = arr0_Mirror[2][0];
	arr180_Mirror[1][0] = arr0_Mirror[1][2];
	arr180_Mirror[1][1] = arr0_Mirror[1][1];
	arr180_Mirror[1][2] = arr0_Mirror[1][0];
	arr180_Mirror[2][0] = arr0_Mirror[0][2];
	arr180_Mirror[2][1] = arr0_Mirror[0][1];
	arr180_Mirror[2][2] = arr0_Mirror[0][0];

    // MIRROR SPIN 270
	arr270_Mirror[2][0] = arr0_Mirror[0][0];
	arr270_Mirror[1][0] = arr0_Mirror[0][1];
	arr270_Mirror[0][0] = arr0_Mirror[0][2];
	arr270_Mirror[2][1] = arr0_Mirror[1][0];
	arr270_Mirror[1][1] = arr0_Mirror[1][1];
	arr270_Mirror[0][1] = arr0_Mirror[1][2];
	arr270_Mirror[2][2] = arr0_Mirror[2][0];
	arr270_Mirror[1][2] = arr0_Mirror[2][1];
	arr270_Mirror[0][2] = arr0_Mirror[2][2];

	for(let i=0; i<3; i++)
	{
		for(let j=0; j<3; j++)
		{
			if(spin0 && arr0[i][j] != cell[i][j])
			{
				spin0 = false;
			}

			if(spin90 && arr90[i][j] != cell[i][j])
			{
				spin90 = false;
			}

			if(spin180 && arr180[i][j] != cell[i][j])
			{
				spin180 = false;
			}

			if(spin270 && arr270[i][j] != cell[i][j])
			{
				spin270 = false;
			}

			if(spin0_Mirror && arr0_Mirror[i][j] != cell[i][j])
			{
				spin0_Mirror = false;
			}

			if(spin90_Mirror && arr90_Mirror[i][j] != cell[i][j])
			{ 
				spin90_Mirror = false;
			}

			if(spin180_Mirror && arr180_Mirror[i][j] != cell[i][j])
			{
				spin180_Mirror = false;
			}

			if(spin270_Mirror && arr270_Mirror[i][j] != cell[i][j])
			{
				spin270_Mirror = false;
			}
		}
	}


	if(spin0 || spin0_Mirror || 
	   spin90 || spin90_Mirror || 
	   spin180 || spin180_Mirror || 
	   spin270 || spin270_Mirror)
	{
		return true;
	}
	else
	{
		return false;
	}
}

// MOUSE CLICK
function mouseClicked()
{
	//IF NO DRAWING IS IN PROCESS AND NOT IN 'DELAY'
	if(!drawing && freezed <= 0)
	{
		//CHECK THE CLICK IN EACH CELL
		for(let i=0; i<3; i++)
		{
			for(let j=0; j<3; j++)
			{
				if(cell[i][j].x-100<mouseX && cell[i][j].x+100>mouseX &&
				   cell[i][j].y-100<mouseY && cell[i][j].y+100>mouseY)
				{
					cell[i][j].mark();
				}
			}
		}
	}
}

/*
// THIS STILL DON'T WORK 
/// ARTIFICIAL INTELLIGENCE - STRATEGY
https://www.quora.com/Is-there-a-way-to-never-lose-at-Tic-Tac-Toe?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
*/