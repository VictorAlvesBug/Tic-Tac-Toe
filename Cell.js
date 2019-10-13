//A CELL IS EACH OF THE 9 PARTITION OF THE GAME= 
class Cell
{
	constructor(i, j)
	{
		//SET CELL INDEXES
		this.i = i;
		this.j = j;

		//SET CELL POSITION
		this.x = 125 + i*200;
		this.y = 140 + j*200;
		
		//CAN BE "X", "O" OR ""
		this.value = "";
		
		//IT'S TRUE IF THE DRAWING IS IN PROGRESS
		this.changing = false;
		
		//THE DRAWING PERCENT PROGRESS (0 TO 1)
		this.drawedPercent = 0;
	}

	//MOUSE CLICKED IN CELL
	mark()
	{
		//IF CELL IS EMPTY
		if(this.value == "")
		{
			//BEGIN DRAWING PROGRESS
			drawing = true;
			this.changing = true;

			//SET CELL VALUE TO CURRENT PLAYER VALUE
			this.value = player;

			//PLAYER SHIFT BETWEEN "X" AND "O"
			player = (player=="X" ? "O" : "X");
		}
	}

	//DRAW THE CELL 
	draw()
	{
		//SET CELL THICKNESS AND NO FILLED
		strokeWeight(20);
		noFill();

		if(this.value == "X")
		{
			//SET COLOR TO BLUE
			stroke(0, 0, 255);

			//LERP FUNCTION SET 2 LIMIT AND THE PROGRESS OF THE
			//VALUE BETWEEN THEM
			//EXAMPLE:
			// lerp(10, 30, 0.6); 
			//RETURN 22
			//BECAUSE:
			//10 + 0.6*(30-10)
			//10 + 0.6*(20)
			//10 + 12
			//22

			//IF THIS CELL IS IN DRAWING PROCESS
			if(this.changing)
			{
				//PERCENT INCREMENT
				this.drawedPercent += 0.05;

				//FIRST HALF OF PERCENT DRAWS THE FIRST LINE OF THE CROSS
				if(this.drawedPercent < 0.5)
				{
					let penX = lerp(this.x+50, this.x-50, 2*this.drawedPercent);
					let penY = lerp(this.y-50, this.y+50, 2*this.drawedPercent);
					line(this.x+50, this.y-50, penX, penY);
				}
				//SECOND HALF OF PERCENT DRAWS THE SECOND LINE OF THE CROSS
				else if(this.drawedPercent < 1)
				{
					line(this.x+50, this.y-50, this.x-50, this.y+50);

					let penX = lerp(this.x+50, this.x-50, 2*(this.drawedPercent-0.5));
					let penY = lerp(this.y+50, this.y-50, 2*(this.drawedPercent-0.5));
					line(this.x+50, this.y+50, penX, penY);
				}
				//SET THE END OF THE DRAWING PROCESS
				else
				{
					this.changing = false;
					this.drawedPercent = 1;
					drawing = false;
					line(this.x-50, this.y-50, this.x+50, this.y+50);
					line(this.x-50, this.y+50, this.x+50, this.y-50);
				}
			}
			//DRAW THE CROSS STATICALLY
			else
			{
				line(this.x-50, this.y-50, this.x+50, this.y+50);
				line(this.x-50, this.y+50, this.x+50, this.y-50);
			}
		}
		else if(this.value == "O")
		{
			//SET COLOR TO RED
			stroke(255, 0, 0);

			//IF THIS CELL IS IN DRAWING PROCESS
			if(this.changing)
			{
				//PERCENT INCREMENT
				this.drawedPercent += 0.05;

				//DRAW AN ARC EQUIVALENT TO THE DRAWING PROCESS PERCENT 
				if(this.drawedPercent < 1)
				{
					let angle = lerp(0, TWO_PI, this.drawedPercent);
					arc(this.x, this.y, 100, 100, -angle-PI/3, -PI/3);
				}
				//SET THE END OF THE DRAWING PROCESS
				else
				{
					this.changing = false;
					this.drawedPercent = 1;
					drawing = false;
					ellipse(this.x, this.y, 100, 100);
				}
			}
			//DRAW THE ELLIPSE STATICALLY
			else
			{
				ellipse(this.x, this.y, 100, 100);
			}
			
		}

		strokeWeight(1);
	}
}