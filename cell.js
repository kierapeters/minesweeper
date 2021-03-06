
// initializes cell with i position, j position, and width
function Cell(i, j, w) {
	this.i = i;
	this.j = j;
	this.x = i*w;
	this.y = j*w;
	this.w = w;
	this.neighborCount = 0;
	this.marked = false;
	this.revealed = false;
	this.bee = false;
}

// show function creates board
// if cell has not been clicked, will "mark" with slash to mark as bomb
// if cell clicked again, then will either fill with number, or if bomb, 
// will fill with bee and game is over
Cell.prototype.show = function() {
	stroke(0);
	noFill();
	rect(this.x, this.y, this.w, this.w);
	if (this.marked && !this.revealed) {
		fill(227);
		line(this.x, this.y, this.x + w, this.y + w);
		
	}

	if (this.revealed && !this.marked) {
		if (this.bee) {
			fill(127);
			ellipse(this.x + this.w * 0.5, this.y + this.w *0.5, this.w * 0.5);
		}
		else {
			fill(200);
			rect(this.x, this.y, this.w, this.w);
			if (this.neighborCount > 0) {
				textAlign(CENTER);
				fill(0);
				text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
			}
			
		}
	}
}

// counts number of bees by each cell
Cell.prototype.countBees = function() {

	// only need to count cells that aren't bees
	if (this.bee) {
		this.neighborCount = -1;
		return;
	}

	var total = 0;

	for (var xoff = -1; xoff <= 1; xoff++) {
		for (var yoff = -1; yoff <= 1; yoff++) {
			var i = this.i + xoff;
			var j = this.j + yoff;
			if (i > -1 && i < cols && j > -1 && j < rows) {
				var neighbor = grid[i][j];
			if (neighbor.bee) {
				total++;
				}
			}
		}
	}
	this.neighborCount = total;
}

// returns if mouse is clicked in cell
Cell.prototype.contains = function(x, y) {
	return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

// changes what state the cell is in in order to show cell properly
Cell.prototype.reveal = function() {
	if (!this.revealed && !this.marked) {
		this.marked = true;
		totalMarked++;
	}
	else if (this.marked || this.revealed) {
		this.marked = false;
		totalMarked--;
		this.revealed = true;
		totalRevealed++
		if (this.neighborCount == 0) {
			this.floodFill();
		}
	}
	
}

// when a cell with 0 neighbors is clicked, fills all 0s beside it
Cell.prototype.floodFill = function() {
	for (var xoff = -1; xoff <= 1; xoff++) {
		for (var yoff = -1; yoff <= 1; yoff++) {
			var i = this.i + xoff;
			var j = this.j + yoff;
			if (i > -1 && i < cols && j > -1 && j < rows) {
				var neighbor = grid[i][j];
				if (!neighbor.bee && !neighbor.revealed) {
					neighbor.revealed = true;
					totalRevealed++;
					neighbor.reveal();
				}
			}
		}
	}
}

// TODO:
// doesn't show bees that have been marked off
// no winning screen
// no number fading when completed




